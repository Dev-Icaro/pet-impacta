import express from 'express';
import cors from 'cors';
import petRoutes from './routes/pet.routes';
import veterinarianRoutes from './routes/veterinarian.routes';
import serviceRoutes from './routes/service.routes';
import appointmentRoutes from './routes/appointment.routes';
import { testConnection, closePool } from './config/database';

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Configuração do CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Permitir requisições sem origin (ex: mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS: Origin não permitida: ${origin}`);
      callback(new Error(`Origin ${origin} não permitida pelo CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', async (req, res) => {
  try {
    const dbConnected = await testConnection();
    res.status(200).json({
      success: true,
      message: 'Servidor funcionando corretamente',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbConnected ? 'connected' : 'disconnected',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro no health check',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    });
  }
});

app.use('/api/pet', petRoutes);
app.use('/api/veterinarian', veterinarianRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/appointment', appointmentRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nRecebido SIGINT, fechando servidor...');
  await closePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nRecebido SIGTERM, fechando servidor...');
  await closePool();
  process.exit(0);
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Origens permitidas: ${allowedOrigins.join(', ')}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API Pet: http://localhost:${PORT}/api/pet`);
  console.log(`API Veterinarian: http://localhost:${PORT}/api/veterinarian`);
  console.log(`API Service: http://localhost:${PORT}/api/service`);
  console.log(`API Appointment: http://localhost:${PORT}/api/appointment`);

  // Testar conexão com banco de dados
  await testConnection();
});
