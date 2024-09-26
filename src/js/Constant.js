/**
 * all the constant variables that wouldn't be changed through out the game
 * is over here
 */
class Constant {
  constructor() {
    this.game = null;
    this.isMobile = null;
    this.scaleFactor = null;
    this.scaleFactorX = null;
    this.scaleFactorY = null;
    this.currentAspectRatio = null;
    this.originalAspectRatio = null;
    this.currentRatio = null;
    this.truckPosition = [
      { x: 1532, y: 222, scale: 1 },
      { x: 1532, y: 630, scale: 1 },
      { x: 1532, y: 630, scale: 1 },
    ];

    this.updatedPosition = [
      { x: 1532, y: 200, scale: 0.7 },
      { x: 1532, y: 475, scale: 0.7 },
      { x: 1532, y: 750, scale: 0.7 },
    ];

    this.barsPos = [
      {
        x0: 1508,
        x1: 1220,
        x2: 1508,
        y: 400,
      },
      {
        x0: 1508,
        x1: 1220,
        x2: 1508,
        y: 810,
      },
      {
        x0: 1508,
        x1: 1220,
        x2: 1508,
        y: 1250,
      },
    ];

    this.updatedBarsPos = [
      {
        x0: 1508,
        x1: 1220,
        x2: 1508,
        y: 325,
      },
      {
        x0: 1508,
        x1: 1220,
        x2: 1508,
        y: 600,
      },
      {
        x0: 1508,
        x1: 1220,
        x2: 1508,
        y: 875,
      },
    ];

    this.scaleFactorArr = [
      { x1: 0.7, x2: 0, y: 0.7 },
      { x1: 0.7, x2: 0, y: 0.7 },
      { x1: 0.7, x2: 0, y: 0.7 },
    ];

    this.updatedScaleFactorArr = [
      { x1: 1, x2: 0, y: 1 },
      { x1: 1, x2: 0, y: 1 },
      { x1: 1, x2: 0, y: 1 },
    ];
    this.zonePos = [
      {
        y: 217,
      },
      {
        y: 625,
      },
    ];

    this.updatedZonePos = [
      { x: 1465, y: 200 },
      {
        x: 1465,
        y: 472,
      },

      {
        x: 1465,
        y: 745,
      },
    ];
    this.scaleing = [{ scaleX: 0 }, { scaleX: 0 }, { scaleX: 0 }];
    this.bigTruckPosition1 = [
      { x: 1230, y: 175, isVacant: true },
      { x: 1275, y: 175, isVacant: true },
      { x: 1320, y: 175, isVacant: true },
      { x: 1365, y: 175, isVacant: true },
      { x: 1410, y: 175, isVacant: true },
      { x: 1455, y: 175, isVacant: true },
      { x: 1500, y: 175, isVacant: true },
      { x: 1545, y: 175, isVacant: true },
      { x: 1590, y: 175, isVacant: true },
      { x: 1635, y: 175, isVacant: true },
      { x: 1635, y: 217, isVacant: true },
      { x: 1635, y: 260, isVacant: true }, //1
      { x: 1590, y: 260, isVacant: true }, //2
      { x: 1545, y: 260, isVacant: true }, //3
      { x: 1500, y: 260, isVacant: true }, //4
      { x: 1455, y: 260, isVacant: true }, //5
      { x: 1410, y: 260, isVacant: true }, //6
      { x: 1365, y: 260, isVacant: true }, //7
      { x: 1320, y: 260, isVacant: true }, //8
      { x: 1275, y: 260, isVacant: true }, //9
      { x: 1230, y: 260, isVacant: true }, //10
      { x: 1230, y: 218, isVacant: true },
    ];
    this.bigTruckPosition2 = [
      { x: 1230, y: 585, isVacant: true },
      { x: 1275, y: 585, isVacant: true },
      { x: 1320, y: 585, isVacant: true },
      { x: 1365, y: 585, isVacant: true },
      { x: 1410, y: 585, isVacant: true },
      { x: 1455, y: 585, isVacant: true },
      { x: 1500, y: 585, isVacant: true },
      { x: 1545, y: 585, isVacant: true },
      { x: 1590, y: 585, isVacant: true },
      { x: 1635, y: 585, isVacant: true },
      { x: 1635, y: 628, isVacant: true },
      { x: 1635, y: 670, isVacant: true },
      { x: 1590, y: 670, isVacant: true },
      { x: 1545, y: 670, isVacant: true }, //2
      { x: 1500, y: 670, isVacant: true }, //3
      { x: 1455, y: 670, isVacant: true }, //4
      { x: 1410, y: 670, isVacant: true }, //5
      { x: 1365, y: 670, isVacant: true }, //6
      { x: 1320, y: 670, isVacant: true }, //7
      { x: 1275, y: 670, isVacant: true }, //8
      { x: 1230, y: 670, isVacant: true }, //9
      { x: 1230, y: 630, isVacant: true }, //10
    ];
    //small truck position

    this.sTruckOne = [
      { x: 1320, y: 155, isVacant: true },
      { x: 1355, y: 155, isVacant: true },
      { x: 1390, y: 155, isVacant: true },
      { x: 1425, y: 155, isVacant: true },
      { x: 1460, y: 155, isVacant: true },
      { x: 1495, y: 155, isVacant: true },
      { x: 1530, y: 155, isVacant: true },
      { x: 1565, y: 155, isVacant: true },
      { x: 1600, y: 155, isVacant: true },
      { x: 1435, y: 197, isVacant: true },
      { x: 1470, y: 197, isVacant: true },
      { x: 1505, y: 197, isVacant: true },
      { x: 1540, y: 197, isVacant: true },
      { x: 1320, y: 240, isVacant: true },
      { x: 1355, y: 240, isVacant: true },
      { x: 1390, y: 240, isVacant: true },
      { x: 1425, y: 240, isVacant: true },
      { x: 1460, y: 240, isVacant: true },
      { x: 1495, y: 240, isVacant: true },
      { x: 1530, y: 240, isVacant: true },
      { x: 1565, y: 240, isVacant: true },
      { x: 1600, y: 240, isVacant: true },
    ];

    this.sTruckTwo = [
      { x: 1320, y: 430, isVacant: true },
      { x: 1355, y: 430, isVacant: true },
      { x: 1390, y: 430, isVacant: true },
      { x: 1425, y: 430, isVacant: true },
      { x: 1460, y: 430, isVacant: true },
      { x: 1495, y: 430, isVacant: true },
      { x: 1530, y: 430, isVacant: true },
      { x: 1565, y: 430, isVacant: true },
      { x: 1600, y: 430, isVacant: true },
      { x: 1435, y: 470, isVacant: true },
      { x: 1470, y: 470, isVacant: true },
      { x: 1505, y: 470, isVacant: true },
      { x: 1540, y: 470, isVacant: true },
      { x: 1320, y: 510, isVacant: true },
      { x: 1355, y: 510, isVacant: true },
      { x: 1390, y: 510, isVacant: true },
      { x: 1425, y: 510, isVacant: true },
      { x: 1460, y: 510, isVacant: true },
      { x: 1495, y: 510, isVacant: true },
      { x: 1530, y: 510, isVacant: true },
      { x: 1565, y: 510, isVacant: true },
      { x: 1600, y: 510, isVacant: true },
    ];

    this.sTruckThree = [
      { x: 1320, y: 710, isVacant: true },
      { x: 1355, y: 710, isVacant: true },
      { x: 1390, y: 710, isVacant: true },
      { x: 1425, y: 710, isVacant: true },
      { x: 1460, y: 710, isVacant: true },
      { x: 1495, y: 710, isVacant: true },
      { x: 1530, y: 710, isVacant: true },
      { x: 1565, y: 710, isVacant: true },
      { x: 1600, y: 710, isVacant: true },
      { x: 1435, y: 747, isVacant: true },
      { x: 1470, y: 747, isVacant: true },
      { x: 1505, y: 747, isVacant: true },
      { x: 1540, y: 747, isVacant: true },
      { x: 1320, y: 785, isVacant: true },
      { x: 1355, y: 785, isVacant: true },
      { x: 1390, y: 785, isVacant: true },
      { x: 1425, y: 785, isVacant: true },
      { x: 1460, y: 785, isVacant: true },
      { x: 1495, y: 785, isVacant: true },
      { x: 1530, y: 785, isVacant: true },
      { x: 1565, y: 785, isVacant: true },
      { x: 1600, y: 785, isVacant: true },
    ];

    this.brownBlockInitialPos = [
      { x: 300, y: 125 },
      { x: 370, y: 125 },
      { x: 440, y: 125 },
      { x: 510, y: 125 },
      { x: 580, y: 125 },
      { x: 650, y: 125 },
      { x: 720, y: 125 },
      { x: 790, y: 125 },
      { x: 860, y: 125 },
      { x: 930, y: 125 },
      { x: 997, y: 125 },
      { x: 320, y: 175 },
      { x: 390, y: 175 },
      { x: 460, y: 175 },
      { x: 530, y: 175 },
      { x: 600, y: 175 },
      { x: 670, y: 175 },
      { x: 740, y: 175 },
      { x: 810, y: 175 },
      { x: 880, y: 175 },
      { x: 950, y: 175 },
      { x: 1015, y: 175 },
    ];

    this.purpleBlockInitialPos = [
      { x: 300, y: 345 },
      { x: 370, y: 345 },
      { x: 440, y: 345 },
      { x: 510, y: 345 },
      { x: 580, y: 345 },
      { x: 650, y: 345 },
      { x: 720, y: 345 },
      { x: 790, y: 345 },
      { x: 860, y: 345 },
      { x: 930, y: 345 },
      { x: 330, y: 395 },
      { x: 400, y: 395 },
      { x: 470, y: 395 },
      { x: 540, y: 395 },
      { x: 610, y: 395 },
      { x: 680, y: 395 },
      { x: 750, y: 395 },
      { x: 820, y: 395 },
      { x: 890, y: 395 },
      { x: 960, y: 395 },
    ];

    this.greenBlockInitialPos = [
      { x: 319, y: 570 },
      { x: 394, y: 615 },
      { x: 469, y: 570 },
      { x: 544, y: 615 },
      { x: 619, y: 570 },
      { x: 694, y: 615 },
      { x: 769, y: 570 },
      { x: 844, y: 615 },
      { x: 919, y: 570 },
      { x: 994, y: 615 },
    ];

    this.yellowBlockInitialPos = [
      { x: 319, y: 790 },
      { x: 394, y: 832 },
      { x: 469, y: 790 },
      { x: 544, y: 832 },
      { x: 619, y: 790 },
      { x: 694, y: 832 },
      { x: 769, y: 790 },
      { x: 844, y: 832 },
      { x: 919, y: 790 },
      { x: 994, y: 832 },
    ];
  }
}

let constant = new Constant();
export { constant as Constant };
