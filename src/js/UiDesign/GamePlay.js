import { Constant } from "../Constant.js";
import { WinLogic } from "../WinLogic.js";

export default class GamePlay {
  constructor(scene) {
    this.shipedToOne = [];
    this.shipedToTwo = [];
    this.shipedToThree = [];
    this.scene = scene;
    this.truckOneCapacity = 22;
    this.truckTwoCapacity = 22;
    this.truckThreeCapacity = 22;
    this.firstMustGo = [];
    this.secondMustGo = [];

    this.firstFillers = [];
    this.secondFillers = [];

    this.zoneArr = [];
    this.newzoneArr = [];
    this.fMustCounter = 22;
    this.sMustGoCounter = 20;
    this.bigTruckOneCounter = 0;
    this.bigTruckTwoCounter = 0;
    this.bigTruckThreeCounter = 0;
    // this.shippedToOne = [];
    // this.shippedToTwo = [];
    // this.shippedToThree = [];
    this.balerContainer = null;
    this.selectedEmem = [];

    this.temp = "";
    this.temp1 = "";
  }

  createDraggableImage(x, y, texture, name, id, scale = 0.6) {
    let image = this.scene.add
      .image(x, y, texture)
      .setOrigin(0.5)
      .setScale(scale)
      .setInteractive({ useHandCursor: true });

    this.balerContainer.add(image);
    image.Name = name;
    image.Id = id;
    this.scene.input.setDraggable(image);

    return image;
  }

  CreateDraggableElements() {
    this.balerContainer = this.scene.add.container(0, 0).setDepth(1);
    let x, y, l, m, yPos, yPosition;

    // First must go
    for (let i = 0; i < 22; i++) {
      if (i < 11) {
        x = 300;
        y = 125;
      } else {
        x = -450;
        y = 175;
      }
      let brown = this.createDraggableImage(
        x + i * 70,
        y,
        "brown",
        "brown",
        2000
      );
      brown.originalX = x + i * 70;
      brown.originalY = y;
      brown.state = "onTape";
      brown.petName = "";
      this.firstMustGo.push(brown);
    }

    // Second must go
    for (let i = 0; i < 20; i++) {
      if (i < 10) {
        l = 300;
        m = 345;
      } else {
        l = -370;
        m = 395;
      }
      let purple = this.createDraggableImage(
        l + i * 70,
        m,
        "purple",
        "purple",
        2200
      );
      purple.originalX = l + i * 70;
      purple.originalY = m;
      purple.state = "onTape";
      purple.petName = "";

      this.secondMustGo.push(purple);
    }

    // First fillers
    for (let i = 0; i < 10; i++) {
      yPos = i % 2 === 0 ? 570 : 615;
      let green = this.createDraggableImage(
        319 + i * 75,
        yPos,
        "green",
        "green",
        2000
      );
      green.originalX = 319 + i * 75;
      green.originalY = yPos;
      green.state = "onTape";
      green.petName = "";

      this.firstFillers.push(green);
    }

    // Second fillers
    for (let i = 0; i < 10; i++) {
      yPosition = i % 2 === 0 ? 790 : 832;
      let yellow = this.createDraggableImage(
        319 + i * 75,
        yPosition,
        "yellow",
        "yellow",
        2200
      );
      yellow.originalX = 319 + i * 75;
      yellow.originalY = yPosition;
      yellow.state = "onTape";
      yellow.petName = "";
      this.secondFillers.push(yellow);
    }

    this.applyDraggability();
  }

  applyDraggability() {
    let zone;
    for (let i = 0; i < 2; i++) {
      zone = this.scene.add
        .zone(1440, Constant.zonePos[i].y, 500, 200)
        .setRectangleDropZone(500, 200);
      let adder = i + 1;
      zone.Name = "truck_" + adder;
      this.zoneArr.push(zone); // Added this line to keep track of zones
    }

    this.scene.input.on("dragstart", (pointer, gameObject) => {
      this.scene.children.bringToTop(gameObject);
      gameObject.originalZone = this.getZoneName(gameObject.x, gameObject.y);
    });

    this.scene.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.scene.input.on("drop", (pointer, gameObject, dropZone) => {
      if (!this.scene.gamePlayUi.isThreeEnable) {
        gameObject.scale = 0.5;
        if (
          dropZone.Name == "truck_1" &&
          this.truckOneCapacity > 0 &&
          45000 - WinLogic.truckLoads[0] >= gameObject.Id &&
          gameObject.originalZone !== "truck_1" &&
          gameObject.originalZone !== "truck_2"
        ) {
          gameObject.index = 0;
          gameObject.originalZone = dropZone.Name;
          gameObject.state = "onTruck";
          this.shipedToOne.push(gameObject);
          this.truckOneCapacity -= 1;
          this.bigTruckOneCounter += 1;

          for (let i = 0; i < Constant.bigTruckPosition1.length; i++) {
            if (Constant.bigTruckPosition1[i].isVacant) {
              gameObject.x = Constant.bigTruckPosition1[i].x;
              gameObject.y = Constant.bigTruckPosition1[i].y;
              gameObject.currentX = Constant.bigTruckPosition1[i].x;
              gameObject.currentY = Constant.bigTruckPosition1[i].y;
              Constant.bigTruckPosition1[i].isVacant = false;
              break;
            }
          }
          WinLogic.EachTruckWeightCalculation(
            dropZone.Name,
            gameObject.Name,
            gameObject.Id
          );
        } else if (
          dropZone.Name == "truck_2" &&
          this.truckTwoCapacity > 0 &&
          45000 - WinLogic.truckLoads[1] >= gameObject.Id &&
          gameObject.originalZone !== "truck_2" &&
          gameObject.originalZone !== "truck_1"
        ) {
          gameObject.index = 1;
          gameObject.originalZone = dropZone.Name;
          this.shipedToTwo.push(gameObject);
          this.truckTwoCapacity -= 1;
          this.bigTruckTwoCounter += 1;
          gameObject.state = "onTruck";
          // gameObject.x =
          //   Constant.bigTruckPosition2[this.bigTruckTwoCounter - 1].x;
          // gameObject.y =
          //   Constant.bigTruckPosition2[this.bigTruckTwoCounter - 1].y;

          for (let i = 0; i < Constant.bigTruckPosition2.length; i++) {
            if (Constant.bigTruckPosition2[i].isVacant) {
              gameObject.x = Constant.bigTruckPosition2[i].x;
              gameObject.y = Constant.bigTruckPosition2[i].y;
              gameObject.currentX = Constant.bigTruckPosition2[i].x;
              gameObject.currentY = Constant.bigTruckPosition2[i].y;
              Constant.bigTruckPosition2[i].isVacant = false;
              break;
            }
          }

          WinLogic.EachTruckWeightCalculation(
            dropZone.Name,
            gameObject.Name,
            gameObject.Id
          );
        } else {
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;
          gameObject.setScale(0.5);
          gameObject.petName = "repeater";
          setTimeout(() => {
            gameObject.input.enabled = true;
          }, 1000);

          // new code to add a div with the specified properties
          const div = document.createElement("div");
          div.style.border = "4px solid #e1ad01";
          div.style.borderRadius = "15px";

          div.style.width = "450px";
          div.style.height = "65px";
          div.style.backgroundColor = "black";
          div.style.position = "absolute";
          div.style.left = `${window.innerWidth / 2 - 150}px`;
          div.style.top = `${window.innerHeight / 2 - 30}px`;
          div.style.display = "flex";
          div.style.justifyContent = "center";
          div.style.alignContent = "center";
          div.style.alignItems = "center";
          div.innerHTML = "Weight limit exceeded...";
          div.style.fontSize = "30px";
          div.style.color = "#e1ad01";
          div.style.textAlign = "center";
          div.style.fontFamily = "Roboto-Regular";

          document.body.appendChild(div);

          // remove the div after 2 seconds
          setTimeout(() => {
            div.remove();
          }, 2000);
        }
      } else {
        gameObject.scale = 0.3;
        if (
          dropZone.Name == "truck_1" &&
          this.truckOneCapacity > 0 &&
          45000 - WinLogic.truckLoads[0] >= gameObject.Id &&
          gameObject.originalZone !== "truck_1" &&
          gameObject.originalZone !== "truck_2" &&
          gameObject.originalZone !== "truck_3"
        ) {
          gameObject.index = 0;
          gameObject.originalZone = dropZone.Name;
          gameObject.state = "onTruck";
          this.truckOneCapacity -= 1;
          this.shipedToOne.push(gameObject);
          this.bigTruckOneCounter += 1;
          // gameObject.x = Constant.sTruckOne[this.bigTruckOneCounter - 1].x;
          // gameObject.y = Constant.sTruckOne[this.bigTruckOneCounter - 1].y;

          for (let i = 0; i < Constant.sTruckOne.length; i++) {
            if (Constant.sTruckOne[i].isVacant) {
              gameObject.x = Constant.sTruckOne[i].x;
              gameObject.y = Constant.sTruckOne[i].y;
              gameObject.currentX = Constant.sTruckOne[i].x;
              gameObject.currentY = Constant.sTruckOne[i].y;
              Constant.sTruckOne[i].isVacant = false;
              break;
            }
          }
          WinLogic.EachTruckWeightCalculation(
            dropZone.Name,
            gameObject.Name,
            gameObject.Id
          );
        } else if (
          dropZone.Name == "truck_2" &&
          this.truckTwoCapacity > 0 &&
          45000 - WinLogic.truckLoads[1] >= gameObject.Id &&
          gameObject.originalZone !== "truck_1" &&
          gameObject.originalZone !== "truck_2" &&
          gameObject.originalZone !== "truck_3"
        ) {
          gameObject.index = 1;
          gameObject.originalZone = dropZone.Name;
          this.truckTwoCapacity -= 1;
          gameObject.state = "onTruck";
          this.shipedToTwo.push(gameObject);
          this.bigTruckTwoCounter += 1;

          for (let i = 0; i < Constant.sTruckTwo.length; i++) {
            if (Constant.sTruckTwo[i].isVacant) {
              gameObject.x = Constant.sTruckTwo[i].x;
              gameObject.y = Constant.sTruckTwo[i].y;
              gameObject.currentX = Constant.sTruckTwo[i].x;
              gameObject.currentY = Constant.sTruckTwo[i].y;
              Constant.sTruckTwo[i].isVacant = false;
              break;
            }
          }

          WinLogic.EachTruckWeightCalculation(
            dropZone.Name,
            gameObject.Name,
            gameObject.Id
          );
        } else if (
          dropZone.Name == "truck_3" &&
          this.truckThreeCapacity > 0 &&
          45000 - WinLogic.truckLoads[2] >= gameObject.Id &&
          gameObject.originalZone !== "truck_1" &&
          gameObject.originalZone !== "truck_2" &&
          gameObject.originalZone !== "truck_3"
        ) {
          gameObject.index = 2;
          gameObject.originalZone = dropZone.Name;
          gameObject.state = "onTruck";
          this.truckThreeCapacity -= 1;
          this.shipedToThree.push(gameObject);
          this.bigTruckThreeCounter += 1;

          for (let i = 0; i < Constant.sTruckThree.length; i++) {
            if (Constant.sTruckThree[i].isVacant) {
              gameObject.x = Constant.sTruckThree[i].x;
              gameObject.y = Constant.sTruckThree[i].y;
              gameObject.currentX = Constant.sTruckThree[i].x;
              gameObject.currentY = Constant.sTruckThree[i].y;
              Constant.sTruckThree[i].isVacant = false;
              break;
            }
          }

          WinLogic.EachTruckWeightCalculation(
            dropZone.Name,
            gameObject.Name,
            gameObject.Id
          );
        } else {
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;
          gameObject.petName = "repeater";
          gameObject.setScale(0.5);
          setTimeout(() => {
            gameObject.input.enabled = true;
          }, 1000);
        }
      }
      if (gameObject.petName != "repeater") {
        if (gameObject.Name == "brown") {
          this.fMustCounter -= 1;
        } else if (gameObject.Name == "purple") {
          this.sMustGoCounter -= 1;
        }
      }
      // console.log("sMustGoCounter", this.sMustGoCounter);
    });

    this.scene.input.on("dragend", (pointer, gameObject, dropped) => {
      if (!dropped) {
        this.scene.tweens.add({
          targets: gameObject,
          duration: 100,
          ease: "Quartic.Out",
          x: gameObject.originalX,
          y: gameObject.originalY,
          onComplete: () => {
            gameObject.setScale(0.6);
            gameObject.input.enabled = true;
            gameObject.petName = "";

            if (gameObject.index != undefined) {
              gameObject.setScale(0.6);
              if (
                gameObject.state == "onTruck" &&
                gameObject.petName != "repeater"
              ) {
                this.ResetAfterDraggOut(gameObject);
                WinLogic.ResetPositionAndScale(gameObject, gameObject.index);
                gameObject.state = "onTape";
              }
            }
          },
        });
      } else {
        gameObject.input.enabled = true;
      }
    });
  }
  ResetAfterDraggOut(gameObject) {
    if (gameObject.index == 0) {
      this.truckOneCapacity += 1;
      this.bigTruckOneCounter -= 1;
      if (!this.scene.gamePlayUi.isThreeEnable) {
        for (let i = 0; i < Constant.bigTruckPosition1.length; i++) {
          if (
            Constant.bigTruckPosition1[i].x == gameObject.currentX &&
            Constant.bigTruckPosition1[i].y == gameObject.currentY
          ) {
            Constant.bigTruckPosition1[i].isVacant = true;
          }
        }
      } else {
        for (let i = 0; i < Constant.sTruckOne.length; i++) {
          if (
            Constant.sTruckOne[i].x == gameObject.currentX &&
            Constant.sTruckOne[i].y == gameObject.currentY
          ) {
            Constant.sTruckOne[i].isVacant = true;
          }
        }
      }
      this.EliminateFromArray(gameObject.Name, this.shipedToOne);
    } else if (gameObject.index == 1) {
      this.truckTwoCapacity += 1;
      this.bigTruckTwoCounter -= 1;
      if (!this.scene.gamePlayUi.isThreeEnable) {
        for (let i = 0; i < Constant.bigTruckPosition2.length; i++) {
          if (
            Constant.bigTruckPosition2[i].x == gameObject.currentX &&
            Constant.bigTruckPosition2[i].y == gameObject.currentY
          ) {
            Constant.bigTruckPosition2[i].isVacant = true;
          }
        }
      } else {
        for (let i = 0; i < Constant.sTruckTwo.length; i++) {
          if (
            Constant.sTruckTwo[i].x == gameObject.currentX &&
            Constant.sTruckTwo[i].y == gameObject.currentY
          ) {
            Constant.sTruckTwo[i].isVacant = true;
          }
        }
      }
      this.EliminateFromArray(gameObject.Name, this.shipedToTwo);
    } else if (gameObject.index == 2) {
      // this.shipedToThree.pop(gameObject)
      this.truckThreeCapacity += 1;
      this.bigTruckThreeCounter -= 1;
      //#############################################################
      for (let i = 0; i < Constant.sTruckThree.length; i++) {
        if (
          Constant.sTruckThree[i].x == gameObject.currentX &&
          Constant.sTruckThree[i].y == gameObject.currentY
        ) {
          Constant.sTruckThree[i].isVacant = true;
        }
      }
      this.EliminateFromArray(gameObject.Name, this.shipedToThree);
    }
    //==========================================
    if (gameObject.Name == "brown") {
      this.fMustCounter += 1;
    } else if (gameObject.Name == "purple") {
      this.sMustGoCounter += 1;
    }
  }
  EliminateFromArray(_Name, _arr) {
    for (let i = 0; i < _arr.length; i++) {
      if (_arr[i].Name === _Name) {
        _arr.splice(i, 1);
        break;
      }
    }
    // console.log("_Name", _Name, _arr.length);
  }

  getZoneName(x, y) {
    // Implement this method to return the name of the zone at the given coordinates
    for (let i = 0; i < this.zoneArr.length; i++) {
      let zone = this.zoneArr[i];
      if (
        x >= zone.x - zone.width / 2 &&
        x <= zone.x + zone.width / 2 &&
        y >= zone.y - zone.height / 2 &&
        y <= zone.y + zone.height / 2
      ) {
        return zone.Name;
      }
    }
    return null;
  }

  getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

  CreateNewZones() {
    let zone;
    for (let i = 0; i < Constant.updatedZonePos.length; i++) {
      zone = this.scene.add
        .zone(1465, Constant.updatedZonePos[i].y, 300, 150)
        .setRectangleDropZone(300, 150);
      this.newzoneArr.push(zone);

      let adder = i + 1;
      zone.Name = "truck_" + adder;
    }
  }

  ToggleZones(_bool) {
    if (_bool) {
      this.newzoneArr.forEach((zone) => {
        zone.input.enabled = true;
      });
      this.zoneArr.forEach((zone) => {
        zone.input.enabled = false;
      });
    } else {
      this.zoneArr.forEach((zone) => {
        zone.input.enabled = true;
      });
      this.newzoneArr.forEach((zone) => {
        zone.input.enabled = false;
      });
    }
  }
}
