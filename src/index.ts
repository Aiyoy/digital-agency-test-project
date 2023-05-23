const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.contacts-input');
const labels: NodeListOf<HTMLLabelElement> = document.querySelectorAll('.contacts-label');
const fileInput: HTMLInputElement = document.querySelector('.contacts-file-input') as HTMLInputElement;
const submitBTN: HTMLElement = document.querySelector('.form-btn') as HTMLElement;
const nameInput = document.querySelector('#name') as HTMLInputElement;
const telInput = document.querySelector('#tel') as HTMLInputElement;
const emailInput = document.querySelector('#email') as HTMLInputElement;
const aboutInput = document.querySelector('#about') as HTMLInputElement;
const checkbox = document.querySelector('#checkbox') as HTMLInputElement;

const nameInputContainer = document.querySelector('.name') as HTMLElement;
const telInputContainer = document.querySelector('.tel') as HTMLElement;
const emailInputContainer = document.querySelector('.email') as HTMLElement;
const aboutInputContainer = document.querySelector('.about') as HTMLElement;
const checkboxContainer = document.querySelector('.checkbox') as HTMLElement;
const fileInputContainer = document.querySelector('.contacts-file-container') as HTMLElement;

const errors = {
  emptyInput: 'Поле должно быть заполнено',
  toShortName: 'Имя должно содержать не менее 3 символов',
  toShortAbout: 'Описание проекта должно содержать не менее 3 символов',
  toShortEmail: 'E-mail должен содержать не менее 3 символов',
  toShortTel: 'Номер телефона должен состоять из 12 символов',
  invalidEmail: 'Введен неверный адрес электронной почты',
  isNotChecked: 'Необходимо ваше согласие на обработку персональных данных',
}

const formValues: {name: string, tel: string, email: string, about: string, files: string[], checkbox: boolean} = {
  name: '',
  tel: '',
  email: '',
  about: '',
  files: [],
  checkbox: false,
}

inputs.forEach((input, index: number) => {
  input.addEventListener('click', () => {
    labels[index].classList.add('label-end');
  });
})

inputs.forEach((input, index: number) => {
  input.addEventListener('focus', () => {
    labels[index].classList.add('label-end');
  });
})

inputs.forEach((input, index: number) => {
  input.addEventListener('blur', () => {
    if (!input.value.length) {
      labels[index].classList.remove('label-end');
    }    
  });
})

fileInput.addEventListener('change', function() {
  removeError(fileInputContainer);
  const fileNamesContainer = document.querySelector('.files-names-container');
  if (this && this.files && fileNamesContainer) {
    formValues.files = [];
    let files = this.files;
    let filesHTMLText = '';
    for (let i = 0; i < files.length; i++) {
      filesHTMLText += `<span>${files[i].name} (${Math.round(files[i].size / 1024)} КВ)</span>`;
      formValues.files.push(files[i].name);  
    }
    fileNamesContainer.innerHTML = filesHTMLText;
    document.querySelector('.contacts-file-label')?.classList.add('checked');
  }  
});

function showError(container: HTMLElement, errorText: string) {
  removeError(container);
  container.classList.add('error');
  const error  = document.createElement('span');
  error.classList.add('input-error');
  error.innerHTML = errorText;
  container.appendChild(error);
}

function removeError(container: HTMLElement) {
  const errors= container.querySelectorAll('.input-error');
  if (errors) {
    errors.forEach((error) => {
      container.removeChild(error);
      container.classList.remove('error');
    })
  };
}

function validateTel(event: any) {
  const pattern: string = "+375 (__) ___-__-__";
  const def = pattern.replace(/\D/g, '');

  let val = event.target.value.replace(/\D/g, '');
  let i = 0;

  if (def.length >= val.length) val = def;

  const newVal = pattern.replace(/./g, function (char) {
    return /[_\d]/.test(char) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : char;
  });
  event.target.value = newVal;

  if (val.length < 12) {
    formValues.tel = val;
    showError(telInputContainer, errors.toShortTel);
  } else {
    removeError(telInputContainer);
  }
}

telInput.addEventListener('click', (event) => validateTel(event));
telInput.addEventListener('change', (event) => validateTel(event));
telInput.addEventListener('input', (event) => validateTel(event));

function validateEmail(event: any) {
  const regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  
  if (regex.test(event.target.value)) {
    formValues.email = event.target.value;
    removeError(emailInputContainer);
  } else {
    showError(emailInputContainer, errors.invalidEmail);
  }
}

emailInput.addEventListener('change', (event: any) => validateEmail(event));

nameInput.addEventListener('change', (event: any) => {
  if (event.target.value.length < 3) {
    showError(nameInputContainer, errors.toShortName);
  } else {
    formValues.name = event.target.value;
    removeError(nameInputContainer)
  }
});

aboutInput.addEventListener('change', (event: any) => {
  if (event.target.value.length < 3) {
    showError(aboutInputContainer, errors.toShortAbout);
  } else {
    formValues.about = event.target.value;
    removeError(aboutInputContainer)
  }
});

checkbox.addEventListener('change', (event: any) => {
  removeError(checkboxContainer);
  formValues.checkbox = event.target.checked;
});

submitBTN.addEventListener('click', () => {
  if (!formValues.name.length) showError(nameInputContainer, errors.toShortName);
  if (!formValues.tel.length) showError(telInputContainer, errors.toShortTel);
  if (!formValues.email.length) showError(emailInputContainer, errors.toShortEmail);
  if (!formValues.about.length) showError(aboutInputContainer, errors.toShortAbout);
  if (!formValues.files.length) showError(fileInputContainer, errors.toShortAbout);
  if (!formValues.checkbox) showError(checkboxContainer, errors.isNotChecked);

  const errorsOnPage = document.querySelectorAll('.input-error');

  if (!errorsOnPage.length) formSubmit();
});

function getRandomNumber(): number {
  return Math.random();
}

function formSubmit() {
  const randomNumber: number = getRandomNumber();
  if (randomNumber < 0.7) {
    console.log('submit');
  } else {
    console.log('not submit');
  }
}
