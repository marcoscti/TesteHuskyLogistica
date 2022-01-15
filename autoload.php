<?php
/**
 * Arquivo responsável por processar as requisições automáticas dos arquivos do projeto
 */
spl_autoload_register(function($classe){
    require $classe.".php";
});