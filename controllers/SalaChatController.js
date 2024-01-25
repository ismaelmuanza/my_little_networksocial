const SalaChat = require("../models/SalaChat")
const Usuario = require('../models/Usuario')

class ChatController {

    // views
    // pagina de chat
    async paginaChat(req, res) {
        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const id_logado = req.params.id
            const num_sala = req.params.num_sala
            const usuario_logado = req.session.usuario

            const sala_chat = await SalaChat.obterSalaChatPorIdDaSalaModel(num_sala)

            const chats = await SalaChat.obterChatsPorIdLogadoENumSalaModel(num_sala)

            res.render('app/chat/sala', { usuario_logado, chats, sala_chat, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DA SALA DE CHAT: ' + err)
        }
    }

    // pagina de nova sala de chat
    async paginaNovaSalaChat(req, res) {
        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const usuario = req.session.usuario
            res.render('app/chat/nova', { usuario, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DE NOVA SALA DE CHAT: ' + err)
        }
    }

    // paginaNovaAdicionar
    async paginaNovaAdicionar(req, res) {
        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const num_sala = req.params.num_sala
            const id_usuario_logado = req.session.usuario.id

            const usuarios = await Usuario.obterTodosUsuariosModel()

            res.render('app/chat/adicionar', { usuarios, num_sala, id_usuario_logado, nome, sobrenome })

        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DE ADICIONAR MEMBROS NA SALA DE CHAT: ' + err)
        }
    }

    // pagina de todas as salas de chats
    async paginaSalaChatTodas(req, res) {
        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const id_logado = req.session.usuario.id

            const salas = await SalaChat.obterSalasChatsPorIdLogado(id_logado)

            res.render('app/chat/todas', { salas, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DE TODAS AS SALAS DE CHAT: ' + err)
        }
    }

    // paginaSalaChatParticipantes
    async paginaSalaChatParticipantes(req, res) {
        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const numero_sala = req.params.num_sala

            const participantes = await SalaChat.obterParticipantesPorNumSalaChat(numero_sala)

            res.render('app/chat/participantes', { participantes, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DE PARTICIPANTES DA SALA DE CHAT: ' + err)
        }
    }

    // funcionalidades

    // criar nova sala de chat
    async criaNovaSalaChat(req, res) {
        try {
            const { nome, criador } = req.body

            if (nome.length <= 1) {
                res.redirect('/admin/sala_chat/nova')
                return
            }

            const dados = {
                nome,
                criador
            }

            await SalaChat.criarNovaSalaChatModel(dados)

            res.redirect('/admin/sala_chat/todas')

        } catch (err) {
            console.log('ERRO AO CRIAR NOVA SALA DE CHAT: ' + err)
        }
    }

    // criar novo chat
    async criarNovoChat(req, res) {
        try {
            const { id_usuario, mensagem, numero_sala } = req.body

            if (mensagem.length <= 0) {
                res.redirect(`/admin/chat/${id_usuario}/${numero_sala}`)
                return
            }

            const dados = {
                id_usuario,
                mensagem,
                numero_sala
            }

            await SalaChat.criarNovoChatModel(dados)

            res.redirect(`/admin/chat/${id_usuario}/${numero_sala}`)

        } catch (err) {
            console.log('ERRO AO CRIAR NOVO CHAT: ' + err)
        }
    }

    // criar novo participante
    async criarNovoParticipante(req, res) {
        try {
            const { participante, numero_sala } = req.body


            if (participante == undefined || participante == '' || numero_sala == undefined || numero_sala == '' || isNaN(numero_sala)) {
                res.redirect(`/admin/sala_chat/adicionar/${numero_sala}`)
                return
            }

            const dados = {
                participante,
                numero_sala
            }

            const participantes = await SalaChat.obterParticipantePorIdEPorNumSalaModel(participante, numero_sala)


            if (participantes.length > 0) {
                res.redirect(`/admin/sala_chat/adicionar/${numero_sala}?jaexiste`)
                return

            } else {

                await SalaChat.criarNovoParticipanteMoldel(dados)

                res.redirect(`/admin/sala_chat/adicionar/${numero_sala}`)
            }


        } catch (err) {
            console.log('ERRO AO CRIAR NOVO PARTICIPANTE: ' + err)
        }
    }
}

module.exports = new ChatController()