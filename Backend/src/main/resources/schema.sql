CREATE DATABASE FitScan;

USE FitScan;

CREATE TABLE metaScan (
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          nome VARCHAR(100) NOT NULL,
                          dataNascimento DATE NOT NULL,
                          pesoAtual DOUBLE NOT NULL,
                          altura DOUBLE NOT NULL,
                          objetivo VARCHAR(30) NOT NULL
);