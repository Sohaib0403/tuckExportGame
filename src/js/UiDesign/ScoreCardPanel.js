export default class ScoreCardPanel {
  constructor(scene) {
    this.scene = scene;
    this.nameArray = [];
    this.scoreArray = [];
  }
  CreateScoreCard() {
    this.scoreCardContainer = this.scene.add.container(0, 0).setDepth(3);
    const bg = this.scene.add.image(960, 540, "result_bg");

    this.close = this.scene.add
      .image(1840, 70, "cross")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    this.close.on("pointerdown", () => {});
    this.close.on("pointerup", () => {
      this.DisableScoreCard();
      this.scene.winPage.EnableWinPage();
    });

    const header = this.scene.add
      .image(960, 118, "Top_Score_area")
      .setOrigin(0.5);
    const headerText = this.scene.add
      .text(960, 110, "Top Score", {
        fontFamily: "Roboto-Regular",
        fontSize: "35px",
        fill: "#ffffff",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    const scoreCardBg = this.scene.add
      .image(960, 614, "Score_Card")
      .setOrigin(0.5);

    const style = {
      fontFamily: "Roboto-Medium",
      fontSize: "25px",
      fill: "#998553",
      fontStyle: "bold",
      align: "center",
    };
    const contestantText = this.scene.add
      .text(846, 251, "Contestant", style)
      .setOrigin(0.5);

    const scoreText = this.scene.add
      .text(1073, 251, "Score", style)
      .setOrigin(0.5);
    this.scoreCardContainer.add([
      bg,
      header,
      scoreCardBg,
      headerText,
      contestantText,
      scoreText,
      this.close,
    ]);
    this.CraeteScoreText();
  }
  CraeteScoreText() {
    //Names
    let i = 0;
    while (i < 10) {
      let text = this.scene.add
        .text(750, 325 + i * 72.5, "Supriyo", {
          fontFamily: "Roboto-Regular",
          fontSize: "20px",
          fill: "#ffffff",
          fontStyle: "bold",
          align: "center",
        })
        .setOrigin(0, 0.5)
        .setVisible(false);
      this.scoreCardContainer.add(text);
      this.nameArray.push(text);

      let text1 = this.scene.add
        .text(1064, 325 + i * 72.5, "140", {
          fontFamily: "Roboto-Light",
          fontSize: "30px",
          fill: "#ffffff",
          align: "center",
        })
        .setOrigin(0.5)
        .setVisible(false);
      this.scoreCardContainer.add(text1);
      this.scoreArray.push(text1);
      i++;
    }
    this.scoreCardContainer.setVisible(false);
  }
  EnableScoreCard() {
    this.scoreCardContainer.setVisible(true);
  }
  DisableScoreCard() {
    this.scoreCardContainer.setVisible(false);
  }
  SetData() {
    let userArray = JSON.parse(localStorage.getItem("userData"));
    if (!userArray) return; // Check if userArray is null
    userArray.reverse();
    console.log("Player's score: ", userArray);

    // Hide all previous entries first
    this.nameArray.forEach(name => name.setVisible(false));
    this.scoreArray.forEach(score => score.setVisible(false));

    // Now show new data with dynamic score format
    for (let i = 0; i < userArray.length && i < 10; i++) {
      this.nameArray[i].setVisible(true);
      this.scoreArray[i].setVisible(true);
      this.nameArray[i].setText(userArray[i].name); 
      
      this.scoreArray[i].setText(Math.abs(userArray[i].result)); // Use setText to set text correctly
      console.log("userArray[i].result", userArray[i].result);
    }
}


}
