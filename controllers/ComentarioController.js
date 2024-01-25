const Comentario = require('../models/Comentario')

class ComentarioController {

    // criar novo comentario
    async criaNovoComentario(req, res) {
        try {

            const id_usuario_logado = req.session.usuario.id
            const id_postagem = req.body.id_postagem
            const comentario = req.body.comentario

            if (comentario.length <= 0) {
                res.redirect('/admin/postagem/postagem/' + id_postagem)
                return
            }

            const dados = {
                id_usuario: id_usuario_logado,
                id_postagem,
                comentario
            }

            await Comentario.criarNovoComentarioModel(dados)

            res.redirect('/admin/postagem/postagem/' + id_postagem)

        } catch (err) {
            console.log('ERRO AO CRIAR NOVO COMETARIO: ' + err)
        }
    }
}

module.exports = new ComentarioController()