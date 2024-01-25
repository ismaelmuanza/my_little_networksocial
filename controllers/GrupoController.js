const Grupo = require('../models/Grupo')
const Usuario = require('../models/Usuario')
class GrupoController {

    // views
    // pagina novo grupo
    async paginaNovoGrupo(req, res) {

        try {
            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const id_usuario_logado = req.session.usuario.id

            res.render('app/grupo/novo', { id_usuario_logado, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA NOVO GRUPO: ' + err)
        }
    }

    // pagina de todos os grupos
    async paginaGrupoTodos(req, res) {

        const nome = req.session.usuario.nome
        const sobrenome = req.session.usuario.sobrenome

        try {
            const id_usuario_logado = req.session.usuario.id

            const grupos = await Grupo.obterGruposPorCriadorOuParticipante(id_usuario_logado)

            res.render('app/grupo/todos', { grupos, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DE TODOS OS GRUPOS: ' + err)
        }
    }

    // pagina de inicio do grupo
    async paginaGrupoInicio(req, res) {
        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const numero_grupo = req.params.id

            const postagens = await Grupo.obterTodasPostagensDoGrupoPorNumGrupoModel(numero_grupo)

            // console.log(postagens)
            res.render('app/grupo/inicio', { numero_grupo, postagens, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DE INCIO DE GRUPOS: ' + err)
        }
    }

    // pagina de nova postagem no grupo
    async paginaGrupoPostagemNova(req, res) {
        try {
            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const id_usuario_logado = req.session.usuario.id
            const numero_grupo = req.params.numero_grupo

            res.render('app/grupo/postagem_nova', { id_usuario_logado, numero_grupo, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DE NOVA POSTAGEM NO GRUPO: ' + err)
        }
    }

    // pagina de uma postagem no grupo
    async paginaGrupoPostagem(req, res) {
        try {
            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const id_postagem = req.params.id
            const postagem = await Grupo.obterPostagemPorIdGrupoPostagemModel(id_postagem)

            const comentarios = await Grupo.obterComentariosPostagemGrupoModel(id_postagem)

            res.render('app/grupo/postagem', { postagem, comentarios, nome, sobrenome })

        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DE POSTAGEM NO GRUPO: ' + err)
        }
    }

    // pagina para adicionar participantes no grupo
    async paginaGrupoAdicionar(req, res) {
        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const id_usuario_logado = req.session.usuario.id
            const numero_grupo = req.params.num_grupo

            const usuarios = await Usuario.obterTodosUsuariosModel()

            res.render('app/grupo/adicionar', { usuarios, id_usuario_logado, numero_grupo, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DE ADICIONAR NOVO PARTICIPANTE NO GRUPO: ' + err)
        }
    }

    // pagina para renderizar os participantes do grupo 
    async paginaGrupoParticipantes(req, res) {
        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const numero_grupo = req.params.num_grupo

            const participantes = await Grupo.obterUsuariosEParticipantesDoGrupoModel(numero_grupo)

            res.render('app/grupo/participantes', { participantes, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR PAGINA DE PARTICIPANTES DO GRUPO: ' + err)
        }
    }

    // funcionalidades

    // criar novo grupo
    async criaNovoGrupo(req, res) {
        try {
            const { nome, criador } = req.body

            if (nome.length <= 0) {
                res.redirect('/admin/grupo/novo')
                return
            }

            const dados = {
                nome,
                criador
            }

            await Grupo.criarNovoGrupoModel(dados)

            res.redirect('/admin/grupo/todos')

        } catch (err) {
            console.log('ERRO AO CRIAR GRUPO: ' + err)
        }
    }

    // criar nova postagem no grupo
    async criaNovaPostagemGrupo(req, res) {
        try {
            const { id_usuario, numero_grupo, postagem } = req.body

            if (postagem.length <= 0) {
                res.redirect(`/admin/grupo/postagem/nova/${numero_grupo}`)
                return
            }

            const dados = {
                id_usuario,
                numero_grupo,
                postagem
            }

            await Grupo.criaNovaPostagemGrupoModel(dados)

            res.redirect(`/admin/grupo/inicio/${numero_grupo}`)

        } catch (err) {
            console.log('ERRO AO CRIAR NOVA POSTAGEM NO GRUPO: ' + err)
        }
    }

    // criar novo comentario em uma postagem do grupo
    async criaNovoComentarioPostagemGrupo(req, res) {
        try {

            const { id_grupo_postagem, comentario } = req.body

            const id_usuario = req.session.usuario.id

            if (comentario.length <= 0) {

                res.redirect(`/admin/grupo/postagem/${id_grupo_postagem}`)
                return
            }

            const dados = {
                id_usuario,
                id_grupo_postagem,
                comentario
            }

            await Grupo.criaNovoComentarioPostagemGrupoModel(dados)

            res.redirect(`/admin/grupo/postagem/${id_grupo_postagem}`)

        } catch (err) {
            console.log('ERRO AO CRIAR NOVO COMENTARIO EM UMA POSTAGEM DO GRUPO: ' + err)
        }
    }

    // participante

    // criar novo participante no grupo
    async criaNovoParticipanteGrupo(req, res) {
        try {

            const { participante, numero_grupo } = req.body

            const dados = {
                participante,
                numero_grupo
            }

            const usuarioParticipante = await Grupo.obterParticipanteGrupoPorIdENumGrupoModel(participante, numero_grupo)

            if (usuarioParticipante.length > 0) {
                res.redirect(`/admin/grupo/adicionar/${numero_grupo}?jaexiste`)
                return

            } else {

                await Grupo.criaNovoParticipanteGrupoModel(dados)

                res.redirect(`/admin/grupo/adicionar/${numero_grupo}`)
            }


        } catch (err) {
            console.log('ERRO AO CRIAR NOVO PARTICIPANTE NO GRUPO: ' + err)
        }
    }
}

module.exports = new GrupoController()