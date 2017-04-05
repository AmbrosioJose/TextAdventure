var createDungeon = function(){
	//creates the 8 by 8 array populated by the string "blank"
	var rooms = new Array(8);
	for (var i = 0; i < 8; i++){
		rooms[i]= new Array(8);
		for(var j=0; j<8; j++){
			rooms[i][j]="blank";
		}
	};

	//creates the challenges which are just enemies that must be fought
	function createChallenge(name, hitPoints, prize){

		var newChallenge={};
		newChallenge.monster=name;
		newChallenge.hitPoints=hitPoints;
		newChallenge.prize=prize;
		//this runs the challenge. The player has to input choice between 3 letters to make an "attack" on the enemy
		newChallenge.runChallenge= function(){
			return newChallenge;

		};
		return newChallenge;
	};


	//adds walls in the dungeon
	for(var i=1; i<=3;i++){
		rooms[2*i][2]="w";
	}
	//adds prizes to the dungeon
	rooms[1][1]=" Golden goblet";
	rooms[1][5]=" Ancient book";

	//adds challenges to the dungeon
	rooms[4][1]=createChallenge("Ravid Werewolf",2," new friend werewolf");
	rooms[5][1]=createChallenge("Dark Rider",2," new companion");
	rooms[1][3]=createChallenge("Ravid Knight",2," new amigo");
	rooms[3][3]=createChallenge("Dark Knight",2," new partner");
	rooms[6][3]=createChallenge("Ravid Prince",2," new buddy");
	rooms[1][6]=createChallenge("Dark Angel",2," new confidant",2);
	rooms[4][6]=createChallenge("Weeping Mummy",2," new bff");

	//function that places a string in any room in the dungeon that is blank
	var randomPlacing = function(roomName){
		do{
			var randX = Math.floor((Math.random() * 8) );
			var randY = Math.floor((Math.random() * 8) );
		}while(rooms[randX][randY]!="blank")
		rooms[randX][randY]=roomName;



	}

	//Start and goal are placed in random locations
	randomPlacing("S");
	randomPlacing("G");
	return rooms;
};

var findInLocationX= function(dungeon, room){
	for(var i=0;i<dungeon.length;i++){
		for(var j=0;j<dungeon[i].length;j++)
			if(dungeon[i][j]==room){
				return i;
			}
		}
};

var findInLocationY= function(dungeon, room){
		for(var i=0;i<dungeon.length;i++){
			for(var j=0;j<dungeon[i].length;j++)
				if(dungeon[i][j]==room){
					return j;
				}
			}

};

var createMap= function(dungeon){
	//this finds the x location in the Dungeon where the specified Room is
	var rooms = new Array(8);
	for (var i = 0; i < 8; i++){
		rooms[i]= new Array(8);
		for(var j=0; j<8; j++){
			rooms[i][j]="";
		}
	}

	for(var x=0; x<8;x++){
		for(var y=0; y<8;y++){
			if(typeof dungeon[x][y]==='object')
				rooms[x][y]="C";
			else{
				rooms[x][y]="";
				if(dungeon[x][y]==("blank"))
					rooms[x][y]=rooms[x][y]+" ";
				else if(dungeon[x][y]==("w"))
					rooms[x][y]+="W";
				else if(dungeon[x][y]==("S"))
					rooms[x][y]+="S";
				else if(dungeon[x][y]==("G"))
					rooms[x][y]+="G";
				else rooms[x][y]+="P";
			}

			rooms[x][y]+="";

		}
	}
	return rooms;
}


//Creates the table onto the Html page
function create_table() {

	var body = document.getElementsByTagName("section")[0];

	var table = document.createElement("table");
	table.setAttribute("id", "dungeon");
	var tableBody = document.createElement("tbody");

	for (var i = 0; i < 9; i++) {

		var row = document.createElement("tr");

		for (var j = 0; j < 9; j++) {

			var cell = document.createElement("td");
			var cellText;
			if(i==8&& j==8){
				cellText = document.createTextNode(" ");}
				else if(j==8){
					cellText = document.createTextNode("X: "+i);}
					else if(i==8){
						cellText = document.createTextNode("Y: "+j);}
						else {cellText =document.createTextNode(" ");}

						cell.appendChild(cellText);
						row.appendChild(cell);
					}

					tableBody.appendChild(row);
				}

  // put the <tbody> in the <table>
  table.appendChild(tableBody);
  // appends <table> into <body>
  body.appendChild(table);
  // sets the border attribute of table to 2;
  table.setAttribute("border", "2");
  table.setAttribute("style", "width:800px; margin:0 auto;");
  table.setAttribute("bordercolor", "#2B1B17");
}

//starts the game
var startGame = function(){
	document.getElementById('gameText').innerHTML+='<br>Welcome to the text Adventure!!';
	document.getElementById("gameText").innerHTML+="<br>Go forth and conquer your enemies.";
	//document.getElementById("gameText").innerHTML+="<br>The newest map is the one at the bottom";
	//document.getElementById("gameText").innerHTML+=("<br>");
	//dungeon gets created
	dungeon= createDungeon();
	//the x and y locations of the start are saved to variables
	var locXStart= findInLocationX(dungeon, "S");
	var locYStart= findInLocationY(dungeon, "S");
	//adventurer is created with starting position.
	adventurer= {hitPoints:10, locationX:locXStart, locationY:locYStart, prizes:[]};

    //the map is created.
    map =createMap(dungeon);
	//visual map is created by putting all in one string then printing on web page

	enemiesDefeated=0;

	//the locations of the goal are saved
	locXGoal= findInLocationX(dungeon, "G");
	locYGoal= findInLocationY(dungeon, "G");

};

//takes the input from button and makes takes the next position
function nextMove(axisSymbol,directionSymbol){
	turn++;
	document.getElementById('gameText').innerHTML='<h2>Turn: '+turn+'</h2>';

	var previousX=adventurer.locationX;
	var previousY=adventurer.locationY;
	var xChange=0;var yChange=0;
	var didPositionChange=false;
	onChallenge=false;
	gameWon=true;


	if(axisSymbol=="x"){
		yChange= adventurer.locationY;
		if(directionSymbol=="+")
			xChange= adventurer.locationX+1;
		else
			xChange= adventurer.locationX-1;
	}
	else  if(axisSymbol=="y"){
		xChange= adventurer.locationX;
		if(directionSymbol=="+")
			yChange= adventurer.locationY+1;
		else
			yChange= adventurer.locationY-1;
	}
	else{
		console.log("not an available option.");
		xChange= adventurer.locationX;
		yChange= adventurer.locationY;
	}


	if((xChange==-1)||(xChange==8)||(yChange==-1)||(yChange==8)){
		document.getElementById('gameText').innerHTML+='<h3>!!!!That way is blocked!!!!!</h3>';
		didPositionChange=false;


	}
	else if(map[xChange][yChange]==" "){
		map[xChange][yChange]=" ";
		document.getElementById('gameText').innerHTML+='<h3>keep going</h3>';
		didPositionChange=true;
		adventurer.locationX=xChange;
		adventurer.locationY=yChange;
				// document.write("<h3>keep moving forward</h3>");
				// document.write("<br>");
			}
			else if(map[xChange][yChange]=="W"){
				didPositionChange=false;
				var x = document.getElementById("dungeon").rows[xChange].cells;
				x[yChange].innerHTML = "W";
				document.getElementById('gameText').innerHTML+='<h3>Unable to go through walls</h3>';



			}
			else if(map[xChange][yChange]=="C"){
				didPositionChange=true;

				adventurer.locationX=xChange;
				adventurer.locationY=yChange;
				document.getElementById('gameText').innerHTML+='<h3><font color=\"#5cd65c\">You Arrived at a Challenge room. Will you take the challenge?</font></h3>';
				onChallenge=true;

			}
			else if(map[xChange][yChange]=="G"){
				didPositionChange=true;
				if(enemiesDefeated<3){
					document.getElementById('gameText').innerHTML+='<h3>You must defeat at least 3 enemies to win</h3>';
				}
				else{
					document.getElementById('gameText').innerHTML='<h1><font color=\"ffff1a\">Congrats You Won!</font> <font color=\"#ff6666\">&diams;</font> </h1>';
					$("#up").hide();
					$("#down").hide();
					$("#left").hide();
					$("#right").hide();
				}
				adventurer.locationX=xChange;
				adventurer.locationY=yChange;



			}
			else if(map[xChange][yChange]=="S"){
				didPositionChange=true;
				document.getElementById('gameText').innerHTML+='<h3>Back to the start</h3>';
				adventurer.locationX=xChange;
				adventurer.locationY=yChange;

			}

			else if(map[xChange][yChange]=="P"){
				didPositionChange=true;
				document.getElementById('gameText').innerHTML+="<h3><font color=\"#ffff4d\">you got a prize!</font></h3>";
				map[xChange][yChange]=" ";
				adventurer.locationX=xChange;
				adventurer.locationY=yChange;
				adventurer.prizes.push(dungeon[xChange][yChange]);
				adventurer.hitPoints++;
				document.getElementById('gameText').innerHTML+=("<h3>you also gained some health: <font color=\"#ff6666\">+1</font></h3>");

			}else{
				didPositionChange=false;
				alert("Error");
				var x = document.getElementById("dungeon").rows[xChange].cells;
				x[yChange].innerHTML = map[xChange][yChange];
			}

			if(didPositionChange){
				var x = document.getElementById("dungeon").rows[previousX].cells;
				x[previousY].innerHTML = "<center>"+map[previousX][previousY]+"</center>";
			}



			var x = document.getElementById("dungeon").rows[adventurer.locationX].cells;
			x[adventurer.locationY].innerHTML = "<center><font color=\"#ff6666\">&diams;</font></center>";
			document.getElementById('gameText').innerHTML+="<h3>The Hero currently has <font color=\"#ff6666\">"+ adventurer.hitPoints+" HP</font> and is in position: x=" +adventurer.locationX+" and y="+adventurer.locationY + "</h3>";
			document.getElementById('gameText').innerHTML+="<h3>The current prizes are: <font color=\"#ffff4d\">" + adventurer.prizes+"</font></h3>";
			document.getElementById('gameText').innerHTML+="<h3>Number of enemies defeated: <font color=\"#5cd65c\">" + enemiesDefeated+"</font></h3>";
		}

function buttonsVisible(){
			if(onChallenge){
				$("#yesbutton").show();
				$("#nobutton").show();
				$("#up").hide();
				$("#down").hide();
				$("#left").hide();
				$("#right").hide();
			}
			else{
				$("#yesbutton").hide();
				$("#nobutton").hide();
			}
}
function challengeAccepted(){
			currentChallenge=dungeon[adventurer.locationX][adventurer.locationY].runChallenge();
			document.getElementById('gameText').innerHTML="<h3>Currently facing: <font color=\"#5cd65c\">" +currentChallenge.monster +"</font></h3>";
			document.getElementById('gameText').innerHTML+="<h3>He has <font color=\"#5cd65c\">" +currentChallenge.hitPoints +" HP</font>. What will you do?</h3>"
			$("#yesbutton").hide();
			$("#nobutton").hide();
			$("#up").hide();
			$("#down").hide();
			$("#left").hide();
			$("#right").hide();
}

function faceCurrentChallenge(attack){
			document.getElementById('gameText').innerHTML="<h3>Currently facing: <font color=\"#5cd65c\">" +currentChallenge.monster +"</font></h3>";
			document.getElementById('gameText').innerHTML+="<h3>He has <font color=\"#5cd65c\">" +currentChallenge.hitPoints +" HP</font>. What will you do?</h3>"
			var challengeDefeated=false,criticalMove=false;
			var damageDealt=0, tempHitPoints=0;
			tempHitPoints=currentChallenge.hitPoints;
			if(attack==="sing"){
				if(currentChallenge.monster.includes("Ravid")){
					damageDealt+=2;
					criticalMove=true;
				}
				else damageDealt++;
			}
			else if(attack==="compliment"){
				if(currentChallenge.monster.includes("Dark")){
					damageDealt+=2;
					criticalMove=true;
				}
				else damageDealt++;
			}
			else{
				if(currentChallenge.monster.includes("Weeping")){
					damageDealt+=2;
					criticalMove=true;
				}
				else damageDealt++;
			}
			tempHitPoints-=damageDealt;
			document.getElementById('gameText').innerHTML+="<h3>damage dealt: <font color=\"#5cd65c\">-" + damageDealt + " HP</font></h3>";

			if(criticalMove){
				adventurer.hitPoints++;
				document.getElementById('gameText').innerHTML+="<h3>Great move you recovered <font color=\"#ff6666\">1 HP</font></h3>";
			}

			adventurer.hitPoints-=3;
			document.getElementById('gameText').innerHTML+="<h3>You took damage: <font color=\"#ff6666\">-3 HP</font></h3>";
			currentChallenge.hitPoints=tempHitPoints;
			document.getElementById('gameText').innerHTML+="<h3> Your health: <font color=\"#ff6666\">" + adventurer.hitPoints+"HP </font> enemy health: <font color=\"#5cd65c\">"+tempHitPoints+" HP</font></h3>";

			if (adventurer.hitPoints<1){
				document.getElementById('gameText').innerHTML="<h3><font color=\"#b30000\">Game over! You Died!!! &diams;</font></h3>";
				document.getElementById('gameText').innerHTML+="<h3>The Hero currently has <font color=\"#ff6666\">"+ adventurer.hitPoints+" HP</font> and is in position: x=" +adventurer.locationX+" and y="+adventurer.locationY + "</h3>";
				document.getElementById('gameText').innerHTML+="<h3>The current prizes are: <font color=\"#ffff4d\">" + adventurer.prizes+"</font></h3>";
				document.getElementById('gameText').innerHTML+="<h3>Number of enemies defeated: <font color=\"#5cd65c\">" + enemiesDefeated+"</font></h3>";
				$("#hug").hide();
				$("#compliment").hide();
				$("#sing").hide();
			}

			else if(currentChallenge.hitPoints<1){
				document.getElementById('gameText').innerHTML="<h3>Nice you conquered the <font color=\"#5cd65c\">"+currentChallenge.monster+"</font></h3>";
				$("#hug").hide();
				$("#compliment").hide();
				$("#sing").hide();
				enemiesDefeated++;
				adventurer.hitPoints+=2;
				$("#up").show();
				$("#down").show();
				$("#left").show();
				$("#right").show();
				adventurer.prizes.push(currentChallenge.prize);
				document.getElementById('gameText').innerHTML+="<h3>The Hero currently has <font color=\"#ff6666\">"+ adventurer.hitPoints+" HP</font> and is in position: x=" +adventurer.locationX+" and y="+adventurer.locationY + "</h3>";
				document.getElementById('gameText').innerHTML+="<h3>The current prizes are: <font color=\"#ffff4d\">" + adventurer.prizes+"</font></h3>";
				document.getElementById('gameText').innerHTML+="<h3>Number of enemies defeated: <font color=\"#5cd65c\">" + enemiesDefeated+"</font></h3>";
				currentChallenge.hitPoints=2;

			}
			else {}

}

	var dungeon, adventurer, enemiesDefeated=0, onChallenge, dungeonTable, map, turn=0, currentChallenge;


	$(document).ready(function(){
		$("#start").click(function(){
			$("#start").hide();

			create_table();
			startGame();
			dungeonTable = document.getElementById("dungeon");
			var inner = dungeonTable.rows[adventurer.locationX].cells;
			inner[adventurer.locationY].innerHTML = "<center>start</center>";
			$("#intro").hide();
			$("#up").show();
			$("#down").show();
			$("#left").show();
			$("#right").show();

		});

		$("#up").click(function(){
			nextMove("x","-");
			buttonsVisible();

		});

		$("#down").click(function(){
			nextMove("x","+");
			buttonsVisible();
		});

		$("#left").click(function(){
			nextMove("y","-");
			buttonsVisible();
		});

		$("#right").click(function(){
			nextMove("y","+");
			buttonsVisible();
		});

		$("#yesbutton").click(function(){
			$("#hug").show();
			$("#compliment").show();
			$("#sing").show();
			challengeAccepted();

		});

		$("#nobutton").click(function(){
			$("#yesbutton").hide();
			$("#nobutton").hide();
			$("#up").show();
			$("#down").show();
			$("#left").show();
			$("#right").show();
		});

		$("#hug").click(function(){
			faceCurrentChallenge("hug");
		});

		$("#compliment").click(function(){
			faceCurrentChallenge("compliment");
		});
		$("#sing").click(function(){
			faceCurrentChallenge("sing");
		});





	});
