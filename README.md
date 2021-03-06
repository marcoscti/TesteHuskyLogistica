# Teste Desenvolvedor PHP FullStack Jr. (Husky Logística)
## 1. O que foi proposto?
O objetivo do teste é desenvolver um painel onde seja possível:
- [x] Criar entregas
- [x] Consultar entregas
- [x] Editar entregas
- [x] Alterar o status de entregas
- [x] Atribuir entregadores às entregas.
### 1.1. Alguns pontos importantes a serem observados:
- Na consulta de entregas deve ser possível fazer filtrar as entregas por status e
entregador
- O UX do painel fica a cargo de você;
- Você pode estruturar o código em um monorepo, porém frontend e o backend
devem ser aplicações separadas;
- O backend deve ser desenvolvido em PHP;
- O frontend deve ser desenvolvido em Javascript, e não pode conter código
escrito PHP;
- Na camada de dados, deve ser utilizado MySQL;

## 2. Como fazer o Deploy?
1. Faça o download dos arquivos do repositório
2. Execute o Arquivo ***husk_db.sql*** que está na raiz do projeto, o arquivo já está configurado basta importá-lo no seu gerenciador do mysql.
3. Se o seu Banco de dados local possuir senha, acesse a pasta: ***App/Model*** e abra o arquivo: ***Conexao.php***, e altere o valor atribuído aos atributos $host,$dbname,$username e $password:

``` <?php

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
```
## 3. Observações
*O Sistema vai com alguns dados cadastrados, é possível cadastrar novos entregadores e clientes para dessa forma criar as entregas*
