const database = require('../database/connection')

class SalaChat {

    // obter sala de chat por id da sala (numero) model
    async obterSalaChatPorIdDaSalaModel(id_sala_chat) {
        try {

            const query = await database
                .select()
                .table('sala_chat')
                .where({ id_sala_chat })
            return query

        } catch (err) {
            console.log('ERRO AO OBTER SALA CHAT POR ID DA SALA-MODEL: ' + err)
        }
    }

    // obter todas as salas chat por id do usuario logado model
    async obterSalasChatsPorIdLogado(id_logado) {
        try {

            const query = await database.select(['sch.id_sala_chat', 'sch.nome', 'sch.criador', 'pa.participante', 'pa.numero_sala'])
                .table('sala_chat as sch')
                .leftJoin('participantes as pa', 'sch.id_sala_chat', 'pa.numero_sala')
                .whereRaw(`sch.criador = ${id_logado} or pa.participante = ${id_logado}`)
                .groupBy('sch.id_sala_chat')
                .orderBy('sch.nome', 'asc')
            return query

        } catch (err) {
            console.log('ERRO AO OBTER TODAS AS SALAS DE CHAT POR ID LOGADO-MODEL: ' + err)
        }
    }

    // obter chats por id logado
    async obterChatsPorIdLogadoENumSalaModel(numero_sala) {
        try {

            const query = await database
                .select(['us.nome', 'us.sobrenome', 'ch.id_chat', 'ch.mensagem', 'ch.id_usuario', 'ch.numero_sala'])
                .table('chats as ch')
                .innerJoin('usuarios as us', 'ch.id_usuario', 'us.id_usuario')
                .whereRaw(`ch.numero_sala = ${numero_sala}`)
                .orderBy('ch.id_chat', 'asc')
            return query

        } catch (err) {
            console.log('ERRO AO OBTER CHATS POR ID LOGADO-MODEL: ' + err)
        }
    }

    // obter participante por id da sala model
    async obterParticipantePorNumSalaModel() {
        try {

            const query = await database
                .select(['us.nome', 'us.id_usuario', 'pa.participante', 'pa.numero_sala'])
                .table('usuarios as us')
                .leftJoin('participantes as pa', 'us.id_usuario', 'pa.participante')
                .orderBy('us.nome', 'asc')

            return query

        } catch (err) {
            console.log('ERRO AO OBTER PARTICIPANTE POR NUMERO DA SALA-MODEL: ' + err)
        }

    }

    // obter participante por numero sala e id model
    async obterParticipantePorIdEPorNumSalaModel(participante, num_sala) {
        try {

            const query = await database
                .select(['pa.id_participante', 'pa.participante', 'pa.numero_sala'])
                .table('participantes as pa')
                .whereRaw(`pa.numero_sala = ${num_sala} and pa.participante = ${participante}`)
            return query


        } catch (err) {
            console.log('ERRO AO OBTER PARTICIPANTES POR NUMERO DO GRUPO-MODEL: ' + err)
        }
    }

    // obter participantes por numero da sala de chat
    async obterParticipantesPorNumSalaChat(numero_sala) {
        try {

            const query = await database
                .select(['pa.id_participante', 'pa.participante', 'pa.numero_sala', 'us.nome', 'us.sobrenome'])
                .table('participantes as pa')
                .innerJoin('usuarios as us', 'pa.participante', 'us.id_usuario')
                .whereRaw(`pa.numero_sala = ${numero_sala} `)
                .orderBy('us.nome', 'asc')
            return query


        } catch (err) {
            console.log('ERRO AO OBTER PARTICIPANTES POR NUMERO DA SALA DO CHAT-MODEL: ' + err)
        }
    }

    // criar nova sala chat model
    async criarNovaSalaChatModel(nova_sala_chat) {
        try {

            const query = await database.insert(nova_sala_chat).table('sala_chat')
            return true

        } catch (err) {
            console.log('ERRO AO CRIAR NOVA SALA DE CHAT-MODEL: ' + err)
        }
    }

    // criar novo chat model
    async criarNovoChatModel(chat) {
        try {

            const query = await database.insert(chat).table('chats')
            return true

        } catch (err) {
            console.log('ERRO AO CRIAR NOVO CHAT-MODEL: ' + err)
        }
    }

    // criar novo participante model
    async criarNovoParticipanteMoldel(participante) {
        try {

            await database.insert(participante).table('participantes')
            return true

        } catch (err) {
            console.log('ERRO AO CRIAR NOVO PARTICIPANTE-MODEL: ' + err)
        }
    }

}

module.exports = new SalaChat()