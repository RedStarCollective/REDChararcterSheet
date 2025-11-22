// Character Sheet Interactive Functionality

// Stats object to store character stats
const stats = {
    int: 8,
    ref: 8,
    dex: 8,
    tech: 8,
    cool: 8,
    will: 8,
    luck: 3,
    move: 8,
    body: 8,
    emp: 2  // Calculated from humanity
};

// Initialize the character sheet
document.addEventListener('DOMContentLoaded', function() {
    initializeStats();
    initializeSkills();
    initializePortraitUpload();
    attachEventListeners();
    loadCharacterData();

    // Initial skill calculation
    updateAllSkills();
});

// Initialize core stats
function initializeStats() {
    const statInputs = {
        'stat-int': 'int',
        'stat-ref': 'ref',
        'stat-dex': 'dex',
        'stat-tech': 'tech',
        'stat-cool': 'cool',
        'stat-will': 'will',
        'stat-move': 'move',
        'stat-body': 'body',
        'stat-emp': 'emp'
    };

    Object.entries(statInputs).forEach(([id, stat]) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                stats[stat] = parseInt(this.value) || 0;
                updateAllSkills();
                saveCharacterData();
            });
        }
    });
}

// Initialize skill calculations
function initializeSkills() {
    const skillRows = document.querySelectorAll('.skill-row[data-skill]');

    skillRows.forEach(row => {
        const skillName = row.dataset.skill;
        const statName = row.dataset.stat;
        const lvlInput = row.querySelector('.lvl');

        if (lvlInput) {
            lvlInput.addEventListener('input', function() {
                updateSkillRow(row, statName);
                saveCharacterData();
            });
        }
    });
}

// Update a single skill row
function updateSkillRow(row, statName) {
    const lvlInput = row.querySelector('.lvl');
    const modCell = row.querySelector('.mod');
    const statCell = row.querySelector('.stat');
    const baseCell = row.querySelector('.base');

    if (!lvlInput || !statCell || !baseCell) return;

    const lvl = parseInt(lvlInput.value) || 0;
    const statValue = stats[statName] || 0;
    const mod = lvl; // In some character sheets, modifier might be different
    const base = statValue + lvl;

    if (modCell) modCell.textContent = mod;
    statCell.textContent = statValue;
    baseCell.textContent = base;
}

// Update all skills when stats change
function updateAllSkills() {
    const skillRows = document.querySelectorAll('.skill-row[data-skill]');

    skillRows.forEach(row => {
        const statName = row.dataset.stat;
        if (statName) {
            updateSkillRow(row, statName);
        }
    });

    // Update EMP displays
    updateEmpDisplays();
}

// Update EMP displays in various locations
function updateEmpDisplays() {
    const empDisplay = document.getElementById('emp-display');
    const empCurrent = document.getElementById('emp-current');
    const empBase = document.getElementById('emp-base');
    const empStatInput = document.getElementById('stat-emp');

    if (empDisplay) empDisplay.textContent = stats.emp;
    if (empCurrent) empCurrent.textContent = stats.emp;
    if (empBase) empBase.textContent = 8; // Base EMP before humanity loss
    if (empStatInput) empStatInput.value = stats.emp;
}

// Portrait upload functionality
function initializePortraitUpload() {
    const uploadInput = document.getElementById('portrait-upload');
    const portraitImg = document.getElementById('portrait');

    if (uploadInput && portraitImg) {
        uploadInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    portraitImg.src = event.target.result;
                    portraitImg.style.display = 'block';
                    saveCharacterData();
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Attach event listeners to inputs for auto-save
function attachEventListeners() {
    // Auto-save on all input changes
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (!input.classList.contains('lvl')) { // Skip skill level inputs (already handled)
            input.addEventListener('change', saveCharacterData);
        }
    });

    // Humanity and EMP calculation
    const humanityInput = document.getElementById('humanity');
    if (humanityInput) {
        humanityInput.addEventListener('input', function() {
            const humanity = parseInt(this.value) || 0;
            const empValue = Math.floor(humanity / 10);
            stats.emp = empValue;

            const empStatInput = document.getElementById('stat-emp');
            if (empStatInput) {
                empStatInput.value = empValue;
            }

            updateAllSkills();
            saveCharacterData();
        });
    }

    // HP calculation for seriously wounded
    const hpCurrentInput = document.getElementById('hp-current');
    const hpMaxInput = document.getElementById('hp-max');

    if (hpCurrentInput && hpMaxInput) {
        const updateWoundThreshold = () => {
            const maxHp = parseInt(hpMaxInput.value) || 50;
            const threshold = Math.floor(maxHp / 2);
            const thresholdDisplay = document.querySelector('.threshold');
            if (thresholdDisplay) {
                thresholdDisplay.textContent = threshold;
            }
        };

        hpMaxInput.addEventListener('input', updateWoundThreshold);
        hpCurrentInput.addEventListener('input', saveCharacterData);
        updateWoundThreshold();
    }

    // Death Save calculation (based on BODY)
    const bodyInput = document.getElementById('stat-body');
    const deathSaveInput = document.getElementById('death-save');

    if (bodyInput && deathSaveInput) {
        bodyInput.addEventListener('input', function() {
            const bodyValue = parseInt(this.value) || 0;
            deathSaveInput.value = bodyValue;
            saveCharacterData();
        });
    }
}

// Add weapon row
function addWeapon() {
    const weaponList = document.getElementById('weapon-list');
    if (!weaponList) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="Weapon Name"></td>
        <td><input type="text" placeholder="DMG"></td>
        <td><input type="number" placeholder="ROF"></td>
    `;
    weaponList.appendChild(newRow);

    // Attach save listeners to new inputs
    const inputs = newRow.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', saveCharacterData);
    });
}

// Add armor row
function addArmor() {
    const armorList = document.getElementById('armor-list');
    if (!armorList) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="Armor Name"></td>
        <td><input type="text" placeholder="Type"></td>
        <td><input type="number" placeholder="SP"></td>
        <td><input type="number" placeholder="Penalty"></td>
    `;
    armorList.appendChild(newRow);

    // Attach save listeners to new inputs
    const inputs = newRow.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', saveCharacterData);
    });
}

// Add vehicle row
function addVehicle() {
    const vehicleList = document.getElementById('vehicle-list');
    if (!vehicleList) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="Vehicle Name"></td>
        <td><input type="text" placeholder="SDP"></td>
        <td><input type="number" placeholder="SP"></td>
        <td><input type="text" placeholder="Speed"></td>
    `;
    vehicleList.appendChild(newRow);

    // Attach save listeners to new inputs
    const inputs = newRow.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', saveCharacterData);
    });
}

// Save character data to localStorage
function saveCharacterData() {
    const characterData = {
        stats: stats,
        handle: document.getElementById('handle')?.value || '',
        role: document.getElementById('role')?.value || '',
        portrait: document.getElementById('portrait')?.src || '',
        humanity: document.getElementById('humanity')?.value || 24,
        hpCurrent: document.getElementById('hp-current')?.value || 50,
        hpMax: document.getElementById('hp-max')?.value || 50,
        deathSave: document.getElementById('death-save')?.value || 8,
        notes: document.getElementById('notes')?.value || '',
        criticalInjuries: document.getElementById('critical-injuries')?.value || '',
        abilityRank: document.getElementById('ability-rank')?.value || 8,
        luckCurrent: document.getElementById('luck-current')?.value || 3,
        luckMax: document.getElementById('luck-max')?.value || 3,
        skills: getSkillData(),
        weapons: getTableData('weapon-list'),
        armor: getTableData('armor-list'),
        vehicles: getTableData('vehicle-list')
    };

    localStorage.setItem('cyberpunkCharacter', JSON.stringify(characterData));
}

// Get skill data
function getSkillData() {
    const skills = {};
    const skillRows = document.querySelectorAll('.skill-row[data-skill]');

    skillRows.forEach(row => {
        const skillName = row.dataset.skill;
        const lvlInput = row.querySelector('.lvl');
        if (lvlInput) {
            skills[skillName] = parseInt(lvlInput.value) || 0;
        }
    });

    return skills;
}

// Get table data (weapons, armor, vehicles)
function getTableData(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return [];

    const rows = table.querySelectorAll('tr');
    const data = [];

    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const rowData = [];
        inputs.forEach(input => {
            rowData.push(input.value);
        });
        if (rowData.length > 0) {
            data.push(rowData);
        }
    });

    return data;
}

// Load character data from localStorage
function loadCharacterData() {
    const savedData = localStorage.getItem('cyberpunkCharacter');
    if (!savedData) return;

    try {
        const characterData = JSON.parse(savedData);

        // Load basic info
        if (characterData.handle) document.getElementById('handle').value = characterData.handle;
        if (characterData.role) document.getElementById('role').value = characterData.role;
        if (characterData.portrait) {
            const portraitImg = document.getElementById('portrait');
            portraitImg.src = characterData.portrait;
            portraitImg.style.display = 'block';
        }

        // Load stats
        if (characterData.stats) {
            Object.entries(characterData.stats).forEach(([stat, value]) => {
                stats[stat] = value;
                const input = document.getElementById(`stat-${stat}`);
                if (input) input.value = value;
            });
        }

        // Load other values
        if (characterData.humanity) document.getElementById('humanity').value = characterData.humanity;
        if (characterData.hpCurrent) document.getElementById('hp-current').value = characterData.hpCurrent;
        if (characterData.hpMax) document.getElementById('hp-max').value = characterData.hpMax;
        if (characterData.deathSave) document.getElementById('death-save').value = characterData.deathSave;
        if (characterData.notes) document.getElementById('notes').value = characterData.notes;
        if (characterData.criticalInjuries) document.getElementById('critical-injuries').value = characterData.criticalInjuries;
        if (characterData.abilityRank) document.getElementById('ability-rank').value = characterData.abilityRank;
        if (characterData.luckCurrent) document.getElementById('luck-current').value = characterData.luckCurrent;
        if (characterData.luckMax) document.getElementById('luck-max').value = characterData.luckMax;

        // Load skills
        if (characterData.skills) {
            Object.entries(characterData.skills).forEach(([skillName, level]) => {
                const row = document.querySelector(`[data-skill="${skillName}"]`);
                if (row) {
                    const lvlInput = row.querySelector('.lvl');
                    if (lvlInput) {
                        lvlInput.value = level;
                        updateSkillRow(row, row.dataset.stat);
                    }
                }
            });
        }

        // Update all calculations
        updateAllSkills();

    } catch (error) {
        console.error('Error loading character data:', error);
    }
}

// Export character data as JSON
function exportCharacter() {
    const characterData = JSON.parse(localStorage.getItem('cyberpunkCharacter') || '{}');
    const dataStr = JSON.stringify(characterData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${characterData.handle || 'character'}_cyberpunk_red.json`;
    link.click();
}

// Import character data from JSON
function importCharacter(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const characterData = JSON.parse(e.target.result);
            localStorage.setItem('cyberpunkCharacter', JSON.stringify(characterData));
            location.reload();
        } catch (error) {
            console.error('Error importing character:', error);
            alert('Error importing character data. Please check the file format.');
        }
    };
    reader.readAsText(file);
}

// Reset character sheet
function resetCharacter() {
    if (confirm('Are you sure you want to reset the character sheet? This cannot be undone.')) {
        localStorage.removeItem('cyberpunkCharacter');
        location.reload();
    }
}

// Print character sheet
function printCharacter() {
    window.print();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save (already auto-saving, but provides feedback)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveCharacterData();

        // Visual feedback
        const savedIndicator = document.createElement('div');
        savedIndicator.textContent = 'Character Saved!';
        savedIndicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--red-primary);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            z-index: 10000;
            animation: fadeInOut 2s ease-in-out;
        `;
        document.body.appendChild(savedIndicator);

        setTimeout(() => {
            savedIndicator.remove();
        }, 2000);
    }
});

// Add CSS animation for save indicator
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Make functions globally available
window.addWeapon = addWeapon;
window.addArmor = addArmor;
window.addVehicle = addVehicle;
window.exportCharacter = exportCharacter;
window.importCharacter = importCharacter;
window.resetCharacter = resetCharacter;
window.printCharacter = printCharacter;
