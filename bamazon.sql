drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products(
	item_id integer(11) auto_increment not null,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price integer(10) not null,
    stock_quantity integer(10),
    primary key(item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ('hat','clothing',5,200);

insert into products (product_name, department_name, price, stock_quantity)
values ('soccer ball','sports',12,144);

insert into products (product_name, department_name, price, stock_quantity)
values ('shirt','clothing',10,221);

insert into products (product_name, department_name, price, stock_quantity)
values ('avocado','produce',2,29);

select * from products; 