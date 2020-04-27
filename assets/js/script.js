//  Global variable
let taskList = ["","","","","","","","",""];

$(document).ready(function () {

	sounds = {
		wetclick: () => $("#wetclick")[0].play()
	}

	//  Function start displays the current date and time in the header.
	//  It also sets an interval to update the clock and time-block colors.
	function start() {

		$("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
		
		setInterval(function() {

			$("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
			
		}, 1000);

		renderTasks();
		updateColors();

		setInterval(updateColors, 60000);

	}

	//  Function renderTasks gets data from localStorage and places it in 
	//  the proper textareas.
	function renderTasks() {

		let userStorage = JSON.parse(localStorage.getItem("tasks"))
		if (userStorage !== null) {

			taskList = userStorage;

		}

		for(let i = 0; i < 9; i++) {

			$("#" + (i+9) + " textarea").text(taskList[i]);

		}

	}
		
	//  Function updateColors applies colors to textareas based on
	//  current time of day.
	function updateColors() {

		$(".row").each(function(){

			let currentHour = parseInt(moment().format("H"));
			let textareaHour = parseInt($(this, "textarea").attr("id"));

			if(textareaHour < currentHour) {
				
				$(this, "textarea").addClass("past");

			}
			else if (textareaHour > currentHour) {

				$(this, "textarea").addClass("future");
			}
			else {

				$(this, "textarea").addClass("present");

			}

		});

	}

	//  Function saveTask saves the hourly task for whichever
	//  button was clicked into the taskList and localStorage
	function saveTask() {

		let textHour = $(this).parents(".row").attr("id");
		let hourTask = $("#" + textHour + " textarea").val();
		taskList[textHour-9] = hourTask;
		localStorage.setItem("tasks", JSON.stringify(taskList));
		
	}

	//  Spinning is fun.
	function oneSpin() {

		let a = $(this).find("i");
		let b = $("#" + parseInt($(this).parents(".row").attr("id")) + " p");
		a.addClass("spin");
		b.addClass("spin");
		setTimeout(function(){
			a.removeClass("spin");
			b.removeClass("spin");
		 },1000);

	}

	$(".saveBtn").click(saveTask).click(sounds.wetclick).click(oneSpin);
	$(".row").last().css("margin-bottom", "100px");
	start();

});