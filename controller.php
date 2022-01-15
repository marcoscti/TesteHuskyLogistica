<?php
require "autoload.php";

use App\Model\Client;
use App\Model\Delivery;
use App\Model\Deliveryman;
use App\Model\Status;

if (isset($_GET['action'])) {

    switch ($_GET['action']) {
        case "index":
            //Trazer os dados das ordems de entrega
            $entrega = new Delivery();
            if (count($entrega->list()) > 0) {
                echo json_encode($entrega->list());
            } else {
                echo "false";
            }
            break;
        case "indexClient":
            //Trazer os dados dos clientes
            $client = new Client();
            if (count($client->list()) > 0) {
                echo json_encode($client->list());
            } else {
                echo "false";
            }
            break;
            case "indexDeliveryman":
                //Trazer os dados dos clientes
                $dman = new Deliveryman();
                if (count($dman->list()) > 0) {
                    echo json_encode($dman->list());
                } else {
                    echo "false";
                }
                break;
        case "newDelivery":
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $e = new  Delivery();
                $data = [
                    $_POST['deliveryman_id'],
                    $_POST['client_id'],
                    $_POST['destiny'],
                    $_POST['origin'],
                ];

                if (isset($_POST['id_delivery']) && !empty($_POST['id_delivery']) && isset($_POST['status_id']) && !empty($_POST['status_id'])) {

                    array_push($data, $_POST['status_id'], $_POST['id_delivery']);

                    //echo json_encode($data);
                    if ($e->update($data)) {
                        echo "Atualização Realizada";
                    } else {
                        echo "Atualização Inválida";
                    }
                } else {
                    $e->insert($data);
                    echo "Entrega registrada com sucesso";
                }
            }
            break;
        case "newClient":
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $client = new Client();

                $data = [
                    $_POST['name_client'],
                    $_POST['phone_client'],
                    $_POST['email_client'],
                ];

                if ($client->insert($data)) {
                    echo "Cliente registrado com sucesso";
                } else {
                    echo "Atualização Inválida";
                }
            }
            break;
        case "newDeliveryman":
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $delivaryman = new Deliveryman();

                $data = [
                    $_POST['name_deliveryman'],
                    $_POST['phone_deliveryman'],
                    $_POST['email_deliveryman'],
                ];

                if ($delivaryman->insert($data)) {
                    echo "Entregador registrado com sucesso";
                } else {
                    echo "Atualização Inválida";
                }
            }
            break;
        case 'listClient':
            $client = new Client();

            if (count($client->list()) > 0) {
                echo json_encode($client->list());
            } else {
                echo json_encode("Nenhum cliente");
            }
            break;
        case 'listDeliveryman':
            $delivaryman = new Deliveryman();

            if (count($delivaryman->list()) > 0) {
                echo json_encode($delivaryman->list());
            } else {
                echo json_encode("Nenhum Entregador encontrado");
            }
            break;
        case 'listStatus':
            $status = new Status();

            if (count($status->list()) > 0) {
                echo json_encode($status->list());
            } else {
                echo json_encode("Nenhum staus");
            }
            break;
        case 'findDelivery':
            $delivery = new Delivery();
            echo json_encode($delivery->find($_GET['id']));
            break;
    }
} else {
    echo "Requisição inválida";
}
