-- procedures proc_ultimos_dados_usuarios busca os ultimos dados gerados de todos usuarios
DROP PROCEDURE IF EXISTS proc_ultimos_dados_usuarios;

DELIMITER $$
CREATE PROCEDURE proc_ultimos_dados_usuarios (
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

	SELECT usuarios.usu_id
          ,usu_nome
          ,usuarios.usu_id
          ,MAX(usuariosEsp.use_id) AS use_id
          ,(SELECT dados_valor 
            FROM dados 
            WHERE dados.use_id = MAX(usuariosEsp.use_id )
              AND dados.dados_tipo = "temperatura"
            ORDER BY dados.use_id,dados.dados_id DESC
            LIMIT 1
            )AS usu_temp
          ,(SELECT dados_valor 
            FROM dados 
            WHERE dados.use_id = MAX(usuariosEsp.use_id )
              AND dados.dados_tipo = "bpm"
            ORDER BY dados.use_id,dados.dados_id DESC
            LIMIT 1
            ) AS usu_bpm
          ,(SELECT dados_valor 
            FROM dados 
            WHERE dados.use_id = MAX(usuariosEsp.use_id )
              AND dados.dados_tipo = "oxigenacao"
            ORDER BY dados.use_id,dados.dados_id DESC
            LIMIT 1
            ) AS usu_oxi
    FROM usuarios
    LEFT JOIN usuariosEsp
    ON usuariosEsp.usu_id = usuarios.usu_id
    LEFT JOIN dados
    ON dados.use_id = usuariosEsp.use_id
    GROUP BY usuarios.usu_id;
END $$
DELIMITER ;

