function selectCharacter(page) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('selected'));

    const selectedCard = event.currentTarget;
    selectedCard.classList.add('selected');

    setTimeout(() => {
        window.location.href = page;
    }, 1000);
}

let health = 100; // Start HP
let maxHealth = 100; // Max HP
let healthBar = document.getElementById('health-bar');
let healthText = document.getElementById('health-text');

// Functie voor het aanpassen van health
function changeHealth(amount) {
    health = Math.min(maxHealth, Math.max(0, health + amount));

    healthBar.style.width = `${(health / maxHealth) * 100}%`;

    healthText.innerHTML = `HP: ${health}/100`;
    
    shakeCard(amount); // Hoe harder de hit, hoe meer de kaart schudt
    
    if (amount < 0) {
        showDamage(amount); // Schade
    } else {
        showHeal(amount); // Healing
    }
}

function shakeCard(damage) {
    let card = document.getElementById('mage-card'); // De kaart die schudt
    

    card.style.animation = 'none';
    
    card.offsetHeight; // Dit zorgt ervoor dat de animatie opnieuw kan starten
    
    card.style.animation = `shake 0.5s ease-in-out`; // Snelheid is altijd hetzelfde, ongeacht de schade
}

function showDamage(damage) {
    let damageText = document.createElement('div');
    damageText.classList.add('damage');
    damageText.innerText = `${damage} HP`;
    
    let card = document.getElementById('mage-card');
    card.appendChild(damageText);
    
    setTimeout(() => {
        damageText.remove();
    }, 1500);
}

function showHeal(healAmount) {
    let healText = document.createElement('div');
    healText.classList.add('heal');
    healText.innerText = `+${healAmount} HP`;
    
    let card = document.getElementById('mage-card');
    card.appendChild(healText);
    
    setTimeout(() => {
        healText.remove();
    }, 1500);

    showPlus();
}

// Functie voor het tonen van de groene plusjes bij healing
function showPlus() {
    const numberOfPluses = 20;
    
    for (let i = 0; i < numberOfPluses; i++) {
        let plusText = document.createElement('div');
        plusText.classList.add('plus');
        
        const randomSize = Math.random() * (3 - 1) + 1; // Willekeurige waarde tussen 1 en 3
        plusText.style.fontSize = `${randomSize}rem`;
        
        const randomX = Math.random() * 100; // Willekeurige horizontale positie (0% - 100%)
        const randomY = Math.random() * 100; // Willekeurige verticale positie (0% - 100%)
        
        plusText.style.top = `${randomY}%`;
        plusText.style.left = `${randomX}%`;
        
        let card = document.getElementById('mage-card');
        card.appendChild(plusText);
        
        setTimeout(() => {
            plusText.remove();
        }, 2000);
    }
}
