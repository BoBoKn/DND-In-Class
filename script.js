function selectCharacter(page) {
    // Verwijder 'selected' van alle kaarten
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('selected'));

    // Voeg 'selected' toe aan de aangeklikte kaart
    const selectedCard = event.currentTarget;
    selectedCard.classList.add('selected');

    // Wacht even voor het effect en ga naar de volgende pagina
    setTimeout(() => {
        window.location.href = page;
    }, 1000);
}

let health = 100; // Start HP
let maxHealth = 100; // Max HP
let healthBar = document.getElementById('health-bar');
let healthText = document.getElementById('health-text');

// Functie voor het aanpassen van de gezondheid
function changeHealth(amount) {
    // Zorg ervoor dat de HP niet onder 0 of boven het maximum gaat
    health = Math.min(maxHealth, Math.max(0, health + amount));
    
    // Update de healthbar
    healthBar.style.width = `${(health / maxHealth) * 100}%`;
    
    // Update de health tekst
    healthText.innerHTML = `HP: ${health}/100`;
    
    // Laat de kaart schudden bij elke hit
    shakeCard(amount); // Hoe harder de hit, hoe meer de kaart schudt
    
    // Afhankelijk van de hoeveelheid schade of heal, laat de zwevende tekst verschijnen
    if (amount < 0) {
        showDamage(amount); // Schade
    } else {
        showHeal(amount); // Healing
    }
}

// Functie voor het schudden van de kaart
function shakeCard(damage) {
    let card = document.getElementById('mage-card'); // De kaart die schudt
    
    // Stop de animatie eerst om het opnieuw te starten
    card.style.animation = 'none';
    
    // Forceer een herflow (om de animatie opnieuw te starten)
    card.offsetHeight; // Dit zorgt ervoor dat de animatie opnieuw kan starten
    
    // Start de animatie met een vaste duur
    card.style.animation = `shake 0.5s ease-in-out`; // Snelheid is altijd hetzelfde, ongeacht de schade
}

// Functie voor het tonen van de schade boven de kaart
function showDamage(damage) {
    let damageText = document.createElement('div');
    damageText.classList.add('damage');
    damageText.innerText = `${damage} HP`;
    
    let card = document.getElementById('mage-card');
    card.appendChild(damageText);
    
    // Verwijder de schade tekst na 1.5 seconden
    setTimeout(() => {
        damageText.remove();
    }, 1500);
}

// Functie voor het tonen van de healing boven de kaart
function showHeal(healAmount) {
    let healText = document.createElement('div');
    healText.classList.add('heal');
    healText.innerText = `+${healAmount} HP`;
    
    let card = document.getElementById('mage-card');
    card.appendChild(healText);
    
    // Verwijder de healing tekst na 1.5 seconden
    setTimeout(() => {
        healText.remove();
    }, 1500);

    // Voeg groene plusjes toe voor healing
    showPlus();
}

// Functie voor het tonen van de groene plusjes bij healing
function showPlus() {
    // Aantal plusjes dat we willen genereren
    const numberOfPluses = 20;
    
    for (let i = 0; i < numberOfPluses; i++) {
        let plusText = document.createElement('div');
        plusText.classList.add('plus');
        
        // Willekeurige grootte voor elk plusje (tussen 1rem en 3rem)
        const randomSize = Math.random() * (3 - 1) + 1; // Willekeurige waarde tussen 1 en 3
        plusText.style.fontSize = `${randomSize}rem`;
        
        // Willekeurige positie voor elk plusje
        const randomX = Math.random() * 100; // Willekeurige horizontale positie (0% - 100%)
        const randomY = Math.random() * 100; // Willekeurige verticale positie (0% - 100%)
        
        // Pas de positie van het plusje aan
        plusText.style.top = `${randomY}%`;
        plusText.style.left = `${randomX}%`;
        
        // Voeg het plusje toe aan de kaart
        let card = document.getElementById('mage-card');
        card.appendChild(plusText);
        
        // Verwijder het plusje na 2 seconden
        setTimeout(() => {
            plusText.remove();
        }, 2000);
    }
}