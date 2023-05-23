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

const modalCloseBtns = document.querySelectorAll('.modal-close');
const modalBCG = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
const modalCaptionEl = document.querySelector('.modal-caption');
const modalTextEl = document.querySelector('.modal-text');
const agreeLink = document.querySelector('#agreement-link');

const errors = {
  emptyInput: 'Поле должно быть заполнено',
  toShortName: 'Имя должно содержать не менее 3 символов',
  toShortAbout: 'Описание проекта должно содержать не менее 3 символов',
  toShortEmail: 'E-mail должен содержать не менее 3 символов',
  toShortTel: 'Номер телефона должен состоять из 12 символов',
  invalidEmail: 'Введен неверный адрес электронной почты',
  isNotChecked: 'Необходимо ваше согласие на обработку персональных данных',
}

const modalContent = {
  succes: {
    caption: 'Ваша заявка успешно отправлена!',
    text: 'В ближайшее время мы отправим ответ на Ваш запрос на указанную почту или позвоним по номеру телефона.'
  },
  error: {
    caption: 'Произошла ошибка...',
    text: 'К сожалению, произошла ошибка отправки Вашей заявки. Попробуйте позже еще раз.'
  },
  agreement: {
    caption: 'Согласие на обработку персональных данных',
    text: `
    1. Настоящим Субъект персональных данных, в соответствии с требованиями статьи 5 Закона Республики Беларусь от 7 мая 2021 г. № 99-З «О защите персональных данных», подтверждает свое однозначное, информированное и сознательное согласие на обработку личных персональных данных Brand&agency (далее – Оператор), с использованием средств автоматизации и (или) без использования таких средств в соответствии с условиями настоящего согласия.
    2. Согласие дается на обработку следующих персональных данных:<br/>
    2.1. фамилия, имя, отчество (если имеется);<br/>
    2.2. адрес электронной почты;<br/>
    2.3. контактный телефон и сведения об активности на сайтах, то есть адрес электронной почты, телефон (мобильный), а также информация, которую Субъект персональных данных опубликовал, сделав общедоступной;<br/>
    3. Под обработкой персональных данных понимается любое действие или совокупность действий, совершаемые с персональными данными, включая сбор, систематизацию, хранение, изменение, использование, обезличивание, блокирование, распространение, предоставление, удаление.<br/>
    4. Цель обработки персональных данных:<br/>
    4.1. идентификация Субъекта персональных данных как пользователя Интернет-русцрса Оператора;<br/>
    4.2. обеспечение коммуникации между Субъектом персональных данных и Оператором, необходимой для:<br/>
    - выполнения Оператором своих обязательств перед Субъектом персональных данных;<br/>
    - оформления заказа, а также форм обратной связи;<br/>
    - выполнения Оператором дизайн-проекта Субъекту персональных данных с оформлением информационной анкеты;<br/>
    - выполнения телефонных звонков Субъекту персональных данных в рамках исполнения Оператором обязательств перед Субъектом персональных данных;<br/>
    4.3. направления Субъекту персональных данных уведомлений (почтовых, по электронной почте, с использованием СМС, других служб обмена сообщениями (Viber, Telegram), сообщений рекламного, информационного характера;<br/>
    4.4. участия Субъекта персональных данных в скидочных/дисконтных программах Оператора;<br/>
    4.5. проведения маркетинговых программ, опросов и исследований, направленных на повышение удовлетворенности/неудовлетворенности Субъекта персональных данных услугами Оператора;<br/>
    - определения предпочтений посетителей Интернет-магазина Оператора и отображения поведенческой, таргетированной рекламы;<br/>
    4.6. отслеживания статистики пользования Интернет-ресурсом Оператора;<br/>
    4.7. обработки Оператором обращений и запросов, получаемых от Субъекта персональных данных.<br/>
    5. Предоставление согласия Субъектом персональных данных осуществляется проставление соответствующей отметки (галочки) в Интернет-ресурсе.<br/>
    6. Пользователями (лицами, уполномоченными на обработку) персональных данных Субъекта персональных данных являются работники Оператора.<br/>
    Для целей обработки персональных данных, установленных п. 4 настоящего согласия, Оператор вправе привлекать третьих лиц на условиях соблюдения данными лицами требований законодательства Республики Беларусь о персональных данных. При этом Оператор гарантирует Субъекту персональных данных обеспечение конфиденциальности и безопасности его персональных данных.<br/>
    7. Субъекту персональных данных разъяснены:<br/>
    7.1. права Субъекта персональных данных, связанные с обработкой персональных данных, и механизм реализации таких прав, в частности:<br/>
    - право на отзыв согласия на обработку персональных данных (в любое время без объяснения причин);<br/>
    - право на получение информации, касающейся обработки своих персональных данных;<br/>
    - право на изменение своих персональных данных;<br/>
    - право на получение информации о предоставлении своих персональных данных третьим лицам;<br/>
    - право требовать прекращения обработки персональных данных;<br/>
    - право требовать удаления своих персональных данных;<br/>
    - право обжаловать действия (бездействия) и решения Оператора, связанные обработкой персональных данных;<br/>
    Указанные права реализуются Субъектом персональных данных посредством подачи Оператору заявления в письменной форме либо в виде электронного документа.<br/>
    7.2. последствия дачи Субъектом персональных данных согласия или отказа в даче такого согласия.<br/>
    8. Субъект персональных данных вправе обжаловать действия (бездействие) и решения Оператора, нарушающие его права при обработке персональных данных, в уполномоченный орган по защите прав субъектов персональных данных.<br/>
    9. Субъект персональных данных ознакомлен:<br/>
    - с Политикой в отношении обработки персональных данных Brand&agency, а также с тем, что:<br/>
    - согласие на обработку персональных данных действует с даты его выражения и до достижения целей обработки персональных данных или до момента его отзыва.<br/>
    - согласие на обработку персональных данных может быть отозвано путем подачи заявления в адрес Оператора.<br/>
    Настоящим проставлением галочки на сайте Интернет-ресурса Оператора Субъект персональных данных подтверждает свое согласие и разрешение на обработку его персональных данных на вышеуказанных условиях, а также подтверждает, что до предоставления данного согласия ему просто и понятно разъяснены его права, связанные с обработкой его персональных данных, механизмы их реализации, а также последствия дачи или отказа в даче такого согласия.<br/>
    `,
  }
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

  if (!errorsOnPage.length) {
    const randomNumber: number = getRandomNumber();

    if (randomNumber < 0.7) {
      modalOpen('succes');
    } else {
      modalOpen('error');
    }

    toogleModal();
  };

  // const randomNumber: number = getRandomNumber();

  // if (randomNumber < 0.7) {
  //   modalOpen('succes');
  // } else {
  //   modalOpen('error');
  // }

  // toogleModal();
});

function getRandomNumber(): number {
  return Math.random();
}

function modalOpen(type: 'succes'|'error'|'agreement') {
  modal?.classList.remove('agreement');

  modalCaptionEl!.innerHTML = modalContent[type].caption;
  modalTextEl!.innerHTML = modalContent[type].text;
  if (type === 'agreement') {
    modal?.classList.add('agreement');
  }
}

function toogleModal() {
  modalBCG!.classList.toggle('visible');
}

modalCloseBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.stopPropagation();
    toogleModal();
  });
})

modalBCG?.addEventListener('click', (event) => {
  event.stopPropagation();
  toogleModal();
});

agreeLink!.addEventListener('click', () => {
  console.log('agree');
  modalOpen('agreement');
  toogleModal();
});
