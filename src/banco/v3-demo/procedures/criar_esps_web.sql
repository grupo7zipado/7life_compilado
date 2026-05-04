-- procedures para primeiro cadastro do esp
DROP PROCEDURE IF EXISTS proc_cadastro_esps_web;

DELIMITER $$
CREATE PROCEDURE proc_cadastro_esps_web (
    IN p_nome VARCHAR(64),
    IN p_chave VARCHAR(32)
)
main:BEGIN 
    DECLARE _sucess BOOLEAN DEFAULT TRUE;
    DECLARE _message VARCHAR(255) DEFAULT '';
    IF 
        p_nome IS NULL 
     OR p_chave IS NULL 
    THEN
        SELECT 
            0 AS _sucess,
            'Dados Invalidos' AS _message;
        LEAVE main;
    END IF;
	
    IF EXISTS (
        SELECT 1 
        FROM esps 
        WHERE esp_chave = p_chave
    ) THEN

        -- já existe
        SELECT 
            0 AS _sucess,
            'Chave já cadastrada' AS _message;
        LEAVE main;
    ELSE
    
        START TRANSACTION;
        BEGIN

            DECLARE EXIT HANDLER FOR SQLEXCEPTION
            BEGIN
                SELECT 
                    0 AS _sucess,
                    'Erro não indentificado' AS _message;
                ROLLBACK;
            END;

            INSERT INTO esps( esp_nome, esp_chave, esp_online)
            VALUES( p_nome, p_chave, 'on');
            
            SELECT 
                1 AS _sucess, 
                'Esp criado com sucesso' AS _message;
            COMMIT;

        END;
	
    END IF;

END $$
DELIMITER ;