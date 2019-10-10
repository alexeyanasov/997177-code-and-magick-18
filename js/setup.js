'use strict';

var WIZARD_NUMBER = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialogElement = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizards = [];
var fragment = document.createDocumentFragment();

var getRandomNumber = function (num) {
  return Math.floor(Math.random() * num);
};

var getRandomElement = function (array) {
  return array[getRandomNumber(array.length)];
};

var generateWizard = function () {
  var firstName = getRandomElement(WIZARD_NAMES);
  var lastName = getRandomElement(WIZARD_SURNAMES);
  var fullName = firstName + ' ' + lastName;

  var coatColor = getRandomElement(WIZARD_COAT_COLORS);
  var eyesColor = getRandomElement(WIZARD_EYES_COLORS);

  return {
    name: fullName,
    coatColor: coatColor,
    eyesColor: eyesColor
  };
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

userDialogElement.classList.remove('hidden');

for (var i = 0; i < WIZARD_NUMBER; i++) {
  wizards.push(generateWizard());
}

for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

userDialogElement.querySelector('.setup-similar').classList.remove('hidden');
