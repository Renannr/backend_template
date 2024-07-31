# backend_template

## Getting Started

Este projeto é um template para futuros projetos maiores. Ele utiliza as seguintes tecnologias:

- ✅ Node.js
- ✅ JWT
- ✅ Sequelize
- ✅ bcrypt
- ✅ ES6

## Configuração

1. **Instalar Dependências**:

```bash
npm install
```

ou

```bash
yarn install
```

2. **Configurar o Banco de Dados**:

- Crie um arquivo de configuração `.env` com as credenciais apropriadas seguindo o exemplo que está em `.env.example`.

```
PORT=8080
DB_DATABASE=""
DB_DIALECT=""
DATABASE_URL=""
STORAGE=""
DB_USER=""
DB_PASSWORD=""
JWT_SECRET=""
PRODUCTION=False
```

3. **Iniciar o Servidor**:

- Para produção:

```bash
npm start
```

- Para rodar testes:

```bash
yarn test
```

## Estrutura do Projeto

- **`__testes__/`**: Contém os testes da aplicação.
- **`controllers/`**: Contém os controladores da API. Cada controlador gerencia um conjunto de operações relacionadas a uma entidade específica.
- **`docs/`**: Contém a documentação detalhada para cada controlador. Cada arquivo descreve os endpoints, parâmetros e exemplos de uso dos respectivos controladores.
- **`models/`**: Contém os modelos do banco de dados, definidos usando Sequelize. Esses modelos representam as tabelas e suas relações no banco de dados.
- **`database/`**: Contém a configuração e inicialização do banco de dados, incluindo as migrações e seeds.
- **`src/middlewares/auth.js`**: Contém a lógica de autorização.
- **`src/middlewares/request_error.js`**: Contém a lógica de tratamento de erros.
- **`src/authenticate.js`**: Contém a lógica de autenticação.
- **`src/routes/index.js`**: Contém a definição das rotas da API. Organiza os endpoints da API e os vincula aos controladores apropriados.
- **`src/server.js`**: Contém a configuração e inicialização do servidor. Configura o middleware, a conexão com o banco de dados e outras configurações do servidor.
- **`.env.example`**: Exemplo de arquivo de configuração de variáveis de ambiente.

## Documentação

A documentação detalhada para cada controlador pode ser encontrada na pasta `docs/`. Os arquivos de documentação fornecem informações sobre os endpoints disponíveis, como usá-los, e exemplos de requisições e respostas.

### Controladores

- [Documentação UsuarioInicial](src/docs/createinitialuser.md)
- [Documentação validateToken](src/docs/validateToken.md)
- [Documentação Login](src/docs/login.md)
- [Documentação Pessoa](src/docs/pessoa.md)
- [Documentação Produto](src/docs/produto.md)

## Requisitos

Certifique-se de que o ambiente de desenvolvimento está configurado corretamente com as seguintes dependências:

- Node.js
- Sequelize
- PostgreSQL (ou outro banco de dados configurado)
- `.env`