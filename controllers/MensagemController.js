const Mensagem = require('../models/Mensagem')

class MensagemController {

    // pagina de mensagem
    async paginaMensagem(req, res) {
        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            let emissor = req.params.emissor
            const nome_logado = req.session.usuario.nome
            const id_usuario_logado = req.session.usuario.id

            let id_emissor
            let id_recetor

            if (emissor == 'usuario') {
                id_emissor = req.session.usuario.id
                id_recetor = req.params.id_recetor
            } else if (emissor == 'mensagem') {

                id_emissor = req.session.usuario.id
                id_recetor = req.params.id_recetor
            }



            const mensagens = await Mensagem.obterMensagemPorEmissorERecetorModel(id_emissor, id_recetor)
                // console.log(emissor)
                // console.log(mensagens)

            res.render('app/mensagem/mensagem', { mensagens, nome_logado, id_emissor, id_recetor, id_usuario_logado, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA MENSAGEM: ' + err)
        }
    }

    // pagina de todas as mensagens
    async paginaMensagemTodas(req, res) {
        try {

            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome
            const id_recetor = req.session.usuario.id

            const mensagens = await Mensagem.obterMensagemPorIdRecetorModel(id_recetor)

            res.render('app/mensagem/todas', { mensagens, nome, sobrenome })

        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA DE TODAS AS MENSAGENS: ' + err)
        }
    }

    // funcionalidades

    // criar nova mensagem
    async criaNovaMensagem(req, res) {
        try {
            const { id_emissor, id_recetor, mensagem } = req.body

            if (mensagem.length <= 0) {

                res.redirect('/admin/usuario/todos?nEnviada')
                return
            }

            const dados = {
                id_emissor,
                id_recetor,
                mensagem
            }

            await Mensagem.criarNovaMensagemModel(dados)

            res.redirect(`/admin/mensagem/mensagem/${id_emissor}/${id_recetor}/usuario`)

        } catch (err) {
            console.log('ERRO AO CIRAR NOVA MENSAGEM: ' + err)
        }
    }
}

module.exports = new MensagemController()