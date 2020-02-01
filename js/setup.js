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
  COAT_COLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYES_COLORS: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
  FIREBALL_COLORS: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

/** number of wizards.
* @constant {number} */
var NUMBER_WIZARDS = 4;

/**
* @constant {string} escape key */
var ESC_KEY = 'Escape';

/**
* @constant {string} enter key */
var ENTER_KEY = 'Enter';

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
    wizards.push(generateWizard(Wizard.NAMES, Wizard.SURNAMES, Wizard.COAT_COLORS, Wizard.EYES_COLORS));
  }

  return wizards;
};

var userDialog = document.querySelector('.setup');

/**
* draw a wizard with random characteristics
* @param {Object} wizard an object containing the wizard's characteristics
* @return {string} new DOM element
*/
var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
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

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupWizardForm = userDialog.querySelector('.setup-wizard-form');
var userNameInput = setupWizardForm.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userNameInput.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var setupWizardCoat = setupWizardForm.querySelector('.wizard-coat');
var setupWizardEyes = setupWizardForm.querySelector('.wizard-eyes');
var setupFireballColor = setupWizardForm.querySelector('.setup-fireball-wrap');

setupWizardCoat.addEventListener('click', function () {
  var coatColor = getRandomElementFromArray(Wizard.COAT_COLORS);
  setupWizardCoat.style.fill = coatColor;
  userDialog.querySelector('input[name = coat-color]').value = coatColor;
});

setupWizardEyes.addEventListener('click', function () {
  var eyesColor = getRandomElementFromArray(Wizard.EYES_COLORS);
  setupWizardEyes.style.fill = eyesColor;
  userDialog.querySelector('input[name = eyes-color]').value = eyesColor;
});

setupFireballColor.addEventListener('click', function () {
  var fireballColor = getRandomElementFromArray(Wizard.FIREBALL_COLORS);
  setupFireballColor.style.backgroundColor = fireballColor;
  userDialog.querySelector('input[name = fireball-color]').value = fireballColor;
});
