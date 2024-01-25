CREATE DATABASE siteMercadoDB;


CREATE TABLE siteMercadoDB.dbo.ProdutosTB(
	IdProduto INT PRIMARY KEY IDENTITY,
	Nome VARCHAR(80) NOT NULL,
	ValorUnit�rio DECIMAL(6,2) CONSTRAINT N�merosPositivosProdutos CHECK (ValorUnit�rio > 0),
	Unidade VARCHAR(50) NOT NULL,
	Quantidade SMALLINT,
	Imagem VARCHAR(100) NOT NULL
)
SELECT * FROM siteMercadoDB.dbo.ProdutosTB;


CREATE TABLE siteMercadoDB.dbo.Usu�riosTB(
	IdUsu�rio INT PRIMARY KEY IDENTITY,
	Email VARCHAR(120) NOT NULL UNIQUE,
	Nome VARCHAR(120) NOT NULL UNIQUE,
	Senha VARCHAR(150) NOT NULL,
	Salt VARCHAR(16) NOT NULL,
	Cargo VARCHAR(30) NOT NULL
)
SELECT * FROM siteMercadoDB.dbo.Usu�riosTB;

CREATE TABLE siteMercadoDB.dbo.Endere�osTB(
    IdEndere�o INT PRIMARY KEY IDENTITY,
    IdUsu�rio INT FOREIGN KEY REFERENCES Usu�riosTB(IdUsu�rio),
	N�mero SMALLINT,
    CEP NVARCHAR(10),
    Rua NVARCHAR(255),
	Bairro NVARCHAR(50),
    Cidade NVARCHAR(100),
    Estado NVARCHAR(50),
);
SELECT * FROM siteMercadoDB.dbo.Endere�osTB;


CREATE TABLE siteMercadoDB.dbo.PedidosTB(
    IdPedido INT PRIMARY KEY IDENTITY,
    IdUsu�rio INT FOREIGN KEY REFERENCES Usu�riosTB(IdUsu�rio),
	IdEndere�o INT FOREIGN KEY REFERENCES Endere�osTB(IdEndere�o),
    DataPedido DATETIME,
	ValorTotal DECIMAL(10,2),
);
SELECT * FROM siteMercadoDB.dbo.PedidosTB;


CREATE TABLE siteMercadoDB.dbo.DetalhesPedidosTB (
    idDetalhe INT PRIMARY KEY IDENTITY,
    idPedido INT FOREIGN KEY REFERENCES PedidosTB(IdPedido),
    idProduto INT FOREIGN KEY REFERENCES ProdutosTB(IdProduto),
    Quantidade INT,
	ValorUnit�rio DECIMAL(6,2) CONSTRAINT N�merosPositivosDetalhePedido CHECK (ValorUnit�rio > 0),
);
SELECT * FROM siteMercadoDB.dbo.DetalhesPedidosTB;