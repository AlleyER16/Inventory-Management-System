CREATE TABLE Products(
	ProductID INT PRIMARY KEY AUTO_INCREMENT,
	ProductName VARCHAR(200) NOT NULL,
	SoldInStocks ENUM("0", "1") NOT NULL,
	ProductPrice FLOAT NULL,
	Stock INT NULL,
	ProductImage TEXT NULL,
	RecordTimestamp INT NOT NULL
);

CREATE TABLE SalesPersons(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	FirstName VARCHAR(100) NOT NULL,
	LastName VARCHAR(100) NOT NULL,
	Gender ENUM("Male", "Female") NOT NULL,
	Picture TEXT NULL,
	Username VARCHAR(50) NOT NULL,
	Password VARCHAR(100) NOT NULL,
	RecordTimestamp INT NOT NULL
);

CREATE TABLE Customers(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	FirstName VARCHAR(100) NULL,
	LastName VARCHAR(100) NULL,
	Gender ENUM("Male", "Female") NOT NULL,
	EmailAddress VARCHAR(200) NULL,
	Timestamp INT NOT NULL
);

CREATE TABLE Transactions(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	SalesPerson INT NOT NULL,
	PaymentType ENUM("Cash", "POS") NOT NULL,
	ProofOfPayment TEXT NULL,
	Customer INT NOT NULL,
	Amount FLOAT NULL,
	TransactionTimestamp INT NOT NULL,
	FOREIGN KEY (SalesPerson) REFERENCES SalesPersons(ID),
	FOREIGN KEY (Customer) REFERENCES Customers(ID)
);

CREATE TABLE TransactionsProducts(
	Transaction INT NOT NULL,
	Product INT NOT NULL,
	Quantity INT NULL,
	UnitPrice FLOAT NULL,
	Amount FLOAT NOT NULL,
	FOREIGN KEY (Transaction) REFERENCES Transactions(ID),
	FOREIGN KEY (Product) REFERENCES Products(ProductID),
	PRIMARY KEY (Transaction, Product)
);

CREATE TABLE SalesPersonsSessions(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	SalesPerson INT NOT NULL,
	LoginTime INT NOT NULL,
	LogoutTime INT NULL,
	FOREIGN KEY (SalesPerson) REFERENCES SalesPersons(ID)
);