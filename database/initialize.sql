CREATE DATABASE account_hub;

USE account_hub;

CREATE TABLE account (
    username            VARCHAR(320)         PRIMARY KEY,
    passcode            VARCHAR(320)        NOT NULL,
    salt                VARCHAR(256)        NOT NULL,
    nobility            TINYINT             DEFAULT 1,
    state               CHAR(1)             DEFAULT 'N',
    created_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE history (
    identifier          INT                 NOT NULL AUTO_INCREMENT,
    category            CHAR(1)             NOT NULL,
    content             VARCHAR(80)         NOT NULL,
    username            VARCHAR(320)        NOT NULL,
    created_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES account (username) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (identifier)
);