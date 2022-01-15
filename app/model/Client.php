<?php

namespace App\Model;

use App\Model\Sql;

class Client
{
    public function insert($data)
    {
        try {
            $sql = "INSERT INTO tb_client(name_client, phone_client, email_client) VALUES (?,?,?)";
            Sql::setData($sql, $data);
            return true;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
        
    public function list()
    {
        $sql = "SELECT * FROM tb_client";
        $list = Sql::getList($sql);
        return $list;
    }
}
