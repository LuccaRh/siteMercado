CREATE DATABASE siteMercadoDB;


CREATE TABLE ProdutosTB(
	IdProduto INT PRIMARY KEY IDENTITY,
	Nome VARCHAR(80) NOT NULL,
	ValorUnitário DECIMAL(6,2) CONSTRAINT NúmerosPositivosProdutos CHECK (ValorUnitário > 0),
	Unidade VARCHAR(50) NOT NULL,
	Quantidade SMALLINT,
	Imagem VARCHAR(100) NOT NULL
)
SELECT * FROM ProdutosTB;


CREATE TABLE UsuáriosTB(
	IdUsuário INT PRIMARY KEY IDENTITY,
	Email VARCHAR(120) NOT NULL UNIQUE,
	Nome VARCHAR(120) NOT NULL,
	Senha VARCHAR(150) NOT NULL,
	Salt VARCHAR(16) NOT NULL,
	Cargo VARCHAR(30) NOT NULL
)
SELECT * FROM UsuáriosTB;


CREATE TABLE EndereçosTB(
    IdEndereço INT PRIMARY KEY IDENTITY,
    IdUsuário INT FOREIGN KEY REFERENCES UsuáriosTB(IdUsuário),
	Número SMALLINT,
    CEP NVARCHAR(10),
    Rua NVARCHAR(255),
	Bairro NVARCHAR(50),
    Cidade NVARCHAR(100),
    Estado NVARCHAR(50),
);
SELECT * FROM EndereçosTB;


CREATE TABLE PedidosTB(
    IdPedido INT PRIMARY KEY IDENTITY,
    IdUsuário INT FOREIGN KEY REFERENCES UsuáriosTB(IdUsuário),
	IdEndereço INT FOREIGN KEY REFERENCES EndereçosTB(IdEndereço),
    DataPedido DATETIME,
	ValorTotal DECIMAL(10,2),
);
SELECT * FROM PedidosTB;


CREATE TABLE DetalhesPedidosTB (
    idDetalhe INT PRIMARY KEY IDENTITY,
    idPedido INT FOREIGN KEY REFERENCES PedidosTB(IdPedido),
    idProduto INT FOREIGN KEY REFERENCES ProdutosTB(IdProduto),
    Quantidade INT,
	ValorUnitário DECIMAL(6,2) CONSTRAINT NúmerosPositivosDetalhePedido CHECK (ValorUnitário > 0),
);
SELECT * FROM DetalhesPedidosTB;