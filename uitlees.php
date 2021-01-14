<?php
require './opdracht/config.inc.php';

//Maak de query
$query = "SELECT * FROM back2_leden";
//Voer de query uit
$result = mysqli_query($link, $query);

//Maak een lege array
$leden = [];

//lees alle rijen uit
while ($row=mysqli_fetch_array($result))
{
    $leden[] = $row;
}
//omzetten naar JSON array
$JSONarray = json_encode($leden);
//JSON array op het scherm tonen
echo $JSONarray;