const Postagem = require('../models/Postagem')
const Comentario = require('../models/Comentario')

class PostagemController {

    // views
    async paginaNovaPostagem(req, res) {

        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const id_usuario = req.session.usuario.id

            res.render('app/postagem/novo', { id_usuario, nome, sobrenome })

        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA DE NOVA POSTAGEM: ' + err)
        }
    }

    // paginas de todas as postagens
    async paginaPostagemTodas(req, res) {

        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const postagens = await Postagem.obterPostagensEUsuariosModel()

            res.render('app/postagem/todas', { postagens, nome, sobrenome })

        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA DE TODAS AS POSTAGENS: ' + err)
        }

    }

    // pagina postagem
    async paginaPostagem(req, res) {

        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const id = req.params.id

            const postagem = await Postagem.obterPostagemPorIdModel(id)
            const comentarios = await Comentario.obterComentariosPorIdModel(id)

            res.render('app/postagem/postagem', { postagem, comentarios, nome, sobrenome })

        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA POSTAGEM: ' + err)
        }

    }

    // funcionalidades

    // criar nova postagem
    async criaNovaPostagem(req, res) {

        try {

            const { postagem, id_usuario } = req.body

            if (postagem.length <= 0 || id_usuario == undefined) {
                res.redirect('/admin/postagem/nova')
                return
            }

            const dados = {
                postagem,
                id_usuario
            }

            await Postagem.criarNovaPostagemModel(dados)

            res.redirect('/timeline')


        } catch (err) {
            console.log('ERRO AO CRIAR NOVA POSTAGEM: ' + err)
        }
    }

}

module.exports = new PostagemController()