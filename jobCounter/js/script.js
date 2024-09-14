"use strict";

const bodyElement = document.body;
const burgerButton = document.querySelector('.burger-button');

// IS TOUCH SCREEN ======================================
const isTouchScreen = window.matchMedia('(any-pointer: coarse)');
if (isTouchScreen.matches) {
    bodyElement.classList.add('touch');
} else {
    bodyElement.classList.remove('touch');
}
isTouchScreen.addEventListener("change", (e) => {
    if (e.matches) {
        bodyElement.classList.add('touch');
    } else {
        bodyElement.classList.remove('touch');
    }
});

document.addEventListener("click", documentActions);
function documentActions(e) {
	const targetElement = e.target;
	// =============== BURGER MENU ====================
	if (burgerButton) {
        if (targetElement === burgerButton) {
            bodyLockToggle();
            burgerButton.classList.toggle('burger-active');
            if (burgerButton.classList.contains('burger-active')) {
                bodyElement.classList.add('menu-open');
                bodyLock();
            } else {
                bodyElement.classList.remove('menu-open');
                bodyUnlock();
            }
        }
    }
}
// Блокування вікна при відкриванні меню ===================

let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

// Робота із формами ===========================

class CalcRow {
    constructor(id = "", date = "", item = "", count = 0, cost = 0, sum = 0) {
        this.id = id;
        this.date = date;
        this.item = item;
        this.count = count;
        this.cost = cost;
        this.sum = sum;
    }

    calculateSum() {
        this.sum = parseFloat((this.count * this.cost).toFixed(2));
        return this.sum;
    }
}

let idNum = 0;
let mainColumn = document.querySelector(".column-jobs");
let addButton = document.querySelector(".jobs__add-row");
let calcButton = document.querySelector(".jobs__count");

// Масив для збереження екземплярів CalcRow
let calcRows = [];

// Функція для оновлення екземплярів CalcRow на основі значень у DOM
function updateCalcRowFromDOM(rowObj, row) {
    let inputItemCount = row.querySelector(`[id^="itemCount-field_"]`);
    let inputCost = row.querySelector(`[id^="itemCost-field_"]`);
    let inputSum = row.querySelector(`[id^="sum_"]`);

    if (inputItemCount && inputCost && inputSum) {
        rowObj.count = parseFloat(inputItemCount.value) || 0;
        rowObj.cost = parseFloat(inputCost.value) || 0;
        rowObj.sum = rowObj.calculateSum();
        inputSum.value = rowObj.sum.toFixed(2); // Оновлюємо суму в полі
    } else {
        console.error(`Inputs for row ID ${rowObj.id} not found.`);
    }
}

// Додаємо перший рядок
let firstDataRow = new CalcRow("0");
calcRows.push(firstDataRow);

let row = document.getElementById("0");
if (row) {
    updateCalcRowFromDOM(firstDataRow, row);
} else {
    console.error("Initial row with id '0' not found.");
}
addClassOnRows(row);

// Додаємо новий рядок
addButton.addEventListener("click", () => {
    idNum++;
    let newRowEl = row.cloneNode(true);
    newRowEl.id = idNum;

    newRowEl.classList.remove("_focused");
    newRowEl.classList.remove("_empty");
    newRowEl.classList.remove("_filled");

    // Створюємо новий екземпляр CalcRow з початковими значеннями
    let newDataRow = new CalcRow(idNum);

    // Оновлюємо атрибути нових елементів
    let newInputDate = newRowEl.querySelector("[id^='date-field_']");
    newInputDate.id = `date-field_${idNum}`;
    let labelDate = newInputDate.previousElementSibling;
    if (labelDate) labelDate.htmlFor = newInputDate.id;

    let newInputRoll = newRowEl.querySelector("[id^='roll-field_']");
    newInputRoll.id = `roll-field_${idNum}`;
    let labelRoll = newInputRoll.previousElementSibling;
    if (labelRoll) labelRoll.htmlFor = labelRoll.id;

    let newInputItem = newRowEl.querySelector("[id^='item-field_']");
    newInputItem.id = `item-field_${idNum}`;
    let labelItem = newInputItem.previousElementSibling;
    if (labelItem) labelItem.htmlFor = newInputItem.id;

    let newInputItemCount = newRowEl.querySelector("[id^='itemCount-field_']");
    newInputItemCount.id = `itemCount-field_${idNum}`;
    let labelCount = newInputItemCount.previousElementSibling;
    if (labelCount) labelCount.htmlFor = newInputItemCount.id;

    let newInputCost = newRowEl.querySelector("[id^='itemCost-field_']");
    newInputCost.id = `itemCost-field_${idNum}`;
    let labelCost = newInputCost.previousElementSibling;
    if (labelCost) labelCost.htmlFor = newInputCost.id;

    let newInputSum = newRowEl.querySelector("[id^='sum_']");
    newInputSum.id = `sum_${idNum}`;
    let labelSum = newInputSum.previousElementSibling;
    if (labelSum) labelSum.htmlFor = newInputSum.id;

    // Очищаємо значення нових полів
    newInputDate.value = "";
    newInputRoll.value = "";
    newInputItem.value = "";
    newInputItemCount.value = "0";
    newInputCost.value = "0";
    newInputSum.value = "0.00"; // Оновлюємо суму з двома десятковими знаками

    mainColumn.appendChild(newRowEl);
    calcRows.push(newDataRow); // Додаємо новий екземпляр до масиву

    // console.log(newDataRow);
    // console.log(newRowEl);

    addClassOnRows();
});

let totalsArr = [];

// Калькуляція сум для кожного ряду
calcButton.addEventListener("click", () => {
    calcRows.forEach(rowObj => {
        let row = document.getElementById(rowObj.id);
        if (row) {
            updateCalcRowFromDOM(rowObj, row);
            console.log(`Row ID: ${rowObj.id}, Sum: ${rowObj.sum}`);
        } else {
            console.error(`Row with ID ${rowObj.id} not found.`);
        }
    });


    totalsArr = [];
    let itemsInputs = document.querySelectorAll("[name='itemCount']");
    let costInputs = document.querySelectorAll("[name='allCost']");
        
    let sumOfItemsValuesArr = [];
    itemsInputs.forEach(input => {
        sumOfItemsValuesArr.push(+input.value);
    });
    let sumOfItems = sumOfItemsValuesArr.reduce((acc, curr) => {
        return +acc + +curr;
    }, 0);
    totalsArr.push(sumOfItems);
    
    let sumOfCostValuesArr = [];
    costInputs.forEach(input => {
        sumOfCostValuesArr.push(+input.value);
    });
    let sumOfCosts = sumOfCostValuesArr.reduce((acc, curr) => {
        return +acc + +curr;
    }, 0);
    totalsArr.push(sumOfCosts);
    
    let totalItemsValue = totalsArr[0];
    let totalCostsValue = totalsArr[1];

    let totlalItems = document.querySelector(".total-jobs__items-count span");
    totlalItems.innerText = `${totalItemsValue}`;

    let totalCost = document.querySelector(".total-jobs__cost-count span");
    totalCost.innerText = `${totalCostsValue}`;
});


// Focus on Rows =======================
function addClassOnRows() {
    let rows = document.querySelectorAll(".item-row");
    rows.forEach(row => {
        row.addEventListener("focusin", () => {
            row.classList.add("_focused");
            row.classList.remove("_empty");
        });
        row.addEventListener("focusout", () => {
            row.classList.remove("_focused");
            isEmptyFields(row);
        });
    });
}

function isEmptyFields(row) {
    let countInput = row.querySelector("[name='itemCount']").value;
    let costInput = row.querySelector("[name='itemCost']").value;
    let parent = row.closest(".item-row");

    let isCountEmpty = countInput.trim() === '' || parseFloat(countInput) === 0;
    let isCostEmpty = costInput.trim() === '' || parseFloat(costInput) === 0;

    if (isCountEmpty || isCostEmpty) {
        parent.classList.add("_empty");
        console.log("Empty");
    } else {
        parent.classList.remove("_empty");
        parent.classList.add("_filled");
        console.log("Not empty");
    }
};