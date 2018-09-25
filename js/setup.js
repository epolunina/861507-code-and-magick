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
];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var element = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  element.appendChild(renderWizard(wizards[j]));
  // отрисовка нового элемента
}
similarListElement.appendChild(element);

var user2Dialog = document.querySelector('.setup-similar');
user2Dialog.classList.remove('hidden');

// одеть Надежду

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

// функция закрытия окна по Esc
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// функция открытия
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
// функция закрытия
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// открытие окна настройки персонажа кликом мышки
setupOpen.addEventListener('click', function () {
  openPopup();
});
// закрытие окна настройки персонажа по нажатию на крестик - элемент .setup-close
setupClose.addEventListener('click', function () {
  closePopup();
});

// открываем окно настройки персонажа по нажатию Enter
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// закрываем окно настройки персонажа по нажатию Enter, если Х в фокусе
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

//  изменение цвета мантии по нажатию
var setupWizard = document.querySelector('.setup-wizard');
var changeColorCoat = document.querySelector('.wizard-coat');
var inputColorCoat = document.querySelector('input[name="coat-color"]');
changeColorCoat.addEventListener('click', function () {
  setupWizard.classList.remove('hidden');
  inputColorCoat.value =
    arrayCoatColors[getRandom(0, arrayCoatColors.length - 1)];
  changeColorCoat.style.fill = inputColorCoat.value;
});

// изменение цвета глаз по нажатию
var changeColorEyes = document.querySelector('.wizard-eyes');
var inputColorEyes = document.querySelector('input[name="eyes-color"]');
changeColorEyes.addEventListener('click', function () {
  setupWizard.classList.remove('hidden');
  inputColorEyes.value =
    arrayEyesColor[getRandom(0, arrayEyesColor.length - 1)];
  changeColorEyes.style.fill = inputColorEyes.value;
});
// изменение цвета фаербола по нажатию

var changeColorFierball = document.querySelector('.setup-fireball-wrap');
var setupFireball = document.querySelector('.setup-fireball');
var inputFireball = document.querySelector('input[name="fireball-color"]');
setupFireball.addEventListener('click', function () {
  inputFireball.classList.remove('hidden');
  changeColorFierball.style.background =
    arrayFireballColors[getRandom(0, arrayFireballColors.length - 1)];
  inputFireball.value = changeColorFierball.style.background;
});

// Установка атрибутов для отправки формы
var buttonSave = document.querySelector('button');
var setupWizardForm = document.querySelector('.setup-wizard-form');
buttonSave.addEventListener('click', function () {
  setupWizardForm.action = 'https://js.dump.academy/code-and-magick';
});
// валидация ввода имени персонажа
var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity(
        'Имя должно состоять минимум из 2-х символов'
    );
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});
