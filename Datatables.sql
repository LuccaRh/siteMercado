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
DELETE FROM UsuáriosTB  WHERE idUsuário = 13;

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
    IdUsuário INT FOREIGN KEY REFERENCES UsuáriosTB(IdUsuário) ON DELETE NO ACTION,
	IdEndereço INT FOREIGN KEY REFERENCES EndereçosTB(IdEndereço) ON DELETE SET NULL,
    DataPedido DATETIME NOT NULL,
	ValorTotal DECIMAL(10,2) NOT NULL,
	EndereçoCompleto NVARCHAR(600),
	NomeUsuário NVARCHAR(120),
);
SELECT * FROM siteMercadoDB.dbo.PedidosTB;
/*Bloco begin end com um trigger dentro dele, para quando deletar um usuário, setar em PedidosTB como NULL seu id*/
BEGIN
    DECLARE @sql NVARCHAR(MAX);

    SET @sql = N'
    CREATE TRIGGER tr_Usuario_Deletado
    ON UsuáriosTB
    AFTER DELETE
    AS
    BEGIN
        SET NOCOUNT ON;

        -- Atualizar PedidosTB definindo IdUsuário como NULL
        UPDATE p
        SET p.IdUsuário = NULL
        FROM PedidosTB p
        INNER JOIN DELETED d ON p.IdUsuário = d.IdUsuário;
    END;
    ';

    EXEC sp_executesql @sql;
END




CREATE TABLE siteMercadoDB.dbo.DetalhesPedidosTB (
    idDetalhe INT PRIMARY KEY IDENTITY,
    idPedido INT FOREIGN KEY REFERENCES PedidosTB(IdPedido),
    idProduto INT FOREIGN KEY REFERENCES ProdutosTB(IdProduto),
    Quantidade INT NOT NULL,
	ValorUnitário DECIMAL(6,2) CONSTRAINT NúmerosPositivosDetalhePedido CHECK (ValorUnitário > 0),
);
SELECT * FROM siteMercadoDB.dbo.DetalhesPedidosTB;
/*Ao excluir o pedidos, também excluir seus detalhes*/
ALTER TABLE DetalhesPedidosTB
ADD CONSTRAINT DeletePedidosTB_DeleteDetalhesPedidosTB
FOREIGN KEY (idPedido)
REFERENCES PedidosTB (idPedido)
ON DELETE CASCADE;