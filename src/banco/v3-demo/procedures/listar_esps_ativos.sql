-- procedures default
DROP PROCEDURE IF EXISTS proc_listar_esps_ativos;

DELIMITER $$
CREATE PROCEDURE proc_listar_esps_ativos (
    IN p_usu_id INT
)
main:BEGIN 
    DECLARE _sucess TINYINT(1);
    DECLARE _message VARCHAR(255);

	SET _sucess = 0
       ,_message = '';
    
    CALL proc_usuarios_adm_ativos(p_usu_id, _sucess, _message);

    IF _sucess = 0 THEN
    	SELECT _sucess
              ,_message;
    	LEAVE main;
    END IF;

    SELECT esp_nome, esp_codigo, esp_mac FROM esps WHERE esp_status = 'ativo';
    LEAVE main;

END $$
DELIMITER ;