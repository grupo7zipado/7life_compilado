-- Tablea adcionada da v1 para v2, para guardar os dados de autenticação dos usuários
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
)