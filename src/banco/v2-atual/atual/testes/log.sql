DELIMITER $$

CREATE PROCEDURE criar_usuario (
    IN p_nome VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_senha VARCHAR(100)
)
BEGIN
    DECLARE v_usu_id INT;

    START TRANSACTION;

    -- Inserir na tabela principal
    INSERT INTO usuarios (nome, email, senha)
    VALUES (p_nome, p_email, p_senha);

    -- Pegar o ID gerado
    SET v_usu_id = LAST_INSERT_ID();

    -- Inserir na tabela relacionada
    INSERT INTO usuariosA (usu_id)
    VALUES (v_usu_id);

    COMMIT;
END$$

DELIMITER ;





DELIMITER $$

CREATE PROCEDURE criar_usuario (
    IN p_nome VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_senha VARCHAR(100)
)
BEGIN
    DECLARE v_usu_id INT;

    -- Se der erro, faz rollback
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO usuarios (nome, email, senha)
    VALUES (p_nome, p_email, p_senha);

    SET v_usu_id = LAST_INSERT_ID();

    INSERT INTO usuariosA (usu_id)
    VALUES (v_usu_id);

    COMMIT;
END$$

DELIMITER ;