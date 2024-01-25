const database = require('../database/connection')

class Mensagem {

    // obter mensagem por emissor e receptor model
    async obterMensagemPorEmissorERecetorModel(id_emissor, id_recetor) {
        try {
            const query = await database
                .select(['msg.id_mensagem', 'msg.id_emissor', 'msg.id_recetor', 'msg.mensagem', 'us.nome', 'us.sobrenome'])
                .table('mensagens as msg')
                .innerJoin('usuarios as us', 'msg.id_emissor', 'us.id_usuario')
                .whereRaw(`msg.id_emissor = ${id_emissor} and msg.id_recetor = ${id_recetor}
                    or msg.id_emissor = ${id_recetor} and msg.id_recetor = ${id_emissor}
                `).orderBy('msg.id_mensagem', 'asc')

            return query

        } catch (err) {
            console.log('ERRO AO OBTER MENSAGEM POR EMISSOR E RECETOR-MODEL: ' + err)
        }
    }

    // obter mensagens por id do recetor model
    async obterMensagemPorIdRecetorModel(id_recetor) {
        try {

            const query = await database
                .select(['us.nome', 'us.sobrenome', 'msg.id_mensagem', 'msg.mensagem', 'msg.id_emissor', 'msg.id_recetor'])
                .table('mensagens as msg')
                .innerJoin('usuarios as us', 'msg.id_emissor', 'us.id_usuario')
                .whereRaw(`msg.id_recetor = ${id_recetor}`)
                .groupBy('id_emissor')
                .orderBy('msg.id_mensagem', 'desc')

            return query

        } catch (err) {
            console.log('ERRO AO OBTER MENSAGENS POR ID DO RECETOR-MODEL: ' + err)
        }
    }

    // criar nova mensagem model
    async criarNovaMensagemModel(mensagem) {
        try {
            await database.insert(mensagem).table('mensagens')

            return true

        } catch (err) {
            console.log('ERRO AO CRIAR NOVA MENSAGEM-MODEL: ' + err)
        }
    }
}

module.exports = new Mensagem()