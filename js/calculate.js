const typeSelectNode = document.getElementById("typeSelect");
const metersRangeNode = document.getElementById("metersRange");

const totalCostNode = document.getElementById("resultTotal");
const squareMetersValueNode = document.getElementById("metersValue");
const squareMeterCostNode = document.getElementById("squareMeterCost");

let SQUARE_METER_COST = 1000;
let TOTAL_COST = 44000;
let COUNTER_INITIAL_VALUE = 0;
let SQUARE_METERS_INITIAL_VALUE = 44;

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
const extras = document.querySelectorAll(".extra");

const optionsItemsNodes = document.querySelectorAll(".option__item");

const optionsCheckboxesNodes = document.querySelectorAll(".option__checkbox");

// ___________________________________________________________________________
// ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
// ___________________________________________________________________________

const STORAGE_ORDERS = "Order"; // Пометка для сохранения в локальное хранилище

let orders = JSON.parse(localStorage.getItem(STORAGE_ORDERS)) || []; // Массив с заказами

const storagedOrders = JSON.parse(localStorage.getItem(STORAGE_ORDERS)); // Методом parse извлекаем из JSON строки обратно в JS объект

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders));
}

// function initApp() {
//   totalCostNode.textContent = TOTAL_COST.toLocaleString();
//   squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();
//   firstCounterNode.textContent = COUNTER_INITIAL_VALUE;
//   secondCounterNode.textContent = COUNTER_INITIAL_VALUE;
//   thirdCounterNode.textContent = COUNTER_INITIAL_VALUE;
//   loadStoragedOrders();
//   choseSquareMeters();

//   calculateTotalCost();
// }

// function initApp() {
//   totalCostNode.textContent = TOTAL_COST.toLocaleString();
//   squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();
//   firstCounterNode.textContent = COUNTER_INITIAL_VALUE;
//   secondCounterNode.textContent = COUNTER_INITIAL_VALUE;
//   thirdCounterNode.textContent = COUNTER_INITIAL_VALUE;
//   squareMetersValueNode.textContent = SQUARE_METERS_INITIAL_VALUE;

//   const lastOrder = loadLastStoragedOrder();
//   if (lastOrder !== null) {
//     typeSelectNode.value = lastOrder.type;
//     metersRangeNode.value = lastOrder.meters;
//     firstCounterNode.textContent = lastOrder.counters[0];
//     secondCounterNode.textContent = lastOrder.counters[1];
//     thirdCounterNode.textContent = lastOrder.counters[2];
//     squareMetersValueNode.textContent = lastOrder.squareMeters;

//     extrasCheckboxesNodes.forEach((extraCheckboxNode, i) => {
//       if (
//         lastOrder.extras.some((extra) => extra.name === extraCheckboxNode.name)
//       ) {
//         extraCheckboxNode.checked = true;
//       }
//     });

//     optionsCheckboxesNodes.forEach((optionCheckboxNode) => {
//       if (
//         lastOrder.options.some(
//           (option) => option.name === optionCheckboxNode.name
//         )
//       ) {
//         optionCheckboxNode.checked = true;
//       }
//     });
//   }

//   calculateTotalCost();
// }

function initApp() {
  totalCostNode.textContent = TOTAL_COST.toLocaleString();
  squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();

  // устанавливаем изначальное значение для квадратных метров
  const lastOrder = loadLastStoragedOrder();

  if (lastOrder !== null) {
    typeSelectNode.value = lastOrder.type;
    metersRangeNode.value = lastOrder.meters;
    firstCounterNode.textContent = lastOrder.counters[0];
    secondCounterNode.textContent = lastOrder.counters[1];
    thirdCounterNode.textContent = lastOrder.counters[2];
    squareMetersValueNode.textContent = lastOrder.squareMeters;
    (totalCostNode.textContent = lastOrder.totalCost),
      // устанавливаем нужное значение для квадратных метров
      choseSquareMeters();

    extrasCheckboxesNodes.forEach((extraCheckboxNode, i) => {
      if (
        lastOrder.extras.some((extra) => extra.name === extraCheckboxNode.name)
      ) {
        extraCheckboxNode.checked = true;
      }
    });

    optionsCheckboxesNodes.forEach((optionCheckboxNode) => {
      if (
        lastOrder.options.some(
          (option) => option.name === optionCheckboxNode.name
        )
      ) {
        optionCheckboxNode.checked = true;
      }
    });
  } else {
    // устанавливаем изначальные значения, если они не в локальном хранилище
    firstCounterNode.textContent = COUNTER_INITIAL_VALUE;
    secondCounterNode.textContent = COUNTER_INITIAL_VALUE;
    thirdCounterNode.textContent = COUNTER_INITIAL_VALUE;
    squareMetersValueNode.textContent = SQUARE_METERS_INITIAL_VALUE;
  }

  calculateTotalCost();
}

initApp();

// Функция загрузки заказов из локального хранилища

// function loadStoragedOrders() {
//   if (storagedOrders !== null) {
//     orders = storagedOrders;
//     orders.forEach(calculateTotalCost);
//   }

//   createOrder();
// }

function loadLastStoragedOrder() {
  const storagedOrders = JSON.parse(localStorage.getItem(STORAGE_ORDERS));
  if (storagedOrders && storagedOrders.length > 0) {
    const lastOrder = storagedOrders[storagedOrders.length - 1];
    return {
      ...lastOrder,
      counters: lastOrder.counters.map((counter) => parseInt(counter)),
    };
  }
  return null;
}

// Функция создания объекта с заказом order

function createOrder() {
  const order = {
    type: typeSelectNode.value,
    squareMeters: squareMetersValueNode.value,
    meters: metersRangeNode.value,
    counters: [
      parseInt(firstCounterNode.textContent),
      parseInt(secondCounterNode.textContent),
      parseInt(thirdCounterNode.textContent),
    ],
    extras: [],
    options: [],
    totalCost: totalCostNode.value,
  };

  extrasCheckboxesNodes.forEach((extraCheckboxNode, i) => {
    if (extraCheckboxNode.checked) {
      const extra = {
        name: extraCheckboxNode.name,
        cost: parseInt(extrasCostsValuesNodes[i].textContent),
      };
      order.extras.push(extra);
    }
  });

  optionsCheckboxesNodes.forEach((optionCheckboxNode) => {
    if (optionCheckboxNode.checked) {
      const option = {
        name: optionCheckboxNode.name,
        checked: true,
      };
      order.options.push(option);
    }
  });

  saveToLocalStorage();

  return order;
}

// ___________________________________________________________________________
// ФУНКЦИИ
// ___________________________________________________________________________

function choseSquareMeters() {
  squareMetersValueNode.textContent = metersRangeNode.value;

  saveToLocalStorage();
}

function counterPlusOne(counterNode) {
  let counterValue = parseInt(counterNode.textContent);
  counterNode.textContent = ++counterValue;

  if (counterValue > 5) {
    counterNode.textContent = 5;
  }

  saveToLocalStorage();
}

function counterMinusOne(counterNode) {
  let counterValue = parseInt(counterNode.textContent);
  counterNode.textContent = --counterValue;

  if (counterValue < 0) {
    counterNode.textContent = 0;
  }

  saveToLocalStorage();
}

function choseEstateType(type) {
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

  saveToLocalStorage();
}

function calculateTotalCost() {
  let totalCost = metersRangeNode.value * SQUARE_METER_COST;
  let extrasTotalCost = 0;

  extrasCheckboxesNodes.forEach((checkboxNode, i) => {
    if (checkboxNode.checked) {
      extrasTotalCost += parseInt(extrasCostsValuesNodes[i].textContent);
    }
  });

  totalCost += extrasTotalCost;

  totalCostNode.textContent = totalCost.toLocaleString();

  saveToLocalStorage();
}

// ___________________________________________________________________________
// ОБРАБОТЧИКИ СОБЫТИЙ
// ___________________________________________________________________________

// Инициализация приложения после загрузки DOM-дерева
// document.addEventListener("DOMContentLoaded", () => {
//   loadStoragedOrders();
//   initApp();
// });
// Выбор метража ползунком
metersRangeNode.addEventListener("input", () => {
  choseSquareMeters();
  orders.push(createOrder());
});

// Пересчет суммы при смене типа недвижимости
typeSelectNode.addEventListener("change", () => {
  calculateTotalCost();
  orders.push(createOrder());
});

// Пересчет суммы при движении ползунка
metersRangeNode.addEventListener("input", () => {
  calculateTotalCost();
  orders.push(createOrder());
});

// Калькуляция на счетчиках +
firstPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(firstCounterNode);
  orders.push(createOrder());
});
secondPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(secondCounterNode);
  orders.push(createOrder());
});
thirdPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(thirdCounterNode);
  orders.push(createOrder());
});

// Калькуляция на счетчиках -
firstMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(firstCounterNode);
  orders.push(createOrder());
});
secondMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(secondCounterNode);
  orders.push(createOrder());
});
thirdMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(thirdCounterNode);
  orders.push(createOrder());
});

// Клик по целому элементу экстра
extras.forEach((extra) => {
  extra.addEventListener("click", (event) => {
    const checkbox = event.currentTarget.querySelector(".extra__checkbox");
    checkbox.checked = !checkbox.checked;
    calculateTotalCost();
    orders.push(createOrder());
  });
});

// Клик по целому элементу опции
optionsItemsNodes.forEach((optionItem) => {
  optionItem.addEventListener("click", (event) => {
    const checkbox = event.currentTarget.querySelector(".option__checkbox");
    checkbox.checked = !checkbox.checked;
    orders.push(createOrder());
  });
});
