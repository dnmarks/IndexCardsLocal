<?php include 'IC_connect_Local.php';?>
<style>
	<?php include 'IC.css';?>
</style>
<?php

$query = 'SELECT * FROM index_cards';
$result = mysqli_query($db, $query);
$row = mysqli_fetch_all($result, MYSQLI_NUM);

foreach ($row as $index => $values){
	$card_id = $values[0];
	$card_word = $values[1];
	$card_def = $values[2];
	
	//the id to addedWord is the ID in the table. each print is the whole row of ID, word, & definition. this is so that when editing a word or def, it can reference the ID in mysql to make the changes
	print "<div class='modal_div'>
			<div class='addedWord' id='" . $card_id . "'> 
			<button class='btn delBtn'>
			<span class='glyphicon glyphicon-trash' aria-hidden='true'>
			</span>
			</button>
			<button class='btn edit'>
			<span class='glyphicon glyphicon-pencil' aria-hidden='true'>
			</span>
			</button>
			<div class= 'front'>
			" . $card_word . "</div>
			<div class= 'back'>" . $card_def . "</div></div></div>";
	}

?>
