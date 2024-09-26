import { Constant } from "./Constant.js";

class WinLogic {
  constructor() {
    this.truckLoads = [0, 0, 0];
    this.maxLoad = 45000;
    this.currentScale = null;
    this.index = null;
    this.whenTwoTrucksActScale = null;
    this.whenTthreeTrucksActScale = null;
    this.truckIndex = null;
    this.currentLoad;
  }

  moveWeightBetweenTrucks(truckIndex1, truckIndex2, weight) {
    this.truckLoads[truckIndex1] -= weight;
    this.truckLoads[truckIndex2] += weight;
    this.updateTruckUI(truckIndex1);
    this.updateTruckUI(truckIndex2);
    this.HandleScaling(
      this.gameReff.gamePlayUi.barsArr[truckIndex1].list[1],
      this.truckLoads[truckIndex1],
      truckIndex1
    );
    this.HandleScaling(
      this.gameReff.gamePlayUi.barsArr[truckIndex2].list[1],
      this.truckLoads[truckIndex2],
      truckIndex2
    );
  }

  EachTruckWeightCalculation(zoneName, loadObjName, loadWeight) {
    this.gameReff = Constant.game.scene.scenes[1];
    this.currentLoad = loadWeight;

    if (zoneName === "truck_1") {
      this.truckIndex = 0;
    } else if (zoneName === "truck_2") {
      this.truckIndex = 1;
    } else if (zoneName === "truck_3") {
      this.truckIndex = 2;
    } else {
      return;
    }
    if (this.truckLoads[this.truckIndex] <= this.maxLoad - loadWeight) {
      this.truckLoads[this.truckIndex] += loadWeight;
      this.updateTruckUI(this.truckIndex);
      this.HandleScaling(
        this.gameReff.gamePlayUi.barsArr[this.truckIndex].list[1],
        this.truckLoads[this.truckIndex],
        this.truckIndex
      );
    }
  }

  updateTruckUI(truckIndex) {
    this.gameReff.gamePlayUi.barsArr[
      truckIndex
    ].list[2].text = `${this.truckLoads[truckIndex]}/${this.maxLoad}`;
  }

  HandleScaling(bar, weight, index) {
    this.index = index;
    this.currentScale = weight / this.maxLoad;
    Constant.scaleing[this.index].scaleX = this.currentScale;
    if (this.gameReff.gamePlayUi.isBool) {
      for (let i = 0; i < Constant.scaleing.length; i++) {
        if (i !== this.index) {
          Constant.scaleing[i].scaleX = Constant.scaleing[i].scaleX;
        } else {
          bar.scaleX = Constant.scaleing[i].scaleX;
        }
      }
    } else {
      for (let i = 0; i < Constant.scaleing.length; i++) {
        Constant.scaleing[i].scaleX = parseFloat(
          (Constant.scaleing[i].scaleX * 7) / 10
        );
      }
      bar.scaleX = Constant.scaleing[this.index].scaleX;
      this.whenTthreeTrucksActScale = Constant.scaleing[this.index].scaleX;
    }
  }

  UpdateScale() {
    for (let i = 0; i < Constant.scaleing.length; i++) {
      if (Constant.scaleing[i].scaleX != 0) {
        for (let i = 0; i < Constant.scaleing.length; i++) {
          this.gameReff.gamePlayUi.barsArr[i].list[1].scaleX =
            (Constant.scaleing[i].scaleX * 7) / 10;
        }
      }
    }
  }

  ResetPositionAndScale(_gameObj, index) {
    if (this.gameReff.gamePlayUi.isBool) {
      if (Constant.scaleing[index] != 0) {
        Constant.scaleing[index].scaleX =
          Constant.scaleing[index].scaleX - _gameObj.Id / this.maxLoad;
      }
      if (this.truckLoads[index] != 0) {
        this.truckLoads[index] = this.truckLoads[index] - _gameObj.Id;
      }

      for (let i = 0; i < this.truckLoads.length; i++) {
        this.gameReff.gamePlayUi.barsArr[
          i
        ].list[2].text = `${this.truckLoads[i]}/${this.maxLoad}`;
      }

      for (let i = 0; i < Constant.scaleing.length; i++) {
        if (i !== index) {
          Constant.scaleing[i].scaleX = Constant.scaleing[i].scaleX;
        } else {
          this.gameReff.gamePlayUi.barsArr[i].list[1].scaleX =
            Constant.scaleing[i].scaleX;
        }
      }
    } else {
      if (this.truckLoads[index] != 0) {
        this.truckLoads[index] = this.truckLoads[index] - _gameObj.Id;
      }
      for (let i = 0; i < this.truckLoads.length; i++) {
        this.gameReff.gamePlayUi.barsArr[
          i
        ].list[2].text = `${this.truckLoads[i]}/${this.maxLoad}`;
      }
      this.gameReff.gamePlayUi.barsArr[index].list[1].scaleX -=
        ((_gameObj.Id / this.maxLoad) * 7) / 10;
    }
  }
}

let winLogic = new WinLogic();
export { winLogic as WinLogic };
