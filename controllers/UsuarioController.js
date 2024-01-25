const Usuario = require('../models/Usuario')
const Postagem = require('../models/Postagem')
const bcrypt = require('bcrypt')
class UsuarioController {

    // renderizando a pagina login
    async paginaLogin(req, res) {
        try {


            let dadosCorretos = req.flash('dadosCorretos')
            dadosCorretos = (dadosCorretos == undefined || dadosCorretos.length == 0) ? undefined : dadosCorretos

            let loginErro = req.flash('loginErro')
            loginErro = (loginErro == undefined || loginErro.length == 0) ? undefined : loginErro


            let senhaFalso = req.flash('senhaFalso')
            senhaFalso = (senhaFalso == undefined || senhaFalso.length == 0) ? undefined : senhaFalso


            let usuarioFalso = req.flash('usuarioFalso')
            usuarioFalso = (usuarioFalso == undefined || usuarioFalso.length == 0) ? undefined : usuarioFalso

            res.render('app/login', { dadosCorretos, loginErro, senhaFalso, usuarioFalso })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA DE LOGIN: ' + err)
        }
    }

    // renderizando a pagina de cadastro
    async paginaNovoUsuario(req, res) {
        try {

            let emailErro = req.flash('emailErro')
            let dadosErro = req.flash('dadosErro')

            emailErro = (emailErro == undefined || emailErro.length == 0) ? undefined : emailErro
            dadosErro = (dadosErro == undefined || dadosErro.length == 0) ? undefined : dadosErro

            res.render('usuarios/novo', { emailErro, dadosErro })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA DE CADASTRO: ' + err)
        }
    }

    // renderizando a pagina de todos usuarios
    async paginaUsuarioTodos(req, res) {
        try {
            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            const id_usuario_logado = req.session.usuario.id
            const usuarios = await Usuario.obterTodosUsuariosModel()

            res.render('app/usuario/todos', { usuarios, id_usuario_logado, nome, sobrenome })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA DE TODOS USUARIOS: ' + err)
        }
    }

    // renderizando a pagina de cadastro
    async paginaTimeline(req, res) {
        try {
            const nome = req.session.usuario.nome
            const sobrenome = req.session.usuario.sobrenome

            // postagens
            const postagens = await Postagem.obterPostagensEUsuariosModel()

            res.render('app/timeline', { nome, sobrenome, postagens })
        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA DA TIMELIME: ' + err)
        }
    }

    // funcionalidades

    // criar novo usuario
    async criarUsuario(req, res) {
        try {
            const { nome, sobrenome, email, senha } = req.body
            let telefone = req.body.telefone || 0

            if (nome.length < 3 || sobrenome.length < 3 || email.length < 11 || senha.length < 5 || isNaN(telefone)) {

                req.flash('dadosErro', 'Verifique se os dados foram preenchidos corretamente!')

                res.redirect('/admin/usuario/novo')
                return
            }

            const usuario = await Usuario.obterUsuarioPorEmailModel(email)

            // verifica se email ja existe
            if (usuario.length > 0) {

                req.flash('emailErro', 'Email já existe')

                res.redirect('/admin/usuario/novo') // email ja existe
                return

            } else {

                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(senha, salt)

                const dados = {
                    nome,
                    sobrenome,
                    email,
                    senha: hash,
                    telefone
                }

                await Usuario.criarUsuarioModel(dados)

                req.flash('dadosCorretos', 'Conta criada com sucesso!')

                res.redirect('/')
            }

        } catch (err) {
            console.log('ERRO AO CRIAR USUARIO: ' + err)
        }
    }

    // autenticacao de usuario
    async authUsuario(req, res) {
        try {
            const { email, senha } = req.body

            if (email.length < 11 || senha.length < 3) {

                req.flash('loginErro', 'Verifique se os dados estão corretos!')

                res.redirect('/')
                return
            }

            const usuario = await Usuario.obterUsuarioPorEmailModel(email)

            //    verifica se usuario existe
            if (usuario.length > 0) {
                const correct = bcrypt.compareSync(senha, usuario[0].senha)

                if (correct) {

                    req.session.usuario = {
                        id: usuario[0].id_usuario,
                        nome: usuario[0].nome,
                        sobrenome: usuario[0].sobrenome,
                        email: usuario[0].email
                    }

                    res.redirect('/timeline')

                    return
                } else {

                    req.flash('senhaFalso', 'Senha Incorreta!')
                    res.redirect('/')
                }
            } else {

                req.flash('usuarioFalso', 'Usuário não existe, verifique os dados preenchidos!')
                res.redirect('/')
                return
            }
        } catch (err) {
            console.log('ERRO AO AUTENTICAR USUARIO: ' + err)
        }
    }

    // logout
    async logout(req, res) {
        req.session.usuario = undefined
        res.redirect('/')
    }

}

module.exports = new UsuarioController()