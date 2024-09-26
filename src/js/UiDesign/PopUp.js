export default class PopUp {
  constructor(scene) {
    this.scene = scene;
  }
  CreatePopUp() {
    this.kuchNhi = this.scene.add
      .image(1510, 990, "popup")
      .setOrigin(0.5)
      .setVisible(false)
      .setDepth(2);
  }

  
  EnableKuchNhi() {
    this.kuchNhi.setVisible(true);
    setTimeout(() => {
      this.kuchNhi.setVisible(false);
    }, 1000);
  }
  DisableKuchNhi() {
    this.kuchNhi.setVisible(false);
  }
}
