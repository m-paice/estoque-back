# API Node.js com PostgreSQL

Esta é uma API simples desenvolvida em Node.js com banco de dados PostgreSQL. A API fornece endpoints para realizar operações CRUD (Create, Read, Update, Delete) em recursos específicos.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (16x)
- Docker
- Docker Compose

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/m-paice/estoque-back
```

2. Instale as dependências:

```bash
npm install
```

3. Iniciar container

```bash
docker-compose up -d
```

4. Rodar migration

```bash
npx sequelize db:migrate
```

4. Rodar seeds

```bash
npx sequelize db:seed:all
```

4. Iniciar projeto em desenvolvimento

```bash
npm run dev
```
