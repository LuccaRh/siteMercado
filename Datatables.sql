CREATE DATABASE siteMercadoDB;

CREATE TABLE siteMercadoDB.dbo.ProdutosTB(
	IdProduto INT PRIMARY KEY IDENTITY,
	Nome VARCHAR(80) NOT NULL,
	Valor DECIMAL(6,2) CHECK (Valor > 0),
	Unidade VARCHAR(50) NOT NULL,
	Quantidade SMALLINT,
	Imagem VARCHAR(100) NOT NULL
) 

SELECT * FROM siteMercadoDB.dbo.ProdutosTB;

CREATE TABLE siteMercadoDB.dbo.UsuáriosTB(
	IdUsuário INT PRIMARY KEY IDENTITY,
	Email VARCHAR(120) NOT NULL UNIQUE,
	Nome VARCHAR(120) NOT NULL,
	Endereço VARCHAR(500),
	Cargo VARCHAR(70) NOT NULL
)

SELECT * FROM siteMercadoDB.dbo.UsuáriosTB;