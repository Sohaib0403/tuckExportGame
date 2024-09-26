export default class WinPage {
  constructor(scene) {
    this.scene = scene;
  }
  CreateWinPage() {
    this.winPageCOntainer = this.scene.add.container(960, 540).setDepth(4);
    let base = this.scene.add.image(0, 0, "result_bg").setOrigin(0.5);
    let poster = this.scene.add.image(0, -70, "result_win").setOrigin(0.5);
    this.replayBtn = this.scene.add
      .image(-160, 160, "result_replay_btn")
      .setOrigin(0.5);
    this.replayBtn.setInteractive({ useHandCursor: true });
    this.replayBtn.on("pointerdown", () => {});
    this.replayBtn.on("pointerup", () => {
      this.OnReplayReleased();
    });

    this.topScoreBtn1 = this.scene.add
      .image(160, 160, "Score_btn")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    const topScoreText1 = this.scene.add
      .text(190, 160, "Top Score", {
        fontFamily: "Roboto-Regular",
        fontSize: "35px",
        fill: "#fefefe",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);
    this.winPageCOntainer.add([
      base,
      poster,
      this.replayBtn,
      this.topScoreBtn1,
      topScoreText1,
    ]);

    this.topScoreBtn1.on("pointerdown", () => {});
    this.topScoreBtn1.on("pointerup", () => {
      this.winPageCOntainer.visible = false;
      this.scene.scoreCardPanel.scoreCardContainer.setVisible(true);
    });

    this.winPageCOntainer.visible = false;
  }
  OnReplayReleased() {
    this.DisableWinPage();
    this.scene.gamePlayUi.ResetGame();
  }
  EnableWinPage() {
    this.winPageCOntainer.visible = true;
  }
  DisableWinPage() {
    this.winPageCOntainer.visible = false;
  }
}
