function randomize_deck() {
	var ul = document.querySelector('ul');
	for (var i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);
	};
	document.getElementById("timer").innerHTML= "Time: 0:00 seconds";
	update_deck("refresh");

};

function update_deck(message) {
	document.querySelector('.winning_screen').style.visibility="hidden";
	if (message=="refresh" || message==null){
		chosen=0;
		clearInterval(timing);
		moves=0;
		const cards=document.getElementById('deck').children;
		for (var i=0; i<cards.length; i++){
			cards[i].className="card";
			document.getElementById("timer").innerHTML= "Time: 0:00 seconds";
		};
		document.getElementById('moves').innerHTML=moves+ " moves";
		update_stars();
	};
};

function compare_pair(c_one, c_two) {
		if (c_one.innerHTML==c_two.innerHTML) {
			c_one.className="card matched";
			c_two.className="card matched";
		} else {
			c_one.className="card unmatched";
			c_two.className="card unmatched";
			setTimeout(function() {
				c_one.className="card";
				c_two.className="card";}, 1250);
		}
		if (document.querySelectorAll('.matched').length== 16) {
			endTime=performance.now();
			clearInterval(timing);
			setWinningScreen();		
		};
};

function picked_cards(evt) {
	evt.preventDefault();
	console.log(chosen);
	console.log(timing);
	if (chosen==0) {
		document.getElementById("timer").innerHTML= "Time: 0:00 seconds";
		startTime= performance.now();
		timing = setInterval(updateTime, 1200);

	}
	if (evt.target.id == "deck" ) {
		evt.target.style.animation="shake 1s";
		evt.target.id="deck";
	} else if (evt.target.className == "card matched") {
		let text_content=evt.target.innerHTML;
		evt.target.innerHTML="Already matched";
		evt.target.className="card unmatched";
		setTimeout(function() {
			evt.target.innerHTML=text_content;
			evt.target.className="card matched";
		}, 1500);
	} else {
		evt.target.className="card picks";
		chosen++
		if (chosen % 2 ===1 ) {
			setTimeout(function() {
				let card1=document.querySelectorAll('.picks')[0];
			}, 1250);
		} else if (chosen % 2 === 0) {
				setTimeout(function() {
					let card1=document.querySelectorAll('.picks')[0];
					let card2=document.querySelectorAll('.picks')[1];
					update_moves();
					compare_pair(card1, card2);
				}, 1250);
		}}};

function update_moves() {
	moves++;
	if (moves == 1) {
		document.getElementById('moves').innerHTML=moves+" move ";
	} else {
		document.getElementById('moves').innerHTML=moves+" moves ";
		update_stars();
	};
};

function update_stars() {
	if (moves<10) {
		document.getElementById('1st_star').innerHTML="&#9733;"
		document.getElementById('2nd_star').innerHTML="&#9733;"
		document.getElementById('3rd_star').innerHTML="&#9733;"
	}
	if (moves>10 && moves <=15) {
			document.getElementById('3rd_star').innerHTML="&#9734;"
		};
	if (moves>=15 && moves <20) {
			document.getElementById('2nd_star').innerHTML="&#9734;"
		};
	if (moves >=20) {
			document.getElementById('1st_star').innerHTML="&#9734;"
		};

};

function updateTime() {
	let seconds = Math.floor(((performance.now()-startTime)% (1000 * 60)) / 1000);
	let minutes = Math.floor((performance.now()-startTime)/(1000 * 60));
	document.getElementById("timer").innerHTML="Time: " + 
	minutes + ":" + seconds + " seconds";
	console.log("still running");
	};



function setWinningScreen() {
	console.log("you won!");
	document.querySelector('.winning_screen').style.visibility="visible";
	document.getElementById('stats_moves').innerHTML= "Moves: " + moves + " moves";
	const star1=document.getElementById('1st_star').innerHTML;
	const star2=document.getElementById('2nd_star').innerHTML;
	const star3=document.getElementById('3rd_star').innerHTML;
	document.getElementById('stats_stars').innerHTML = "Stars:" + star1 +star2+ star3;
	let end_seconds = Math.floor((endTime-startTime)% (1000 * 60) /1000);
	let end_minutes = Math.floor((endTime-startTime)/(1000 * 60));
	document.getElementById('stats_time').innerHTML= "Time: " + end_minutes + ":" + end_seconds + " seconds";//change time
};


//initiate game by randomizing deck

let chosen=0;
let moves=0;
let startTime;
let endTime;
let timing;

randomize_deck();


//add event listener for clicks and point to function
const deck=document.getElementById('deck');
const refresh_button=document.getElementById('refresh');
const play_again_button=document.getElementById('play_again');

deck.addEventListener('click', picked_cards);
refresh_button.addEventListener('click', randomize_deck);
play_again_button.addEventListener('click', randomize_deck);
deck.addEventListener('touchstart', picked_cards)
refresh_button.addEventListener('touchstart', randomize_deck);
play_again_button.addEventListener('touchstart', randomize_deck);




