function choosePath(choice) {
    let message = "";
    if (choice === 1) {
        message = "You head towards the Elven village.";
        // Add the code for the Elven village scenario
    } else if (choice === 2) {
        message = "You make your way to the Athenian city.";
        // Add the code for the Athenian city scenario
    } else if (choice === 3) {
        message = "You journey east to the Nomadic camps.";
        // Add the code for the Nomadic camps scenario
    } else if (choice === 4) {
        message = "You embark towards the Dwarven kingdom in the north.";
        // Add the code for the Dwarven kingdom scenario
    } else {
        message = "Invalid choice. Please enter a valid option.";
    }

    // Update the game container with the message
    document.querySelector('.game-container').innerHTML = `
        <h1>Result</h1>
        <p>${message}</p>
    `;
}
