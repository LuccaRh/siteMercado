CREATE DATABASE siteMercadoDB;


CREATE TABLE siteMercadoDB.dbo.ProdutosTB(
	IdProduto INT PRIMARY KEY IDENTITY,
	Nome VARCHAR(80) NOT NULL,
	ValorUnitário DECIMAL(6,2) CONSTRAINT NúmerosPositivosProdutos CHECK (ValorUnitário > 0),
	Unidade VARCHAR(50) NOT NULL,
	Quantidade SMALLINT,
	Imagem VARCHAR(100) NOT NULL
)
 

CREATE TABLE siteMercadoDB.dbo.UsuáriosTB(
	IdUsuário INT PRIMARY KEY IDENTITY,
	Email VARCHAR(120) NOT NULL UNIQUE,
	Nome VARCHAR(120) NOT NULL UNIQUE,
	Senha VARCHAR(150) NOT NULL,
	Salt VARCHAR(16) NOT NULL,
	Cargo VARCHAR(30) NOT NULL
)
SELECT * FROM siteMercadoDB.dbo.UsuáriosTB;

CREATE TABLE siteMercadoDB.dbo.EndereçosTB(
    IdEndereço INT PRIMARY KEY IDENTITY,
    IdUsuário INT FOREIGN KEY REFERENCES UsuáriosTB(IdUsuário),
	NomeEndereço NVARCHAR(50),
	Número SMALLINT,
    CEP NVARCHAR(10),
    Rua NVARCHAR(255),
	Bairro NVARCHAR(50),
    Cidade NVARCHAR(100),
    Estado NVARCHAR(50),
);
SELECT * FROM siteMercadoDB.dbo.EndereçosTB;

/*Ao excluir o usuário, também excluir todos seus endereços*/
ALTER TABLE EndereçosTB
ADD CONSTRAINT DeleteUsuário_DeleteEndereços
FOREIGN KEY (idUsuário)
REFERENCES UsuáriosTB (idUsuário)
ON DELETE CASCADE;

CREATE TABLE siteMercadoDB.dbo.PedidosTB(
    IdPedido INT PRIMARY KEY IDENTITY,
    IdUsuário INT FOREIGN KEY REFERENCES UsuáriosTB(IdUsuário) NOT NULL,
	IdEndereço INT FOREIGN KEY REFERENCES EndereçosTB(IdEndereço) NOT NULL,
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
	ValorUnitário DECIMAL(6,2) CONSTRAINT NúmerosPositivosDetalhePedido CHECK (ValorUnitário > 0),
);
SELECT * FROM siteMercadoDB.dbo.DetalhesPedidosTB;

