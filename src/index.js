var inputs = document.querySelectorAll('.contacts-input');
var labels = document.querySelectorAll('.contacts-label');
var fileInput = document.querySelector('.contacts-file-input');
var submitBTN = document.querySelector('.form-btn');
var nameInput = document.querySelector('#name');
var telInput = document.querySelector('#tel');
var emailInput = document.querySelector('#email');
var aboutInput = document.querySelector('#about');
var checkbox = document.querySelector('#checkbox');
var nameInputContainer = document.querySelector('.name');
var telInputContainer = document.querySelector('.tel');
var emailInputContainer = document.querySelector('.email');
var aboutInputContainer = document.querySelector('.about');
var checkboxContainer = document.querySelector('.checkbox');
var fileInputContainer = document.querySelector('.contacts-file-container');
var errors = {
    emptyInput: 'Поле должно быть заполнено',
    toShortName: 'Имя должно содержать не менее 3 символов',
    toShortAbout: 'Описание проекта должно содержать не менее 3 символов',
    toShortEmail: 'E-mail должен содержать не менее 3 символов',
    toShortTel: 'Номер телефона должен состоять из 12 символов',
    invalidEmail: 'Введен неверный адрес электронной почты',
    isNotChecked: 'Необходимо ваше согласие на обработку персональных данных',
};
var formValues = {
    name: '',
    tel: '',
    email: '',
    about: '',
    files: [],
    checkbox: false,
};
inputs.forEach(function (input, index) {
    input.addEventListener('click', function () {
        labels[index].classList.add('label-end');
    });
});
inputs.forEach(function (input, index) {
    input.addEventListener('focus', function () {
        labels[index].classList.add('label-end');
    });
});
inputs.forEach(function (input, index) {
    input.addEventListener('blur', function () {
        if (!input.value.length) {
            labels[index].classList.remove('label-end');
        }
    });
});
fileInput.addEventListener('change', function () {
    var _a;
    removeError(fileInputContainer);
    var fileNamesContainer = document.querySelector('.files-names-container');
    if (this && this.files && fileNamesContainer) {
        formValues.files = [];
        var files = this.files;
        var filesHTMLText = '';
        for (var i = 0; i < files.length; i++) {
            filesHTMLText += "<span>".concat(files[i].name, " (").concat(Math.round(files[i].size / 1024), " \u041A\u0412)</span>");
            formValues.files.push(files[i].name);
        }
        fileNamesContainer.innerHTML = filesHTMLText;
        (_a = document.querySelector('.contacts-file-label')) === null || _a === void 0 ? void 0 : _a.classList.add('checked');
    }
});
function showError(container, errorText) {
    removeError(container);
    container.classList.add('error');
    var error = document.createElement('span');
    error.classList.add('input-error');
    error.innerHTML = errorText;
    container.appendChild(error);
}
function removeError(container) {
    var errors = container.querySelectorAll('.input-error');
    if (errors) {
        errors.forEach(function (error) {
            container.removeChild(error);
            container.classList.remove('error');
        });
    }
    ;
}
function validateTel(event) {
    var pattern = "+375 (__) ___-__-__";
    var def = pattern.replace(/\D/g, '');
    var val = event.target.value.replace(/\D/g, '');
    var i = 0;
    if (def.length >= val.length)
        val = def;
    var newVal = pattern.replace(/./g, function (char) {
        return /[_\d]/.test(char) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : char;
    });
    event.target.value = newVal;
    if (val.length < 12) {
        formValues.tel = val;
        showError(telInputContainer, errors.toShortTel);
    }
    else {
        removeError(telInputContainer);
    }
}
telInput.addEventListener('click', function (event) { return validateTel(event); });
telInput.addEventListener('change', function (event) { return validateTel(event); });
telInput.addEventListener('input', function (event) { return validateTel(event); });
function validateEmail(event) {
    var regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    if (regex.test(event.target.value)) {
        formValues.email = event.target.value;
        removeError(emailInputContainer);
    }
    else {
        showError(emailInputContainer, errors.invalidEmail);
    }
}
emailInput.addEventListener('change', function (event) { return validateEmail(event); });
nameInput.addEventListener('change', function (event) {
    if (event.target.value.length < 3) {
        showError(nameInputContainer, errors.toShortName);
    }
    else {
        formValues.name = event.target.value;
        removeError(nameInputContainer);
    }
});
aboutInput.addEventListener('change', function (event) {
    if (event.target.value.length < 3) {
        showError(aboutInputContainer, errors.toShortAbout);
    }
    else {
        formValues.about = event.target.value;
        removeError(aboutInputContainer);
    }
});
checkbox.addEventListener('change', function (event) {
    removeError(checkboxContainer);
    formValues.checkbox = event.target.checked;
});
submitBTN.addEventListener('click', function () {
    if (!formValues.name.length)
        showError(nameInputContainer, errors.toShortName);
    if (!formValues.tel.length)
        showError(telInputContainer, errors.toShortTel);
    if (!formValues.email.length)
        showError(emailInputContainer, errors.toShortEmail);
    if (!formValues.about.length)
        showError(aboutInputContainer, errors.toShortAbout);
    if (!formValues.files.length)
        showError(fileInputContainer, errors.toShortAbout);
    if (!formValues.checkbox)
        showError(checkboxContainer, errors.isNotChecked);
    var errorsOnPage = document.querySelectorAll('.input-error');
    if (!errorsOnPage.length)
        formSubmit();
});
function getRandomNumber() {
    return Math.random();
}
function formSubmit() {
    var randomNumber = getRandomNumber();
    if (randomNumber < 0.7) {
        console.log('submit');
    }
    else {
        console.log('not submit');
    }
}
