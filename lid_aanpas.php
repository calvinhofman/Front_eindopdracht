<?php
require "./opdracht/config.inc.php";


$data = array();
parse_str($_POST['data'], $data);

$id = $data['id'];
$active = $data['active'];
$band_name = $data['band_name'];
// $members = $data['members'];
$start_date = $data['start_date'];
$genre = $data['genre'];
$lemembers = implode(", ", $data['lemember']);
// echo $lemembers;

$query = "UPDATE back2_leden SET active='{$active}', band_name='{$band_name}', members='{$lemembers}', genre='{$genre}', start_date='{$start_date}' WHERE id='{$id}'";

if ($link->query($query)) {
    echo "OK";
    
} else{
    echo "ERROR";
}