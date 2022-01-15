<?php

namespace App\Model;

use App\Model\Sql;

class Deliveryman
{
    public function insert($data)
    {

        $sql = "INSERT INTO tb_deliveryman(name_deliveryman, phone_deliveryman, email_deliveryman) VALUES(?,?,?)";
        if (Sql::setData($sql, $data)) {
            return true;
        } else {
            return Sql::setData($sql, $data);
        }
    }
    public function list()
    {
        $sql = "SELECT * FROM tb_deliveryman";
        $list = Sql::getList($sql);
        return $list;
    }
}
