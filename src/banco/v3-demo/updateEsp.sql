DROP TABLE IF EXISTS esps;
CREATE TABLE IF NOT EXISTS esps(
    esp_id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Id da tabela',
    esp_nome VARCHAR(64) NOT NULL COMMENT 'Nome amigavél do dispositivo',
    esp_chave VARCHAR(32) NOT NULL UNIQUE COMMENT 'Chave única para o sistema',
    esp_mac VARCHAR(17) COMMENT 'Mac do dispositivo',
    esp_modelo VARCHAR(64) COMMENT "Modelo do dispositivo",
    esp_codigo VARCHAR(128) UNIQUE 'Codigo unico do dispositivo',
    esp_online ENUM('on', 'off') DEFAULT 'off' COMMENT 'Se está conectado',
    esp_ultima_conexao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    esp_status INT NOT NULL DEFAULT 1 COMMENT '0 - Inativo, 1 - Cadastro Parcial, 2 - Cadastro Completo',
    esp_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Quando foi cadastrado'
);

/*
    esp_chip_id	        ID/chip único do ESP
    esp_ip              Último IP conectado
    esp_wifi_ssid       Rede conectada
    esp_bateria         Nível bateria (%)
    esp_sinal_wifi      RSSI

*/