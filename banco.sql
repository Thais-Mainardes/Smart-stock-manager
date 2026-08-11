-- ============================================
-- SMART STOCK MANAGER
-- Banco de Dados - Versão 1.0
-- ============================================

-- ============================================
-- 1. CRIAÇÃO DO BANCO
-- ============================================

CREATE DATABASE SmartStockManager;
GO

USE SmartStockManager;
GO


-- ============================================
-- 2. TABELA DE USUÁRIOS
-- ============================================

CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Profile VARCHAR(50) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO


-- ============================================
-- 3. TABELA DE CATEGORIAS
-- ============================================

CREATE TABLE Categories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO


-- ============================================
-- 4. TABELA DE FORNECEDORES
-- ============================================

CREATE TABLE Suppliers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(150) NOT NULL,
    CNPJ VARCHAR(18) NOT NULL UNIQUE,
    Email VARCHAR(150),
    Phone VARCHAR(20),
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO


-- ============================================
-- 5. TABELA DE PRODUTOS
-- ============================================

CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(150) NOT NULL,
    Description VARCHAR(255),
    Code VARCHAR(50) NOT NULL UNIQUE,
    CategoryId INT NOT NULL,
    SupplierId INT NOT NULL,
    MinimumStock INT NOT NULL DEFAULT 0,
    CurrentStock INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Products_Categories
        FOREIGN KEY (CategoryId)
        REFERENCES Categories(Id),

    CONSTRAINT FK_Products_Suppliers
        FOREIGN KEY (SupplierId)
        REFERENCES Suppliers(Id)
);
GO


-- ============================================
-- 6. TABELA DE MOVIMENTAÇÕES
-- ============================================

CREATE TABLE StockMovements (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    UserId INT NOT NULL,
    MovementType VARCHAR(20) NOT NULL,
    Quantity INT NOT NULL,
    MovementDate DATETIME DEFAULT GETDATE(),
    Description VARCHAR(255),

    CONSTRAINT FK_StockMovements_Products
        FOREIGN KEY (ProductId)
        REFERENCES Products(Id),

    CONSTRAINT FK_StockMovements_Users
        FOREIGN KEY (UserId)
        REFERENCES Users(Id),

    CONSTRAINT CK_StockMovements_MovementType
        CHECK (MovementType IN ('ENTRY', 'EXIT'))
);
GO


-- ============================================
-- 7. ÍNDICES
-- ============================================

CREATE INDEX IX_Products_CategoryId
ON Products(CategoryId);
GO

CREATE INDEX IX_Products_SupplierId
ON Products(SupplierId);
GO

CREATE INDEX IX_StockMovements_ProductId
ON StockMovements(ProductId);
GO

CREATE INDEX IX_StockMovements_UserId
ON StockMovements(UserId);
GO

CREATE INDEX IX_StockMovements_MovementDate
ON StockMovements(MovementDate);
GO