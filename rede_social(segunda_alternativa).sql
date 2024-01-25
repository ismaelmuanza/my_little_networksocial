-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 14-Abr-2023 às 01:43
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `rede_social`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `chats`
--

CREATE TABLE `chats` (
  `id_chat` int(11) NOT NULL,
  `mensagem` varchar(255) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `numero_sala` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `id_comentario` int(11) NOT NULL,
  `comentario` varchar(100) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_postagem` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupos`
--

CREATE TABLE `grupos` (
  `id_grupo` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `criador` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo_comentarios`
--

CREATE TABLE `grupo_comentarios` (
  `id_grupo_comentario` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_grupo_postagem` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo_participantes`
--

CREATE TABLE `grupo_participantes` (
  `id_grupo_participante` int(11) NOT NULL,
  `participante` int(11) NOT NULL,
  `numero_grupo` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo_postagens`
--

CREATE TABLE `grupo_postagens` (
  `id_grupo_postagem` int(11) NOT NULL,
  `postagem` text NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `numero_grupo` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `mensagens`
--

CREATE TABLE `mensagens` (
  `id_mensagem` int(11) NOT NULL,
  `mensagem` varchar(100) NOT NULL,
  `id_emissor` int(11) NOT NULL,
  `id_recetor` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `participantes`
--

CREATE TABLE `participantes` (
  `id_participante` int(11) NOT NULL,
  `participante` int(11) NOT NULL,
  `numero_sala` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens`
--

CREATE TABLE `postagens` (
  `id_postagem` int(11) NOT NULL,
  `postagem` varchar(100) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `sala_chat`
--

CREATE TABLE `sala_chat` (
  `id_sala_chat` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `criador` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `sobrenome` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `telefone` int(11) DEFAULT 0,
  `data` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `numero_sala` (`numero_sala`);

--
-- Índices para tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_postagem` (`id_postagem`);

--
-- Índices para tabela `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`id_grupo`),
  ADD KEY `criador` (`criador`);

--
-- Índices para tabela `grupo_comentarios`
--
ALTER TABLE `grupo_comentarios`
  ADD PRIMARY KEY (`id_grupo_comentario`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_grupo_postagem` (`id_grupo_postagem`);

--
-- Índices para tabela `grupo_participantes`
--
ALTER TABLE `grupo_participantes`
  ADD PRIMARY KEY (`id_grupo_participante`),
  ADD KEY `participante` (`participante`),
  ADD KEY `numero_grupo` (`numero_grupo`);

--
-- Índices para tabela `grupo_postagens`
--
ALTER TABLE `grupo_postagens`
  ADD PRIMARY KEY (`id_grupo_postagem`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `numero_grupo` (`numero_grupo`);

--
-- Índices para tabela `mensagens`
--
ALTER TABLE `mensagens`
  ADD PRIMARY KEY (`id_mensagem`),
  ADD KEY `id_emissor` (`id_emissor`),
  ADD KEY `id_recetor` (`id_recetor`);

--
-- Índices para tabela `participantes`
--
ALTER TABLE `participantes`
  ADD PRIMARY KEY (`id_participante`),
  ADD KEY `participante` (`participante`),
  ADD KEY `numero_sala` (`numero_sala`);

--
-- Índices para tabela `postagens`
--
ALTER TABLE `postagens`
  ADD PRIMARY KEY (`id_postagem`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices para tabela `sala_chat`
--
ALTER TABLE `sala_chat`
  ADD PRIMARY KEY (`id_sala_chat`),
  ADD KEY `criador` (`criador`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `chats`
--
ALTER TABLE `chats`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `grupos`
--
ALTER TABLE `grupos`
  MODIFY `id_grupo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `grupo_comentarios`
--
ALTER TABLE `grupo_comentarios`
  MODIFY `id_grupo_comentario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `grupo_participantes`
--
ALTER TABLE `grupo_participantes`
  MODIFY `id_grupo_participante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `grupo_postagens`
--
ALTER TABLE `grupo_postagens`
  MODIFY `id_grupo_postagem` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `mensagens`
--
ALTER TABLE `mensagens`
  MODIFY `id_mensagem` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `participantes`
--
ALTER TABLE `participantes`
  MODIFY `id_participante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `postagens`
--
ALTER TABLE `postagens`
  MODIFY `id_postagem` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sala_chat`
--
ALTER TABLE `sala_chat`
  MODIFY `id_sala_chat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`numero_sala`) REFERENCES `sala_chat` (`id_sala_chat`);

--
-- Limitadores para a tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`id_postagem`) REFERENCES `postagens` (`id_postagem`);

--
-- Limitadores para a tabela `grupos`
--
ALTER TABLE `grupos`
  ADD CONSTRAINT `grupos_ibfk_1` FOREIGN KEY (`criador`) REFERENCES `usuarios` (`id_usuario`);

--
-- Limitadores para a tabela `grupo_comentarios`
--
ALTER TABLE `grupo_comentarios`
  ADD CONSTRAINT `grupo_comentarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `grupo_comentarios_ibfk_2` FOREIGN KEY (`id_grupo_postagem`) REFERENCES `grupo_postagens` (`id_grupo_postagem`);

--
-- Limitadores para a tabela `grupo_participantes`
--
ALTER TABLE `grupo_participantes`
  ADD CONSTRAINT `grupo_participantes_ibfk_1` FOREIGN KEY (`participante`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `grupo_participantes_ibfk_2` FOREIGN KEY (`numero_grupo`) REFERENCES `grupos` (`id_grupo`);

--
-- Limitadores para a tabela `grupo_postagens`
--
ALTER TABLE `grupo_postagens`
  ADD CONSTRAINT `grupo_postagens_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `grupo_postagens_ibfk_2` FOREIGN KEY (`numero_grupo`) REFERENCES `grupos` (`id_grupo`);

--
-- Limitadores para a tabela `mensagens`
--
ALTER TABLE `mensagens`
  ADD CONSTRAINT `mensagens_ibfk_1` FOREIGN KEY (`id_emissor`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `mensagens_ibfk_2` FOREIGN KEY (`id_recetor`) REFERENCES `usuarios` (`id_usuario`);

--
-- Limitadores para a tabela `participantes`
--
ALTER TABLE `participantes`
  ADD CONSTRAINT `participantes_ibfk_1` FOREIGN KEY (`participante`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `participantes_ibfk_2` FOREIGN KEY (`numero_sala`) REFERENCES `sala_chat` (`id_sala_chat`);

--
-- Limitadores para a tabela `postagens`
--
ALTER TABLE `postagens`
  ADD CONSTRAINT `postagens_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Limitadores para a tabela `sala_chat`
--
ALTER TABLE `sala_chat`
  ADD CONSTRAINT `sala_chat_ibfk_1` FOREIGN KEY (`criador`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
