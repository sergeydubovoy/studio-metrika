// ___________________________________________________________________________
// ПЕРЕМЕННЫЕ DOM
// ___________________________________________________________________________

// Тип помещения
const typeSelectNode = document.getElementById("typeSelect");
const metersRangeNode = document.getElementById("metersRange");

// Сумма заказа
const totalCostNode = document.getElementById("resultTotal");
const squareMetersValueNode = document.getElementById("metersValue");
const squareMeterCostNode = document.getElementById("squareMeterCost");

// Кнопки минус
const firstMinusButtonNode = document.getElementById("minusButton_1");
const secondMinusButtonNode = document.getElementById("minusButton_2");
const thirdMinusButtonNode = document.getElementById("minusButton_3");

// Кнопки плюс
const firstPlusButtonNode = document.getElementById("plusButton_1");
const secondPlusButtonNode = document.getElementById("plusButton_2");
const thirdPlusButtonNode = document.getElementById("plusButton_3");

// Счетчики
const firstCounterNode = document.getElementById("counterNode_1");
const secondCounterNode = document.getElementById("counterNode_2");
const thirdCounterNode = document.getElementById("counterNode_3");

// Опции заказа
const optionsItemsNodes = document.querySelectorAll(".option__item");
const optionsCheckboxesNodes = document.querySelectorAll(".option__checkbox");

// Дополнительные услуги
const extrasCheckboxesNodes = document.querySelectorAll(".extra__checkbox");
const extrasCostsValuesNodes = document.querySelectorAll(".extra__cost_value");
const extras = document.querySelectorAll(".extra");

// Пометки и переменные

const STORAGED_ORDER = "Order"; // Пометка для сохранения в локальное хранилище

let orders = JSON.parse(localStorage.getItem(STORAGED_ORDER)) || []; // Массив с заказами

let SQUARE_METER_COST = parseInt(localStorage.getItem(STORAGED_ORDER)) || 1000;
let TOTAL_COST = 44000;
let COUNTER_INITIAL_VALUE = 0;
let SQUARE_METERS_INITIAL_VALUE = 44;

// ___________________________________________________________________________
// ФУНКЦИИ
// ___________________________________________________________________________

function saveToLocalStorage() {
  localStorage.setItem(STORAGED_ORDER, JSON.stringify(orders));
}

function initApp() {
  totalCostNode.textContent = TOTAL_COST.toLocaleString();
  squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();

  // устанавливаем изначальное значение для квадратных метров
  const lastOrder = loadLastStoragedOrder();

  if (lastOrder !== null) {
    typeSelectNode.value = lastOrder.estateTypeName;
    metersRangeNode.value = lastOrder.metersRange;
    firstCounterNode.textContent = lastOrder.counters[0];
    secondCounterNode.textContent = lastOrder.counters[1];
    thirdCounterNode.textContent = lastOrder.counters[2];
    squareMetersValueNode.textContent = lastOrder.metersText;
    squareMeterCostNode.textContent = lastOrder.estateTypeCost.toLocaleString();
    (totalCostNode.textContent = lastOrder.totalCost), choseSquareMeters(); // устанавливаем нужное значение для квадратных метров

    optionsCheckboxesNodes.forEach((optionCheckboxNode) => {
      if (
        lastOrder.options.some(
          (option) => option.name === optionCheckboxNode.name
        )
      ) {
        optionCheckboxNode.checked = true;
      }
    });

    for (let i = 0; i < extrasCheckboxesNodes.length; i++) {
      if (
        lastOrder.extras.some(
          (extra) => extra.name === extrasCostsValuesNodes[i].name
        )
      ) {
        extrasCostsValuesNodes[i].checked = true;
      }
    }
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

function loadLastStoragedOrder() {
  const storagedOrder = JSON.parse(localStorage.getItem(STORAGED_ORDER)); // Методом parse извлекаем из JSON строки обратно в JS объект

  if (storagedOrder && storagedOrder.length > 0) {
    const lastOrder = storagedOrder[storagedOrder.length - 1];
    return lastOrder;
  }
  return null;
}

// Функция создания объекта с заказом order

function createOrder() {
  const order = {
    estateTypeName: typeSelectNode.value,
    estateTypeCost: SQUARE_METER_COST,
    metersText: squareMetersValueNode.value,
    metersRange: metersRangeNode.value,
    counters: [
      parseInt(firstCounterNode.textContent),
      parseInt(secondCounterNode.textContent),
      parseInt(thirdCounterNode.textContent),
    ],
    extras: [],
    options: [],
    totalCost: totalCostNode.textContent,
  };

  for (let i = 0; i < optionsCheckboxesNodes.length; i++) {
    if (optionsCheckboxesNodes[i].checked) {
      const option = {
        name: optionsCheckboxesNodes[i].name,
        checked: true,
        index: i,
      };
      order.options.push(option);
    }
  }

  for (let i = 0; i < extrasCheckboxesNodes.length; i++) {
    if (extrasCheckboxesNodes[i].checked) {
      const extra = {
        name: extras[i].name,
        cost: parseInt(extrasCostsValuesNodes[i].textContent),
        index: i,
      };
      order.extras.push(extra);
    }
  }

  //   extrasCheckboxesNodes.forEach((checkbox, i) => {
  //     if (checkbox.checked) {
  //       const extra = {
  //         name: extras[i].name,
  //         cost: parseInt(extrasCostsValuesNodes[i].textContent),
  //         index: i,
  //       };
  //       order.extras.push(extra);
  //     }
  //   });

  localStorage.setItem(STORAGED_ORDER, JSON.stringify(orders));

  return order;
}

// Выбираем площадь недвижимости

function choseSquareMeters() {
  squareMetersValueNode.textContent = metersRangeNode.value;
}

// Счетчик плюс один

function counterPlusOne(counterNode) {
  let counterValue = parseInt(counterNode.textContent);
  counterNode.textContent = ++counterValue;

  if (counterValue > 5) {
    counterNode.textContent = 5;
  }
}

// Счетчик минус один

function counterMinusOne(counterNode) {
  let counterValue = parseInt(counterNode.textContent);
  counterNode.textContent = --counterValue;

  if (counterValue < 0) {
    counterNode.textContent = 0;
  }
}

// ВЫБИРАЕМ ТИП НЕДВИЖИМОСТИ И УСТАНАВЛИВАЕМ СТОИМОСТЬ ЗА КВ.М.

function choseEstateType(estateTypeName) {
  // Если
  if (estateTypeName.target.value === "flat") {
    SQUARE_METER_COST = 1000;
    squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();
  }
  if (estateTypeName.target.value === "house") {
    SQUARE_METER_COST = 1500;
    squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();
  }
  if (estateTypeName.target.value === "land") {
    SQUARE_METER_COST = 2000;
    squareMeterCostNode.textContent = SQUARE_METER_COST.toLocaleString();
  }

  localStorage.setItem("Order", SQUARE_METER_COST);

  saveToLocalStorage();
}

// СЧИТАЕМ ОБЩУЮ СУММУ ЗАКАЗА

function calculateTotalCost() {
  // Объявляем переменную totalCost: общая сумма = значение инпута с ползунком * стоимость за кв. м
  let totalCost = metersRangeNode.value * SQUARE_METER_COST;
  // Объявляем переменную стоимости доп услуг, но с нулевым значением
  let extrasTotalCost = 0;

  // Цикл forEach для доп услуг, в котором к переменной extrasTotalCost с нулевым значением прибавляется стоимость каждого отмеченного элемента
  extrasCheckboxesNodes.forEach((checkboxNode, i) => {
    // Условие: если чекбокс отмечен - правда, то
    if (checkboxNode.checked) {
      // Тогда прибавляем к переменной extrasTotalCost стоимость каждого отмеченного элемента
      extrasTotalCost += parseInt(extrasCostsValuesNodes[i].textContent);
    }
  });

  // Здесь уже прибавляем к переменной totalCost стоимость доп услуг extrasTotalCost
  totalCost += extrasTotalCost;

  // Передаем полученную сумму в totalCostNode с применением метода toLocaleString (для разделения порядков пробелом)
  totalCostNode.textContent = totalCost.toLocaleString();
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
  saveToLocalStorage();
});

// Пересчет суммы при смене типа недвижимости
typeSelectNode.addEventListener("change", () => {
  calculateTotalCost();
  orders.push(createOrder());
  saveToLocalStorage();
});

// Пересчет суммы при движении ползунка
metersRangeNode.addEventListener("input", () => {
  calculateTotalCost();
  orders.push(createOrder());
  saveToLocalStorage();
});

// Калькуляция на счетчиках +
firstPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(firstCounterNode);
  orders.push(createOrder());
  saveToLocalStorage();
});
secondPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(secondCounterNode);
  orders.push(createOrder());
  saveToLocalStorage();
});
thirdPlusButtonNode.addEventListener("click", () => {
  counterPlusOne(thirdCounterNode);
  orders.push(createOrder());
  saveToLocalStorage();
});

// Калькуляция на счетчиках -
firstMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(firstCounterNode);
  orders.push(createOrder());
  saveToLocalStorage();
});
secondMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(secondCounterNode);
  orders.push(createOrder());
  saveToLocalStorage();
});
thirdMinusButtonNode.addEventListener("click", () => {
  counterMinusOne(thirdCounterNode);
  orders.push(createOrder());
  saveToLocalStorage();
});

// Клик по целому элементу экстра
extras.forEach((extra) => {
  extra.addEventListener("click", (event) => {
    const checkbox = event.currentTarget.querySelector(".extra__checkbox");
    checkbox.checked = !checkbox.checked;
    calculateTotalCost();
    orders.push(createOrder());
    saveToLocalStorage();
  });
});

// Клик по целому элементу опции
optionsItemsNodes.forEach((optionItem) => {
  optionItem.addEventListener("click", (event) => {
    const checkbox = event.currentTarget.querySelector(".option__checkbox");
    checkbox.checked = !checkbox.checked;
    orders.push(createOrder());
    saveToLocalStorage();
  });
});
