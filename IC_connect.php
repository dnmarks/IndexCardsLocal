<?php

$db = mysqli_connect('localhost', 'root', '');
if ($db){
	//print "Connected! ";
	$create_db = mysqli_query($db, 'CREATE DATABASE cards');
	$select_db = mysqli_select_db($db, 'cards');
} else {
	print "Could not connect! ";
}

if ($create_db && $select_db) {
	$table_query = 'CREATE TABLE index_cards (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	word VARCHAR(100), 
	definition VARCHAR(100)
	)';
	mysqli_query($db, $table_query);
	$problem = false; 
	
	if(!$problem){
		print "Your table has been created";
	};
} else {
//	print "Could not create table...";
};


?>