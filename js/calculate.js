const typeSelectNode = document.getElementById("typeSelect");
const metersRangeNode = document.getElementById("metersRange");

const squareMetersValueNode = document.getElementById("metersValue");
const resultTotalCostNode = document.getElementById("resultTotal");
const squareMeterCostNode = document.getElementById("squareMeterCost");

let SQUARE_METER_COST = 1000;
let TOTAL_COST = 44000;

let COUNTER_INITIAL_VALUE = 0;

const firstMinusButtonNode = document.getElementById("minusButton_1");
const secondMinusButtonNode = document.getElementById("minusButton_2");
const thirdMinusButtonNode = document.getElementById("minusButton_3");

const firstPlusButtonNode = document.getElementById("plusButton_1");
const secondPlusButtonNode = document.getElementById("plusButton_2");
const thirdPlusButtonNode = document.getElementById("plusButton_3");

const firstCounterNode = document.getElementById("counterNode_1");
const secondCounterNode = document.getElementById("counterNode_2");
const thirdCounterNode = document.getElementById("counterNode_3");

// ___________________________________________________________________________
// ФУНКЦИИ
// ___________________________________________________________________________

const initApp = () => {
  resultTotalCostNode.textContent = TOTAL_COST;
  squareMeterCostNode.textContent = SQUARE_METER_COST;
  firstCounterNode.textContent = COUNTER_INITIAL_VALUE;
  secondCounterNode.textContent = COUNTER_INITIAL_VALUE;
  thirdCounterNode.textContent = COUNTER_INITIAL_VALUE;
};

const choseMeters = () => {
  squareMetersValueNode.textContent = metersRangeNode.value;
};

const counterPlusOne = (counterNode) => {
  let counterValue = parseInt(counterNode.textContent);
  counterNode.textContent = ++counterValue;
};

const counterMinusOne = (counterNode) => {
  let counterValue = parseInt(counterNode.textContent);
  counterNode.textContent = --counterValue;
};

const choseEstateType = (type) => {
  if (type.target.value === "flat") {
    SQUARE_METER_COST = 1000;
    squareMeterCostNode.textContent = SQUARE_METER_COST;
  }
  if (type.target.value === "house") {
    SQUARE_METER_COST = 1500;
    squareMeterCostNode.textContent = SQUARE_METER_COST;
  }
  if (type.target.value === "land") {
    SQUARE_METER_COST = 2000;
    squareMeterCostNode.textContent = SQUARE_METER_COST;
  }
};

// const updateCounter = (event) => {
//   const parentElement = event.target.closest(".doc__calc");
//   const counterNode = parentElement.querySelector("calc_value");

//   if (event.target.classList.contains("calc_minus")) {
//     let currentCounterValue = parseInt(counterNode.textContent);
//     if (currentCounterValue > 0) {
//       counterNode.textContent = --currentCounterValue;
//     }
//   }

//   if (event.target.classList.contains("calc_plus")) {
//     let currentCounterValue = parseInt(counterNode.textContent);
//     counterNode.textContent = ++currentCounterValue;
//   }
// };

// ___________________________________________________________________________
// ОБРАБОТЧИКИ СОБЫТИЙ
// ___________________________________________________________________________

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

metersRangeNode.addEventListener("input", choseMeters);

firstPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(firstCounterNode);
});
secondPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(secondCounterNode);
});
thirdPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(thirdCounterNode);
});

firstMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(firstCounterNode);
});
secondMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(secondCounterNode);
});
thirdMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(thirdCounterNode);
});
