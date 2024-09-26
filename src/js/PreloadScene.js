import { Constant } from "./Constant.js";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
    this.fonts = {
      "Roboto-Bold": null,
      "Roboto-Light": null,
      "Roboto-Medium": null,
      "Roboto-Regular": null,
      "RobotoCondensed-Regular": null,
      "Montserrat-Bold": null,
    };
  }
  preload() {
    this.load.image("loaderBg", "assets/images/01_Loader_bg.png");
    this.load.image("progressBase", "assets/images/01_Loader_blank.png");
    this.load.image("progressBar", "assets/images/01_Loader_fill.png");
    this.load.image("truck", "assets/images/01_Loader_truck.png");
    this.load.image("truckSmock", "assets/images/01_Loader_trucksmoke.png");
  }
  create() {
    this.loadingBase = this.add.image(960, 540, "loaderBg");
    this.loadingBase.setOrigin(0.5, 0.5);
    this.loadingProgress = this.add.image(960, 940, "progressBase");
    this.loadingProgress.setOrigin(0.5, 0.5);
    this.loadingProgressBar = this.add
      .image(80, 940, "progressBar")
      .setScale(0, 0.89);
    this.loadingProgressBar.setOrigin(0, 0.5);
    this.truck = this.add.image(160, 910, "truck").setOrigin(0.5);
    this.smoke = this.add.image(100, 910, "truckSmock").setOrigin(0.5);
    this.loadingText = this.add
      .text(215, 900, "LOADING....", {
        fontFamily: "Roboto-Bold",
        fontSize: "45px",
        fill: "#F0E8E8",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    this.loadingPercentageText = this.add
      .text(1800, 870, "0%", {
        fontFamily: "Roboto-Bold",
        fontSize: "40px",
        fill: "#F0E8E8",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    this.loadFonts();
  }
  /**
   * loading fonts
   */
  loadFonts() {
    let propName = Object.getOwnPropertyNames(this.fonts);
    propName.forEach((fontName, index) => {
      let isLast = index >= propName.length - 1;
      this.fonts[fontName] = new FontFaceObserver(fontName);

      this.fonts[fontName]
        .load()
        .then(
          this.FontLoadSuccess.bind(this, fontName, isLast),
          this.FontLoadError.bind(this, fontName)
        );
    });
  }
  /***
   * on successfont load this method will be called
   * only then the assets will be loaded
   */
  FontLoadSuccess(fontName, isLast) {
    if (isLast) {
      this.loadAssets();
    }
  }
  /**
   * If we face any kind of error at the time of loading fonts
   * here we will be able to see the specific error
   * @param {font name} fontName
   */
  FontLoadError(fontName, error) {
    // console.log(`Font load error for ${fontName}:`, error);
  }
  /**
   * loading all the assets required for the game
   */
  loadAssets() {
    this.load.on("progress", this.loadProgress, this);
    this.load.on("complete", this.OnComplete, { scene: this.scene });
    this.load.image("piller", "assets/images/piller.png");
    this.load.image("userBg", "assets/images/02_UserPage_bg.png");
    this.load.image("startBtn", "assets/images/02_UserPage_start_btn.png");
    this.load.image("userArea", "assets/images/02_UserPage_text_box.png");
    this.load.image("gameBG", "assets/images/03_game_area_bg.png");
    this.load.image("Filler_1", "assets/images/03_game_area_blank.png");
    // this.load.image("addTruck", "assets/images/03_game_area_btn.png");
    this.load.image("converter", "assets/images/03_game_area_conveyer.png");
    this.load.image("Filler_2", "assets/images/03_game_area_fill.png");
    this.load.image("truck", "assets/images/03_game_area_truck.png");
    //=======================result=================================

    this.load.image("popup", "assets/images/popup/dick.png");

    this.load.image(
      "lose_truck",
      "assets/images/Solution_and_Result_Assets/lose_truck.png"
    );

    this.load.image(
      "Solution_bg",
      "assets/images/Solution_and_Result_Assets/Solution_bg.png"
    );
    this.load.image("cross", "assets/images/cross.png");
    this.load.image(
      "result_base",
      "assets/images/Solution_and_Result_Assets/result_base.png"
    );

    this.load.image(
      "result_bg",
      "assets/images/Solution_and_Result_Assets/result_bg.png"
    );

    this.load.image(
      "result_Lose",
      "assets/images/Solution_and_Result_Assets/result_Lose.png"
    );

    this.load.image(
      "result_replay_btn",
      "assets/images/Solution_and_Result_Assets/result_replay_btn.png"
    );
    this.load.image(
      "result_solution_btn",
      "assets/images/Solution_and_Result_Assets/result_solution_btn.png"
    );
    this.load.image(
      "result_win",
      "assets/images/Solution_and_Result_Assets/result_win.png"
    );
    this.load.image(
      "Solution_bg_bar",
      "assets/images/Solution_and_Result_Assets/Solution_bg_bar.png"
    );
    this.load.image(
      "Solution_text_base",
      "assets/images/Solution_and_Result_Assets/Solution_text_base.png"
    );

    this.load.image(
      "Solution_truck",
      "assets/images/Solution_and_Result_Assets/Solution_truck.png"
    );

    this.load.image(
      "win_truck",
      "assets/images/Solution_and_Result_Assets/win_truck.png"
    );
    //================================================================================

    //##############################################################
    this.load.image("truck_nice", "assets/images/UpdatedDesign/Truck.png");
    this.load.image("Score_area", "assets/images/UpdatedDesign/Score_area.png");
    this.load.image("Score_btn", "assets/images/UpdatedDesign/Score_btn.png");
    this.load.image("Score_Card", "assets/images/UpdatedDesign/Score_Card.png");
    this.load.image(
      "Top_Score_area",
      "assets/images/UpdatedDesign/Top_Score_area.png"
    );
    //##############################################################
    //game assets loading
    this.load.image(
      "gameBG",
      "assets/images/gamePlayAssets/03_game_area_btn.png"
    );
    this.load.image(
      "blueConveyer",
      "assets/images/gamePlayAssets/03_game_area_conveyer.png"
    );
    this.load.image(
      "yellowProgress",
      "assets/images/gamePlayAssets/03_game_area_fill.png"
    );
    this.load.image("yellow", "assets/images/gamePlayAssets/box_01.png");
    this.load.image("green", "assets/images/gamePlayAssets/box_02.png");
    this.load.image("brown", "assets/images/gamePlayAssets/box_03.png");
    this.load.image("purple", "assets/images/gamePlayAssets/box_04.png");
    this.load.image("instruction_up", "assets/images/instruction_up.png");

    this.load.image("rulesBG", "assets/images/instruction_ref.png");
    this.load.image("next", "assets/images/instruction_next_txt.png");
    this.load.image("back", "assets/images/instruction_back_txt.png");


    this.load.image(
      "conveyer_04",
      "assets/images/gamePlayAssets/conveyer_04.png"
    );
    this.load.image(
      "conveyer_02",
      "assets/images/gamePlayAssets/conveyer_02.png"
    );
    this.load.image(
      "conveyer_01",
      "assets/images/gamePlayAssets/conveyer_01.png"
    );
    this.load.image(
      "conveyer_03",
      "assets/images/gamePlayAssets/conveyer_03.png"
    );

    this.load.image("shipPlay", "assets/images/gamePlayAssets/Ship_btn.png");

    this.load.image(
      "container",
      "assets/images/gamePlayAssets/03_game_area_truck.png"
    );

    this.load.start();
  }
  loadProgress(value) {
    // (20 / 1700) * 100;
    // console.log("value", Math.floor(value * 100));
    let percentage = Math.floor(value * 100);
    this.loadingProgressBar.setScale(value, 0.89);
    let xPosition = (percentage * 1800) / 100;
    // console.log("xPosition", xPosition);
    this.truck.x = xPosition;
    this.smoke.x = xPosition - 60;
    this.loadingPercentageText.setText(percentage + "%");
  }
  OnComplete() {
    Constant.game.scene.stop("PreloadScene");
    Constant.game.scene.start("GameScene");
  }
  update() {}
}
