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
main:BEGIN 
	DECLARE _usu_id INT;
    DECLARE _sucess BOOLEAN DEFAULT TRUE;
    DECLARE _message VARCHAR(255) DEFAULT '';
    IF 
        p_nome IS NULL 
     OR p_email IS NULL 
     OR p_senha IS NULL 
     OR p_nascimento IS NULL
    THEN
        SELECT 
            0 AS _sucess,
            'Dados Invalidos' AS _message;
        LEAVE main;
    END IF;
	
    IF EXISTS (
        SELECT 1 
        FROM usuariosA 
        WHERE usu_email = p_email
    ) THEN

        -- já existe
        SELECT 
            0 AS _sucess,
            'Email já cadastrado' AS _message;
        LEAVE main;
    ELSE
    
        START TRANSACTION;

        INSERT INTO usuarios (
            usu_nome
        ,usu_nascimento
        )
        VALUES (
            p_nome
        ,p_nascimento
        );

        SET _usu_id = LAST_INSERT_ID();

        INSERT INTO usuariosA (
            usu_id
        ,usu_email
        ,usu_password
        ,usu_tipo
        )
        VALUES (
            _usu_id
        ,p_email
        ,p_senha
        ,COALESCE(p_tipo, 'user')
        );
		SELECT _usu_id AS usu_id, 1 AS _sucess, 'Usuário criado com sucesso' AS _message;
        COMMIT;
	
    END IF;

END $$
DELIMITER ;