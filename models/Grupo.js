const database = require('../database/connection')
class Grupo {

    // consultas

    // obter grupo por id model
    async obterGruposPorCriadorOuParticipante(id_usuario_logado) {
        try {
            const query = await database.select(['g.id_grupo', 'g.nome', 'g.criador', 'gp.participante'])
                .table('grupos as g')
                .leftJoin('grupo_participantes as gp', 'g.id_grupo', 'gp.numero_grupo')
                .whereRaw(`g.criador = ${id_usuario_logado} or gp.participante = ${id_usuario_logado}`)
                .groupBy('gp.numero_grupo')
                .orderBy('g.nome', 'asc')
            return query

        } catch (err) {
            console.log('ERRO AO OBTER GRUPO POR ID-MODEL: ' + err)
        }
    }

    // obter todas as postagens do grupo por numero do grupo model
    async obterTodasPostagensDoGrupoPorNumGrupoModel(numero_grupo) {
        try {
            const query = await database
                .select(['post.id_grupo_postagem', 'post.postagem', 'post.id_usuario', 'post.numero_grupo', 'us.nome', 'us.sobrenome'])
                .table('grupo_postagens as post')
                .innerJoin('usuarios as us', 'post.id_usuario', 'us.id_usuario')
                .whereRaw(`post.numero_grupo = ${numero_grupo}`)
                .orderBy('post.id_grupo_postagem', 'desc')

            return query

        } catch (err) {
            console.log('ERRO AO OBTER TODAS AS POSTAGENS DO GRUPO POR NUMERO DO GRUPO-MODEL: ' + err)
        }
    }

    // obter postagem por id da postagem do grupo model
    async obterPostagemPorIdGrupoPostagemModel(id_grupo_postagem) {
        try {
            const query = await database
                .select(['post.id_grupo_postagem', 'post.postagem', 'post.id_usuario', 'post.numero_grupo', 'us.nome', 'us.sobrenome'])
                .table('grupo_postagens as post')
                .innerJoin('usuarios as us', 'post.id_usuario', 'us.id_usuario')
                .whereRaw(`post.id_grupo_postagem = ${id_grupo_postagem}`)

            return query

        } catch (err) {
            console.log('ERRO AO OBTER POSTAGEM DO GRUPO POR ID DA POSTAGEM-MODEL: ' + err)
        }
    }

    // obter comentario de uma postagem do grupo model
    async obterComentariosPostagemGrupoModel(id_grupo_postagem) {
        try {
            const query = await database
                .select(['com.id_grupo_comentario', 'com.comentario', 'com.id_usuario', 'com.id_grupo_postagem', 'us.nome', 'us.sobrenome'])
                .table('grupo_comentarios as com')
                .innerJoin('usuarios as us', 'com.id_usuario', 'us.id_usuario')
                .whereRaw(`com.id_grupo_postagem = ${id_grupo_postagem}`)

            return query

        } catch (err) {
            console.log('ERRO AO OBTER COMENTARIO DE UMA POSTAGEM DO GRUPO POR ID DA POSTAGEM-MODEL: ' + err)
        }
    }

    // obter todos os usuarios em uniao aos participantes do grupo numa so consulta
    async obterUsuariosEParticipantesDoGrupoModel(numero_grupo) {
        try {

            const query = await database
                .select(['gp.numero_grupo', 'gp.participante', 'us.id_usuario', 'us.nome', 'us.sobrenome'])
                .table('grupo_participantes as gp')
                .innerJoin('usuarios as us', 'gp.participante', 'us.id_usuario')
                .whereRaw(`gp.numero_grupo = ${numero_grupo}`)
            return query

        } catch (err) {
            console.log('ERRO AO OBTER USUARIOS E PARTICIPANTES DO GRUPO-MODEL: ' + err)
        }
    }

    // obter participantes por numero do grupo
    async obterParticipantesPorNumGrupo(numero_grupo) {
        try {

            const query = await database
                .select(['gp.id_grupo_participante', 'gp.participante', 'gp.numero_grupo'])
                .table('grupo_participantes as gp')
                .whereRaw(`gp.numero_grupo = ${numero_grupo}`)
            return query


        } catch (err) {
            console.log('ERRO AO OBTER PARTICIPANTES POR NUMERO DO GRUPO-MODEL: ' + err)
        }
    }

    // obter participante por numero grupo e id model
    async obterParticipanteGrupoPorIdENumGrupoModel(participante, numero_grupo) {
        try {

            const query = await database
                .select(['gp.id_grupo_participante', 'gp.participante', 'gp.numero_grupo'])
                .table('grupo_participantes as gp')
                .whereRaw(`gp.numero_grupo = ${numero_grupo} and gp.participante = ${participante}`)
            return query


        } catch (err) {
            console.log('ERRO AO OBTER PARTICIPANTES POR NUMERO DO GRUPO-MODEL: ' + err)
        }
    }

    // inserts

    // criar novo grupo model
    async criarNovoGrupoModel(grupo) {
        try {
            await database.insert(grupo).table('grupos')

            return true

        } catch (err) {
            console.log('ERRO AO CRIAR NOVO GRUPO-MODEL: ' + err)
        }
    }

    // criar nova postagem no grupo model
    async criaNovaPostagemGrupoModel(postagem) {
        try {

            await database.insert(postagem).table('grupo_postagens')
            return true

        } catch (err) {
            console.log('ERRO AO CRIAR NOVA POSTAGEM NO GRUPO-MODEL: ' + err)
        }
    }

    // comentarios
    // criar novo comentario em uma postagem do grupo model
    async criaNovoComentarioPostagemGrupoModel(comentario) {
        try {

            await database.insert(comentario).table('grupo_comentarios')
            return true

        } catch (err) {
            console.log('ERRO AO CRIAR NOVA COMENTARIO EM UMA POSTAGEM DO GRUPO-MODEL: ' + err)
        }
    }

    // participantes
    // criar novo participante no grupo model
    async criaNovoParticipanteGrupoModel(participante) {
        try {

            await database.insert(participante).table('grupo_participantes')
            return true

        } catch (err) {
            console.log('ERRO AO CRIAR NOVO PARTICIPANTE NO GRUPO-MODEL: ' + err)
        }
    }
}

module.exports = new Grupo()