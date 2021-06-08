$(document).ready(function () {
    $('#accueil').modal('show')
});

let currentPlayer, currentScore, globalScore1, globalScore2, diceResult

// Variables from DOM:
    // Player1
    let player1 = document.getElementById('player1')
    let globalScoreP1 = document.getElementById('scorePlayer1')
    let currentScoreP1 = document.getElementById('current1')

    // Player2
    let player2 = document.getElementById('player2')
    let globalScoreP2 = document.getElementById('scorePlayer2')
    let currentScoreP2 = document.getElementById('current2')

    // buttons
    let newGameBtn = document.getElementById('newGame')
    let rollDiceBtn = document.getElementById('rollDice')
    let holdBtn = document.getElementById('hold')

    // dice results :
    let diceFace = document.getElementById('diceResult')


// functions :
    // gameInit
    function init(){
        // tous les scores à 0
        currentScore = globalScore1 = globalScore2 = 0

        // tous les scores affichés en HTML
        globalScoreP1.textContent = '0'
        globalScoreP2.textContent = '0'
        currentScoreP1.textContent = '0'
        currentScoreP2.textContent = '0'

        // unitialise le currentPlayer à 0
        currentPlayer = 0

        // écouteurs d'événement sur les boutons
        holdBtn.addEventListener('click', hold)
        rollDiceBtn.addEventListener('click', rollDice)
        newGame.addEventListener('click', reset)
    }

    // nextPlayer
    function nextPlayer(){
        // currentScore à 0
        currentScore = 0

        // currentScore à 0 en HTML
        currentScoreP1.textContent = '0'
        currentScoreP2.textContent = '0'

        // changer le currentPlayer
        currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0

        // changer les classes avec classList.toggle()
        document.querySelector('#player1 i').classList.toggle('active')
        document.querySelector('#player2 i').classList.toggle('active')
        document.querySelector('#player1 i').classList.toggle('d-none')
        document.querySelector('#player2 i').classList.toggle('d-none')
    }

    // rollDice
    function rollDice(){
        // générer nombre aléatoire entre 1 et 6 dans diceResult
        diceResult = Math.floor(Math.random()*Math.floor(6)) +1

        diceFace.innerHTML = '<img src="images/de-'+diceResult+ '.png" alt="dé, face ' + diceResult +'">'


        // si diceResult !=1, ajouter le résultat au current et l'afficher en HTML
        // sinon, appeler nextPlayer()
        if(diceResult !=1) {
            currentScore += diceResult
            currentPlayer === 0 ? currentScoreP1.textContent = currentScore : currentScoreP2.textContent = currentScore
        } else {
            nextPlayer()
        }
        
    }

    // hold
    function hold(){
        // ajouter le currentScore au globalScore du currentPlayer
        // afficher les scores en HTML
        if (currentPlayer ===0){
            globalScore1 += currentScore
            globalScoreP1.textContent = globalScore1
        } else {
            globalScore2 += currentScore
            globalScoreP2.textContent = globalScore2
        }

        // appeler checkScore pour déterminer s'il y a un gagnant
        checkScore()
    }

    // checkScore
    function checkScore(){
        // si globalScore1 ou 2 >= 100 :
        // afficher en HTML : WINNER!
        // enlever les écouteurs d'événement
        // arrêter la propagation des événements

        // sinon, appeler nextPlayer()
        let audio = new Audio('./audio/clap.mp3');

        if (globalScore1 >= 100){
            player1.textContent = "WINNER!"
            player1.innerHTML = "<span style='color: #CF2D2D' class='fw-bold'>WINNER!!</span>"
            audio.play();
            holdBtn.removeEventListener('click', hold)
            rollDiceBtn.removeEventListener('click', rollDice)
            e.stopPropagation()
        }
        if (globalScore2 >= 100){
            player2.innerHTML = "<span style='color: #CF2D2D' class='fw-bold'>WINNER!!</span>"
            audio.play();
            holdBtn.removeEventListener('click', hold)
            rollDiceBtn.removeEventListener('click', rollDice)
            e.stopPropagation()
        } else {
            nextPlayer()
        }



    }

    // reset
    function reset(){
        // remettre les bonnes classes en HTML aux 2 joueurs
        player1.innerHTML = 'JOUEUR 1 <i class="bi bi-circle-fill fs-5 align-middle pb-2 ps-3 active"></i>'
        player2.innerHTML = 'JOUEUR 2 <i class="bi bi-circle-fill fs-5 align-middle pb-2 ps-3 d-none"></i>'
        // appeler init()
        init()
    }

// on lance le jeu au démarrage :
init()