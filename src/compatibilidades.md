# V1

1. Abrir o local do projeto no terminal:
1. 1. Executar "npm i";
1. 2. Executar "npm run dev";

2. No MySQL:
2. 1. Entrar ou criar uma nova base de dados;
2. 2. Copiar e executar o arquivo projeto/src/banco/v1-old/testedepercistencia.sql;

3. No projeto:
 1. Dentro do arquivo db.json configurar as informações do bnaco de dados:
  1. "DB_HOST" - Ip;
  2. "DB_PORT" - Porta;
  3. "DB_USER" - Usuário;
  4. "DB_PASSWORD" - Senha;
  5. "DB_NAME" - Nome da base de dados;

## versão 2 do banco tbm é compativel com o sistema

1. Para atualizar(se ja tiver o banco v1):
 1. excute o arquivo projeto/src/v2-atual/update-v1/script.sql na sua base de dados;

2. Caso não tenha o banco dados utilize:
 1. execute projeto/src/v2-atual/atual/create.sql;
 2. execute todas as procedores dentro do diretório projeto/src/v2-atual/atual/procedores;

3. Ou execute o projeto/src/v2-atual/atual/script.sql ele reseta a base de dados criando tudo que e necessário junto com insertes basicos;

