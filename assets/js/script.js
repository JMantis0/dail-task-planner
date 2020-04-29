//  Global variable
let taskList = ["","","","","","","","",""];

$(document).ready(function () {

	sounds = {
		remove: () => $("#remove")[0].play(),
		save:   () => $("#save")[0].play()
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
		if (userStorage == null) {
			$("textarea").each(function(){
				$(this).attr("placeholder", "(empty)");
			})
			return;

		}
		taskList = userStorage;
		for(let i = 0; i < 9; i++) {

			if(taskList[i] == "") {
				$("#" + (i+9) + " textarea").attr("placeholder", "(empty)");
			}
			$("#" + (i+9) + " textarea").text(taskList[i]);

		}

	}
		
	//  Function updateColors applies colors to textareas
	//  based on current time of day.
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

	//  Function saveTask saves textarea content
	//  into the taskList and localStorage
	function saveTask() {

		let hour = $(this).parents(".row").attr("id");
		let hourTask = $("#" + hour + " textarea").val();
		taskList[hour-9] = hourTask;
		localStorage.setItem("tasks", JSON.stringify(taskList));
		
	}

	//  Extra feature: Button click clears
	//  content of textarea with animation.
	function clearTask() {

		let hour = $(this).parents(".row").attr("id");
		let taskSpace = "#"+ hour + " textarea";
		$(taskSpace).addClass("animated fadeOutRight");

		setTimeout(function(){

			$(taskSpace).removeClass("animated fadeOutRight");
			$("#"+ hour + " textarea").val("");
			$(taskSpace).addClass("animated fadeIn").attr("placeholder", "(empty)");

			setTimeout(function(){

				$(taskSpace).removeClass("animated fadeIn");

			}, 1000);

		},1000);
		
	}

	//  Spinning is fun.
	function oneSpin() {

		let diskIcon = $(this).find("i");
		diskIcon.addClass("spin");	
		setTimeout(function(){
			diskIcon.removeClass("spin");
		 },1000);

	}

	//  Flash text effect
	function textFlash() {

		let hour = $(this).parents(".row").attr("id");
		let taskSpace = "#"+ hour + " textarea";
		$(taskSpace).addClass("white");
		setTimeout(function(){
			$(taskSpace).addClass("flash");
		}, 1);
		setTimeout(function(){
			$(taskSpace).removeClass("flash white");
		}, 1000);

	}

	$(".row p").addClass("rotate");
	$(".del").click(clearTask).click(sounds.remove);
	$(".saveBtn").click(saveTask).click(sounds.save).click(oneSpin).click(textFlash);
	$(".row").last().css("margin-bottom", "100px");
	start();

});