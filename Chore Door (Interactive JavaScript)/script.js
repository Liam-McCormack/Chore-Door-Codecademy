
//GLOBAL VARIABLES
let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
let startButton = document.getElementById("start");
let currentlyPlaying = true;


//CHECKS IF THE DOOR IS THE BOT
isBot = door => {
    if (door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
}

//DOOR CLICKABLE ONCE FUNCTION - RETURNS BOOLEAN
isClicked = door => {
    if (door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }
}


//WIN CONDITION FUNCTION
playDoor = door => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door) === true) {
        return gameOver();
    }
}

//FUNCTION TO RANDOMISE DOORS
let numClosedDoors = 3;
let openDoor1 = ''
let openDoor2 = ''
let openDoor3 = ''

randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor1 = spaceDoorPath;
        openDoor2 = botDoorPath;
        openDoor3 = beachDoorPath;
    } else if (choreDoor === 2) {
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = botDoorPath;
    }
}


//DOORS 
const doorImage1 = document.getElementById('door1');
doorImage1.onclick = function() {
    if (currentlyPlaying && !isClicked(doorImage1)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
};//Chore Bot behind a door on-click

const doorImage2 = document.getElementById('door2');
doorImage2.onclick = function() {
    if (currentlyPlaying && !isClicked(doorImage2)) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
};


const doorImage3 = document.getElementById('door3');
doorImage3.onclick = function() {
    if (currentlyPlaying && !isClicked(doorImage3)) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
};


startButton.onclick = function() { //Restarts the round once clicked
   if (!currentlyPlaying) {
    return startRound();
   }
}


startRound = () => { //RESETS THE ROUND TO START VALUES
    numClosedDoors = 3;
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

gameOver = status => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?'; //Element assigned to variable at top
    } else {
        startButton.innerHTML = 'Game over! Play again?';
    }
    currentlyPlaying = false;
}


startRound(); //Calling function to run at the END of the script

