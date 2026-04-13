-- procedures default
DROP PROCEDURE IF EXISTS proc_listar_dados_vitais_usuarios;

DELIMITER $$
CREATE PROCEDURE proc_listar_dados_vitais_usuarios (
	IN p_usu_id INT
)
main:BEGIN 
	
    DECLARE _sucess BOOLEAN DEFAULT TRUE;
    DECLARE _message VARCHAR(255) DEFAULT '';
    DECLARE _use_id INT DEFAULT 0;
    
    
    SELECT MAX(use_id) AS _use_id
    FROM usuariosEsp
    WHERE usu_id = p_usu_id;
    
    SELECT dados_id
    	  ,dado_tipo
          ,dados_tipo
          ,DATE_FORMAT(dados_generate,'%d/%m/%Y %H:%i:%s') AS dados_generate
	FROM dados
    WHERE use_id = _use_id
   	ORDER BY dados_generate;     
	   
END $$
DELIMITER ;