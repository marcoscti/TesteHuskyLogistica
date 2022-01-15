<?php

namespace App\Model;

class Conexao
{
    public static $conexao;

    public static function conectar()
    {
        if (!isset(self::$conexao)) {
            self::$conexao = new \PDO("mysql:host=localhost;dbname=husky_db;charset=utf8", "root", "");
            self::$conexao->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        }
        return self::$conexao;
    }
}
