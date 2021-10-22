create table users(
id int AUTO_INCREMENT,
name varchar(50),
phone varchar(10),
balance decimal,
points decimal,
OTPkey varchar(8),
PRIMARY KEY (id)
);
create table contacts(
id int AUTO_INCREMENT,
name varchar(50),
phone varchar(10),
savedname varchar(50),
userID int,
PRIMARY KEY(id),
FOREIGN KEY (userID) REFERENCES users(id)
);
create table transacts(
id varchar(10) not null,
createddate date,
createdtime time,
total decimal,
cashback decimal,
status varchar(10) DEFAULT 'PENDING',
phone varchar(10),
userID int,
PRIMARY KEY(id),
FOREIGN KEY(userID) REFERENCES users(id)
);



