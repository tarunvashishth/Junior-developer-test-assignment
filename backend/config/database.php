<?php

class Database
{
    private $hostname;
    private $dbname;
    private $username;
    private $password;

    private $conn;

    public function connect()
    {
        $this->hostname = "localhost";
        $this->dbname = "scandiweb";
        $this->username = "root";
        $this->password = "";

        $this->conn = new mysqli($this->hostname, $this->username, $this->password, $this->dbname);
        if ($this->conn->connect_errno) {
            print_r($this->conn->connect_error);
            exit;
        } else {
            return $this->conn;
        }
    }
}

$db = new Database();

$db->connect();
