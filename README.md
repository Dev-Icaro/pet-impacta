# 🐾 Pet Impacta - Sistema de Gerenciamento de Pets

Sistema completo de gerenciamento de pets desenvolvido com Next.js, Node.js, Express, TypeScript e PostgreSQL.

## 📊 Board do Projeto

**Acompanhe o progresso e gerencie as tarefas do projeto:**

- [📋 GitHub Project Board](https://github.com/users/Dev-Icaro/projects/2/views/1)

## 📋 Índice

- [Board do Projeto](#-board-do-projeto)
- [Documentação](#-documentação)
- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Setup do Projeto](#-setup-do-projeto)
  - [Unix/Linux/macOS](#unixlinuxmacos)
  - [Windows](#windows)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [API Endpoints](#-api-endpoints)
- [Estrutura de Dados](#-estrutura-de-dados)
- [Contribuição](#-contribuição)

## 📚 Documentação

A documentação completa do projeto está organizada em diagramas UML para facilitar o entendimento da arquitetura e funcionalidades:

### 🏗️ Diagrama de Classes (Backend)

Localização: [`backend/docs/backend-classes.puml`](./backend/docs/backend-classes.puml)

Documentação completa da arquitetura do backend incluindo:

- **Models**: Entidades de domínio (Pet, Veterinarian, Service, Appointment)
- **Controllers**: Camada de controle HTTP
- **Repositories**: Camada de acesso a dados
- **DTOs**: Data Transfer Objects para validação
- **Mappers**: Conversão entre formatos (snake_case ↔ camelCase)

**Como visualizar:**

- VS Code: Instale a extensão "PlantUML" e pressione `Alt + D`
- Online: [PlantUML Web Server](http://www.plantuml.com/plantuml/uml/)
- Local: `npm install -g node-plantuml && plantuml backend-classes.puml`

### 📋 Diagramas de Casos de Uso

Localização: [`docs/use-cases/`](./docs/use-cases/)

Diagramas de casos de uso por módulo:

- **[`pet-use-cases.puml`](./docs/use-cases/pet-use-cases.puml)** - Gerenciamento de Pets

  - Cadastrar, Listar, Consultar, Atualizar e Deletar Pets
  - Validações de dados

- **[`veterinarians-use-cases.puml`](./docs/use-cases/veterinarians-use-cases.puml)** - Gerenciamento de Veterinários

  - Cadastrar, Listar, Consultar, Atualizar e Deletar Veterinários
  - Validação de CRMV

- **[`services-use-cases.puml`](./docs/use-cases/services-use-cases.puml)** - Gerenciamento de Serviços

  - Cadastrar, Listar, Consultar, Atualizar e Deletar Serviços
  - Cálculo de preços

- **[`appointments-use-cases.puml`](./docs/use-cases/appointments-use-cases.puml)** - Gerenciamento de Agendamentos
  - Criar, Listar, Consultar, Atualizar e Cancelar Agendamentos
  - Validações de disponibilidade e datas futuras
  - Relacionamentos com Pets, Serviços e Veterinários

**Atores do Sistema:**

- **Atendente**: Gerencia pets, agendamentos e visualiza informações
- **Administrador**: Gerencia veterinários e serviços
- **Veterinário**: Visualiza agendamentos e consultas
- **Sistema**: Realiza validações automáticas

### 🔄 Atualização da Documentação

Para gerar/atualizar o diagrama de classes do backend:

```bash
cd backend
npm run uml:backend
```

## 🎯 Visão Geral

O Pet Impacta é um sistema completo para gerenciamento de pets, oferecendo:

- **Frontend**: Interface moderna e responsiva com Next.js 15
- **Backend**: API REST robusta com Node.js e Express
- **Banco de Dados**: PostgreSQL com pool de conexões
- **Arquitetura**: Padrão Route → Controller → Repository
- **Tipagem**: TypeScript em todo o projeto
- **UI/UX**: shadcn/ui com Tailwind CSS

## 🛠️ Tecnologias

### Frontend

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes
- **Lucide React** - Ícones modernos

### Backend

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **pg** - Cliente PostgreSQL para Node.js
- **CORS** - Cross-Origin Resource Sharing

### DevOps

- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Git** - Controle de versão

## 📁 Estrutura do Projeto

```
pet-impacta/
├── 📁 backend/                    # API Backend
│   ├── 📁 src/
│   │   ├── 📁 config/            # Configurações (database, etc.)
│   │   ├── 📁 controllers/       # Lógica de negócio
│   │   ├── 📁 dtos/             # Data Transfer Objects
│   │   ├── 📁 mappers/          # Conversores snake_case ↔ camelCase
│   │   ├── 📁 models/           # Modelos de dados
│   │   ├── 📁 repositories/     # Acesso a dados
│   │   ├── 📁 routes/           # Definição de rotas
│   │   ├── 📁 types/            # Tipos TypeScript
│   │   ├── 📁 utils/            # Utilitários
│   │   └── 📄 server.ts         # Servidor principal
│   ├── 📁 db-init/              # Scripts de inicialização do banco
│   ├── 📁 build/                # Código compilado
│   ├── 📄 package.json          # Dependências do backend
│   ├── 📄 tsconfig.json         # Configuração TypeScript
│   └── 📄 .env.example          # Variáveis de ambiente
│
├── 📁 frontend/                   # Interface Frontend
│   ├── 📁 src/
│   │   ├── 📁 app/              # App Router (Next.js 15)
│   │   │   ├── 📁 pet/          # Páginas de pets
│   │   │   ├── 📄 layout.tsx    # Layout principal
│   │   │   └── 📄 page.tsx      # Página inicial
│   │   ├── 📁 components/       # Componentes React
│   │   │   ├── 📁 layout/       # Componentes de layout
│   │   │   ├── 📁 pet/          # Componentes específicos de pets
│   │   │   └── 📁 ui/           # Componentes shadcn/ui
│   │   ├── 📁 hooks/            # Hooks personalizados
│   │   ├── 📁 lib/              # Utilitários
│   │   ├── 📁 types/            # Tipos TypeScript
│   │   └── 📁 utils/            # Constantes e helpers
│   ├── 📁 public/               # Arquivos estáticos
│   ├── 📄 package.json          # Dependências do frontend
│   ├── 📄 next.config.ts        # Configuração Next.js
│   └── 📄 .env.example          # Variáveis de ambiente
│
├── 📄 compose.yaml              # Docker Compose
└── 📄 README.md                 # Este arquivo
```

## ⚙️ Pré-requisitos

### Obrigatórios

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (v13 ou superior)
- **Git**

### Opcionais

- **Docker** e **Docker Compose** (para desenvolvimento com containers)

## 🚀 Setup do Projeto

### Unix/Linux/macOS

#### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd pet-impacta
```

#### 2. Instale as dependências do backend

```bash
cd backend
npm install
# ou
yarn install
```

#### 3. Instale as dependências do frontend

```bash
cd ../frontend
npm install
# ou
yarn install
```

#### 4. Configure o banco de dados PostgreSQL

```bash
# Crie o banco de dados
sudo -u postgres createdb petimpacta

# Crie o usuário (opcional)
sudo -u postgres createuser impacta
sudo -u postgres psql -c "ALTER USER impacta PASSWORD 'admin';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE petimpacta TO impacta;"
```

#### 5. Configure as variáveis de ambiente

```bash
# Backend
cp backend/.env.example backend/.env.development

# Frontend
cp frontend/.env.example frontend/.env.development
```

#### 6. Execute as migrações do banco

```bash
cd backend
npm run build
npm run migrate
```

### Windows

#### 1. Clone o repositório

```cmd
git clone <url-do-repositorio>
cd pet-impacta
```

#### 2. Instale as dependências do backend

```cmd
cd backend
npm install
```

#### 3. Instale as dependências do frontend

```cmd
cd ..\frontend
npm install
```

#### 4. Configure o banco de dados PostgreSQL

```cmd
# Abra o pgAdmin ou use o psql
# Crie o banco de dados 'petimpacta'
# Crie o usuário 'impacta' com senha 'admin'
```

#### 5. Configure as variáveis de ambiente

```cmd
# Backend
copy backend\.env.example backend\.env.development

# Frontend
copy frontend\.env.example frontend\.env.development
```

#### 6. Execute as migrações do banco

```cmd
cd backend
npm run build
npm run migrate
```

## ⚙️ Configuração

### Backend (.env.development)

```env
# Database
PGUSER=impacta
POSTGRES_USER=impacta
PGHOST=localhost
PGDATABASE=petimpacta
POSTGRES_DB=petimpacta
POSTGRES_PASSWORD=admin
PGPORT=5432

# Application
APP_PORT=3001
NODE_ENV=development
TZ=America/Sao_Paulo

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Frontend (.env.development)

```env
# API Configuration
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
INTERNAL_BACKEND_URL=http://nginx:80
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
# ou
yarn dev
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
# ou
yarn dev
```

### Produção

#### Backend

```bash
cd backend
npm run build
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm start
```

### Com Docker

```bash
# Desenvolvimento
docker-compose up -d

# Produção
docker-compose -f docker-compose.prod.yml up -d
```

## 🔌 API Endpoints

### Pets

- `GET /api/pet` - Lista todos os pets
- `GET /api/pet/:id` - Busca pet por ID
- `POST /api/pet` - Cria novo pet
- `PUT /api/pet/:id` - Atualiza pet
- `DELETE /api/pet/:id` - Remove pet

### Health Check

- `GET /health` - Status do servidor e banco

## 🧪 Scripts Disponíveis

### Backend

```bash
npm run dev          # Desenvolvimento com hot reload
npm run build        # Compila TypeScript
npm start            # Executa versão compilada
npm run test         # Executa testes
npm run lint         # Verifica código
```

### Frontend

```bash
npm run dev          # Desenvolvimento com hot reload
npm run build        # Build de produção
npm start            # Executa versão de produção
npm run lint         # Verifica código
```

**Pet Impacta** - Cuidando dos seus pets com tecnologia! 🐾
