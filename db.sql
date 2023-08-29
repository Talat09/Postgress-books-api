CREATE DATABASE bookDB

CREATE TABLE book(
id VARCHAR(255) PRIMARY KEY,
name VARCHAR(60),
description VARCHAR(500),
image VARCHAR(5000)
);
INSERT INTO book(id,name,description,image)
VALUES
(101,Dhonsho pahar, nice book,https://bdebooks.com/wp-content/uploads/2023/01/Dhongsho-Pahar-01.jpg);

database theak kono kichu read korar jnno:

SELECT *
FROM book;

database theak kono specific book get korar jnno

SELECT *
FROM book
WHERE id