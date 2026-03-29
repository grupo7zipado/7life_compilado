-- Script para atualizar da v1 do banco para v2.

DROP TABLE IF EXISTS usuariosA;
CREATE TABLE IF NOT EXISTS usuariosA(
    usu_id INT PRIMARY KEY NOT NULL,
    usu_email VARCHAR(128) NOT NULL UNIQUE,
    usu_password VARCHAR(128) NOT NULL,
    usu_tipo ENUM("admin", "user") NOT NULL DEFAULT "user",
    usu_status BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (usu_id) 
        REFERENCES usuarios(usu_id)
        ON DELETE CASCADE
);
INSERT INTO usuariosA (
    usu_id
   ,usu_email
   ,usu_password
)
SELECT 
    u.usu_id
   ,COALESCE(ua.usu_email, CONCAT("teste", u.usu_id, "@teste.com")) AS usu_email
   ,u.usu_id AS usu_password
FROM usuarios u
LEFT JOIN usuariosA ua 
    ON ua.usu_id = u.usu_id
WHERE ua.usu_id IS NULL;