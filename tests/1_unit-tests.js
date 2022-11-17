const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  suite("Function convertHandler.getNum(input)", () => {
    test("Whole number input", (done) => {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", (done) => {
      let input = "32.2L";
      assert.equal(convertHandler.getNum(input), 32.2);
      done();
    });

    test("Fractional Input", (done) => {
      let input = "32.2/13L";
      assert.equal(convertHandler.getNum(input), 32.2 / 13);
      done();
    });

    test("Fractional Input with decimal", (done) => {
      let input = "32.2/13.3L";
      assert.equal(convertHandler.getNum(input), 32.2 / 13.3);
      done();
    });

    test("Double Fractional", (done) => {
      let input = "3/1/3L";
      assert.isUndefined(convertHandler.getNum(input), 3 / 1 / 3);
      done();
    });

    test("No Numerical Input", (done) => {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  // convertHandler.getUnit(input)
  suite("Function convertHandler.getUnit(input)", () => {
    test("each valid input unit", (done) => {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
      ];
      input.forEach((element, index) => {
        assert.equal(convertHandler.getUnit(element), output[index]);
      });
      done();
    });

    test("Invalid Input Unit", (done) => {
      assert.equal(convertHandler.getUnit("341Kilograms"), undefined);
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(input)", () => {
    test("Return Unit For Each Valid Input Unit", (done) => {
      let input = ["km", "gal", "lbs", "mi", "l", "kg"];
      let output = ["mi", "L", "kg", "km", "gal", "lbs"];

      input.forEach((element, index) => {
        assert.equal(convertHandler.getReturnUnit(element), output[index]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(initUnit)", () => {
    test("spelled-out string unit for each valid input unit", (done) => {
      let input = ["km", "gal", "lbs", "mi", "l", "kg"];
      let output = [
        "kilometers",
        "gallons",
        "pounds",
        "miles",
        "liters",
        "kilograms",
      ];

      input.forEach((element, index) => {
        assert.equal(convertHandler.spellOutUnit(element), output[index]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(initNum,initUnit)", () => {
    let initNum = 1;
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    test("Convert gal to L", (done) => {
      let result = initNum * galToL;
      assert.equal(
        convertHandler.convert(initNum, "gal"),
        parseFloat(result.toFixed(5))
      );
      done();
    });

    test("Convert L to gal", (done) => {
      let result = initNum / galToL;
      assert.equal(
        convertHandler.convert(initNum, "l"),
        parseFloat(result.toFixed(5))
      );
      done();
    });

    test("Convert mi to km", (done) => {
      let result = initNum * miToKm;
      assert.equal(
        convertHandler.convert(initNum, "mi"),
        parseFloat(result.toFixed(5))
      );
      done();
    });

    test("Convert km to mi", (done) => {
      let result = initNum / miToKm;
      assert.equal(
        convertHandler.convert(initNum, "km"),
        parseFloat(result.toFixed(5))
      );
      done();
    });

    test("Convert lbs to kg", (done) => {
      let result = initNum * lbsToKg;
      assert.equal(
        convertHandler.convert(initNum, "lbs"),
        parseFloat(result.toFixed(5))
      );
      done();
    });

    test("Convert kg to lbs", (done) => {
      let result = initNum / lbsToKg;
      assert.equal(
        convertHandler.convert(initNum, "kg"),
        parseFloat(result.toFixed(5))
      );
      done();
    });
  });
});
