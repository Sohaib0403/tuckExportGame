import { Constant } from "../Constant.js";
import Rules from './Rules.js'; // Adjust the path as necessary

export default class UserInput {
  constructor(scene) {
    this.scene = scene;
  }

  CreateUserInput() {
    this.UserInputContainer = this.scene.add.container(960, 540).setDepth(1);
    const bg = this.scene.add.image(0, 0, "userBg").setOrigin(0.5);
    const textArea = this.scene.add.image(0, 0, "userArea").setOrigin(0.5);
    const userNameText = this.scene.add
      .text(-470, -18, "User Name", {
        fontFamily: "Roboto-Regular",
        fontSize: "30px",
        fill: "#F0E8E8",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);
    const characterDetails = this.scene.add
      .text(-470, 18, "(Max 25 Characters)", {
        fontFamily: "Roboto-Regular",
        fontSize: "15px",
        fill: "#F0E8E8",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);
    this.startBtn = this.scene.add
      .image(0, 340, "startBtn")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.startBtn.on("pointerdown", () => {});
    this.startBtn.on(
      "pointerup",
      () => {
        this.OnStartPress();
      },
      this
    );

    this.UserInputContainer.add([
      bg,
      textArea,
      userNameText,
      characterDetails,
      this.startBtn,
    ]);

    this.userName = this.scene.add
      .text(-190, 0, "", {
        fontFamily: "Roboto-Regular",
        fontSize: "42px",
        fill: "#ffff00",
      })
      .setOrigin(0, 0.5);

    this.UserInputContainer.add([this.userName]);

    if (!Constant.isMobile) this.UserDetails();
    if (Constant.isMobile) this.createInputField();
  }

  createInputField() {
    console.log("isMobile", Constant.isMobile);
    this.inputElement = document.createElement("input");
    this.inputElement.type = "text";
    this.inputElement.maxLength = 25;
    this.inputElement.style.position = "absolute";
    this.inputElement.style.left = `${window.innerWidth / 2 - 150}px`;
    this.inputElement.style.top = `${window.innerHeight / 2 - 30}px`;
    this.inputElement.style.width = "300px";
    this.inputElement.style.height = "60px";
    this.inputElement.style.fontSize = "42px";
    this.inputElement.style.color = "#ffff00";
    this.inputElement.style.background = "transparent";
    this.inputElement.style.border = "none";
    this.inputElement.style.outline = "none";
    this.inputElement.style.textAlign = "left";
    document.body.appendChild(this.inputElement);

    this.inputElement.addEventListener("input", () => {
      this.userName.text = this.inputElement.value;
    });

    this.inputElement.addEventListener("keydown", (event) => {
      if (event.key === "Backspace") {
        // Handle backspace key event
      }
    });

    // Hide Phaser text input when using HTML input
    this.userName.visible = false;
  }

  UserDetails() {
    this.highPhen = this.scene.add
      .text(-190, 0, "|", {
        fontFamily: "Roboto-Regular",
        fontSize: "45px",
        fill: "#ffff00",
      })
      .setOrigin(0.5);

    this.AnimateHighPhen();
    this.UserInputContainer.add(this.highPhen);

    this.scene.input.keyboard.on("keydown", (event) => {
      if (this.userName.text.length < 25) {
        if (
          event.keyCode === 32 || // Space
          (event.keyCode >= 48 && event.keyCode <= 90) // Alphanumeric characters
        ) {
          // Append other characters (excluding backspace)
          this.userName.text += event.key;
          this.highPhen.x = this.userName.width - 185;
        }
        // localStorage.setItem("playername", this.userName.text);
      } else {
        // Max characters reached
      }
      if (event.keyCode === 8) {
        // Handle backspace key
        if (this.userName.text.length > 0) {
          this.userName.text = this.userName.text.slice(0, -1);
          this.highPhen.x = this.userName.width - 185;
        }
      }
    });
  }

  AnimateHighPhen() {
    this.scene.tweens.add({
      targets: this.highPhen,
      ease: "Linear",
      duration: 200,
      alpha: 0,
      repeat: -1,
      yoyo: true,
    });
  }

  OnStartPress() {
    const playerName = this.userName.text || this.inputElement.value;
    console.log("Player Name before passing to Rules:", playerName); // Debugging line
    if (playerName) {
        console.log("Start button pressed");
        this.ToggleUserTab(false);
        if (this.inputElement) this.inputElement.style.display = "none"; // Hide the input element
        localStorage.setItem("playername", playerName);
        console.log("localStorage", localStorage.getItem("playername"));

        const rules = new Rules(this.scene);
        rules.CreateRules(playerName); // Call CreateRules with the player name
    }
}


  ToggleUserTab(_bool) {
    this.UserInputContainer.visible = _bool;
    if (this.inputElement) {
      this.inputElement.style.display = _bool ? "block" : "none"; // Show/hide the input element
    }
    this.userName.visible = !Constant.isMobile && _bool; // Toggle Phaser text visibility based on platform
    if (this.highPhen) {
      this.highPhen.visible = !Constant.isMobile && _bool; // Toggle blinking cursor visibility based on platform
    }
  }
}
