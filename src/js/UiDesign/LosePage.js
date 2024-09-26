export default class LosePage {
  constructor(scene) {
    this.scene = scene;
  }
  CreateLosePage() {
    this.losePageContainer = this.scene.add.container(960, 540).setDepth(2);
    let bg = this.scene.add.image(0, 0, "result_bg").setOrigin(0.5);
    let poster = this.scene.add.image(0, -70, "result_base").setOrigin(0.5);
    let truck = this.scene.add.image(0, -250, "truck_nice").setOrigin(0.5);
    let scoreBg = this.scene.add.image(0, 10, "Score_area").setOrigin(0.5);

    this.additionText = this.scene.add
      .text(0, -20, "100+200+300 =", {
        fontFamily: "Roboto-Regular",
        fontSize: "28px",
        fill: "#b0b0a2",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    this.balanceText = this.scene.add
      .text(0, 65, "600", {
        fontFamily: "Roboto-Regular",
        fontSize: "45px",
        fill: "#fefefe",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);
    this.solutionBtn = this.scene.add
      .image(-160, 160, "result_solution_btn")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    this.replayBtn = this.scene.add
      .image(0, 290, "result_replay_btn")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.solutionBtn.on("pointerdown", () => { });
    this.solutionBtn.on("pointerup", () => {
      this.OnSolutionBtnUp();
    });

    this.replayBtn.on("pointerdown", () => { });
    this.replayBtn.on("pointerup", () => {
      this.OnReplayBtnUp();
    });

    this.topScoreBtn = this.scene.add
      .image(160, 160, "Score_btn")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    const topScoreText = this.scene.add
      .text(190, 160, "Top Score", {
        fontFamily: "Roboto-Regular",
        fontSize: "35px",
        fill: "#fefefe",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    this.topScoreBtn.on("pointerdown", () => { });
    this.topScoreBtn.on("pointerup", () => {
      this.EnableScorePanel();
    });

    this.losePageContainer.add([
      bg,
      poster,
      truck,
      scoreBg,
      this.additionText,
      this.balanceText,
      this.solutionBtn,
      this.topScoreBtn,
      topScoreText,
      this.replayBtn,
    ]);
    this.losePageContainer.setVisible(false);
  }
  OnSolutionBtnUp() {
    // this.DisableLosePage();
    this.scene.solutionPage.EnableSolutionPage();
  }
  OnReplayBtnUp() {
    this.DisableLosePage();
    this.scene.gamePlayUi.ResetGame();
  }
  EnableLosePage() {
    this.losePageContainer.setVisible(true);
  }
  DisableLosePage() {
    this.losePageContainer.setVisible(false);
  }
  EnableScorePanel() {
    this.scene.scoreCardPanel.EnableScoreCard();
  } //=================
}
