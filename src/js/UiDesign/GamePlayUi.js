import { Constant } from "../Constant.js";
import { WinLogic } from "../WinLogic.js";

export default class GamePlayUi {
  constructor(scene) {
    this.scene = scene;
    this.truckArray = [];
    this.indicatorArr = [];
    this.barsArr = [];
    this.isBool = true;
    this.indicatorTextArr = [];
    this.isThreeEnable = false;
    this.result = null;
  }

  CreateGameUI() {
    const gameBg = this.scene.add.image(960, 540, "gameBG").setOrigin(0.5);
    this.CreateLoads();
    this.CreateTrucks();
    this.CreateIndicators();
    this.shipButton = this.scene.add
      .image(960, 990, "shipPlay")
      .setOrigin(0.5)
      .setTint(0x808080)
      .setInteractive();
    this.shipButton.on("pointerdown", () => {});
    this.shipButton.on("pointerup", () => {
      this.OnShipReleased();
    });
    this.shipText = this.scene.add
      .text(960, 990, "Ship", {
        fontFamily: "Roboto-Regular",
        fontSize: "40px",
        fill: "#FFFFFF",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);


  }

  CreateLoads() {
    for (let i = 1; i <= 4; i++) {
      this.scene.add.image(520, -70 + i * 220, "conveyer_0" + i).setOrigin(0.5);
    }

    const style = {
      fontFamily: "Roboto-Regular",
      fontSize: "20px",
      fill: "#FFFFFF",
      fontStyle: "bold",
      align: "center",
    };
    const style1 = {
      fontFamily: "Roboto-Medium",
      fontSize: "25px",
      fill: "#FFFFFF",
      fontStyle: "bold",
      align: "center",
    };

    this.scene.add.text(150, 134, "Must Ship", style).setOrigin(0.5);
    this.scene.add.text(150, 172, "2000 lb", style1).setOrigin(0.5);

    this.scene.add.text(150, 355, "Must Ship", style).setOrigin(0.5);
    this.scene.add.text(150, 392, "2200 lb", style1).setOrigin(0.5);

    this.scene.add.text(150, 572, "Filler", style).setOrigin(0.5);
    this.scene.add.text(150, 610, "2000 lb", style1).setOrigin(0.5);

    this.scene.add.text(150, 794, "Filler", style).setOrigin(0.5);
    this.scene.add.text(150, 828, "2200 lb", style1).setOrigin(0.5);
  }

  CreateTrucks() {
    this.truckAreaContainer = this.scene.add.container(0, 0);
    for (let i = 0; i < Constant.truckPosition.length; i++) {
      const { x, y, scale } = Constant.truckPosition[i];
      let truck = this.scene.add
        .image(x, y, "container")
        .setOrigin(0.5)
        .setScale(scale);
      this.truckArray.push(truck);
    }
  }

  CreateIndicators() {
    for (let i = 0; i < Constant.barsPos.length; i++) {
      const container = this.scene.add.container(0, 0);
      const base = this.scene.add
        .image(Constant.barsPos[i].x0, Constant.barsPos[i].y, "Filler_1")
        .setOrigin(0.5);
      const bar = this.scene.add
        .image(Constant.barsPos[i].x1, Constant.barsPos[i].y, "Filler_2")
        .setOrigin(0, 0.5)
        .setScale(0, 1);
      const text = this.scene.add
        .text(Constant.barsPos[i].x2, Constant.barsPos[i].y, 0 + "/" + 45000, {
          fontFamily: "Arial",
          fontSize: "25px",
          fill: "#543c14",
          align: "center",
        })
        .setOrigin(0.5);
      this.indicatorTextArr.push(text);
      let adder = i + 1;
      text.Name = "truck_" + adder;
      container.add([base, bar, text]);
      this.barsArr.push(container);
    }
  }

  OnAddTruck() {
    // this.addTruckBtn.setVisible(false);
    // this.addText.setVisible(false);
    this.EnableThree();
    this.SetPositionOffset();
    this.isThreeEnable = true;
    this.ResetTheOlderElems();
  }
  SetPositionOffset() {
    let count = 22 - this.scene.gamePlay.truckOneCapacity;
    if (count != 0) {
      for (let i = 0; i < count; i++) {
        Constant.sTruckOne[i].isVacant = false;
      }
    }
    let count1 = 22 - this.scene.gamePlay.truckTwoCapacity;
    if (count1 != 0) {
      for (let i = 0; i < count1; i++) {
        Constant.sTruckTwo[i].isVacant = false;
      }
    }
  }
  ResetTheOlderElems() {
    this.scene.gamePlay.firstMustGo.forEach((image, i) => {
      if (image.scaleX == 0.5 && image.scaleY == 0.5) {
        image.setPosition(image.originalX, image.originalY);
        image.setScale(0.6);
      }
    });
    this.scene.gamePlay.secondMustGo.forEach((image, i) => {
      if (image.scaleX == 0.5 && image.scaleY == 0.5) {
        image.setPosition(image.originalX, image.originalY);
        image.setScale(0.6);
      }
    });
    this.scene.gamePlay.firstFillers.forEach((image, i) => {
      if (image.scaleX == 0.5 && image.scaleY == 0.5) {
        image.setPosition(image.originalX, image.originalY);
        image.setScale(0.6);
      }
    });
    this.scene.gamePlay.secondFillers.forEach((image, i) => {
      if (image.scaleX == 0.5 && image.scaleY == 0.5) {
        image.setPosition(image.originalX, image.originalY);
        image.setScale(0.6);
      }
    });
  }
  EnableThree() {
    // console.log("this.bigTruckPosition1 bef", Constant.bigTruckPosition1);

    this.isBool = false;
    for (let i = 0; i < Constant.updatedPosition.length; i++) {
      const { x, y, scale } = Constant.updatedPosition[i];
      this.truckArray[i].setPosition(x, y);
      this.truckArray[i].setScale(scale);
    }
    let count = 0;
    for (let i = 0; i < this.barsArr.length; i++) {
      this.barsArr[i].list[0].setPosition(
        Constant.updatedBarsPos[count].x0,
        Constant.updatedBarsPos[count].y
      );
      this.barsArr[i].list[1].setPosition(
        Constant.updatedBarsPos[count].x1,
        Constant.updatedBarsPos[count].y
      );
      this.barsArr[i].list[2].setPosition(
        Constant.updatedBarsPos[count].x2,
        Constant.updatedBarsPos[count].y
      );
      count++;
    }
    let scaleCount = 0;
    for (let i = 0; i < 3; i++) {
      this.barsArr[i].list[0].setScale(
        Constant.scaleFactorArr[scaleCount].x1,
        Constant.scaleFactorArr[scaleCount].y
      );

      this.barsArr[i].list[1].setScale(
        Constant.scaleFactorArr[scaleCount].x2,
        Constant.scaleFactorArr[scaleCount].y
      );

      this.barsArr[i].list[2].setScale(
        Constant.scaleFactorArr[scaleCount].y,
        Constant.scaleFactorArr[scaleCount].y
      );
      scaleCount++;
    }
    WinLogic.UpdateScale();
    this.scene.gamePlay.CreateNewZones();
    this.scene.gamePlay.ToggleZones(true);
    //   this.gameReff.gamePlayUi.barsArr[i].list[1].x += 85
    for (let i = 0; i < this.barsArr.length; i++) {
      this.barsArr[i].list[1].x += 85;
    }
    // console.log("this.bigTruckPosition1 aft", Constant.bigTruckPosition1);
    for (let i = 0; i < this.scene.gamePlay.shipedToOne.length; i++) {
      this.scene.gamePlay.shipedToOne[i].setScale(0.3);
      this.scene.gamePlay.shipedToOne[i].setPosition(
        Constant.sTruckOne[i].x,
        Constant.sTruckOne[i].y
      );
      this.scene.gamePlay.shipedToOne[i].currentX = Constant.sTruckOne[i].x;
      this.scene.gamePlay.shipedToOne[i].currentY = Constant.sTruckOne[i].y;
    }

    for (let i = 0; i < this.scene.gamePlay.shipedToTwo.length; i++) {
      this.scene.gamePlay.shipedToTwo[i].setScale(0.3);
      this.scene.gamePlay.shipedToTwo[i].setPosition(
        Constant.sTruckTwo[i].x,
        Constant.sTruckTwo[i].y
      );
      this.scene.gamePlay.shipedToTwo[i].currentX = Constant.sTruckTwo[i].x;
      this.scene.gamePlay.shipedToTwo[i].currentY = Constant.sTruckTwo[i].y;
    }
  }
  OnShipReleased() {
    const mustCountersZero =
      this.scene.gamePlay.fMustCounter === 0 &&
      this.scene.gamePlay.sMustGoCounter === 0;

    console.log(
      " this.scene.gamePlay.fMustCounter ",
      this.scene.gamePlay.fMustCounter,
      this.scene.gamePlay.sMustGoCounter
    );

    if (mustCountersZero) {
      this.scene.popUp.DisableKuchNhi();
      this.shipButton.setTint(0xffffff);

      const truckLoads = WinLogic.truckLoads;
      let allTrucksFilled, anyTruckUnderFilled;
      
      allTrucksFilled = truckLoads.slice(0, 2).every((load) => load === 45000);
      anyTruckUnderFilled = truckLoads.slice(0, 2).some((load) => load < 45000);
     

      if (anyTruckUnderFilled) {
        this.CalculateWastage();
        this.scene.loasePage.EnableLosePage(true);
      } else if (allTrucksFilled && mustCountersZero) {
        this.scene.winPage.EnableWinPage(true);
        this.scene.popUp.DisableKuchNhi();
      } else {
      }

      // if (!this.isThreeEnable) {
      this.scene.loasePage.additionText.text =
        "-45000 + " +
        WinLogic.truckLoads[0] +
        " - 45000 + " +
        WinLogic.truckLoads[1];

      this.result =
        -45000 + WinLogic.truckLoads[0] - 45000 + WinLogic.truckLoads[1];

      this.scene.loasePage.balanceText.text = Math.abs(this.result).toString();
    
      let userName = this.scene.userInput.userName.text;
      let userDataArray = JSON.parse(localStorage.getItem("userData")) || [];
      let currentUserData = { name: userName, result: this.result };
      userDataArray.push(currentUserData);
      localStorage.setItem("userData", JSON.stringify(userDataArray));
      this.scene.scoreCardPanel.SetData();
      this.ResetVacancy();
    } else {
      this.scene.popUp.EnableKuchNhi();
    }
  }
  ResetVacancy() {
    for (let i = 0; i < Constant.bigTruckPosition1.length; i++) {
      Constant.bigTruckPosition1[i].isVacant = true;
      Constant.bigTruckPosition2[i].isVacant = true;
      Constant.sTruckOne[i].isVacant = true;
      Constant.sTruckTwo[i].isVacant = true;
      Constant.sTruckThree[i].isVacant = true;
    }
  }
  CalculateWastage() {

  }

  
  ResetGame() {
    Constant.scaleing = [{ scaleX: 0 }, { scaleX: 0 }, { scaleX: 0 }];
    this.scene.gamePlay.truckOneCapacity = 22;
    this.scene.gamePlay.truckTwoCapacity = 22;
    this.scene.gamePlay.truckThreeCapacity = 22;
    this.scene.gamePlay.fMustCounter = 22;
    this.scene.gamePlay.sMustGoCounter = 20;
    this.isBool = true;
    
    this.shipButton.setTint(0x808080);
 
    for (let i = 0; i < this.indicatorTextArr.length; i++) {
      this.indicatorTextArr[i].text = 0 + "/" + 45000;
    }
    for (let i = 0; i < Constant.truckPosition.length; i++) {
      const { x, y, scale } = Constant.truckPosition[i];
      this.truckArray[i].setPosition(x, y);
      this.truckArray[i].setScale(scale);
    }

    let count = 0;
    for (let i = 0; i < this.barsArr.length; i++) {
      this.barsArr[i].list[0].setPosition(
        Constant.barsPos[count].x0,
        Constant.barsPos[count].y
      );
      this.barsArr[i].list[1].setPosition(
        Constant.barsPos[count].x1,
        Constant.barsPos[count].y
      );
      this.barsArr[i].list[2].setPosition(
        Constant.barsPos[count].x2,
        Constant.barsPos[count].y
      );
      count++;
    }

    let scaleCount = 0;
    for (let i = 0; i < 3; i++) {
  

      this.barsArr[i].list[0].setScale(
        Constant.updatedScaleFactorArr[scaleCount].x1,
        Constant.updatedScaleFactorArr[scaleCount].y
      );

      this.barsArr[i].list[1].setScale(
        Constant.updatedScaleFactorArr[scaleCount].x2,
        Constant.updatedScaleFactorArr[scaleCount].y
      );

      this.barsArr[i].list[2].setScale(
        Constant.updatedScaleFactorArr[scaleCount].y,
        Constant.updatedScaleFactorArr[scaleCount].y
      );
      scaleCount++;
    }
   
    this.scene.gamePlay.firstMustGo.forEach((image, i) => {
     
      image.setPosition(
        Constant.brownBlockInitialPos[i].x,
        Constant.brownBlockInitialPos[i].y
      );
      image.state = "onTape";
      image.petName = "";
      image.setScale(0.6);
      image.input.enabled = true;
    });

    // Reset positions and re-enable dragging for secondMustGo images
    this.scene.gamePlay.secondMustGo.forEach((image, i) => {
      image.setPosition(
        Constant.purpleBlockInitialPos[i].x,
        Constant.purpleBlockInitialPos[i].y
      );
      image.setScale(0.6);
      image.state = "onTape";
      image.petName = "";
      image.input.enabled = true;
    });

    // Reset positions and re-enable dragging for firstFillers images
    this.scene.gamePlay.firstFillers.forEach((image, i) => {
      image.setPosition(
        Constant.greenBlockInitialPos[i].x,
        Constant.greenBlockInitialPos[i].y
      );
      image.state = "onTape";
      image.petName = "";
      image.setScale(0.6);
      image.input.enabled = true;
    });

    // Reset positions and re-enable dragging for secondFillers images
    this.scene.gamePlay.secondFillers.forEach((image, i) => {
      image.setPosition(
        Constant.yellowBlockInitialPos[i].x,
        Constant.yellowBlockInitialPos[i].y
      );
      image.setScale(0.6);
      image.state = "onTape";
      image.petName = "";

      image.input.enabled = true;
    });

    // Re-enable zones
    this.scene.gamePlay.zoneArr.forEach((zone) => {
      zone.input.enabled = true;
    });
    this.scene.gamePlay.newzoneArr.forEach((zone) => {
      zone.input.enabled = false;
    });
    //reset bools
    this.isThreeEnable = false;
    this.scene.gamePlay.bigTruckOneCounter = 0;
    this.scene.gamePlay.bigTruckTwoCounter = 0;
    this.scene.gamePlay.bigTruckThreeCounter = 0;
    this.scene.gamePlay.shipedToOne = [];
    this.scene.gamePlay.shipedToTwo = [];
    this.scene.gamePlay.shipedToThree = [];
    //reset zones
    //reset scales
    //reset values on the ''+/+''
    WinLogic.truckLoads = [0, 0, 0];
    //ship cliable
    WinLogic.currentScale = null;
    WinLogic.index = null;
  }
}
