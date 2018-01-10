/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 and two dice in a row = 6, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach setted points on GLOBAL score wins the game

*/

var scores,     /* array for total scores for 2 players*/
roundScore,     /* current score for the player */
activePlayer,   /* current player, 0 or 1 */
gamePlaying, 
lastdice,
winningScore,
input;

init();         // initialise the game
var min = 1;    // min and max dice values
var max = 7;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        input.disabled = true;
        // throw the dice
        var dice = Math.floor( Math.random() * (max - min) + min);
        var diceDOM = document.querySelector('.dice');
    
        // display the dice
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
        if ((dice === 6 && lastdice === 6) || (dice === 1)) {
            document.getElementById('score-' + activePlayer).textContent = '0';
            scores[activePlayer] =0;
            nextPlayer();
        }
        else { 
            roundScore += dice; // update the round score
            document.getElementById('current-' + activePlayer).textContent = roundScore;        // display the round score
        };

        lastdice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if (gamePlaying) {
        /* Add CURRENT SCORE to GLOBAL score of the user */
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        if (input.value) {
            winningScore = input.value;
        } else {
            winningScore = 20;
        }

        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-'+activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    input = document.querySelector('.final-score');
    input.disabled = false;

    // hide the dice, reset all the values
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    gamePlaying = true;
    lastdice = 0;
};

function nextPlayer () {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    lastdice = 0;
};