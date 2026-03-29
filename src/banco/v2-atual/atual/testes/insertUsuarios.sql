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