# Desenvolvimento do Smart Stock Manager

## 1. Objetivo

Este documento registra as etapas de desenvolvimento do Smart Stock Manager, desde o planejamento até a implementação e evolução do sistema.

## 2. Etapas do projeto

### Etapa 1 — Planejamento

- Definição do objetivo do sistema.
- Definição das principais funcionalidades.
- Definição das tecnologias.
- Planejamento da arquitetura.
- Planejamento inicial do banco de dados.

### Etapa 2 — Estrutura do projeto

- Criação do repositório.
- Criação do README.md.
- Criação do .gitignore.
- Criação da pasta de documentação.
- Criação dos arquivos de documentação.

### Etapa 3 — Banco de dados

- Criação do modelo do banco.
- Criação das tabelas.
- Definição dos relacionamentos.
- Inserção de dados para testes.

### Etapa 4 — Backend

- Criação da API.
- Implementação das regras de negócio.
- Conexão com o banco de dados.
- Criação dos endpoints.

### Etapa 5 — Frontend

- Criação da interface.
- Cadastro de produtos.
- Visualização do estoque.
- Registro de entradas e saídas.
- Dashboard.

### Etapa 6 — Inteligência Artificial

- Preparação dos dados.
- Análise do histórico de estoque.
- Desenvolvimento das previsões.
- Criação de recomendações.

### Etapa 7 — Testes e melhorias

- Testes das funcionalidades.
- Correção de erros.
- Melhorias de desempenho.
- Melhorias na interface.
- Atualização da documentação.
## 3. Status atual

### Concluído

- Estrutura inicial do projeto criada.
- README.md criado.
- .gitignore configurado.
- Documentação inicial criada.
- Arquitetura do sistema definida.
- Modelo inicial do banco de dados definido.
- Script SQL inicial criado.
- Repositório conectado ao GitHub.

### Próximos passos

- Configurar o ambiente .NET.
- Criar a API backend.
- Criar os endpoints da aplicação.
- Conectar o backend ao banco de dados.
- Desenvolver o frontend.
- Implementar funcionalidades de Inteligência Artificial.

## Autenticação

A primeira versão do projeto possui uma tela de login desenvolvida em HTML, CSS e JavaScript.

Nesta etapa, a autenticação é apenas uma simulação para desenvolvimento do frontend.

As credenciais utilizadas atualmente são armazenadas diretamente no JavaScript e não devem ser utilizadas em produção.

### Próxima etapa

Quando o backend estiver disponível, a autenticação será migrada para uma API desenvolvida em C# e .NET.

A autenticação real deverá:

- Validar usuário e senha no backend.
- Consultar os usuários no banco de dados.
- Não armazenar senhas diretamente no frontend.
- Utilizar autenticação segura.
- Controlar permissões de acesso.