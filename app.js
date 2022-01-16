const p1Button = document.querySelector('#p1add')
const p2Button = document.querySelector('#p2add')
const p1Display = document.querySelector('#p1Display')
const p2Display = document.querySelector('#p2Display')
const resetScoreButton = document.querySelector('#resetScore')
const changeNamesButton = document.querySelector('#changeNames')
const winningScoreSelect = document.querySelector('#playto')
const p1NameBox = document.querySelector('#p1Name')
const p2NameBox = document.querySelector('#p2Name')
const saveNamesButton = document.querySelector('#saveNames')
const hideOnLoad = document.querySelector('.hideOnLoad')
const winnerAnnounce = document.querySelector('#winnerAnnounce')
const scorekeeper = document.querySelector('#scorekeeper')
const gamePointRightBlock1 = document.querySelector('#gamePointRightBlock1')
const gamePointRightBlock2 = document.querySelector('#gamePointRightBlock2')
const gamePointLeftBlock1 = document.querySelector('#gamePointLeftBlock1')
const gamePointLeftBlock2 = document.querySelector('#gamePointLeftBlock2')

let p1Score = 0;
let p2Score = 0;
let winningScore = 11;
let isGameOver = false;
changeNamesButton.style.display = 'none';

p1Button.addEventListener('click', function () {
    if (!isGameOver) {
        p1Score += 1;
        gamePoint()
        if (spreadP1() >= 2 && p1Score >= winningScore) {
            isGameOver = true;
            isWinnerP1()
        }
        p1Display.textContent = p1Score;
    }
})

p2Button.addEventListener('click', function () {
    if (!isGameOver) {
        p2Score += 1;
        gamePoint()
        if (spreadP2() >= 2 && p2Score >= winningScore) {
            isGameOver = true;
            isWinnerP2()
        }
        p2Display.textContent = p2Score;
    }
})

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    // resetScore()  --Uncomment resetScore() if Lena figures out how to use it to cheat :P 
})

resetScoreButton.addEventListener('click', resetScore)
saveNamesButton.addEventListener('click', originalNames)
changeNamesButton.addEventListener('click', newNames)
p2NameBox.addEventListener('input', (e) => {
    if (p1NameBox.value !== '' && p2NameBox.value !== '') {
        saveNamesButton.removeAttribute('disabled');
    }
})

function resetScore() { //Fires when "Change Names" or "Reset" buttons are clicked.  "Change Names" is followed by more logic in newNames()
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
    p1Display.classList.remove('has-text-danger');
    p2Display.classList.remove('has-text-danger');
    p1Button.disabled = false;
    p2Button.disabled = false;
    let p1Name = p1NameBox.value.trim();
    let p2Name = p2NameBox.value.trim();
    p1Button.textContent = `Add a point for ${p1Name}!`;
    p2Button.textContent = `Add a point for ${p2Name}!`;
    p1Button.classList.remove('is-large', 'is-danger')
    p2Button.classList.remove('is-large', 'is-danger')
    gamePointLeftBlock1.classList.remove('has-background-danger')
    gamePointLeftBlock2.classList.remove('has-background-danger')
    gamePointRightBlock1.classList.remove('has-background-danger')
    gamePointRightBlock2.classList.remove('has-background-danger')
    winnerAnnounce.setAttribute("hidden", true)
    scorekeeper.removeAttribute('hidden')
    if (p1Name.value === '' || p2Name.value === '') {
        p1Button.disabled = true;
        p2Button.disabled = true;
    }

}

function originalNames() { //When the "Save Names and Play!" button is clicked...
    p1Button.disabled = false;
    p2Button.disabled = false;
    let p1Name = p1NameBox.value.trim();
    let p2Name = p2NameBox.value.trim();
    hideOnLoad.removeAttribute("hidden");
    p1Button.textContent = `Add a point for ${p1Name}!`;
    p2Button.textContent = `Add a point for ${p2Name}!`;
    changeNamesButton.style.display = 'block';
    p1NameBox.style.display = 'none';
    p2NameBox.style.display = 'none';
    saveNamesButton.style.display = 'none';
    p1Button.style.display = '';
    p2Button.style.display = '';
    resetScoreButton.style.display = '';
    changeNamesButton.style.display = '';
    scorekeeper.removeAttribute('hidden');
    if (p1Name === p2Name) {
        alert('Please choose different names!');
        newNames()
    }
}

function newNames() { //When the "Change Names" button is clicked...
    resetScore()
    p1NameBox.style.display = 'block'; //Displays player name input box 1
    p2NameBox.style.display = 'block'; //Displayers player name input box 2
    saveNamesButton.style.display = 'block'; //Displays "Save Names and Play" button
    saveNamesButton.setAttribute('disabled', true); //A listener enables this button if both names are added
    p1Button.style.display = 'none'; //Add point buttons are hidden
    p2Button.style.display = 'none'; //Add point buttons are hidden
    p1NameBox.value = ''; //Name box inputs cleared
    p2NameBox.value = ''; //Name box inputs cleared
    resetScoreButton.style.display = 'none'; //Reset Score button is hidden
    changeNamesButton.style.display = 'none'; //Change Names button is hidden
    scorekeeper.setAttribute("hidden", true); //Previous scoreboard is hidden
}

function isWinnerP1() {
    let p1Name = p1NameBox.value;
    let p2Name = p2NameBox.value;
    p1Button.textContent = `${p1Name} scored ${p1Score}!`;
    p2Button.textContent = `${p2Name} scored ${p2Score}.`;
    winnerAnnounce.textContent = `${p1Name} wins by ${spreadP1()}!`;
    winnerAnnounce.removeAttribute("hidden");
    p1Button.disabled = true;
    p2Button.disabled = true;
    p1Button.classList.remove('is-large', 'is-danger');
    p2Button.classList.remove('is-large', 'is-danger');
    gamePointLeftBlock1.classList.remove('has-background-danger')
    gamePointLeftBlock2.classList.remove('has-background-danger')
    gamePointRightBlock1.classList.remove('has-background-danger')
    gamePointRightBlock2.classList.remove('has-background-danger')
    scorekeeper.setAttribute('hidden', true);
}

function isWinnerP2() {
    let p1Name = p1NameBox.value;
    let p2Name = p2NameBox.value;
    p1Button.textContent = `${p1Name} scored ${p1Score}.`;
    p2Button.textContent = `${p2Name} scored ${p2Score}!`;
    winnerAnnounce.textContent = `${p2Name} wins by ${spreadP2()}!`
    winnerAnnounce.removeAttribute("hidden")
    p1Button.disabled = true;
    p2Button.disabled = true;
    p1Button.classList.remove('is-large', 'is-danger');
    p2Button.classList.remove('is-large', 'is-danger');
    gamePointLeftBlock1.classList.remove('has-background-danger')
    gamePointLeftBlock2.classList.remove('has-background-danger')
    gamePointRightBlock1.classList.remove('has-background-danger')
    gamePointRightBlock2.classList.remove('has-background-danger')
    scorekeeper.setAttribute('hidden', true)
}

let spreadP1 = function () {
    return p1Score - p2Score;
}

let spreadP2 = function () {
    return p2Score - p1Score;
}


function gamePoint() {
    if (spreadP1() >= 1 && p1Score >= (winningScore - 1)) {
        p1Button.textContent = `Game point for ${p1Name.value}!`;
        p1Button.classList.add('is-large', 'is-danger');
        p1Display.classList.add('has-text-danger');
        gamePointLeftBlock1.classList.add('has-background-danger');
        gamePointLeftBlock2.classList.add('has-background-danger');
    } else {
        p1Button.textContent = `Add a point for ${p1Name.value}!`;
        p1Button.classList.remove('is-large', 'is-danger');
        p1Display.classList.remove('has-text-danger');
        gamePointLeftBlock1.classList.remove('has-background-danger')
        gamePointLeftBlock2.classList.remove('has-background-danger')
    }
    if (spreadP2() >= 1 && p2Score >= (winningScore - 1)) {
        p2Button.textContent = `Game point for ${p2Name.value}!`;
        p2Button.classList.add('is-large', 'is-danger');
        p2Display.classList.add('has-text-danger');
        gamePointRightBlock1.classList.add('has-background-danger')
        gamePointRightBlock2.classList.add('has-background-danger')
    } else {
        p2Button.textContent = `Add a point for ${p2Name.value}!`;
        p2Button.classList.remove('is-large', 'is-danger');
        p2Display.classList.remove('has-text-danger');
        gamePointRightBlock1.classList.remove('has-background-danger')
        gamePointRightBlock2.classList.remove('has-background-danger')
    }
}


