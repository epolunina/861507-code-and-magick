'use strict';
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var arrayNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var arraysNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var arrayCoatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var arrayEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var makeWizard = function () {
  return {
    names:
      arrayNames[getRandom(0, arrayNames.length - 1)] +
      ' ' +
      arraysNames[getRandom(0, arraysNames.length - 1)],
    coatColors: arrayCoatColor[getRandom(0, arrayCoatColor.length - 1)],
    eyesColors: arrayEyesColor[getRandom(0, arrayEyesColor.length - 1)]
  };
};

var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards.push(makeWizard());
}
// поиск элемента по  классу .setup-similar-list
var similarListElement = document.querySelector('.setup-similar-list');
// поиск блока с похожими персонажами. шаблон, который будем копировать
var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent =
    wizard.names;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColors;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColors;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
  // отрисовка нового элемента
}
similarListElement.appendChild(fragment);

var user2Dialog = document.querySelector('.setup-similar');
user2Dialog.classList.remove('hidden');
