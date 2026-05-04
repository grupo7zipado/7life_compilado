-- procedures para login de usuários
DROP PROCEDURE IF EXISTS proc_login;

DELIMITER $$
CREATE PROCEDURE proc_login (
    IN p_email VARCHAR(128)
)
main:BEGIN 
    
    DECLARE _sucess BOOLEAN DEFAULT TRUE;
    DECLARE _message VARCHAR(255) DEFAULT '';

    DECLARE v_status TINYINT DEFAULT NULL;

    -- verifica se o email é nulo
    IF 
		p_email IS NULL 
    THEN
        SELECT 
            0 AS _sucess,
            'Dados Invalidos' AS _message;
        LEAVE main;
    END IF;

    -- verifica se o email existe
    SELECT usu_status
    INTO v_status
    FROM usuariosA 
    WHERE usu_email = p_email
    LIMIT 1;
    
    IF v_status IS NOT NULL THEN
        -- caso usuário esteja inativo
        IF v_status = 0 THEN
            SELECT 
                0 AS _sucess,
                'Usuário inativo' AS _message;
            LEAVE main;
        END IF;
        
        -- faz o login
        SELECT 
            1 AS _sucess,
            _message,
            u.usu_id,
            u.usu_nome,
            u.usu_nascimento,
            ua.usu_email,
            ua.usu_password,
            ua.usu_tipo,
            ua.usu_status
        FROM usuariosA ua
        INNER JOIN usuarios u
            ON u.usu_id = ua.usu_id 
        WHERE ua.usu_email = p_email;

    ELSE
        SELECT 
            0 AS _sucess,
            'Email não encontrado' AS _message;
            LEAVE main;

    END IF;

END $$
DELIMITER ;