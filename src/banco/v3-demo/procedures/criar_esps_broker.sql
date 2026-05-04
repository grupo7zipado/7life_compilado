-- procedures para segundo cadastro do esp
DROP PROCEDURE IF EXISTS proc_cadastro_esps_broker;

DELIMITER $$
CREATE PROCEDURE proc_cadastro_esps_broker (
    IN p_chave VARCHAR(32),
    IN p_mac VARCHAR(17),
    IN p_modelo VARCHAR(64)
)
main:BEGIN 
	DECLARE _esp_id INT;
    DECLARE _sucess BOOLEAN DEFAULT TRUE;
    DECLARE _message VARCHAR(255) DEFAULT '';

    IF 
        p_chave  IS NULL 
     OR p_mac    IS NULL
     OR p_modelo IS NULL
    THEN
        SELECT 
            0 AS _sucess,
            'Dados Invalidos' AS _message;
        LEAVE main;
    END IF;

    SELECT esp_id INTO _esp_id
    FROM esps
    WHERE esp_chave = p_chave
    LIMIT 1;

    IF _esp_id IS NOT NULL 
    THEN
        START TRANSACTION;
        BEGIN

            DECLARE EXIT HANDLER FOR SQLEXCEPTION
            BEGIN
                SELECT 
                    0 AS _sucess,
                    'Erro não indentificado' AS _message;
                ROLLBACK;
            END;

            UPDATE esps
            SET esp_mac            = p_mac,
                esp_modelo         = p_modelo,
                esp_status         = 2,
                esp_online         = 'on',
                esp_ultima_conexao = CURRENT_TIMESTAMP
            WHERE esp_id = _esp_id;
            
            COMMIT;

            SELECT 
                1 AS _sucess, 
                'Cadastro de esp finalizado com sucesso' AS _message;
            LEAVE main;
        END;
    END IF;
END $$
DELIMITER ;