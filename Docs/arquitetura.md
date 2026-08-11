# Arquitetura do Smart Stock Manager

## 1. Visão geral

O Smart Stock Manager será um sistema de gerenciamento de estoque desenvolvido para controlar produtos, entradas, saídas e movimentações de estoque.

O sistema também terá funcionalidades baseadas em Inteligência Artificial para auxiliar na análise dos dados e na tomada de decisões relacionadas ao estoque.

## 2. Estrutura do sistema

O projeto será dividido em quatro principais partes:

- Frontend
- Backend
- Banco de dados
- Inteligência Artificial

## 3. Tecnologias

### Frontend

O frontend será responsável pela interface visual do sistema e pela interação com o usuário.

Tecnologia escolhida:
- HTML
- CSS
- JavaScript

### Backend

O backend será responsável pelas regras de negócio, processamento das informações e comunicação com o banco de dados.

Tecnologia escolhida:
- C#

Framework:
- .NET

### Banco de dados

O banco de dados será responsável pelo armazenamento das informações do sistema, como produtos, usuários e movimentações de estoque.

Tecnologia escolhida:
- SQL Server

### Inteligência Artificial

A Inteligência Artificial será utilizada para analisar os dados do estoque e futuramente auxiliar em previsões e recomendações.

Tecnologia escolhida:
- Python

## 4. Comunicação entre os componentes

O sistema seguirá uma arquitetura baseada na comunicação entre frontend, backend, banco de dados e inteligência artificial.

O fluxo principal será:

1. O usuário interage com o frontend.
2. O frontend envia uma requisição para o backend através de uma API.
3. O backend processa a requisição e aplica as regras de negócio.
4. O backend consulta ou altera os dados armazenados no SQL Server.
5. Quando necessário, o backend poderá enviar dados para o módulo de Inteligência Artificial.
6. A Inteligência Artificial processa os dados e retorna os resultados.
7. O backend envia a resposta para o frontend.
8. O frontend apresenta o resultado ao usuário.

### Fluxo simplificado

Frontend
↓
API / Backend
↓
SQL Server
↓
Inteligência Artificial
↓
Backend
↓
Frontend

O caminho será

usuário
   ↓
tela do sistema
   ↓
API
   ↓
C#
   ↓
SQL Server
   ↓
dados do estoque
   ↓
C#
   ↓
tela

E quando colocarmos IA 

dados históricos
      ↓
    Python
      ↓
previsão de demanda
      ↓
recomendação
      ↓
     C#
      ↓
    frontend
    ## 5. API

A comunicação entre o frontend e o backend será realizada por meio de uma API REST.

A API será responsável por receber as requisições do frontend, processar as regras de negócio e retornar os dados necessários.

### Principais recursos

- Usuários
- Produtos
- Categorias
- Fornecedores
- Movimentações de estoque
### Endpoints de Produtos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /api/products | Lista todos os produtos |
| GET | /api/products/{id} | Busca um produto específico |
| POST | /api/products | Cadastra um novo produto |
| PUT | /api/products/{id} | Atualiza um produto |
| DELETE | /api/products/{id} | Remove um produto |

### Endpoints de Categorias

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /api/categories | Lista todas as categorias |
| GET | /api/categories/{id} | Busca uma categoria |
| POST | /api/categories | Cadastra uma categoria |
| PUT | /api/categories/{id} | Atualiza uma categoria |
| DELETE | /api/categories/{id} | Remove uma categoria |

### Endpoints de Fornecedores

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /api/suppliers | Lista todos os fornecedores |
| GET | /api/suppliers/{id} | Busca um fornecedor |
| POST | /api/suppliers | Cadastra um fornecedor |
| PUT | /api/suppliers/{id} | Atualiza um fornecedor |
| DELETE | /api/suppliers/{id} | Remove um fornecedor |

### Endpoints de Movimentações

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /api/stock-movements | Lista movimentações |
| GET | /api/stock-movements/{id} | Busca uma movimentação |
| POST | /api/stock-movements | Registra uma movimentação |