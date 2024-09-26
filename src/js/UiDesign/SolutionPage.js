export default class SolutionPage {
  constructor(scene) {
    this.scene = scene;
  }
  CreateSolutionPage() {
    this.SolutionPageContainer = this.scene.add.container(960, 540).setDepth(2);
    const bg = this.scene.add.image(0, 0, "Solution_bg").setOrigin(0.5);
    this.close = this.scene.add.image(880, -470, "cross").setOrigin(0.5).setInteractive({ useHandCursor: true })
    this.close.on("pointerdown", () => { })
    this.close.on("pointerup", () => { this.DisableSolutionPage() })
    let solutionTag = this.scene.add
      .image(0, -500, "Solution_text_base")
      .setOrigin(0.5)
      .setAlpha(0.7)
      .setScale(0.5);
    let solutionText = this.scene.add
      .text(0, -500, "Solution", {
        fontFamily: "Roboto-Bold",
        fontSize: "40px",
        fill: "#FFFFFF",
        // fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    let leftTruck = this.scene.add
      .image(-465, -10, "Solution_truck")
      .setOrigin(0.5);

    let leftTruckStatusBg = this.scene.add.image(
      -465,
      270,
      "Solution_text_base"
    );

    const style = {
      fontFamily: "Roboto-Regular",
      fontSize: "40px",
      fill: "#FFFFFF",
      fontStyle: "bold",
      align: "center",
    };

    const style1 = {
      fontFamily: "Roboto-Regular",
      fontSize: "40px",
      fill: "#ffcc00",
      fontStyle: "bold",
      align: "center",
    };

    let leftStatus = this.scene.add
      .text(-465, 210, "15 pallets at 2200 lbs", style)
      .setOrigin(0.5);
    let leftStatusbtm = this.scene.add
      .text(-475, 260, "6 pallets at 2000 lbs", style)
      .setOrigin(0.5);

    let leftWaste = this.scene.add
      .text(-530, 330, "Waste = 0 lbs", style1)
      .setOrigin(0.5);

    let rightTruckStatusBg = this.scene.add.image(
      465,
      270,
      "Solution_text_base"
    );

    let rightStatus = this.scene.add
      .text(450, 210, "5 pallets at 2200 lbs", style)
      .setOrigin(0.5);
    let rightStatusbtm = this.scene.add
      .text(460, 260, "17 pallets at 2000 lbs", style)
      .setOrigin(0.5);
    let rightWaste = this.scene.add
      .text(404, 330, "Waste = 0 lbs", style1)
      .setOrigin(0.5);
    let rightTruck = this.scene.add
      .image(465, -10, "Solution_truck")
      .setOrigin(0.5);
    this.SolutionPageContainer.add([
      bg,
      solutionTag,
      solutionText,
      leftTruck,
      rightTruck,
      leftTruckStatusBg,
      rightTruckStatusBg,
      leftStatus,
      leftStatusbtm,
      leftWaste,
      rightStatus,
      rightStatusbtm,
      rightWaste,
      this.close
    ]);

    this.SolutionPageContainer.setVisible(false);
  }
  EnableSolutionPage() {
    this.SolutionPageContainer.setVisible(true);
  }

  DisableSolutionPage() {
    this.SolutionPageContainer.setVisible(false);
  }
}
