<?php
require "./opdracht/config.inc.php";


$data = array();
parse_str($_POST['data'], $data);

$id = $data['id'];

$query = "DELETE FROM `back2_leden` WHERE `id`=$id";

if ($link->query($query)) {
    echo "OK";
    
} else{
    echo "ERROR";
}