-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 26-Jan-2024 às 00:01
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

--
-- Extraindo dados da tabela `chats`
--

INSERT INTO `chats` (`id_chat`, `mensagem`, `id_usuario`, `numero_sala`, `data`) VALUES
(1, 'Bom dia colegas!', 4, 1, '2023-04-28 13:54:58'),
(2, 'OI', 4, 2, '2023-05-01 14:17:56'),
(3, 'thanks', 4, 2, '2023-05-01 14:18:55'),
(4, 'Oi people', 4, 3, '2023-05-01 14:29:30'),
(5, 'oi vc', 4, 3, '2023-05-01 14:30:26'),
(6, 'Oi colegas', 6, 4, '2023-05-01 15:03:28'),
(7, 'Boa tarde colegas', 4, 4, '2023-05-01 15:04:10');

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

--
-- Extraindo dados da tabela `comentarios`
--

INSERT INTO `comentarios` (`id_comentario`, `comentario`, `id_usuario`, `id_postagem`, `data`) VALUES
(1, 'bom dia!', 10, 1, '2023-07-12 13:12:11'),
(2, 'hajqwqbewawi', 11, 3, '2023-09-08 10:06:41');

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

--
-- Extraindo dados da tabela `grupos`
--

INSERT INTO `grupos` (`id_grupo`, `nome`, `criador`, `data`) VALUES
(1, 'Grupo De Estudo Python 2023', 4, '2023-04-28 13:56:49'),
(2, 'Turma do Apito', 10, '2023-07-12 13:14:48'),
(3, 'kjkjkh', 11, '2023-09-08 10:13:03'),
(4, 'OPA', 12, '2024-01-25 23:58:45');

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

--
-- Extraindo dados da tabela `grupo_participantes`
--

INSERT INTO `grupo_participantes` (`id_grupo_participante`, `participante`, `numero_grupo`, `data`) VALUES
(1, 2, 1, '2023-04-28 14:20:13'),
(2, 8, 2, '2023-07-12 13:15:25'),
(3, 2, 2, '2023-07-12 13:15:27');

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

--
-- Extraindo dados da tabela `grupo_postagens`
--

INSERT INTO `grupo_postagens` (`id_grupo_postagem`, `postagem`, `id_usuario`, `numero_grupo`, `data`) VALUES
(1, 'Colegas, hoje temos uma reunião as 12hs com o prof Vidário!', 4, 1, '2023-04-28 13:57:35'),
(2, 'Aqui são só os escolhidos!', 10, 2, '2023-07-12 13:15:19');

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

--
-- Extraindo dados da tabela `mensagens`
--

INSERT INTO `mensagens` (`id_mensagem`, `mensagem`, `id_emissor`, `id_recetor`, `data`) VALUES
(1, 'Oi Migue\r\nl', 9, 1, '2023-06-29 12:50:05'),
(2, 'Tropa!', 10, 8, '2023-07-12 13:13:32'),
(3, 'na boa!', 8, 10, '2023-07-12 13:14:25');

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

--
-- Extraindo dados da tabela `participantes`
--

INSERT INTO `participantes` (`id_participante`, `participante`, `numero_sala`, `data`) VALUES
(1, 3, 1, '2023-04-28 13:55:20'),
(2, 2, 1, '2023-04-28 13:56:23'),
(3, 3, 2, '2023-05-01 14:17:36'),
(4, 3, 3, '2023-05-01 14:29:11'),
(5, 4, 4, '2023-05-01 15:03:13'),
(6, 5, 4, '2023-05-01 15:07:48'),
(7, 1, 5, '2023-09-08 10:08:50');

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

--
-- Extraindo dados da tabela `postagens`
--

INSERT INTO `postagens` (`id_postagem`, `postagem`, `id_usuario`, `data`) VALUES
(1, 'Bom dia povo do diabo!', 4, '2023-04-28 13:52:34'),
(2, 'Dia tranquilo!', 10, '2023-07-12 13:12:33'),
(3, 'hhjhjhj', 11, '2023-09-08 10:06:14');

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

--
-- Extraindo dados da tabela `sala_chat`
--

INSERT INTO `sala_chat` (`id_sala_chat`, `nome`, `criador`, `data`) VALUES
(1, 'Grupo Rede Social (2022/2023)', 4, '2023-04-28 13:54:26'),
(2, 'Teste com Nodemon', 4, '2023-05-01 14:17:15'),
(3, 'Be kuduro', 4, '2023-05-01 14:28:41'),
(4, 'Sala 2', 6, '2023-05-01 15:02:46'),
(5, 'hjhj', 11, '2023-09-08 10:06:52');

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
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nome`, `sobrenome`, `email`, `senha`, `telefone`, `data`) VALUES
(1, 'Miguel', 'Futa', 'futa@gmail.com', '$2b$10$7kV81BOJhmyaQw03D/l6cei4vRm80hBz23HLKafRvDTxLLb7hbGPy', 0, '2023-04-14 00:49:16'),
(2, 'Anastácio', 'Cassiano', 'cassiano@gmail.com', '$2b$10$8BLJpGqyUbX2EzSbYDugnuZDXgNNA5Y4ydnZIPpArudV7SQNqfFhe', 0, '2023-04-28 13:44:34'),
(3, 'Stela', 'Barros', 'barros@gmail.com', '$2b$10$SrzvAXJb7dSadg8/pykS3.9aBhKJ93aeOvbRx666.vJazbKdc12fi', 0, '2023-04-28 13:47:18'),
(4, 'Rosa', 'Campos', 'campos@gmail.com', '$2b$10$PRyAbaV4/hLxtiP6dFvk2O7BHjR3QuA1F64ses0t/kobJXr.TfNfq', 0, '2023-04-28 13:50:19'),
(5, 'Stela1', 'Inácio', 'stela1@gmail.com', '$2b$10$P8kVWRsOb5j/QbguqohhdOwHfLCyiHftLgLoVXgA3X.pwuMZPCZAK', 0, '2023-05-01 14:41:03'),
(6, 'Stela3', 'Barros', 'stela3@gmail.com', '$2b$10$ox3UkzYwC7X4pASnSJPf0ubYbgW.emrMJVIZsL97L3iU/8aRzce92', 0, '2023-05-01 15:00:59'),
(7, 'Rudilson', 'Nfuma', 'nfuma@gmail.com', '$2b$10$5QHQ/ZQfhLynXAct8n80ZOHgJmyngUBDiHeEtS8AkNVtEw9.PVfxq', 0, '2023-05-22 18:59:44'),
(8, 'Aminadiel', 'Bessa', 'bessa@gmail.com', '$2b$10$yDSbxzQDYE5ACpS/zds5AOeo2WRjChghqHgsSy4GrKxMzjLB2kim6', 0, '2023-06-29 07:50:10'),
(9, 'Diana', 'Muanza', 'diana@gmail.com', '$2b$10$v/8Pv498IwRmfFB6u/KXPO9fGUNofqtiPb6aLPjmJ3tI2RTNZ25UW', 0, '2023-06-29 12:49:46'),
(10, 'Edmilson', 'Panzo', 'panzo@gmail.com', '$2b$10$anLxhE2dM8ax3gAj5Og01..rCmbhbGHQ.MSehYYaPY3UsWrAStDam', 0, '2023-07-12 13:11:35'),
(11, 'Alexandre', 'Rocha', 'rocha@gmail.com', '$2b$10$C6qdSYBganXmvnSvjdaGNuFbqMxTk6fvtsMOfNWMHvKdlVq.jP88q', 0, '2023-09-08 10:03:53'),
(12, 'Eidy', 'Nvulu', 'nvulu@gmail.com', '$2b$10$LXdY9o6BphUL0OYZm7/ldOtjmtqRqHDWycWU6mVZGtr0IX.dXbGZu', 0, '2024-01-25 23:58:04');

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
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `grupos`
--
ALTER TABLE `grupos`
  MODIFY `id_grupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `grupo_comentarios`
--
ALTER TABLE `grupo_comentarios`
  MODIFY `id_grupo_comentario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `grupo_participantes`
--
ALTER TABLE `grupo_participantes`
  MODIFY `id_grupo_participante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `grupo_postagens`
--
ALTER TABLE `grupo_postagens`
  MODIFY `id_grupo_postagem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `mensagens`
--
ALTER TABLE `mensagens`
  MODIFY `id_mensagem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `participantes`
--
ALTER TABLE `participantes`
  MODIFY `id_participante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `postagens`
--
ALTER TABLE `postagens`
  MODIFY `id_postagem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `sala_chat`
--
ALTER TABLE `sala_chat`
  MODIFY `id_sala_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
