<?php
include 'IC_connect.php';?>
<style>
<?php include 'IC.css';?>
</style>
<?php

$id = $_POST['id'];
$word = $_POST['word']; 
$def= $_POST['def'];


if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	
	if (is_numeric($id)){ //if the id has something in it, e.g., the number
		$editing = "UPDATE index_cards SET 
					word = '$word', 
					definition = '$def'
					WHERE id = '$id'";
		mysqli_query($db, $editing);
		$problem = false; 
		print "<h1>".$word.", ".$def." was just updated!</h1>";
		} else {
			$adding = "INSERT INTO index_cards (
				word, definition) VALUES ('$word', '$def')";
			mysqli_query($db, $adding);
			$problem = false; 
			print "<h1>".$word.", ".$def." was just added!</h1>";
		};// ELSE ADD NEW
};// end of server request post

	

?>