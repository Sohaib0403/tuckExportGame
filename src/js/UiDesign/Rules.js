export default class Rules {
  constructor(scene) {
    this.scene = scene;
  }
  
  // Accept user input as a parameter
  CreateRules(playerName) {
    // Check if playerName is defined
    if (!playerName) {
        console.error("Player name is undefined!");
        return; // Early exit if playerName is not valid
    }

    this.rulesPopUpContainer = this.scene.add.container(960, 540).setDepth(1);
    let bg = this.scene.add.image(0, 0, "rulesBG").setOrigin(0.5);
    let bar = this.scene.add
        .image(0, -245, "instruction_up")
        .setOrigin(0.5)
        .setScale(1, 1.2)
        .setVisible(true);

    let guideLines = this.scene.add
        .text(0, -250, `Hey ${playerName} – Let's ship the fewest number of trucks with a capacity of 45,000 lb.`, {
            fontFamily: "Roboto-Regular",
            fontSize: "40px",
            fill: "#FFFFFF",
            fontStyle: "bold",
            align: "center",
            wordWrap: { width: 800, useAdvancedWrap: true },
        })
        .setOrigin(0.5);

    // Next button
    let next = this.scene.add
        .image(804, 450, "next")
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

    next.on("pointerdown", () => {});
    next.on("pointerup", () => {
        this.DisablePopUP();
    });

    // Back button
    let backButton = this.scene.add
        .image(-800, 450, "back")
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

    backButton.on("pointerup", () => {
        window.location.reload(); // Reload the entire window or game
    });

    // Adding all elements to the container
    this.rulesPopUpContainer.add([bg, bar, guideLines, next, backButton]);
}


  DisablePopUP() {
    this.rulesPopUpContainer.setVisible(false);
  }

  EnablePopUP() {
    this.rulesPopUpContainer.setVisible(true);
  }
}
