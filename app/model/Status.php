<?php

namespace App\Model;

use App\Model\Sql;

class Status
{
    
    public function list()
    {
        $sql = "SELECT * FROM tb_status";
        $list = Sql::getList($sql);
        return $list;
    }
}
