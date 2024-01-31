CREATE DATABASE siteMercadoDB;


CREATE TABLE siteMercadoDB.dbo.ProdutosTB(
	IdProduto INT PRIMARY KEY IDENTITY,
	Nome VARCHAR(80) NOT NULL,
	ValorUnit�rio DECIMAL(6,2) CONSTRAINT N�merosPositivosProdutos CHECK (ValorUnit�rio > 0),
	Unidade VARCHAR(50) NOT NULL,
	Quantidade SMALLINT,
	Imagem VARCHAR(100) NOT NULL
)
 

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
	NomeEndere�o NVARCHAR(50),
	N�mero SMALLINT,
    CEP NVARCHAR(10),
    Rua NVARCHAR(255),
	Bairro NVARCHAR(50),
    Cidade NVARCHAR(100),
    Estado NVARCHAR(50),
);
SELECT * FROM siteMercadoDB.dbo.Endere�osTB;

/*Ao excluir o usu�rio, tamb�m excluir todos seus endere�os*/
ALTER TABLE Endere�osTB
ADD CONSTRAINT DeleteUsu�rio_DeleteEndere�os
FOREIGN KEY (idUsu�rio)
REFERENCES Usu�riosTB (idUsu�rio)
ON DELETE CASCADE;

CREATE TABLE siteMercadoDB.dbo.PedidosTB(
    IdPedido INT PRIMARY KEY IDENTITY,
    IdUsu�rio INT FOREIGN KEY REFERENCES Usu�riosTB(IdUsu�rio) NOT NULL,
	IdEndere�o INT FOREIGN KEY REFERENCES Endere�osTB(IdEndere�o) NOT NULL,
    DataPedido DATETIME NOT NULL,
	ValorTotal DECIMAL(10,2) NOT NULL,
);

SELECT * FROM siteMercadoDB.dbo.PedidosTB;
DELETE FROM PedidosTB WHERE ValorTotal = 0.61;



CREATE TABLE siteMercadoDB.dbo.DetalhesPedidosTB (
    idDetalhe INT PRIMARY KEY IDENTITY,
    idPedido INT FOREIGN KEY REFERENCES PedidosTB(IdPedido) NOT NULL,
    idProduto INT FOREIGN KEY REFERENCES ProdutosTB(IdProduto) NOT NULL,
    Quantidade INT NOT NULL,
	ValorUnit�rio DECIMAL(6,2) CONSTRAINT N�merosPositivosDetalhePedido CHECK (ValorUnit�rio > 0),
);
SELECT * FROM siteMercadoDB.dbo.DetalhesPedidosTB;

