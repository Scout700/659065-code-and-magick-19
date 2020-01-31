'use strict';

/** the object with the characteristics of the wizard
* @constant {Object} */
var Wizard = {
  NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Лопита',
    'Вашингтон'
  ],
  SURNAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  COAT_COLOR: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYES_COLOR: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

/** number of wizards.
* @constant {number} */
var NUMBER_WIZARDS = 4;

/**
* find the random element from array.
* @param {Array} arr array
* @return {*} return random element
*/
var getRandomElementFromArray = function (arr) {
  var numberElement = Math.floor(Math.random() * arr.length);
  return arr[numberElement];
};

/**
* generating an object with random characteristics.
* @param {Array} names array of names
* @param {Array} surNames array surnames
* @param {Array} coatColor array coat colors
* @param {Array} eyesColor array eyes colors
* @return {Object} returns an object with random characteristics
*/
var generateWizard = function (names, surNames, coatColor, eyesColor) {
  return {
    name: getRandomElementFromArray(names) + ' ' + getRandomElementFromArray(surNames),
    coatColor: getRandomElementFromArray(coatColor),
    eyesColor: getRandomElementFromArray(eyesColor)
  };
};

/**
* creating an array of wizards with random characteristics.
* @param {number} quantity - number of elements in the array
* @return {Array} куегкты wisards array
*/
var createWizards = function (quantity) {
  var wizards = [];

  for (var i = 0; i < quantity; i++) {
    wizards.push(generateWizard(Wizard.NAMES, Wizard.SURNAMES, Wizard.COAT_COLOR, Wizard.EYES_COLOR));
  }

  return wizards;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

/**
* draw a wizard with random characteristics
* @param {Object} wizard an object containing the wizard's characteristics
* @return {string} new DOM element
*/
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

/**
* adding similar wizards to the page.
* @param {Array} arr - array of wizards
*/
var renderWizards = function (arr) {
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  arr.forEach(function (elem, i) {
    fragment.appendChild(renderWizard(arr[i]));
  });
  similarListElement.appendChild(fragment);
};

renderWizards(createWizards(NUMBER_WIZARDS));

userDialog.querySelector('.setup-similar').classList.remove('hidden');
