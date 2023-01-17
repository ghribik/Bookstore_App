CREATE TABLE IF NOT EXISTS books (
    id serial NOT NULL,
    title VARCHAR(50),
    author VARCHAR(50),
    cover TEXT,
    isbn BIGINT,
    price MONEY,
    PRIMARY KEY (id)
);