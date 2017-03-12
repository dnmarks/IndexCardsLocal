$(init);

var wordVal = "";
var defVal = "";

function init(){
	//$("#addDef, #showCards").css("display", "block");

//ADD DEFINITION
	$("#addDef").click(function(){
		wordVal = $("#word").val();
		defVal = $("#def").val();	

		if (wordVal === ""){
			alert("Please enter a term.");
		} else {
			$("#def").show();
			$("#word").hide();
		}//end of if else / wordVal being empty, the showing of buttons
	});

//BACK BUTTON
	$("#back2term").click(function(){
		$("#def").hide();
		$("#word").show();
		//click_show_hide(("#button_chunk, #back2term, #finish"), "#def", "#word", ("#button_chunk, #addDef"));
	});

//PUSH OBJECTS INTO "indexCard" ARRAY VIA SET
	$("#finish").click(function(e){
		e.preventDefault();
		var $id = $("#card").attr("name");
		var $word = $("#word").val();
		var $def = $("#def").val();
		//ADD IF DEFVAL IS EMPTY-----------------------------------------------------------
		if (!($def === '')){
			$.ajax({
				type: "POST", 
				url: "IC_add_edit_Local.php", 
				data: {id: $id, word: $word, def: $def}	
			}); 
			
			$("#word, #def").val("");
			$("#card").attr("name", "");
			$("#word").show();
			$("#def").hide();
		} else {
			alert("Oops! You didn't enter a definition for" + $word + "!");
		}
		

	});

	$("#cancel").click(function(){
		$("#word, #def").val("");
		$("#card").attr("name", "");
	//	click_show_hide(("#button_chunk, #cancel, #back2term, #finish"), "#def", "#word", ("#button_chunk, #addDef"));
	});


//SHOWING ALL THE CARDS
var showCards = function showCards(){ 
	$.ajax({
		type:'POST', 
		url:'IC_show_Local.php', 
		success: function(cards){

			$("#card_div").append(cards);
			$("#card_div").slideDown("slow");
			$("#showCards").attr("disabled", "disabled");
			$(".IC_col").removeClass("col-md-12").addClass("col-md-6");

		$(".addedWord").flip(function(){ //changed this from .addedWord
			$(this).on("flip:done", function(){ //changed this from .addedWord
				$(this).parent('.modal_div').toggleClass('modal');
				$(this).children('.back').toggleClass('selected').css({
					"height": "250px",
					"width": "400px"});
				$(this).children('button').toggleClass('icons');
			}); 
		}); //the flip goes inside the success function because it needs to be built into the code that shows the cards. all click/hover events need to go in the success function



//added word can be manipulated here w/ css
		$(".delBtn").click(function(e){
			if ($(this).siblings('.back').hasClass('selected')){ //if it's expanded to flip
				var $id = $(this).parents('.addedWord').attr('id');
				var $word = $(this).siblings('.front').text(); 
				var $def = $(this).siblings('.back').text();
				$.ajax({
					type:'POST', 
					url: 'IC_delete_Local.php', 
					data:{id: $id, word: $word, def: $def}, 
					success: function(){
						console.log('deleted!');
					} //success function
				}); //ajax call				
				$(this).parents(".modal_div").fadeOut();  //fades out the div that was deleted

			} else {
				e.stopPropagation(); //stopping the parent's flip / expand event

				var $id = $(this).parents('.addedWord').attr('id');
				var $word = $(this).siblings('.front').text(); 
				var $def = $(this).siblings('.back').text();
				$.ajax({
					type:'POST', 
					url: 'IC_delete_Local.php', 
					data:{id: $id, word: $word, def: $def}, 
					success: function(){
						console.log('deleted!');
					} //success function
				}); //ajax call				
				$(this).parent().fadeOut();  //fades out the div that was deleted

				
			}
		}); //delete button clicked
			
		$(".edit").click(function(e){ // EDIT, take to the 'add new' page with the inputs filled with what's currently there

			if ($(this).siblings('.back').hasClass('selected')){ // if it expanded to flip
				var $id = $(this).parents('.addedWord').attr('id');
				var $word = $(this).siblings('.front').text(); 
				var $def = $(this).siblings('.back').text();
				console.log('editing big');
				$("#card").attr("name", $id);
				$("#word").val($.trim($word));
				$("#def").val($.trim($def));
				$(this).parent().flip(false);
			
			} else {
				e.stopPropagation(); //stopping the parent's flip / expand event

				var $id = $(this).parents('.addedWord').attr('id');
				var $word = $(this).siblings('.front').text(); 
				var $def = $(this).siblings('.back').text();
				console.log('editing small');				
				$("#card").attr("name", $id);
				$("#word").val($.trim($word));
				$("#def").val($.trim($def));

			}

		});	// end of edit button clicked
	} //show cards success function
}); //show cards ajax 
	
}; // end of show cards function

var hideCards = function hideCards(){
		$("#card_div").slideUp("fast");
		$(".addedWord").fadeOut();
		window.setTimeout( function (){
			$(".IC_col").removeClass("col-md-6").addClass("col-md-12");
			}, 600);
		$("#showCards").removeAttr("disabled");
}

$("#showCards").click(showCards); // show cards on click
	
$("#hideCards").click(hideCards);
		



}