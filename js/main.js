/**
 * Arquivo de Configuração resposável por fazer as requisições
 */

//Carregar o dataTables
$(document).ready(() => {
    $('#dataTable').DataTable({
        language: {
            "emptyTable": "Nenhum registro encontrado",
            "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "infoEmpty": "Mostrando 0 até 0 de 0 registros",
            "infoFiltered": "(Filtrados de _MAX_ registros)",
            "infoThousands": ".",
            "loadingRecords": "Carregando...",
            "processing": "Processando...",
            "zeroRecords": "Nenhum registro encontrado",
            "search": "Pesquisar",
            "paginate": {
                "next": "Próximo",
                "previous": "Anterior",
                "first": "Primeiro",
                "last": "Último"
            },
        }
    })
})
//Carregar a tabela com os dados da Entrega (Delivery)
$.ajax({
    url: "controller.php",
    method: "GET",
    data: { action: "index" },
    success: (data) => {
        let content = ""
        let tabela = "<table class='table table-bordered dataTable' id='dataTable' width='100%' cellspacing='0'role='grid' aria-describedby='dataTable_info'><thead><th>ID</th><th>Cliente</th><th>Status</th><th>Entregador</th><th>Ações</th></thead><tbody>";
        //Converter os dados do bd em json
        const client = JSON.parse(data)
        if (client != false) {
            let countNew = 0;
            let countPending = 0;
            let countDelivery = 0;
            let countCancel = 0;
            for (let i in client) {
                content += "<tr>" +
                    "<td>" + client[i].id_delivery + "</td>" +
                    "<td>" + client[i].name_client + "</td>" +
                    "<td>" + "<span class='badge bg-" + client[i].classe + " text-white'>" + client[i].situation + "</span>" + "</td>" +
                    "<td>" + client[i].name_deliveryman + "</td>" +
                    "<td><a href='#' class='btn btn-primary' data-toggle='modal' data-target='#editModal' onclick='findEditDelivery(" + client[i].id_delivery + ")' title='Editar dados'><i class='fas fa-edit'></i></a>&nbsp;<a href='#' class='btn btn-info' data-toggle='modal' data-target='#viewModal' onclick='findViewDelivery(" + client[i].id_delivery + ")' title='Ver dados'><i class='fas fa-eye'></i></a></td>" +
                    "</tr>"
                if (client[i].situation === "Novo") {
                    countNew++
                }
                if (client[i].situation === "Entregando") {
                    countPending++
                }
                if (client[i].situation === "Finalizado") {
                    countDelivery++
                }
                if (client[i].situation === "Cancelado") {
                    countCancel++
                }
            }
            $("#novo").html(countNew)
            $("#entregando").html(countPending)
            $("#finalizado").html(countDelivery)
            $("#cancelado").html(countCancel)
            $("#data").html(tabela + content + "</tbody></table>")

        }else{
            $("#mensagem").html("<p class='alert alert-danger'>Nenhuma ordem de entrega registrada!</p>");
        }

    }
})

//Trazer os dados do cliente e popular o select dos formulários nas views
$.ajax({
    url: "controller.php",
    method: "GET",
    data: { action: "listClient" },
    success: (data) => {
        //Converter os dados do bd em json
        const client = JSON.parse(data)
        let content = ""
        if (client.length) {

            for (let i in client) {
                content += "<option value=" + client[i].id_client + ">" + client[i].name_client + "</option>"
            }
            $("#client_id").html(content)

        } else {
            $("#client_id").html("<option disabled selected>Nenhum Cliente Cadastrado</option>")
        }

    }
})

//Carregar os dados dos status e popular o select dos formulários na view
$.ajax({
    url: "controller.php",
    method: "GET",
    data: { action: "listStatus" },
    success: (data) => {
        //Converter os dados do bd em json
        const situation = JSON.parse(data)
        let content = ""
        if (situation.length) {
            for (let i in situation) {
                content += "<option value=" + situation[i].id_status + ">" + situation[i].situation + "</option>"
            }
            $("#status_id").html(content)
        } else {
            $("#status_id").html("<option disabled selected>Nenhum Cliente Cadastrado</option>")
        }

    }
})

// Trazer os dados do Entregador para preencher o Select
$.ajax({
    url: "controller.php",
    method: "GET",
    data: { action: "listDeliveryman" },
    success: (success) => {
        //Converter os dados do bd em json
        const deliveryman = JSON.parse(success)

        let content = ""
        if (deliveryman.length) {

            for (let i in deliveryman) {
                content += "<option value=" + deliveryman[i].id_deliveryman + ">" + deliveryman[i].name_deliveryman + "</option>"
            }
            $("#deliveryman_id").html(content)
        } else {
            $("#deliveryman_id").html("<option disabled selected>Nenhum Cliente Cadastrado</option>")
        }

    }
})

// Função responsável por realizar a inserção de dados da tabela tb_delivery

function formulario() {
    if ($("#origin").val() != "" || $("#destiny").val() != "") {
        $.ajax({
            url: "controller.php?action=newDelivery",
            method: "POST",
            data: {
                deliveryman_id: $("#deliveryman_id").val(),
                client_id: $("#client_id").val(),
                destiny: $("#destiny").val(),
                destiny_link: $("#destiny_link").val(),
                origin: $("#origin").val(),
                origin_link: $("#origin_link").val(),
                status_id: $("#status_id").val(),
                id_delivery: $("#id_delivery").val()
            },
            success: (data) => {
                //limpa os campos do formulário
                $("#destiny").val(""),
                $("#destiny_link").val(""),
                $("#origin").val(""),
                $("#origin_link").val(""),
                $("#editModal").modal('toggle')
                $("#mensagem").html("<p class='alert alert-success'>Nova Ordem de Entrega Realizada</p>")
            }
        })
    } else {
        $("#mensagem").html("<p class='alert alert-danger'>Preencha os campos corretamente</p>")
    }
}

//Cadastra os Usuários (Cliente/Entregador)
function formUsers() {
    //Cadastra o Cliente
    if ($("#user_perfil").val() === "1") {

        if ($("#name").val() != "" || $("#email").val() != "") {
            $.ajax({
                url: "controller.php?action=newClient",
                method: "POST",
                data: {
                    name_client: $("#name").val(),
                    email_client: $("#email").val(),
                    phone_client: $("#phone").val(),
                },
                success: (data) => {
                    $("#mensagem").html("<p class='alert alert-success'>" + data + "</p>")
                    $("#name").val(""),
                        $("#email").val(""),
                        $("#phone").val("")
                }
            })
        } else {
            $("#mensagem").html("<p class='alert alert-danger'>Preencha os campos corretamente</p>")
        }
        //Cadastra o Funcionário
    } else if ($("#user_perfil").val() === "2") {

        if ($("#name").val() != "" || $("#email").val() != "") {
            $.ajax({
                url: "controller.php?action=newDeliveryman",
                method: "POST",
                data: {
                    name_deliveryman: $("#name").val(),
                    email_deliveryman: $("#email").val(),
                    phone_deliveryman: $("#phone").val(),
                },
                success: (data) => {
                    $("#mensagem").html("<p class='alert alert-success'>" + data + "</p>")
                    $("#name").val(""),
                        $("#email").val(""),
                        $("#phone").val("")
                }
            })
        } else {
            $("#mensagem").html("<p class='alert alert-danger'>Preencha os campos corretamente</p>")
        }
    } else {
        $("#mensagem").html("<p class='alert alert-danger'>Selecione um perfil</p>")
    }
}


//Função responsável por trazer os dados da ordem de entrega
 
function findEditDelivery(id) {
    $.ajax({
        url: "controller.php",
        method: "GET",
        data: { action: "findDelivery", id: id },
        success: (data) => {
            let dados = JSON.parse(data)
            $("#status_id").val(dados[0].status_id)
            $("#deliveryman_id").val(dados[0].deliveryman_id)
            $("#id_delivery").val(dados[0].id_delivery)
            $("#client_id").val(dados[0].client_id)
            $("#destiny").val(dados[0].destiny)
            $("#destiny_link").val(dados[0].destiny_link)
            $("#origin").val(dados[0].origin)
            $("#origin_link").val(dados[0].origin_link)
        }
    })
}
//Função responsável por trazer os dados da ordem de entrega e carregar o modal de visualização
function findViewDelivery(id) {
    let content = "";
    $.ajax({
        url: "controller.php",
        method: "GET",
        data: { action: "findDelivery", id: id },
        success: (data) => {
            let dados = JSON.parse(data)
            content += "<h3>#" + dados[0].id_client + " " + dados[0].name_client + "</h3>" +
                "<p>" +
                "ID da Entrega: " + dados[0].id_delivery + "</br>" +
                "E-mail: " + dados[0].email_client + "</br>" +
                "Telefone: " + dados[0].phone_client + "</br>" +
                "Origem: " + dados[0].origin + "</br>" +
                "Destino: " + dados[0].destiny + "</br>" +
                "Pedido realizado: " + formataData(dados[0].created_at) + " às " + formataHora(dados[0].created_at) + "</br>" +
                // "Última Atualização: " +dados[0].updated_at+"</br>"+
                "Status do Pedido: <strong class='badge text-dark bg-" + dados[0].classe + "'>" + dados[0].situation + "</strong>" +
                "<h4> Entregador: " + dados[0].name_deliveryman + "</h4>" +
                "<p> Telefone: " + dados[0].phone_deliveryman + "</br>" +
                "Email: " + dados[0].email_deliveryman + "</br>" +
                "</p>"
            $("#detail").html(content)
            console.log(data)

        }
    })
}
/**
 * 
 */
function formataData(dia) {
    formatDia = new Date(dia);
    newData = formatDia.toLocaleDateString('pt-br', { timezone: "UTC" })
    return newData
}
/**
 * 
 */
function formataHora(hora) {
    formatHora = new Date(hora);
    newTime = formatHora.toLocaleTimeString('pt-br', { timezone: "UTC" })
    return newTime
}
