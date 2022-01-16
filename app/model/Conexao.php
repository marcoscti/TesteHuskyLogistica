<?php

namespace App\Model;

class Conexao
{
    public static $conexao;
    public static $host = "localhost";
    public static $dbname = "husky_db";
    public static $username = "root";
    public static $password = "";

    public static function conectar()
    {
        if (!isset(self::$conexao)) {
            self::$conexao = new \PDO("mysql:host=" . self::$host . ";dbname=" . self::$dbname . ";charset=utf8", self::$username, self::$password);
            self::$conexao->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        }
        return self::$conexao;
    }
}
