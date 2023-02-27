USE account_hub;

CREATE TABLE account (
    email               VARCHAR(320)        PRIMARY KEY,
    username            VARCHAR(16)         NOT NULL,
    hased_password      VARCHAR(320)        NOT NULL,
    created_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE history (
    identitfer          INT                 NOT NULL PRIMARY KEY,
    category            CHAR(1)             NOT NULL,
    title               VARCHAR(80)         NOT NULL,
    content             VARCHAR(320),
    created_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY email REFERENCES account (email) 
    PRIMARY KEY (identitfer)
);