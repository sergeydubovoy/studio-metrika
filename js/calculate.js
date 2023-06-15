const typeSelectNode = document.getElementById("typeSelect");
const metersRangeNode = document.getElementById("metersRange");

const squareMetersValueNode = document.getElementById("metersValue");
const totalCostNode = document.getElementById("resultTotal");
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

const extrasCheckboxesNodes = document.querySelectorAll(".extra__checkbox");
const extrasCostsValuesNodes = document.querySelectorAll(".extra__cost_value");

// ___________________________________________________________________________
// ФУНКЦИИ
// ___________________________________________________________________________

const initApp = () => {
  totalCostNode.textContent = TOTAL_COST.toLocaleString();
  squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();
  firstCounterNode.textContent = COUNTER_INITIAL_VALUE;
  secondCounterNode.textContent = COUNTER_INITIAL_VALUE;
  thirdCounterNode.textContent = COUNTER_INITIAL_VALUE;
};

const choseSquareMeters = () => {
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
    squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();
  }
  if (type.target.value === "house") {
    SQUARE_METER_COST = 1500;
    squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();
  }
  if (type.target.value === "land") {
    SQUARE_METER_COST = 2000;
    squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();
  }
};

const calculateTotalCost = () => {
  let totalCost = metersRangeNode.value * SQUARE_METER_COST;
  let extrasTotalCost = 0;

  extrasCheckboxesNodes.forEach((checkboxNode, i) => {
    if (checkboxNode.checked) {
      extrasTotalCost += parseInt(extrasCostsValuesNodes[i].textContent);
    }
  });

  totalCost += extrasTotalCost;

  totalCostNode.textContent = totalCost.toLocaleString();
};

// ___________________________________________________________________________
// ОБРАБОТЧИКИ СОБЫТИЙ
// ___________________________________________________________________________

// Инициализация приложения после загрузки DOM-дерева
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
// Выбор метража ползунком
metersRangeNode.addEventListener("input", choseSquareMeters);

// Пересчет суммы при смене типа недвижимости
typeSelectNode.addEventListener("change", calculateTotalCost);

// Пересчет суммы при движении ползунка
metersRangeNode.addEventListener("input", calculateTotalCost);

// Калькуляция на счетчиках +
firstPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(firstCounterNode);
});
secondPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(secondCounterNode);
});
thirdPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(thirdCounterNode);
});

// Калькуляция на счетчиках -
firstMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(firstCounterNode);
});
secondMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(secondCounterNode);
});
thirdMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(thirdCounterNode);
});

// Клик по целому элементу экстра
extrasCheckboxesNodes.forEach((checkboxNode) => {
  checkboxNode.addEventListener("click", calculateTotalCost);
});
