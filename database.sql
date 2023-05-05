CREATE DATABASE MARK;
USE MARK;

create table Categorias(
	cat_id int auto_increment not null,
    cat_name varchar(50),
    PRIMARY KEY (cat_id)
);

create table Paises(
	country_id int auto_increment not null,
    country_name varchar(50) not null,
    PRIMARY KEY (country_id)
);

create table Marcas (
	brand_id int auto_increment not null,
    brand_name varchar(50) not null,
    brand_desc varchar(300),
    country_id int not null,
    PRIMARY KEY (brand_id),
    FOREIGN KEY (country_id) REFERENCES Paises(country_id)
);

create table Productos (
	product_id int auto_increment not null,   
    cat_id int not null,
    brand_id int not null,
    product_name varchar(50) not null,
    product_desc varchar(300),
    product_price smallint,
    PRIMARY KEY (product_id),
    FOREIGN KEY (brand_id) REFERENCES Marcas(brand_id),
    FOREIGN KEY (cat_id) REFERENCES Categorias(cat_id)
);