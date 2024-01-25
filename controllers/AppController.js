class AppController {
    // renderizando a pagina login
    async telaLogin(req, res) {
        try {
            res.render('app/login')
        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA DE LOGIN: ' + err)
        }
    }

    // renderizando a pagina de cadastro
    async novoUsuario(req, res) {
        try {
            res.render('usuarios/novo')
        } catch (err) {
            console.log('ERRO AO RENDERIZAR A PAGINA DE Cadastro: ' + err)
        }
    }
}

module.exports = new AppController()