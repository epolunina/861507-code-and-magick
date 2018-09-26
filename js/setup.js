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
var arrayCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var arrayEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var arrayFireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
]; // поиск элемента по  классу .setup-similar-list
var similarListElement = document.querySelector('.setup-similar-list');
// поиск блока с похожими персонажами. шаблон, который будем копировать
var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
var element = document.createDocumentFragment();

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var setupWizardElement = document.querySelector('.setup-wizard');
var colorCoatElement = document.querySelector('.wizard-coat');
var inputColorCoatElement = document.querySelector('input[name="coat-color"]');
var colorEyesElement = document.querySelector('.wizard-eyes');
var inputColorEyesElement = document.querySelector('input[name="eyes-color"]');
var colorFierballElement = document.querySelector('.setup-fireball-wrap');
var setupFireballElement = document.querySelector('.setup-fireball');
var inputFireballElement = document.querySelector(
    'input[name="fireball-color"]'
);
var buttonSaveElement = document.querySelector('button');
var setupWizardFormElement = document.querySelector('.setup-wizard-form');
var userNameInputElement = setupElement.querySelector('.setup-user-name');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var makeWizard = function () {
  return {
    names:
      arrayNames[getRandom(0, arrayNames.length - 1)] +
      ' ' +
      arraysNames[getRandom(0, arraysNames.length - 1)],
    coatColors: arrayCoatColors[getRandom(0, arrayCoatColors.length - 1)],
    eyesColors: arrayEyesColor[getRandom(0, arrayEyesColor.length - 1)]
  };
};

var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards.push(makeWizard());
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent =
    wizard.names;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColors;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColors;
  return wizardElement;
};

for (var j = 0; j < wizards.length; j++) {
  element.appendChild(renderWizard(wizards[j]));
  // отрисовка нового элемента
}
similarListElement.appendChild(element);

var user2Dialog = document.querySelector('.setup-similar');
user2Dialog.classList.remove('hidden');

// функция закрытия окна по Esc
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// функция открытия
var openPopup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
// функция закрытия
var closePopup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// открытие окна настройки персонажа кликом мышки
setupOpenElement.addEventListener('click', function () {
  openPopup();
});
// закрытие окна настройки персонажа по нажатию на крестик - элемент .setup-close
setupCloseElement.addEventListener('click', function () {
  closePopup();
});

// открываем окно настройки персонажа по нажатию Enter
setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// закрываем окно настройки персонажа по нажатию Enter, если Х в фокусе
setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

//  изменение цвета мантии по нажатию

colorCoatElement.addEventListener('click', function () {
  setupWizardElement.classList.remove('hidden');
  inputColorCoatElement.value =
    arrayCoatColors[getRandom(0, arrayCoatColors.length - 1)];
  colorCoatElement.style.fill = inputColorCoatElement.value;
});

// изменение цвета глаз по нажатию

colorEyesElement.addEventListener('click', function () {
  setupWizardElement.classList.remove('hidden');
  inputColorEyesElement.value =
    arrayEyesColor[getRandom(0, arrayEyesColor.length - 1)];
  colorEyesElement.style.fill = inputColorEyesElement.value;
});
// изменение цвета фаербола по нажатию

setupFireballElement.addEventListener('click', function () {
  inputFireballElement.classList.remove('hidden');
  var fireballColorItem =
    arrayFireballColors[getRandom(0, arrayFireballColors.length - 1)];
  colorFierballElement.style.background = fireballColorItem;
  inputFireballElement.value = fireballColorItem;
});

// Установка атрибутов для отправки формы

buttonSaveElement.addEventListener('click', function () {
  setupWizardFormElement.action = 'https://js.dump.academy/code-and-magick';
});
// валидация ввода имени персонажа

userNameInputElement.addEventListener('invalid', function () {
  if (userNameInputElement.validity.tooShort) {
    userNameInputElement.setCustomValidity(
        'Имя должно состоять минимум из 2-х символов'
    );
  } else if (userNameInputElement.validity.tooLong) {
    userNameInputElement.setCustomValidity(
        'Имя не должно превышать 25-ти символов'
    );
  } else if (userNameInputElement.validity.valueMissing) {
    userNameInputElement.setCustomValidity('Обязательное поле');
  } else {
    userNameInputElement.setCustomValidity('');
  }
});
