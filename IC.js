$(init);

var wordVal = "";
var defVal = "";

function init(){

	
		$("#addDef, #showCards").css("display", "block");
		//$("#showCards").hover(showCards());

	//ADD DEFINITION
	$("#addDef").click(function(){
		//e.preventDefault();
		wordVal = $("#word").val();
		defVal = $("#def").val();	

		if (wordVal === ""){
			alert("Please enter a term.");
		} else {
			$("#word, #addDef").delay().fadeOut();
			$("#def, #back2term, #finish").delay().fadeIn();
			$("h1").html("Define " + wordVal);
		}//end of if else / wordVal being empty, the showing of buttons
	
		
	});

//BACK BUTTON
	$("#back2term").click(function(e){
		e.preventDefault();
		$("#def, #back2term, #finish").delay().fadeOut();
		$("#word, #addDef").delay().fadeIn();
		$("h1").text("ADD A CARD");
	});

//PUSH OBJECTS INTO "indexCard" ARRAY VIA SET
	$("#finish").click(function(e){
		e.preventDefault();
		var $id = $("#card").attr("name");
		var $word = $("#word").val();
		var $def = $("#def").val();
		//ADD IF DEFVAL IS EMPTY-----------------------------------------------------------
		$.ajax({
			type: "POST", 
			url: "IC_add.php", 
			data: {id: $id, word: $word, def: $def}	
		}); 
			
		$("#def, #back2term, #finish, .addedWord, #hideCards").delay().fadeOut();
		$("#card").attr("name", "");
		$("#addNew, #showCards").delay().fadeIn();
			
	});

//ADDING A NEW CARD
	$("#addNew").click(function(){

		$("h1").html("ADD A CARD");
		$("#word, #addDef").delay().fadeIn();
		$("#addNew").delay().fadeOut();
		$("#word, #def").val("");
		$(".addedWord").delay().fadeOut();
		$(".defs").hide();
	});	

	
//SHOWING ALL THE CARDS
	
var showCards = function showCards(){ 
	$.ajax({
		type:'POST', 
		url:'IC_show.php', 
		success: function(cards){
		 $("body").append(cards);
		$("#showCards").hide();
		$("#hideCards").show();
		$("#hideCards").css("display","block");
			
		$(".addedWord").flip(function(){
			$(this).click(function(){
				$(this).children('.back').addClass('selected').css({
					"height": "250px",
					"width": "400px"});
	
				$(this).children('button').toggleClass('icons');

			});
		
		}); //the flip goes inside the success function because it needs to be built into the code that shows the cards. all click/hover events need to go in the success function
			
		//added word can be manipulated here w/ css
		$(".delBtn").click(function(){
	
			var $id = $(this).parents('.addedWord').attr('id');
			var $word = $(this).siblings('.front').text(); 
			var $def = $(this).siblings('.back').text();
			$.ajax({
				type:'POST', 
				url: 'IC_delete.php', 
				data:{id: $id, word: $word, def: $def}, 
				success: function(){
					console.log('deleted!');
				} //success function
		}); //ajax call				
			$(this).parent().fadeOut(); //fades out the div that was deleted
		}); //delete button clicked
			
		$(".edit").click(function(){ // EDIT, take to the 'add new' page with the inputs already filled with what's currently there
			var $id = $(this).parents('.addedWord').attr('id');
			var $word = $(this).siblings('.front').text(); 
			var $def = $(this).siblings('.back').text();
			console.log('editing?');
			$("h1").html("EDIT A CARD");
			$("#word, #addDef").delay().fadeIn();
			$("#card").attr("name", $id);
			//disable the save button until def is entered
			$("#addNew, .addedWord, .defs, #finish, #hideCards").delay().fadeOut();
			$("#word").val($.trim($word));
			$("#def").val($.trim($def));
		});	// end of edit button clicked
			
		} //show cards success function
}); //show cards ajax 
	
}; // show cards function
				
	
$("#showCards").click(showCards); // show cards on click
	
$("#hideCards").click(function(){
		$(".addedWord, #hideCards").hide();
		$("#showCards").show();

	});

/*	

	
//SAVE CLICK	
$("#save").click(function(e){ 
	e.preventDefault();
		var $save_id = $("#card").attr('name');
		var $word_val = $("#word").val();
		var $def_val = $("#def").val();
		console.log("On click");
		//ajax gets edit.php file
		$.ajax({
			type: 'POST', 
			url: 'IC_edit.php', 
			data: {save_id: $save_id, word_val: $word_val, def_val: $def_val}, 
			success: function(){
				$("#save").attr("name", "");
				$("#def, #finish, button, #edit_form").delay().fadeOut();
				$("#addNew, #showCards").delay().fadeIn();
				//enable the save button I guess
				console.log($save_id, $word_val, $def_val);
			}//end of ajax edit success function
		});//end of edit ajax call
	});	//end of save changes click			

	
	
	
	
	
	
	
	
	
	
	

	$("#showCards").click(function(){
			
			//add the attribute "disabled" = "disabled" so that you don't double the cards when you click to show
			$("#showCards").hide();
			$("#hideCards").show();
			$("hideCards").css("display","block");

			var wordDBRef = snapshot; //SNAPSHOT OF .../INDEXCARDS
			var wordData = snapshot.val();
			
			//PUTTING WORD/DEF DATA INTO THE DIVS
			for( var word in wordData ) {
			
				var wordDef = wordDBRef.child(word + "/definition").val();

				var newDiv = $("<div class='addedWord'>").css({
					"display": "-webkit-flex",
    				"display": "inline-flex",
				    "-webkit-flex-wrap": "wrap",
				    "flex-wrap": "wrap",
				    "align-items" : "stretch",
				});
					var divFront = $("<div class= 'front'><button class='btn btn-danger delBtn'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>" + "<br>" + word + "</div>");
					var divBack = $("<div class= 'back'>").html("<br>" + wordDef);

				newDiv
					//append 2 new (inner) divs that shows the word & def
					.append(divFront, divBack)
					.appendTo("body"); 

			}

		
			
		$("<div></div>").appendTo("body");
			//$("#showCards").hide();
			
		$(".addedWord").flip();

		//DELETING A CARD
	$(".glyphicon").click(function(){
	//create variable for what is selected
	var toDelete = $(this).parent().parent().clone().children().remove().end().text();
	console.log(toDelete);
	//put variable in firebase data ref
	var wordToDelete = firebase.database().ref("indexCards/" + toDelete);
	
	var conf = confirm("Delete " + ' " '+ toDelete +' " '+ "?"); // confirm = ok or cancel
	if (conf == true){
		wordToDelete.remove().then(function(){
		//add class selected to the grandparent of "this"
		console.log("deleted");
		});	
		$(this).parent().parent().addClass('deletedCard');

	}
	//function ends with showing all cards
	//$(".addedWord").hide();
	//$(".addedWord").show();
	});	


			
		});
	});
};



//showCards();
*/

}
