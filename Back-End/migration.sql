DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id serial NOT NULL,
    title VARCHAR(50),
    author VARCHAR(50),
    cover TEXT,
    isbn BIGINT,
    price MONEY,
    PRIMARY KEY (id)
);