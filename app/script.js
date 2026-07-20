(function() {
    "use strict";

    // ----- DOM refs -----
    const playerScoreEl = document.getElementById('playerScore');
    const computerScoreEl = document.getElementById('computerScore');
    const roundMessageEl = document.getElementById('roundMessage');
    const choiceBtns = document.querySelectorAll('.choice-btn');
    const resetBtn = document.getElementById('resetBtn');

    // ----- state -----
    let playerScore = 0;
    let computerScore = 0;
    let roundActive = true;

    // ----- helpers -----
    function getComputerChoice() {
        const r = Math.random();
        if (r < 1/3) return 'rock';
        if (r < 2/3) return 'paper';
        return 'scissors';
    }

    function getRoundResult(player, computer) {
        if (player === computer) return 'draw';
        const winMap = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };
        return winMap[player] === computer ? 'win' : 'lose';
    }

    function updateUI() {
        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;
    }

    function showResultAlert(playerChoice, computerChoice, result) {
        const emojis = {
            rock: '🪨',
            paper: '📄',
            scissors: '✂️'
        };
        const playerEmoji = emojis[playerChoice] || '❓';
        const computerEmoji = emojis[computerChoice] || '❓';

        let resultText = '';
        let alertTitle = '';
        let alertMessage = '';

        if (result === 'win') {
            resultText = '🎉 You win!';
            alertTitle = '🎉 You win!';
            alertMessage = `You chose ${playerEmoji} · Computer chose ${computerEmoji}`;
        } else if (result === 'lose') {
            resultText = '😵 You lose!';
            alertTitle = '😵 You lose!';
            alertMessage = `You chose ${playerEmoji} · Computer chose ${computerEmoji}`;
        } else {
            resultText = '🤝 Draw!';
            alertTitle = '🤝 Draw!';
            alertMessage = `Both chose ${playerEmoji}`;
        }

        roundMessageEl.innerHTML = `
            <span>${playerEmoji}</span>
            <span class="versus">vs</span>
            <span>${computerEmoji}</span>
            <span style="margin-left:0.5rem;">·</span>
            <span class="highlight">${resultText}</span>
        `;

        alert(`✨ ${alertTitle} ✨\n\n${alertMessage}`);
    }

    function playRound(playerChoice) {
        if (!roundActive) return;
        roundActive = false;

        const computerChoice = getComputerChoice();
        const result = getRoundResult(playerChoice, computerChoice);

        if (result === 'win') {
            playerScore += 1;
        } else if (result === 'lose') {
            computerScore += 1;
        }

        updateUI();
        showResultAlert(playerChoice, computerChoice, result);

        setTimeout(() => {
            roundActive = true;
        }, 200);
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        updateUI();
        roundMessageEl.innerHTML = `<span>🔄</span> game reset · choose your move`;
        roundActive = true;
        alert('🔄 Game has been reset!');
    }

    // ----- attach events -----
    choiceBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const choice = this.dataset.choice;
            if (choice) {
                playRound(choice);
            }
        });
    });

    resetBtn.addEventListener('click', resetGame);

    // Keyboard support: 1,2,3 for rock,paper,scissors
    document.addEventListener('keydown', function(e) {
        const key = e.key;
        let choice = null;
        if (key === '1') choice = 'rock';
        else if (key === '2') choice = 'paper';
        else if (key === '3') choice = 'scissors';
        if (choice) {
            const btn = document.querySelector(`.choice-btn[data-choice="${choice}"]`);
            if (btn) btn.click();
        }
    });

    // init
    roundMessageEl.innerHTML = `<span>👋</span> click a move · or press 1,2,3`;
    updateUI();
})();