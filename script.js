document.addEventListener('DOMContentLoaded', () => {
    const slotImages = [
        'bau.png',
        'cua.png',
        'tom.png',
        'ca.png',
        'huou.png',
        'ga.png'
    ];
    const slots = document.querySelectorAll('.slot img');
    const betImages = document.querySelectorAll('.bet-image');
    const spinButton = document.getElementById('spin-button');
    const resetButton = document.getElementById('reset-button');
    let bets = [0, 0, 0, 0, 0, 0];
    let spinning = false;

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * slotImages.length);
        return slotImages[randomIndex];
    }

    function spin() {
        if (spinning || bets.reduce((a, b) => a + b, 0) !== 3) return;
        spinning = true;
        spinButton.disabled = true;
        resetButton.disabled = true;
        betImages.forEach(image => image.style.pointerEvents = 'none');
        
        let spinsRemaining = 20; 
        const spinInterval = setInterval(() => {
            slots.forEach(slot => {
                slot.src = getRandomImage();
            });
            spinsRemaining--;
            if (spinsRemaining <= 0) {
                clearInterval(spinInterval);
                checkResult();
                spinning = false;
                resetButton.disabled = false;
                betImages.forEach(image => image.style.pointerEvents = 'auto');
            }
        }, 100); 
    }

    function checkResult() {
        const results = Array.from(slots).map(slot => slot.src);
        const betResults = slotImages.map((image, index) => ({
            image: `path/to/${image}`, 
            bet: bets[index]
        }));
        const correctGuesses = betResults.filter(result => results.includes(result.image) && result.bet > 0);
        if (correctGuesses.length > 0) {
            alert(`You right ${JSON.stringify(correctGuesses)}`);
        } else {
            alert(`WRONGGGGGGG BITCH`);
        }
    }

    function placeBet(index) {
        if (bets.reduce((a, b) => a + b, 0) < 3) {
            bets[index]++;
            betImages[index].querySelector('span').innerText = bets[index];
            if (bets.reduce((a, b) => a + b, 0) === 3) {
                spinButton.disabled = false;
            }
        }
    }

    function resetBets() {
        bets = [0, 0, 0, 0, 0, 0];
        betImages.forEach(image => {
            image.querySelector('span').innerText = 0;
        });
        spinButton.disabled = true;
    }

    spinButton.addEventListener('click', spin);
    resetButton.addEventListener('click', resetBets);

    betImages.forEach((image, index) => {
        image.addEventListener('click', () => placeBet(index));
    });

    spinButton.disabled = true;
});
