<?php
$db = mysqli_connect('107.180.57.111', 'deasia', 'Deadfly2k');
if ($db){
	//print "Connected! ";
	//$create_db = mysqli_query($db, 'CREATE DATABASE dm6_cards');
	$select_db = mysqli_select_db($db, 'dm6_cards');
} else {
	//print "Could not connect! ";
}

if (/*$create_db &&*/ $select_db) {
	$table_query = 'CREATE TABLE index_cards (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	word VARCHAR(100), 
	definition VARCHAR(100)
	)';
	mysqli_query($db, $table_query);
	$problem = false; 
	
	if(!$problem){
		//print "Your table has been created";
	};
} else {
	print "Could not create table...";
};


?>