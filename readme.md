# Barber Up Back End

## Instalação

Tenha o [node e npm](https://nodejs.org) instalados

Execute no terminal: `npm install`

## Inicializar banco de dados de desenvolvimento

Para testar a interação com o banco de dados em desenvolvimento, rode:

`npx prisma dev`

Depois, utilize a tecla `h` para exibir o URL do banco de dados.

Depois, crie um arquivo `.env` na raiz do projeto e coloque o conteúdo:

`DATABASE_URL=https://url-fornecida-pelo-comando-acima`

## Rodando aplicação

Execute: `npm run dev`

Abra [http://localhost:3001/api](http://localhost:3001/api) com seu browser.
