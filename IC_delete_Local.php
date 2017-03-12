<?php include 'IC_connect_Local.php';?>
<style>
	<?php include 'IC.css';?>
</style>
<?php

$id = $_POST['id'];
$word = $_POST['word'];
$def = $_POST['def'];
$query = 'DELETE FROM index_cards WHERE id ='.$id.'';
$result = mysqli_query($db, $query);

if ($result){
	print "ok" .$word.", ".$def." was deleted.";
}

?>