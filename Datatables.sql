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
DELETE FROM Usu�riosTB  WHERE idUsu�rio = 13;

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
    IdUsu�rio INT FOREIGN KEY REFERENCES Usu�riosTB(IdUsu�rio) ON DELETE NO ACTION,
	IdEndere�o INT FOREIGN KEY REFERENCES Endere�osTB(IdEndere�o) ON DELETE SET NULL,
    DataPedido DATETIME NOT NULL,
	ValorTotal DECIMAL(10,2) NOT NULL,
	Endere�oCompleto NVARCHAR(600),
	NomeUsu�rio NVARCHAR(120),
);
SELECT * FROM siteMercadoDB.dbo.PedidosTB;
/*Bloco begin end com um trigger dentro dele, para quando deletar um usu�rio, setar em PedidosTB como NULL seu id*/
BEGIN
    DECLARE @sql NVARCHAR(MAX);

    SET @sql = N'
    CREATE TRIGGER tr_Usuario_Deletado
    ON Usu�riosTB
    AFTER DELETE
    AS
    BEGIN
        SET NOCOUNT ON;

        -- Atualizar PedidosTB definindo IdUsu�rio como NULL
        UPDATE p
        SET p.IdUsu�rio = NULL
        FROM PedidosTB p
        INNER JOIN DELETED d ON p.IdUsu�rio = d.IdUsu�rio;
    END;
    ';

    EXEC sp_executesql @sql;
END




CREATE TABLE siteMercadoDB.dbo.DetalhesPedidosTB (
    idDetalhe INT PRIMARY KEY IDENTITY,
    idPedido INT FOREIGN KEY REFERENCES PedidosTB(IdPedido),
    idProduto INT FOREIGN KEY REFERENCES ProdutosTB(IdProduto),
    Quantidade INT NOT NULL,
	ValorUnit�rio DECIMAL(6,2) CONSTRAINT N�merosPositivosDetalhePedido CHECK (ValorUnit�rio > 0),
);
SELECT * FROM siteMercadoDB.dbo.DetalhesPedidosTB;
/*Ao excluir o pedidos, tamb�m excluir seus detalhes*/
ALTER TABLE DetalhesPedidosTB
ADD CONSTRAINT DeletePedidosTB_DeleteDetalhesPedidosTB
FOREIGN KEY (idPedido)
REFERENCES PedidosTB (idPedido)
ON DELETE CASCADE;