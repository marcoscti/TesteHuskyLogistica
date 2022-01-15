
$(document).ready(()=>{
    listarDados()
})
function listarDados() {
    
        $.ajax({
            url: "controller.php",
            method: "GET",
            data: { action: "indexClient" },
            success: (data) => {
                let content = ""
                let tabela = "<table class='table table-bordered dataTable' id='dataTable' width='100%' cellspacing='0'role='grid' aria-describedby='dataTable_info'><thead><th>ID</th><th>Nome</th><th>E-mail</th><th>Telefone</th></thead><tbody>";
                //Converter os dados do bd em json
                const cli = JSON.parse(data)
                if (cli != false) {
                    for (let i in cli) {
                        content += "<tr>" +
                            "<td>" + cli[i].id_client + "</td>" +
                            "<td>" + cli[i].name_client + "</td>" +
                            "<td>" + cli[i].email_client + "</td>" +
                            "<td>" + cli[i].phone_client + "</td>"
                    }

                    $("#data_list").html(tabela + content + "</tbody></table>")

                } else {
                    $("#mensagem").html("<p class='alert alert-danger'>Nenhuma ordem de entrega registrada!</p>");
                }

            }
        })
    
        $.ajax({
            url: "controller.php",
            method: "GET",
            data: { action: "indexDeliveryman" },
            success: (data) => {
                let content = ""
                let tabela = "<table class='table table-bordered dataTable' id='dataTable' width='100%' cellspacing='0'role='grid' aria-describedby='dataTable_info'><thead><th>ID</th><th>Nome</th><th>E-mail</th><th>Telefone</th></thead><tbody>";
                //Converter os dados do bd em json
                const cli = JSON.parse(data)
                if (cli != false) {
                    for (let i in cli) {
                        content += "<tr>" +
                            "<td>" + cli[i].id_deliveryman + "</td>" +
                            "<td>" + cli[i].name_deliveryman + "</td>" +
                            "<td>" + cli[i].email_deliveryman + "</td>" +
                            "<td>" + cli[i].phone_deliveryman + "</td>"
                    }

                    $("#data_list_deliveryman").html(tabela + content + "</tbody></table>")

                } else {
                    $("#mensagem").html("<p class='alert alert-danger'>Nenhuma ordem de entrega registrada!</p>");
                }

            }
        })
    }
