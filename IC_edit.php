<?php
include 'IC_connect.php';?>
<style>
<?php include 'IC.css';?>
</style>
<?php

$id = $_POST['save_id'];
$word = $_POST['word_val']; 
$def= $_POST['def_val'];


if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	
		
		$editing = "UPDATE index_cards SET 
					word = '$word', 
					definition = '$def'
					WHERE id = '$id'";
	mysqli_query($db, $editing);
	$problem = false; 

	print "<h1>".$word.", ".$def." was just updated!</h1>";
	
	} else {
		print "fail.";
	};



?>