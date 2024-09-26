import UserInput from "./UiDesign/UserInput.js";
import GamePlayUi from "./UiDesign/GamePlayUi.js";
import GamePlay from "./UiDesign/GamePlay.js";
import WinPage from "./UiDesign/WinPage.js";
import LosePage from "./UiDesign/LosePage.js";
import SolutionPage from "./UiDesign/SolutionPage.js";
import Rules from "./UiDesign/Rules.js";
import ScoreCardPanel from "./UiDesign/ScoreCardPanel.js";
import PopUp from "./UiDesign/PopUp.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.userInput = null;
    this.gamePlayUi = null;
    this.gamePlay = null;
    this.winPage = null;
    this.loasePage = null;
    this.solutionPage = null;
    this.rules = null;
    this.scoreCardPanel = null;
    this.popUp = null;
  }
  init() {
    this.userInput = new UserInput(this);
    this.gamePlayUi = new GamePlayUi(this);
    this.gamePlay = new GamePlay(this);
    this.winPage = new WinPage(this);
    this.loasePage = new LosePage(this);
    this.solutionPage = new SolutionPage(this);
    this.rules = new Rules(this);
    this.scoreCardPanel = new ScoreCardPanel(this);
    this.popUp = new PopUp(this);
  }

  preload() {}

  create() {
    this.input.on("pointerdown", (ev) => {
      // let x = Math.floor(ev.x);
      // let y = Math.floor(ev.y);
      // console.log("x pos and y pos", x, y);
    });
    this.gamePlayUi.CreateGameUI();
    this.gamePlay.CreateDraggableElements();
    this.rules.CreateRules();
    this.userInput.CreateUserInput();
    this.winPage.CreateWinPage();
    this.popUp.CreatePopUp();
    this.loasePage.CreateLosePage();
    this.solutionPage.CreateSolutionPage();
    this.scoreCardPanel.CreateScoreCard();
  }
}
