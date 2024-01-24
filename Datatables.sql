CREATE DATABASE siteMercadoDB;


CREATE TABLE ProdutosTB(
	IdProduto INT PRIMARY KEY IDENTITY,
	Nome VARCHAR(80) NOT NULL,
	ValorUnit�rio DECIMAL(6,2) CONSTRAINT N�merosPositivosProdutos CHECK (ValorUnit�rio > 0),
	Unidade VARCHAR(50) NOT NULL,
	Quantidade SMALLINT,
	Imagem VARCHAR(100) NOT NULL
)
SELECT * FROM ProdutosTB;


CREATE TABLE Usu�riosTB(
	IdUsu�rio INT PRIMARY KEY IDENTITY,
	Email VARCHAR(120) NOT NULL UNIQUE,
	Nome VARCHAR(120) NOT NULL,
	Senha VARCHAR(150) NOT NULL,
	Salt VARCHAR(16) NOT NULL,
	Cargo VARCHAR(30) NOT NULL
)
SELECT * FROM Usu�riosTB;


CREATE TABLE Endere�osTB(
    IdEndere�o INT PRIMARY KEY IDENTITY,
    IdUsu�rio INT FOREIGN KEY REFERENCES Usu�riosTB(IdUsu�rio),
	N�mero SMALLINT,
    CEP NVARCHAR(10),
    Rua NVARCHAR(255),
	Bairro NVARCHAR(50),
    Cidade NVARCHAR(100),
    Estado NVARCHAR(50),
);
SELECT * FROM Endere�osTB;


CREATE TABLE PedidosTB(
    IdPedido INT PRIMARY KEY IDENTITY,
    IdUsu�rio INT FOREIGN KEY REFERENCES Usu�riosTB(IdUsu�rio),
	IdEndere�o INT FOREIGN KEY REFERENCES Endere�osTB(IdEndere�o),
    DataPedido DATETIME,
	ValorTotal DECIMAL(10,2),
);
SELECT * FROM PedidosTB;


CREATE TABLE DetalhesPedidosTB (
    idDetalhe INT PRIMARY KEY IDENTITY,
    idPedido INT FOREIGN KEY REFERENCES PedidosTB(IdPedido),
    idProduto INT FOREIGN KEY REFERENCES ProdutosTB(IdProduto),
    Quantidade INT,
	ValorUnit�rio DECIMAL(6,2) CONSTRAINT N�merosPositivosDetalhePedido CHECK (ValorUnit�rio > 0),
);
SELECT * FROM DetalhesPedidosTB;