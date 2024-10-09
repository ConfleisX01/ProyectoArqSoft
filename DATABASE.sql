DROP DATABASE IF EXISTS libros;
CREATE DATABASE libros;
USE libros;

CREATE TABLE users (
	id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100),
    user_password VARCHAR(8)
);

CREATE TABLE books (
	id_book INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    book_name VARCHAR(255),
    author VARCHAR(255),
    gender VARCHAR(255),
    book_status BOOL DEFAULT TRUE,
    book_route LONGTEXT
);

SELECT * FROM books;