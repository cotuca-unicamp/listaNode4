create schema node

create table node.clients (
	id int identity(1,1) not null,
	prenome varchar(15) not null,
	sobrenome varchar(40) not null,
	dataNasc date not null,
	email varchar(60) not null,
	cpf varchar(11) not null,
	primary key(id)
)

insert into node.clients values
	('Roberto', 'Alves', '2000-05-18', 'robertinhovels@gmail.com', '12345678910'),
    ('Monica', 'Ferraz', '1990-12-04', 'ferraz@ig.com.br', '11111111111'),
    ('Beatriz', 'Segal', '1990-10-25', 'bsegal@cotuca.br', '22222222222'),
    ('Luciana', 'Silva', '2000-03-03', 'luvaz@ig.com.br', '33333333333'),
    ('Anderson', 'Nascimento', '1980-08-19', 'nasc@ig.com.br', '66666666666')

select * from node.clients