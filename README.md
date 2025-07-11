# NLW Agents

Projeto desenvolvido durante um evento da **Rocketseat** utilizando tecnologias modernas para criação de uma API robusta e eficiente.

## 🚀 Tecnologias

- **Node.js** com TypeScript nativo (experimental strip types)
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** com extensão **pgvector** para vetores
- **Drizzle ORM** - Type-safe database operations
- **Zod** - Schema validation
- **Docker** - Containerização do banco de dados
- **Biome** - Linting e formatação de código

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular com:

- **Separação de responsabilidades** entre rotas, schemas e conexão com banco
- **Validação de schemas** com Zod para type safety
- **ORM type-safe** com Drizzle para operações de banco de dados
- **Validação de variáveis de ambiente** centralizadas

## ⚙️ Setup e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- Chave de API do Google Gemini

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd server
```

### 2. Configure o banco de dados
```bash
docker-compose up -d
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave da API do Gemini:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
GEMINI_API_KEY=sua-chave-da-api-do-gemini-aqui
```

> **Importante:** Você precisa obter uma chave de API do Google Gemini em [Google AI Studio](https://makersuite.google.com/app/apikey)

### 4. Instale as dependências
```bash
npm install
```

### 5. Execute as migrações do banco
```bash
npx drizzle-kit migrate
```

### 6. (Opcional) Popule o banco com dados de exemplo
```bash
npm run db:seed
```

### 7. (Opcional) Adicione conteúdo de áudio de exemplo
```bash
npm run db:seed-audio
```

> **Importante:** Para que as perguntas sejam respondidas adequadamente, é necessário ter conteúdo de áudio transcrito no banco. Você pode usar o endpoint de upload de áudio ou executar o comando acima para adicionar dados de exemplo.

### 8. Execute o projeto

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

## 📚 Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo de desenvolvimento com hot reload
- `npm start` - Executa o servidor em modo de produção
- `npm run db:generate` - Gera migrações do banco baseado no schema
- `npm run db:migrate` - Executa as migrações do banco
- `npm run db:seed` - Popula o banco de dados com dados de exemplo (salas e perguntas)
- `npm run db:seed-audio` - Adiciona conteúdo de áudio transcrito de exemplo

## 🌐 Endpoints

A API estará disponível em `http://localhost:3333`

### Salas
- `GET /rooms` - Lista as salas disponíveis
- `POST /rooms` - Cria uma nova sala

### Perguntas
- `GET /rooms/:roomId/questions` - Lista as perguntas de uma sala
- `POST /rooms/:roomId/questions` - Cria uma nova pergunta em uma sala

### Upload de Áudio
- `POST /rooms/:roomId/upload` - Faz upload de áudio para uma sala

### Outros
- `GET /health` - Health check da aplicação

## 🔄 Como Funciona

1. **Crie uma sala** usando `POST /rooms`
2. **Faça upload de áudio** usando `POST /rooms/:roomId/upload` (o áudio será transcrito e indexado)
3. **Faça perguntas** usando `POST /rooms/:roomId/questions` (o sistema buscará no conteúdo transcrito para responder)

> **Nota:** As respostas são geradas com base no conteúdo de áudio transcrito da sala. Sem áudio, as perguntas não podem ser respondidas adequadamente.

## 🔧 Troubleshooting

### Perguntas não estão sendo respondidas

Se as perguntas estão retornando `answer: null`, verifique se:

1. Há conteúdo de áudio transcrito na sala (execute `npm run db:seed-audio` para dados de exemplo)
2. A chave da API do Gemini está configurada corretamente no arquivo `.env`
3. O banco de dados está rodando (`docker compose ps`)

### Erro "node: bad option: --experimental-strip-types"

Este erro ocorre com versões mais antigas do Node.js. O projeto foi atualizado para usar `tsx` que funciona com Node.js 18+.

### Banco de dados não conecta

Verifique se:
1. O Docker está rodando
2. O banco foi iniciado com `docker compose up -d`
3. As migrações foram executadas com `npx drizzle-kit migrate`

---

Desenvolvido com ❤️ durante o NLW da Rocketseat 