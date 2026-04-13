-- procedures proc_usuarios_adm_ativos
DROP PROCEDURE IF EXISTS proc_usuarios_adm_ativos;

DELIMITER $$

CREATE PROCEDURE proc_usuarios_adm_ativos (
    IN p_usu_id INT
)
main:BEGIN 
    
    DECLARE _sucess BOOLEAN DEFAULT TRUE;
    DECLARE _message VARCHAR(255) DEFAULT '';
    DECLARE _usu_tipo VARCHAR(255);
    DECLARE _usu_status TINYINT(1);
    
    IF p_usu_id IS NULL THEN
        SELECT 
            0 AS _sucess,
            'Dados Invalidos' AS _message;
        LEAVE main;
    END IF;
    
    SELECT usu_status, usu_tipo
    INTO _usu_status, _usu_tipo
    FROM usuariosA
    WHERE usu_id = p_usu_id;

    IF _usu_status IS NULL THEN
        SELECT 
            0 AS _sucess,
            'Usuário não encontrado' AS _message;
        LEAVE main;
    END IF;

    IF _usu_status = 0 THEN
        SELECT 
            0 AS _sucess,
            'Usuário inativo' AS _message;
        LEAVE main;
    END IF;
    
    IF _usu_tipo = 'admin' THEN
        SELECT 
            _sucess,
            _message;
    ELSE
        SELECT 
            0 AS _sucess,
            'Sem permissão' AS _message;
    END IF;

END $$

DELIMITER ;