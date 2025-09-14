import { Pool, PoolConfig } from 'pg';

const dbConfig: PoolConfig = {
  user: process.env.PGUSER || process.env.POSTGRES_USER || 'impacta',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || process.env.POSTGRES_DB || 'petimpacta',
  password: process.env.POSTGRES_PASSWORD || 'admin',
  port: parseInt(process.env.PGPORT || '5432'),
  max: 20, // Máximo de conexões no pool
  idleTimeoutMillis: 30000, // Tempo limite para conexões inativas
  connectionTimeoutMillis: 2000, // Tempo limite para estabelecer conexão
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

export const pool = new Pool(dbConfig);

export const testConnection = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('Conexão com PostgreSQL estabelecida com sucesso');
    console.log('Timestamp do banco:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('Erro ao conectar com PostgreSQL:', error);
    return false;
  }
};

export const closePool = async (): Promise<void> => {
  try {
    await pool.end();
    console.log('Pool de conexões fechado');
  } catch (error) {
    console.error('Erro ao fechar pool de conexões:', error);
  }
};

export const executeQuery = async <T = any>(text: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }> => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return {
      rows: result.rows,
      rowCount: result.rowCount || 0,
    };
  } catch (error) {
    console.error('Erro ao executar query:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const executeTransaction = async <T = any>(callback: (client: any) => Promise<T>): Promise<T> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro na transação, rollback executado:', error);
    throw error;
  } finally {
    client.release();
  }
};

export default pool;
