USE main;

CREATE TABLE account (
    email               VARCHAR(320)        PRIMARY KEY,
    passcode            VARCHAR(320)        NOT NULL,
    salt                VARCHAR(256)        NOT NULL,
    state               CHAR(1)             DEFAULT 'N',
    created_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE history (
    identifier          INT                 NOT NULL AUTO_INCREMENT,
    resource            VARCHAR(320)        NOT NULL,
    content             VARCHAR(320),
    email               VARCHAR(320)        NOT NULL,
    created_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES account (email) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (identifier)
);

CREATE TABLE privilege (
    identifier          SMALLINT            UNSIGNED,
    email               VARCHAR(320),
    created_at          TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES account (email) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (identifier, email)
)