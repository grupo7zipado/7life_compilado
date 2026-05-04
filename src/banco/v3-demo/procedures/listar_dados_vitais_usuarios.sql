-- procedures proc_listar_dados_vitais_usuarios lista os dados vitais de um usuário especifico
DROP PROCEDURE IF EXISTS proc_listar_dados_vitais_usuarios;

DELIMITER $$
CREATE PROCEDURE proc_listar_dados_vitais_usuarios (
	IN p_usu_id INT
)
main:BEGIN 
	
    DECLARE _sucess TINYINT(1);
    DECLARE _message VARCHAR(255);
    DECLARE _use_id INT;
    DECLARE _usu_id INT;
    
    SET _sucess = 0
       ,_message = '';
    IF p_usu_id IS NULL THEN
        SELECT 0 AS _sucess
              ,'Dados Invalidos' AS _message ;
        LEAVE main;
    END IF;
    
    SELECT usu_id
    INTO _usu_id
    FROM usuarios
    WHERE usu_id = p_usu_id;

    IF _usu_id IS NULL THEN
        SELECT 0 AS _sucess
              ,'Usuário inexistente' AS _message;
        LEAVE main;
    END IF;

    SELECT MAX(use_id)
    INTO _use_id
    FROM usuariosEsp
    WHERE usu_id = p_usu_id;
    
    IF _use_id IS NULL THEN
        SELECT 0 AS _sucess
              ,'Usuário não associado' AS _message;
        LEAVE main;
    END IF;

    SELECT dados_id
    	  ,dados_tipo
          ,dados_valor
          ,DATE_FORMAT(dados_generate,'%d/%m/%Y %H:%i:%s') AS dados_generate
	FROM dados
    WHERE use_id = _use_id
   	ORDER BY dados_generate;     
	   
END $$
DELIMITER ;