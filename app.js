// Business Empire India - Ultra Pro Max
// Main Game Logic

// Game State
let gameState = {
    players: [],
    currentPlayer: 0,
    properties: [],
    bankFunds: 1000000,
    gameStarted: false,
    settings: {
        theme: 'dark',
        music: true,
        sfx: true,
        language: 'en'
    },
    history: [],
    startTime: Date.now()
};

// Initialize Game
window.onload = function() {
    // Load saved game
    loadGame();
    
    // Show loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        
        if (gameState.gameStarted) {
            showGameBoard();
        } else {
            document.getElementById('mainMenu').classList.remove('hidden');
        }
    }, 3000);
    
    // Apply saved settings
    applySettings();
};

// Menu Functions
function showPlayerSetup() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('playerSetup').classList.remove('hidden');
}

function backToMenu() {
    document.getElementById('playerSetup').classList.add('hidden');
    document.getElementById('mainMenu').classList.remove('hidden');
}

function continueGame() {
    if (gameState.gameStarted) {
        showGameBoard();
    } else {
        showNotification('No saved game found!');
    }
}

function showSettings() {
    document.getElementById('settingsModal').classList.remove('hidden');
}

function showAbout() {
    document.getElementById('aboutModal').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Player Setup
function setPlayerCount(count) {
    const forms = document.getElementById('playerForms');
    forms.innerHTML = '';
    
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96C93D', '#F7B731', '#A55EEA'];
    const avatars = ['👤', '👨', '👩', '🧑', '👱', '👨‍🦱'];
    
    for (let i = 0; i < count; i++) {
        forms.innerHTML += `
            <div class="player-form">
                <h4>Player ${i + 1}</h4>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" id="player${i}Name" value="Player ${i + 1}" placeholder="Enter name">
                </div>
                <div class="form-group">
                    <label>Avatar</label>
                    <select id="player${i}Avatar">
                        <option value="👤">Avatar 1</option>
                        <option value="👨">Avatar 2</option>
                        <option value="👩">Avatar 3</option>
                        <option value="🧑">Avatar 4</option>
                        <option value="👱">Avatar 5</option>
                        <option value="👨‍🦱">Avatar 6</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Color</label>
                    <div class="color-picker">
                        ${colors.map((c, idx) => `
                            <div class="color-option ${idx === i ? 'selected' : ''}" 
                                 style="background: ${c}" 
                                 onclick="selectColor(${i}, '${c}', this)"></div>
                        `).join('')}
                    </div>
                </div>
                <input type="hidden" id="player${i}Color" value="${colors[i]}">
            </div>
        `;
    }
    
    document.getElementById('startGameBtn').classList.remove('hidden');
}

function selectColor(playerNum, color, element) {
    const parent = element.parentElement;
    parent.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    document.getElementById(`player${playerNum}Color`).value = color;
}

function startGame() {
    const playerCount = document.querySelectorAll('.player-form').length;
    gameState.players = [];
    
    for (let i = 0; i < playerCount; i++) {
        gameState.players.push({
            id: i,
            name: document.getElementById(`player${i}Name`).value,
            avatar: document.getElementById(`player${i}Avatar`).value,
            color: document.getElementById(`player${i}Color`).value,
            money: 1500,
            position: 0,
            properties: [],
            bankrupt: false
        });
    }
    
    // Initialize board
    initializeBoard();
    
    gameState.gameStarted = true;
    gameState.currentPlayer = 0;
    gameState.startTime = Date.now();
    gameState.history = [];
    
    document.getElementById('playerSetup').classList.add('hidden');
    showGameBoard();
    saveGame();
    
    showNotification('Game Started! Roll the dice to begin.', 'success');
}

function initializeBoard() {
    gameState.properties = [];
    
    // Add all cities
    citiesData.forEach((city, index) => {
        gameState.properties.push({
            ...city,
            index: gameState.properties.length,
            owner: null,
            level: 0,
            type: 'city'
        });
    });
    
    // Add special tiles
    specialTiles.forEach((tile, index) => {
        gameState.properties.push({
            ...tile,
            index: gameState.properties.length,
            owner: null,
            level: 0,
            type: tile.type
        });
    });
    
    // Shuffle and ensure we have 52 tiles total
    while (gameState.properties.length < 52) {
        const randomCity = citiesData[Math.floor(Math.random() * citiesData.length)];
        gameState.properties.push({
            ...randomCity,
            index: gameState.properties.length,
            owner: null,
            level: 0,
            type: 'city',
            id: Date.now() + Math.random()
        });
    }
}

function showGameBoard() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('playerSetup').classList.add('hidden');
    document.getElementById('gameBoard').classList.remove('hidden');
    
    createBoard();
    updateUI();
}

function createBoard() {
    const board = document.getElementById('boardInner');
    board.innerHTML = '';
    
    // Create 52 tiles in a square layout
    const tilesPerSide = 13;
    const positions = [];
    
    // Generate positions for all 52 tiles
    for (let i = 0; i < 52; i++) {
        if (i < tilesPerSide) {
            // Top row (left to right)
            positions.push({ row: 0, col: i });
        } else if (i < tilesPerSide * 2 - 1) {
            // Right column (top to bottom)
            positions.push({ row: i - tilesPerSide + 1, col: tilesPerSide - 1 });
        } else if (i < tilesPerSide * 3 - 2) {
            // Bottom row (right to left)
            positions.push({ row: tilesPerSide - 1, col: tilesPerSide - 1 - (i - (tilesPerSide * 2 - 1)) });
        } else {
            // Left column (bottom to top)
            positions.push({ row: tilesPerSide - 1 - (i - (tilesPerSide * 3 - 2)), col: 0 });
        }
    }
    
    // Create tiles
    for (let i = 0; i < 52; i++) {
        const pos = positions[i];
        const prop = gameState.properties[i];
        
        if (i === 0) {
            // START corner
            board.innerHTML += `
                <div class="board-corner" data-index="0">
                    <div>START<br>🏁</div>
                </div>
            `;
        } else if (prop) {
            const owner = prop.owner !== null ? gameState.players[prop.owner] : null;
            
            board.innerHTML += `
                <div class="property-tile" onclick="handlePropertyClick(${i})" 
                     style="grid-row: ${pos.row + 1}; grid-column: ${pos.col + 1}">
                    <div class="property-color" style="background: ${prop.color || '#667eea'}"></div>
                    <div class="property-name">${prop.name}</div>
                    <div class="property-price">₹${prop.price}</div>
                    ${owner ? `<div class="property-owner" style="background: ${owner.color}"></div>` : ''}
                    ${prop.level > 0 ? `<div class="property-level">${prop.level}</div>` : ''}
                </div>
            `;
        }
    }
}

function updateUI() {
    const player = gameState.players[gameState.currentPlayer];
    document.getElementById('currentPlayerName').textContent = player.name;
    document.getElementById('currentPlayerName').style.background = player.color;
    
    document.getElementById('bankFunds').textContent = gameState.bankFunds.toLocaleString();
    
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    
    gameState.players.forEach((p, index) => {
        if (!p.bankrupt) {
            playersList.innerHTML += `
                <div class="player-card ${index === gameState.currentPlayer ? 'active' : ''}" 
                     onclick="showPlayerProfile(${index})">
                    <div class="player-card-header">
                        <div class="player-avatar-small" style="background: ${p.color}">${p.avatar}</div>
                        <div class="player-name-small">${p.name}</div>
                    </div>
                    <div class="player-balance">₹${p.money.toLocaleString()}</div>
                    <div class="player-properties">${p.properties.length} properties</div>
                </div>
            `;
        }
    });
    
    // Enable/disable roll button
    document.getElementById('rollDiceBtn').disabled = false;
}

function rollDice() {
    const dice = document.getElementById('dice3d');
    const roll = Math.floor(Math.random() * 6) + 1;
    
    // Disable button during animation
    document.getElementById('rollDiceBtn').disabled = true;
    
    // Dice animation
    const rotations = [
        'rotateX(720deg) rotateY(0deg)',
        'rotateX(0deg) rotateY(720deg)',
        'rotateX(720deg) rotateY(720deg)'
    ];
    
    dice.style.transform = rotations[Math.floor(Math.random() * rotations.length)];
    
    // Play sound
    if (gameState.settings.sfx) {
        playSound('dice');
    }
    
    setTimeout(() => {
        dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
        movePlayer(roll);
        
        // Add to history
        addToHistory('Dice Roll', `Player ${gameState.players[gameState.currentPlayer].name} rolled ${roll}`);
    }, 1000);
}

function movePlayer(steps) {
    const player = gameState.players[gameState.currentPlayer];
    
    // Animate movement step by step
    let currentStep = 0;
    const moveInterval = setInterval(() => {
        player.position = (player.position + 1) % 52;
        currentStep++;
        
        if (currentStep >= steps) {
            clearInterval(moveInterval);
            handleTileLanding();
        }
        
        updateUI();
    }, 300);
    
    // Play movement sound
    if (gameState.settings.sfx) {
        playSound('move');
    }
}

function handleTileLanding() {
    const player = gameState.players[gameState.currentPlayer];
    const position = player.position;
    const prop = gameState.properties[position];
    
    // Check for special tiles
    if (position === 0) {
        // START - collect salary
        player.money += 200;
        showNotification('Passed START! Collect ₹200', 'success');
        addToHistory('START', 'Collected ₹200 salary');
    } else if (prop) {
        // Handle property landing
        if (prop.type === 'tax') {
            // Pay tax
            player.money -= prop.amount;
            gameState.bankFunds += prop.amount;
            showNotification(`Paid ${prop.name}: ₹${prop.amount}`, 'warning');
            addToHistory('Tax', `Paid ${prop.name} ₹${prop.amount}`);
        } else if (prop.type === 'chance') {
            // Draw chance card
            handleChance();
        } else if (prop.type === 'jail' || prop.type === 'parking') {
            // Free parking or just visiting jail
            showNotification(prop.type === 'jail' ? 'Just Visiting Jail' : 'Free Parking', 'info');
        } else if (prop.type === 'gotojail') {
            // Go to jail
            player.position = 13;
            showNotification('Go to Jail!', 'danger');
            addToHistory('Jail', 'Sent to jail');
        } else if (prop.owner === null) {
            // Unowned property - show buy option
            showPropertyModal(prop, 'buy');
        } else if (prop.owner !== player.id && !prop.owner.bankrupt) {
            // Owned by other - pay rent
            const rent = prop.rent * upgradeLevels[prop.level].multiplier;
            player.money -= rent;
            gameState.players[prop.owner].money += rent;
            showNotification(`Paid ₹${rent} rent to ${gameState.players[prop.owner].name}`, 'warning');
            addToHistory('Rent', `Paid ₹${rent} to ${gameState.players[prop.owner].name}`);
        }
    }
    
    // Check for bankruptcy
    if (player.money < 0) {
        handleBankruptcy(player);
    }
    
    // Next turn
    setTimeout(() => {
        nextTurn();
    }, 500);
}

function nextTurn() {
    // Find next non-bankrupt player
    let nextPlayer = (gameState.currentPlayer + 1) % gameState.players.length;
    let attempts = 0;
    
    while (gameState.players[nextPlayer].bankrupt && attempts < gameState.players.length) {
        nextPlayer = (nextPlayer + 1) % gameState.players.length;
        attempts++;
    }
    
    gameState.currentPlayer = nextPlayer;
    
    // Check win condition
    const activePlayers = gameState.players.filter(p => !p.bankrupt);
    if (activePlayers.length === 1) {
        showWinner(activePlayers[0]);
    } else {
        updateUI();
        saveGame();
    }
}

function handlePropertyClick(index) {
    const prop = gameState.properties[index];
    const player = gameState.players[gameState.currentPlayer];
    
    if (prop.owner === player.id) {
        // Show upgrade option
        showPropertyModal(prop, 'upgrade');
    } else if (prop.owner !== null) {
        // Show owner info
        const owner = gameState.players[prop.owner];
        showNotification(`${owner.name} owns ${prop.name}`, 'info');
    }
}

function showPropertyModal(property, action) {
    const modal = document.getElementById('propertyModal');
    const title = document.getElementById('propertyModalTitle');
    const body = document.getElementById('propertyModalBody');
    
    title.textContent = property.name;
    title.style.color = property.color;
    
    if (action === 'buy') {
        body.innerHTML = `
            <div class="property-details">
                <div class="property-image" style="background: ${property.color}">
                    ${property.icon || '🏢'}
                </div>
                <div class="property-info-grid">
                    <div class="property-info-item">
                        <div class="property-info-label">Price</div>
                        <div class="property-info-value">₹${property.price}</div>
                    </div>
                    <div class="property-info-item">
                        <div class="property-info-label">Rent</div>
                        <div class="property-info-value">₹${property.rent}</div>
                    </div>
                    <div class="property-info-item">
                        <div class="property-info-label">Type</div>
                        <div class="property-info-value">${property.type}</div>
                    </div>
                    <div class="property-info-item">
                        <div class="property-info-label">Level</div>
                        <div class="property-info-value">${upgradeLevels[property.level].name}</div>
                    </div>
                </div>
                <div class="property-actions">
                    <button class="btn-buy" onclick="buyProperty(${property.index})">Buy</button>
                    <button class="btn-skip" onclick="closeModal('propertyModal')">Skip</button>
                </div>
            </div>
        `;
    } else if (action === 'upgrade') {
        const upgradeCost = upgradeLevels[property.level].upgradeCost;
        const nextLevel = upgradeLevels[property.level + 1];
        
        body.innerHTML = `
            <div class="property-details">
                <div class="property-image" style="background: ${property.color}">
                    ${upgradeLevels[property.level].icon}
                </div>
                <div class="property-info-grid">
                    <div class="property-info-item">
                        <div class="property-info-label">Current Level</div>
                        <div class="property-info-value">${upgradeLevels[property.level].name}</div>
                    </div>
                    <div class="property-info-item">
                        <div class="property-info-label">Next Level</div>
                        <div class="property-info-value">${nextLevel ? nextLevel.name : 'MAX'}</div>
                    </div>
                    <div class="property-info-item">
                        <div class="property-info-label">Upgrade Cost</div>
                        <div class="property-info-value">₹${upgradeCost}</div>
                    </div>
                    <div class="property-info-item">
                        <div class="property-info-label">New Rent</div>
                        <div class="property-info-value">₹${property.rent * (nextLevel ? nextLevel.multiplier : 6)}</div>
                    </div>
                </div>
                <div class="property-actions">
                    <button class="btn-buy" onclick="upgradeProperty(${property.index})">Upgrade</button>
                    <button class="btn-skip" onclick="closeModal('propertyModal')">Cancel</button>
                </div>
            </div>
        `;
    }
    
    modal.classList.remove('hidden');
}

function buyProperty(index) {
    const player = gameState.players[gameState.currentPlayer];
    const property = gameState.properties[index];
    
    if (player.money >= property.price) {
        player.money -= property.price;
        property.owner = player.id;
        player.properties.push(property.id);
        
        showNotification(`Bought ${property.name} for ₹${property.price}!`, 'success');
        addToHistory('Purchase', `Bought ${property.name} for ₹${property.price}`);
        
        closeModal('propertyModal');
        createBoard();
        updateUI();
        saveGame();
        
        if (gameState.settings.sfx) {
            playSound('buy');
        }
    } else {
        showNotification('Not enough money!', 'danger');
    }
}

function upgradeProperty(index) {
    const player = gameState.players[gameState.currentPlayer];
    const property = gameState.properties[index];
    const upgradeCost = upgradeLevels[property.level].upgradeCost;
    
    if (player.money >= upgradeCost && property.level < upgradeLevels.length - 1) {
        player.money -= upgradeCost;
        property.level++;
        
        showNotification(`Upgraded ${property.name} to ${upgradeLevels[property.level].name}!`, 'success');
        addToHistory('Upgrade', `Upgraded ${property.name} to level ${property.level}`);
        
        closeModal('propertyModal');
        createBoard();
        updateUI();
        saveGame();
        
        if (gameState.settings.sfx) {
            playSound('upgrade');
        }
    } else {
        showNotification('Cannot upgrade! Not enough money or max level.', 'danger');
    }
}

function handleChance() {
    const isBonus = Math.random() > 0.5;
    const data = isBonus ? bonusData[Math.floor(Math.random() * bonusData.length)] : 
                         penaltiesData[Math.floor(Math.random() * penaltiesData.length)];
    
    const player = gameState.players[gameState.currentPlayer];
    
    if (isBonus) {
        player.money += data.amount;
        showNotification(`🎉 ${data.title}! +₹${data.amount}`, 'success');
        addToHistory('Bonus', `Received ${data.title} ₹${data.amount}`);
    } else {
        player.money -= data.amount;
        showNotification(`⚠️ ${data.title}: -₹${data.amount}`, 'warning');
        addToHistory('Penalty', `Paid ${data.title} ₹${data.amount}`);
    }
    
    updateUI();
}

function showPlayerProfile(index) {
    const player = gameState.players[index];
    const modal = document.getElementById('playerProfileModal');
    const body = document.getElementById('profileModalBody');
    
    body.innerHTML = `
        <div class="property-details">
            <div class="winner-avatar" style="background: ${player.color}">${player.avatar}</div>
            <h2>${player.name}</h2>
            <div class="property-info-grid">
                <div class="property-info-item">
                    <div class="property-info-label">Money</div>
                    <div class="property-info-value">₹${player.money.toLocaleString()}</div>
                </div>
                <div class="property-info-item">
                    <div class="property-info-label">Properties</div>
                    <div class="property-info-value">${player.properties.length}</div>
                </div>
                <div class="property-info-item">
                    <div class="property-info-label">Position</div>
                    <div class="property-info-value">${player.position}</div>
                </div>
                <div class="property-info-item">
                    <div class="property-info-label">Status</div>
                    <div class="property-info-value">${player.bankrupt ? 'Bankrupt' : 'Active'}</div>
                </div>
            </div>
            <h3>Properties Owned:</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-top: 1rem;">
                ${player.properties.map(id => {
                    const prop = gameState.properties[id];
                    return prop ? `
                        <div class="property-info-item" style="background: ${prop.color}20; border: 2px solid ${prop.color}">
                            <div class="property-info-label">${prop.name}</div>
                            <div class="property-info-value">₹${prop.price}</div>
                        </div>
                    ` : '';
                }).join('')}
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function handleBankruptcy(player) {
    player.bankrupt = true;
    player.money = 0;
    
    // Release all properties
    player.properties.forEach(propId => {
        const prop = gameState.properties[propId];
        if (prop) {
            prop.owner = null;
            prop.level = 0;
        }
    });
    player.properties = [];
    
    showNotification(`${player.name} is bankrupt!`, 'danger');
    addToHistory('Bankruptcy', `${player.name} went bankrupt`);
}

function showWinner(winner) {
    const modal = document.getElementById('winnerModal');
    const body = document.getElementById('winnerModalBody');
    
    const timePlayed = Math.floor((Date.now() - gameState.startTime) / 60000);
    
    body.innerHTML = `
        <div class="winner-info">
            <div class="winner-avatar" style="background: ${winner.color}">${winner.avatar}</div>
            <h2 class="winner-name">${winner.name} Wins!</h2>
            <div class="winner-stats">
                <div class="winner-stat">
                    <div class="winner-stat-label">Net Worth</div>
                    <div class="winner-stat-value">₹${winner.money.toLocaleString()}</div>
                </div>
                <div class="winner-stat">
                    <div class="winner-stat-label">Properties</div>
                    <div class="winner-stat-value">${winner.properties.length}</div>
                </div>
                <div class="winner-stat">
                    <div class="winner-stat-label">Time Played</div>
                    <div class="winner-stat-value">${timePlayed} mins</div>
                </div>
                <div class="winner-stat">
                    <div class="winner-stat-label">Status</div>
                    <div class="winner-stat-value">🏆 Champion</div>
                </div>
            </div>
        </div>
        <button class="start-game-btn" onclick="resetGame()">Play Again</button>
    `;
    
    modal.classList.remove('hidden');
    
    // Create confetti
    createConfetti();
    
    addToHistory('Game Over', `${winner.name} won the game!`);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

function addToHistory(action, description) {
    gameState.history.push({
        timestamp: Date.now(),
        action,
        description
    });
}

// Settings Functions
function setTheme(theme) {
    gameState.settings.theme = theme;
    applySettings();
    saveGame();
    
    // Update UI
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === theme);
    });
}

function toggleMusic() {
    gameState.settings.music = document.getElementById('musicToggle').checked;
    saveGame();
}

function toggleSFX() {
    gameState.settings.sfx = document.getElementById('sfxToggle').checked;
    saveGame();
}

function setLanguage(lang) {
    gameState.settings.language = lang;
    saveGame();
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

function applySettings() {
    const root = document.documentElement;
    
    switch(gameState.settings.theme) {
        case 'light':
            root.style.setProperty('--bg-dark', '#f5f7fa');
            root.style.setProperty('--bg-light', '#c3cfe2');
            root.style.setProperty('--text-primary', '#333');
            break;
        case 'neon':
            root.style.setProperty('--primary-color', '#00ff88');
            root.style.setProperty('--secondary-color', '#ff00ff');
            break;
        case 'gold':
            root.style.setProperty('--primary-color', '#ffd700');
            root.style.setProperty('--secondary-color', '#ffaa00');
            break;
    }
}

function saveGameManual() {
    saveGame();
    showNotification('Game Saved!', 'success');
}

function resetGame() {
    if (confirm('Are you sure you want to reset the game?')) {
        localStorage.removeItem('businessEmpireGame');
        location.reload();
    }
}

function saveGame() {
    localStorage.setItem('businessEmpireGame', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('businessEmpireGame');
    if (saved) {
        try {
            const loaded = JSON.parse(saved);
            Object.assign(gameState, loaded);
        } catch (e) {
            console.error('Error loading game:', e);
        }
    }
}

function playSound(type) {
    // Simple sound effects using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'dice':
            oscillator.frequency.value = 400;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'buy':
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'move':
            oscillator.frequency.value = 300;
            gainNode.gain.value = 0.05;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.05);
            break;
    }
}

// Auto-save every 30 seconds
setInterval(() => {
    if (gameState.gameStarted) {
        saveGame();
    }
}, 30000);