<?php

namespace App\Model;

use App\Model\Sql;

class Delivery
{
    public function insert($data)
    {
        try {
            $sql = "INSERT INTO tb_delivery(deliveryman_id, client_id, destiny, origin) VALUES (?,?,?,?)";
            Sql::setData($sql, $data);
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }
    public function update($dados)
    {

        $sql = "UPDATE tb_delivery SET updated_at= current_timestamp(),deliveryman_id=?,client_id=?,destiny=?,origin=?,status_id=? WHERE id_delivery=?";

        if (Sql::setData($sql, $dados)) {
            return true;
        } else {
            return Sql::setData($sql, $dados);
        }
    }
    public function find($id)
    {
        $sql = "SELECT * FROM tb_delivery INNER JOIN tb_status ON id_status = status_id INNER JOIN tb_client ON id_client = client_id INNER JOIN tb_deliveryman ON id_deliveryman = deliveryman_id WHERE id_delivery=?";
        $list = Sql::findData($sql, array($id));
        return $list;
    }
    public function list()
    {
        $sql = "SELECT * FROM tb_delivery
        INNER JOIN tb_status ON id_status = status_id
        INNER JOIN tb_client ON id_client = client_id
        INNER JOIN tb_deliveryman ON id_deliveryman = deliveryman_id";
        $list = Sql::getList($sql);
        return $list;
    }
}
