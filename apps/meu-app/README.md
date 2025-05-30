# ByteBank 💸

## Objetivo:
Criar uma interface que permita aos usuários gerenciar suas transações financeiras, aplicando conceitos de POO. Tech Challenge da FIAP, no curso Front-end Engineering.

Na aplicação é possível:
- Registrar depósitos, transações PIX, TED e empréstimos bancários;
- Visualizar, editar e excluir os registros


![image](https://github.com/user-attachments/assets/befb0cfe-023a-49a6-897d-d3d860187178)

## Overview do projeto
O desenvolvimento foi feito utilizando [json-server](https://www.npmjs.com/package/json-server) para simular uma base de dados e receber informações no formato de JSON.
Ao clonar o projeto, é possível encontrar na raiz o arquivo `db-exemple.ts`. Os conteúdo da constante `dbExemplo` é o mesmo que você pode inserir no `db.json` para simular as interações.
Aqui estão os passos para isso:
1. Crie um arquivo "db.json" na raiz do projeto ou renomeie este arquivo;
2. Utilize o conteúdo dde dbExemplo para criar o JSON que vai simular registros em uma base de dados.

## Rodando localmente

Dependências: 
- "next": "15.3.2"
- "@types/node": "^20"
- "@types/react": "^19"

Comandos para instalação e inicialização:

      > git clone <link-do-repositorio>
      > npm install
      > npm run dev // Roda o front-end
      > npm run start:mock // Roda o mock do json-server

