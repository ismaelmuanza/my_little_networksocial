$(document).ready(() => {

    $('.puxar-mensagens').click(e => {
        e.preventDefault()

        // // $('#mensagens-info').html('DOS ABATES')
        // $.get('/admin/mensagem/mensagem/1/5/mensagem', response => {
        //     $('#mensagens-info').html(response)
        // })




        // pegando os valores dos selects, fazendo uma requisicao ao back e retornando uma resposta via Ajax com JQuery
        $('#competencia').on('change', e => {
            const competencia = $(e.target).val();
            // alert(competencia)
            $.ajax({
                type: 'get',
                url: 'controller.php',
                data: `competencia=${competencia}`,
                // dataType: 'json',
                success: dados => {
                    const dado = JSON.stringify(dados)
                    $('#numeroVendas').html('testeNumeroVendas')
                    $('#totalVendas').html('testeTotalVendas')
                        // console.log(dado)
                        // console.log(dado.competencia)
                        // console.log(competencia)
                        // console.log(dado)
                        // console.log(dados.nome)
                    console.log(dados)
                    console.log(dado)
                },
                error: erro => {
                    console.log('Erro', erro, erro.responseText)
                }

            })

        })
    })
})