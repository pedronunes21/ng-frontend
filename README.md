
# NG.CASH (Frontend)

Frontend do Processo Seletivo NG <> TRYBE.



## Stack utilizada

**Front-end:** React, Typescript, Tailwindcss


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT` Um valor qualquer para não rodar na mesma porta que o servidor \
Ex: `PORT = 3001`


## Como rodar

Primeiro, certifique-se de estar com o servidor rodando.
Em seguida, rode o comando a seguir para instalar as dependências.

```bash
  npm install
```
Com as dependências instaladas, é só rodar

```bash
  npm run start
```
    
## Rotas

#### Para fazer login

```http
  GET /login
```

#### Para se registrar

```http
  GET /registro
```

#### Para fazer transações e verificar o saldo (Necessário estar logado)

```http
  GET /transacao
```

#### Para ver o histórico de transações (Necessário estar logado)

```http
  GET /historico
```
