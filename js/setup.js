'use strict';

/*
Создать переменные, в которые записать массивы с необходимыми значениями
Создать функцию, которая возвращает рандомный элемент массива
Создать массив объктов, которые содержат свойства с рандомными значениями
1.Пишем функцию, которая присваивает ключу "name" и  двум другим  ключам соответствующие значения
2.Пишем функцию, которая создает массив, в который добавляются сгенерированные объектты
Находим по классу все необходимые элементы на странице: сетап и сетап-симулар-лист и записываем их в соответствующие переменные
Находим темплейт, переходим в контент, находим .setup-similar-item, записываем его в переменную, которую потом будем клонировать
Создаем функцию, которая клонирует шаблон, найденный в темплейт, и записывает в каждый клонированный элемент данные из созданного массива объектов,
возвращая нового волшебникка
Создаем функцию (параметр которой, созданный массив с необходимым количеством элементов), которая создает контейнер fragment и затем добавляет в него новых созданных волшебников с помощью предыдущей функции, а потом когда контейнер заполнен, добавляет их в блок .setup-similar-list
*/

/** this is an array of names
* @constant {Array} */
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Лопита', 'Вашингтон'];

/** this is an array of surnames
* @constant {Array} */
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

/** this is an array with colors of coats
* @constant {Array} */
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

/** this is an array with colors of eyes
* @constant {Array} */
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

/** number of wizards
 * @constant {number} */
var numberWizards = 4;

/**
* find the random element.
* @param {Array} arr array of string
* @return {number} return random element
*/
var getRandomNumber = function (arr) {
  var numberElement = Math.floor(Math.random() * arr.length); // находим рандомное число, которое не может быть больше длины массива
  return arr[numberElement]; // возвращаем рандомный элемент массива
};

// В демке массив объктов уже дан, мне нужно создать массив с 4 объектами с рандомными характеристиками

/**
* creating an object with random characteristics
* @return {Object} wizard with random characteristics
*/
var createWizard = function () {
  return {
    name: getRandomNumber(WIZARD_NAMES) + ' ' + getRandomNumber(WIZARD_SURNAMES),
    coatColor: getRandomNumber(WIZARD_COAT_COLOR),
    eyesColor: getRandomNumber(WIZARD_EYES_COLOR)
  };
};

/**
* create wisards array
* @param {number} quantity - number of elements in the array
* @return {Array} wisards array
*/
var createWizardArray = function (quantity) {
  var wizards = [];

  for (var i = 0; i < quantity; i++) {
    wizards.push(createWizard());
  }

  return wizards;
};

var userDialog = document.querySelector('.setup'); // находим элемент по классу
userDialog.classList.remove('hidden'); // убираем класс хидден

var similarListElement = userDialog.querySelector('.setup-similar-list'); // находим элемент в открытом элементе сетап

var similarWizardTemplate = document.querySelector('#similar-wizard-template') // находим элемент темплейт по id
.content // его контент
.querySelector('.setup-similar-item'); // находим в его контенте див с нужным классом

/**
* draw a wizard with random characteristics
* @param {Object} wizard an object containing the wizard's characteristics
* @return {Object} new DOM element
*/
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true); // клонируем шаблон со всем содержимым
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;// вставили данные в склонированный шаблон из созданного массива
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;// вставили данные в склонированный шаблон из созданного массива
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // вставили данные в склонированный шаблон из созданного массива
  return wizardElement; // получаем нового волшебника
};

/**
* adding similar wizards to the page
* @param {Object[]} arr - array of objects with wizard data
*/
var addingFragment = function (arr) {
  var fragment = document.createDocumentFragment();// создаем контейнер для хранения сгенерированных волшебников
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  similarListElement.appendChild(fragment);// вставляем сгенерированные DOM-элементы в блок similarListElement из фрагмента
};

addingFragment(createWizardArray(numberWizards));// добавляем на страницу необходимое количество волшебников

userDialog.querySelector('.setup-similar').classList.remove('hidden');// показываем блок .setup-similar, удалив у него CSS-класс hidden.
