CREATE DATABASE account_hub;

USE account_hub;

CREATE TABLE account (
    email               VARCHAR(320)        PRIMARY KEY,
    username            VARCHAR(16)         NOT NULL,
    hashed_password     VARCHAR(320)        NOT NULL,
    privilege_level     TINYINT             DEFAULT 1,
    use_status          CHAR(1)             NOT NULL,
    created_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE history (
    identitfer          INT                 NOT NULL AUTO_INCREMENT,
    category            CHAR(1)             NOT NULL,
    content             VARCHAR(80)         NOT NULL,
    note                VARCHAR(320),
    created_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY email REFERENCES account (email) 
    PRIMARY KEY (identitfer)
);