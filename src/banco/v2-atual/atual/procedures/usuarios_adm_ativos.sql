-- procedures proc_usuarios_adm_ativos
DROP PROCEDURE IF EXISTS proc_usuarios_adm_ativos;

DELIMITER $$

CREATE PROCEDURE proc_usuarios_adm_ativos (
    IN p_usu_id INT,
    OUT _sucess TINYINT(1),
    OUT _message VARCHAR(256)
)
main:BEGIN 

    DECLARE _usu_tipo VARCHAR(255);
    DECLARE _usu_status TINYINT(1);
    
	SET _sucess = 0
       ,_message = '';
    IF p_usu_id IS NULL THEN
        SET _sucess = 0
           ,_message = 'Dados Invalidos';
        LEAVE main;
    END IF;
    
    SELECT usu_status, usu_tipo
    INTO _usu_status, _usu_tipo
    FROM usuariosA
    WHERE usu_id = p_usu_id;

    IF _usu_status IS NULL THEN
        SET _sucess = 0
           ,_message = 'Usuário não encontrado';
        LEAVE main;
    END IF;

    IF _usu_status = 0 THEN
        SET _sucess = 0
           ,_message = 'Usuário inativo';
        LEAVE main;
    END IF;
    
    IF _usu_tipo = 'admin' THEN
        SET _sucess = 1;
        LEAVE main;
    ELSE
        SET _sucess = 0
           ,_message = 'Sem permissão';
        LEAVE main;
    END IF;

END $$

DELIMITER;