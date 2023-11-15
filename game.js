let inventory = {
    items: [],
    weapons: []
};

function choosePath(choice) {
    let message = "";
    if (choice === 1) {
        message = "You head towards the Elven village and find a potion in the forest.";
        inventory.items.push("Potion");
    } else if (choice === 2) {
        message = "You make your way to the Athenian city and discover a sword in an abandoned house.";
        inventory.weapons.push("Sword");
    } else if (choice === 3) {
        message = "You journey east to the Nomadic camps and receive a map from a kind nomad.";
        inventory.items.push("Map");
    } else if (choice === 4) {
        message = "You embark towards the Dwarven kingdom in the north and acquire a shield.";
        inventory.items.push("Shield");
    } else {
        message = "Invalid choice. Please enter a valid option.";
    }

    updateGameResult(message);
    updateInventory();
}

function updateInventory() {
    let inventoryDisplay = "Inventory: ";
    if (inventory.items.length > 0) {
        inventoryDisplay += "Items: " + inventory.items.join(", ");
    }
    if (inventory.weapons.length > 0) {
        if (inventory.items.length > 0) {
            inventoryDisplay += ", ";
        }
        inventoryDisplay += "Weapons: " + inventory.weapons.join(", ");
    }
    document.querySelector('.inventory').innerText = inventoryDisplay;
}

function updateGameResult(message) {
    document.querySelector('.game-result').innerText = message;
    updateInventory();
}
