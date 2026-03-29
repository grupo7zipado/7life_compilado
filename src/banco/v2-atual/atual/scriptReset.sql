/*

SCRIPT PARA CRIAÇÃO DO BANCO DE DADOS, TABELAS, PROCEDURES E INSERTS BASICOS NECESSÁRIAS PARA O PROJETO 7LIFE - VERSÃO 2.0

*/

/*
-- --------------- --
TABLES
obs: atentece a ordem de create e drop das tabelas, para evitar erros de chave estrangeira
-- --------------- --
*/

DROP TABLE IF EXISTS usuariosA;
DROP TABLE IF EXISTS dados;
DROP TABLE IF EXISTS useStatus;
DROP TABLE IF EXISTS usuariosEsp;
DROP TABLE IF EXISTS esp;
DROP TABLE IF EXISTS usuarios;


-- tabela sobre os esp
CREATE TABLE IF NOT EXISTS esp(
	esp_id INT PRIMARY KEY AUTO_INCREMENT,
	esp_mac VARCHAR(17) NOT NULL,
	esp_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tabela sobre os usuários
CREATE TABLE IF NOT EXISTS usuarios(
	usu_id INT PRIMARY KEY   AUTO_INCREMENT,
    usu_nome VARCHAR(128),
    usu_nascimento DATE NOT NULL,
	usu_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- tabela que relaciona os esp ao usuário
CREATE TABLE IF NOT EXISTS usuariosEsp(
	use_id INT PRIMARY KEY AUTO_INCREMENT,
    esp_id INT NOT NULL,
    usu_id INT NOT NULL,
    use_status BIT NOT NULL DEFAULT 0,
    use_lastStatus TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    use_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (esp_id) REFERENCES esp(esp_id),
	FOREIGN KEY (usu_id) REFERENCES usuarios(usu_id) 
);
-- guarda os dados do usuario
CREATE TABLE IF NOT EXISTS dados(
    dados_id INT PRIMARY KEY AUTO_INCREMENT ,
    use_id INT NOT NULL,
    dados_tipo ENUM("temperatura", "oxigenacao", "bpm") NOT NULL,
    dados_valor VARCHAR(32) NOT NULL,
    dados_generate TIMESTAMP NOT NULL,
    dados_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (use_id) REFERENCES usuariosEsp(use_id)
);

-- Tablea adcionada da v1 para v2, para guardar os dados de autenticação dos usuários
CREATE TABLE IF NOT EXISTS usuariosA(
    usu_id INT PRIMARY KEY NOT NULL,
    usu_email VARCHAR(128) NOT NULL UNIQUE,
    usu_password VARCHAR(128) NOT NULL,
    usu_tipo ENUM("admin", "user") NOT NULL DEFAULT "user",
    usu_status BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (usu_id) 
        REFERENCES usuarios(usu_id)
        ON DELETE CASCADE
);


/*
-- --------------- --
PROCEDURES
obs: adicione o drop procedore antes de criar, para evitar erros de procedimento já existente
-- --------------- --
*/

-- procedures para criação de usuários
DROP PROCEDURE IF EXISTS proc_criar_usuario;

DELIMITER $$
CREATE PROCEDURE proc_criar_usuario (
    IN p_nome VARCHAR(128),
    IN p_email VARCHAR(128),
    IN p_senha VARCHAR(128),
    IN p_nascimento DATE,
    IN p_tipo ENUM("admin", "user")
)
BEGIN 
	DECLARE v_usu_id INT;
    IF 
        p_nome IS NULL 
     OR p_email IS NULL 
     OR p_senha IS NULL 
     OR p_nascimento IS NULL
    THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Todos os campos são obrigatórios';
    END IF;

    START TRANSACTION;

    INSERT INTO usuarios (
        usu_nome
       ,usu_nascimento
    )
    VALUES (
        p_nome
       ,p_nascimento
    );

    SET v_usu_id = LAST_INSERT_ID();

    INSERT INTO usuariosA (
        usu_id
       ,usu_email
       ,usu_password
       ,usu_tipo
    )
    VALUES (
        v_usu_id
       ,p_email
       ,p_senha
       ,COALESCE(p_tipo, 'user')
    );

    COMMIT;



END $$
DELIMITER ;


/*
-- --------------- --
INSERTS 
obs: coloque os inserts na ordem certa
-- --------------- --
*/

-- gera os inserts automaticos na tabela usuarios e usuariosA, para facilitar os testes
CALL proc_criar_usuario("José Manga","jose.manga@example.com","password123","2001-12-25","admin");
CALL proc_criar_usuario("Arnaldo Miguel da Silva","arnaldo.silva@example.com","password123","2000-04-01","user");
CALL proc_criar_usuario("Bruno Henrique dos Santos","bruno.santos@example.com","password123","1998-07-15","user");
CALL proc_criar_usuario("Camila Fernanda Oliveira","camila.oliveira@example.com","password123","2001-12-03","user");
CALL proc_criar_usuario("Diego Rafael Lima","diego.lima@example.com","password123","1995-09-27","user");
CALL proc_criar_usuario("Eduarda Cristina Mendes","eduarda.mendes@example.com","password123","1999-06-10","user");
CALL proc_criar_usuario("Fernando Augusto Pereira","fernando.pereira@example.com","password123","2002-02-18","user");
CALL proc_criar_usuario("Gabriela Nunes de Souza","gabriela.souza@example.com","password123","1997-11-22","user");
CALL proc_criar_usuario("Henrique Matheus Rocha","henrique.rocha@example.com","password123","2000-08-05","user");
CALL proc_criar_usuario("Isabela Vitória Cardoso","isabela.cardoso@example.com","password123","1996-05-30","user");
CALL proc_criar_usuario("John Doe2","john.doe2@example.com","password123","1990-01-01","user");

INSERT INTO 
	esp(esp_mac)
VALUES
	("00:14:22:01:23:45"), 
	("A2:B4:C6:D8:E0:F2"),  
    ("1A:2B:3C:4D:5E:6F"),   
    ("3E:7F:9A:BC:DE:F0"),  
    ("10:32:54:76:98:BA"),  
    ("5C:AF:3E:8D:91:02"),  
    ("D0:57:92:1B:3C:4E"),  
    ("FA:CE:12:34:56:78"),  
    ("7B:3D:5F:8A:92:AC"),  
    ("C4:D2:E1:F0:3B:9A")  
;


INSERT INTO 
	usuariosEsp( usu_id, esp_id)
VALUES
	(1,1),
	(2,2),
	(3,3),
	(4,4),
	(5,5),
	(6,6),
	(7,7),
	(8,8),
	(9,9),
	(10,10)
;

INSERT INTO 
    dados(use_id, dados_tipo, dados_valor, dados_generate)
VALUES
    (1, "temperatura", "36", "2024-06-01 08:00:00"),
    (1, "oxigenacao", "98", "2024-06-01 08:05:00"),
    (1, "bpm", "72", "2024-06-01 08:10:00"),
    (2, "temperatura", "37", "2024-06-01 09:00:00"),
    (2, "oxigenacao", "95", "2024-06-01 09:05:00"),
    (2, "bpm", "80", "2024-06-01 09:10:00"),
    (3, "temperatura", "36", "2024-06-01 10:00:00"),
    (3, "oxigenacao", "97", "2024-06-01 10:05:00"),
    (3, "bpm", "75", "2024-06-01 10:10:00"),
    (4, "temperatura", "38", "2024-06-01 11:00:00"),
    (4, "oxigenacao", "92", "2024-06-01 11:05:00"),
    (4, "bpm", "85", "2024-06-01 11:10:00"),
    (5, "temperatura", "36", "2024-06-01 12:00:00"),
    (5, "oxigenacao", "99", "2024-06-01 12:05:00"),
    (5, "bpm", "70", "2024-06-01 12:10:00"),
    (6, "temperatura", "37", "2024-06-01 13:00:00"),
    (6, "oxigenacao", "96", "2024-06-01 13:05:00"),
    (6, "bpm", "78", "2024-06-01 13:10:00"),
    (7, "temperatura", "36", "2024-06-01 14:00:00"),
    (7, "oxigenacao", "98", "2024-06-01 14:05:00"),
    (7, "bpm", "72", "2024-06-01 14:10:00"),
    (8, "temperatura", "38", "2024-06-01 15:00:00"),
    (8, "oxigenacao", "94", "2024-06-01 15:05:00"),
    (8, "bpm", "82", "2024-06-01 15:10:00"),
    (9, "temperatura", "36", "2024-06-01 16:00:00"),
    (9, "oxigenacao", "97", "2024-06-01 16:05:00"),
    (9, "bpm", "75", "2024-06-01 16:10:00"),
    (10, "temperatura", "37", "2024-06-01 17:00:00"),
    (10, "oxigenacao", "95", "2024-06-01 17:05:00"),
    (10, "bpm", "80", "2024-06-01 17:10:00"),
    (1, "temperatura", "36", "2024-06-02 08:00:00"),
    (1, "oxigenacao", "98", "2024-06-02 08:05:00"),
    (1, "bpm", "72", "2024-06-02 08:10:00"),
    (2, "temperatura", "37", "2024-06-02 09:00:00"),
    (2, "oxigenacao", "95", "2024-06-02 09:05:00"),
    (2, "bpm", "80", "2024-06-02 09:10:00"),
    (3, "temperatura", "36", "2024-06-02 10:00:00"),
    (3, "oxigenacao", "97", "2024-06-02 10:05:00"),
    (3, "bpm", "75", "2024-06-02 10:10:00"),
    (1, "temperatura", "38", "2024-06-02 11:00:00"),
    (1, "oxigenacao", "92", "2024-06-02 11:05:00"),
    (1, "bpm", "85", "2024-06-02 11:10:00")
;