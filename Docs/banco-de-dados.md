# Banco de Dados do Smart Stock Manager

## 1. Objetivo

O banco de dados será responsável por armazenar e organizar as informações utilizadas pelo Smart Stock Manager.

Entre as principais informações estarão:

- Usuários
- Produtos
- Categorias
- Estoque
- Movimentações de estoque
- Fornecedores

## 2. Principais entidades

O sistema inicialmente terá as seguintes entidades:

### Usuário

Responsável pelo acesso ao sistema.

Principais informações:
- ID
- Nome
- E-mail
- Senha
- Perfil

### Produto

Representa os produtos cadastrados no estoque.

Principais informações:
- ID
- Nome
- Descrição
- Código
- Categoria
- Estoque mínimo
- Estoque atual

### Categoria

Responsável por organizar os produtos.

Principais informações:
- ID
- Nome
- Descrição

### Movimentação

Registra as entradas e saídas de produtos.

Principais informações:
- ID
- Produto
- Tipo de movimentação
- Quantidade
- Data
- Usuário responsável

### Fornecedor

Armazena os fornecedores dos produtos.

Principais informações:
- ID
- Nome
- CNPJ
- E-mail
- Telefone

## 3. Relacionamentos

Os principais relacionamentos planejados são:

- Uma categoria pode possuir vários produtos.
- Um produto pode possuir várias movimentações.
- Um usuário pode realizar várias movimentações.
- Um fornecedor pode fornecer vários produtos.

## 4. Modelo de relacionamento

A estrutura inicial do banco de dados será representada da seguinte forma:

```text
CATEGORIA
   │
   │ 1:N
   ↓
PRODUTO
   │
   │ 1:N
   ↓
MOVIMENTAÇÃO
   ↑
   │ N:1
USUÁRIO

FORNECEDOR
   │
   │ 1:N
   ↓
PRODUTO