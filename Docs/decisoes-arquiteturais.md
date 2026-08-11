# Decisões Arquiteturais

Este documento registra as principais decisões técnicas tomadas durante o desenvolvimento do Smart Stock Manager.

O objetivo é manter um histórico das decisões do projeto e explicar os motivos técnicos por trás de cada escolha.

---

## ADR-001 — Arquitetura em camadas

### Status

Aceita

### Contexto

O sistema precisa possuir uma separação clara entre interface, regras de negócio e acesso aos dados.

Uma aplicação de estoque possui diferentes responsabilidades, como apresentação das informações, validação das operações e persistência dos dados.

### Decisão

Será utilizada uma arquitetura em camadas.

A aplicação será organizada conceitualmente em:

- Frontend
- API
- Regras de negócio
- Acesso aos dados
- Banco de dados

### Estrutura planejada

```text
Frontend
    ↓
API REST
    ↓
Regras de negócio
    ↓
Acesso aos dados
    ↓
SQL Server