DROP TABLE IF EXISTS eventos;
CREATE TABLE IF NOT EXISTS eventos(
    eve_id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Id da Tabela',
    eve_tipo VARCHAR(16) NOT NULL COMMENT 'Tipo do Evento',
    eve_mensagem VARCHAR(128) NOT NULL COMMENT 'Descrição do Erro Completa',
    eve_nivel ENUM('aviso', 'perigo', 'erro', 'queda_esp', 'queda_sistema', 'sem_nivel_definido') NOT NULL DEFAULT 'sem_nivel_definido' COMMENT 'clasifica o nivel do problema',
    eve_origem ENUM('esp', 'web', 'api', 'broker', 'sem_origem_definida') DEFAULT 'sem_origem_definida' COMMENT 'De Onde Veio o Erro: Esp, Web, Api ou Broker',
    eve_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);