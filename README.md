# Registro de gastos financeiros - BYTEBANK 💸

A proposta de projeto do Tech Challenge criado pela FIAP para turmas do pós-tech em Front-end Engineering é uma interface que permite os usuários gerenciarem suas transações financeiras.

As tecnologias utilizadas para o desenvolvimento foram:
- Nextjs + Typescript
- Turborepo (mono repositório)
- Multi-zones (microfrontend)
- Zustand (persistência de dados)

O teste local foi feito utilizando Docker compose, conforme uma das exigências do projeto.

O deploy do front-end foi realizado no Vercel e está disponível [aqui](https://fiap-bytebank.vercel.app/dashboard).


![projeto](https://github.com/user-attachments/assets/d73502c9-7e72-4cf6-a66b-84c564c026b1)


## Dependências gerais

Requisitos: 
- pnpm ^10.13.1
- Node ^18.17.0
- API Bytebank ([disponível aqui](https://github.com/LisandraFerraz/nest-bytebank-api))

```bash
npm install -g pnpm (somente utilizado no FED)
npm install turbo --global (somente utilizado no FED)
```
**Importante**: o package manager dessa aplicação é o PNPM devido as features que auxiliam a performance e eficiência no gerenciamento de pacotes instalados na aplicação de um monorepositório, visto que cada projeto em /apps tem o seu próprio package.json e node_modules.

O BFF do projeto está em `/apps/next-bytebank/src/pages/api` e para funcionar corretamente, é necessário criar um aquivo `.env` na pasta do projeto com a seguinte configuração:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3003
```
O `.env` pode ficar na raíz do projeto, entretanto é recomendado fortemente que cada projeto em `/apps` tenha o próprio environment file.
### Rodando localmente
Passos:

1. Comandos para instalação e inicialização:

```bash
git clone <link-do-repositorio>
cd fiap-bytbank-fed
pnpm install
pnpm dev
```

1. Altere o valor de `destination=` no arquivo `next.config.ts` em /apps/next-bytebank para `http://localhost:3002/auth/:path*`.

2. Na raíz do projeto, digite o comando:

```bash
pnpm dev
```
### Rodando no Docker

Passos:
      
1. Tenha o docker desktop instalado na máquina.
2. Altere o valor de `destination` no arquivo `next.config.ts` em /apps/next-bytebank para `http://auth-mfe:3002/auth/:path*`.

3. Na raíz do projeto, abra o terminal e digite os comandos:

      > docker-compose up --build
Isso vai construir a imagem e container do projeto, e quando o processo for finalizado, a url da máquina local estará disponível.

## Estrutura do projeto
A arquitetura das pastas segue a proposta do Nextjs para trabalhar com microfrontends. Turbojs foi escolhido pois sua tecnologia já é conhecida pelo Vercel e isso auxilia nos deploys do front-end.

      fiap-bytebank-fed/
      ├─ apps/
      │  ├─ auth-mfe/
      │  │  ├─ next.config.ts --> exposição de rota raíz do MFE
      │  │  └─ Dockerfile --> instruções para o container no Docker
      │  └─ next-bytebank/
      │  │  ├─ next.config.ts --> remapeamento de rotas (API e MFE) para o local
      │  │  ├─ Dockerfile --> instruções para o container no Docker
      │  │  └─ vercel.json --> remapeamento das rotas (API e MFE) para o vercel
      ├─ packages/ --> pacotes de componentes e funções compartilhadas no projeto
      │  ├─ ui/ --> funções
      │  └─ utils/ --> componentes e estilos
      ├─ docker-compose.yaml--> configuração do ambiente no docker com os MFEs
      ├─ package.json --> alguns pacotes usados em ambos os projetos são declarados aqui
      ├─ pnpm-workspace.yaml --> define as workspaces (apps e pacotes)
      └─ turbo.json --> configuração do ambiente em monorepositório


