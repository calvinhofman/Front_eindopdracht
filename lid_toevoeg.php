<?php
require "./opdracht/config.inc.php";


$data = array();
parse_str($_POST['data'], $data);

$active = $data['active'];
$band_name = $data['band_name'];
$total_members = $data['total_members'];
$start_date = $data['start_date'];
$genre = $data['genre'];

$query = "INSERT INTO `back2_leden` (`active`, `band_name`, `total_members`, `start_date`, `genre`) 
            VALUES ('$active', '$band_name', '$total_members', '$start_date', '$genre')";   

if ($link->query($query)) {
    echo "OK";
    
} else{
    echo "ERROR";
}