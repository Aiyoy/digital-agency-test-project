const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-container__input');
const labels: NodeListOf<HTMLLabelElement> = document.querySelectorAll('.input-container__label');
const fileInput: HTMLInputElement = document.querySelector('.file-input-container__input')!;
const submitBTN: HTMLElement = document.querySelector('.form-btn')!;
const nameInput: HTMLInputElement = document.querySelector('#name')!;
const telInput: HTMLInputElement = document.querySelector('#tel')!;
const emailInput: HTMLInputElement = document.querySelector('#email')!;
const aboutInput: HTMLInputElement = document.querySelector('#about')!;
const agreemrntInput: HTMLInputElement = document.querySelector('#checkbox')!;
const nameInputContainer: HTMLElement = document.querySelector('.input-container_name')!;
const telInputContainer: HTMLElement = document.querySelector('.input-container_tel')!;
const emailInputContainer: HTMLElement = document.querySelector('.input-container_email')!;
const aboutInputContainer: HTMLElement = document.querySelector('.input-container_about')!;
const checkboxContainer: HTMLElement = document.querySelector('.agreement-container')!;
const fileInputContainer: HTMLElement = document.querySelector('.file-input-container')!;
const modalCloseBtns: NodeListOf<HTMLElement> = document.querySelectorAll('.modal-close');
const modalBCG: HTMLElement  = document.querySelector('.modal-background')!;
const modal: HTMLElement  = document.querySelector('.modal')!;
const modalCaptionEl: HTMLElement  = document.querySelector('.modal-caption')!;
const modalTextEl: HTMLElement  = document.querySelector('.modal-text')!;
const agreeLink: HTMLElement  = document.querySelector('#agreement-link')!;
const menuBTN: HTMLElement = document.querySelector('.nav-btn')!;
const menu: HTMLElement = document.querySelector('.nav')!;
const menuItems: NodeListOf<HTMLElement> = document.querySelectorAll('#header .nav-list__items');
const filesContainer: HTMLElement = document.querySelector('.files-container')!;
const filesLabel: HTMLElement = document.querySelector('.file-input-container__label')!;

const errors: Record<string, string> = {
  emptyInput: 'Поле должно быть заполнено',
  tooShortName: 'Имя должно содержать не менее 3 символов',
  tooShortAbout: 'Описание должно содержать не менее 3 символов',
  tooShortEmail: 'E-mail должен содержать не менее 3 символов',
  tooShortTel: 'Номер телефона должен состоять из 12 символов',
  invalidEmail: 'Введен неверный адрес электронной почты',
  isNotChecked: 'Необходимо Ваше согласие на обработку персональных данных',
}

interface Content {
  succes: {
    caption: string,
    text: string,
  },
  error: {
    caption: string,
    text: string,
  },
  agreement: {
    caption: string,
    text: string,
  },
}

const modalContent: Content = {
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

interface FormFile {fileName: string, fileSize: number};

const formValues: {name: string, tel: string, email: string, about: string, files: FormFile[], checkbox: boolean} = {
  name: '',
  tel: '',
  email: '',
  about: '',
  files: [],
  checkbox: false,
}

inputs.forEach((input: HTMLInputElement, index: number): void => {
  input.addEventListener('click', (): void => {
    labels[index].classList.add('input-container__label_end');
  });
})

inputs.forEach((input: HTMLInputElement, index: number): void => {
  input.addEventListener('focus', (): void => {
    labels[index].classList.add('input-container__label_end');
  });
})

inputs.forEach((input: HTMLInputElement, index: number): void => {
  input.addEventListener('blur', (): void => {
    if (!input.value.length) {
      labels[index].classList.remove('input-container__label_end');
    }    
  });
})

fileInput.addEventListener('change', function():void {
  removeError(fileInputContainer);
  if (this && this.files) {
    formValues.files = [];
    for (let i = 0; i < this.files.length; i++) {
      formValues.files.push({fileName: this.files[i].name, fileSize: this.files[i].size});
    }
    renderFiles(formValues.files);
  }
  filesLabel?.classList.add('file-input-container__label_checked');
});

function renderFiles(files: FormFile[]): void {
  if (filesContainer) {
    let filesHTMLText = '';
    for (let i = 0; i < files.length; i++) {
      filesHTMLText += `<div class="file-name-item">${files[i].fileName} (${Math.round(files[i].fileSize / 1024)} КВ)<div class="file-name-delete"></div></div>`;
    }
    filesContainer.innerHTML = filesHTMLText;
    const fileDeleteBTNs: NodeListOf<HTMLElement> = document.querySelectorAll('.file-name-delete');
    fileDeleteBTNs.forEach((btn: HTMLElement, index: number): void => {
      btn.addEventListener('click', (): void => deleteFile(index));
    })
  }
}

function showError(container: HTMLElement, errorText: string): void {
  removeError(container);
  container.classList.add('input-container_error');
  const error: HTMLElement  = document.createElement('span');
  error.classList.add('input-error');
  error.innerHTML = errorText;
  container.appendChild(error);
}

function removeError(container: HTMLElement): void {
  const errors: NodeListOf<HTMLElement> = container.querySelectorAll('.input-error');
  if (errors) {
    errors.forEach((error: HTMLElement): void => {
      container.removeChild(error);
      container.classList.remove('input-container_error');
    })
  };
}

function validateTel(event: Event): void {
  const pattern: string = "+375 (__) ___-__-__";
  const def: string = pattern.replace(/\D/g, '');
  const element = event.target as HTMLInputElement;
  let val: string = element.value.replace(/\D/g, '');
  let i = 0;

  if (def.length >= val.length) val = def;

  const newVal: string = pattern.replace(/./g, (char: string): string => {
    return /[_\d]/.test(char) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : char;
  });
  element.value = newVal;

  if (val.length < 12) {
    formValues.tel = val;
    showError(telInputContainer, errors.tooShortTel);
  } else {
    removeError(telInputContainer);
  }
}

telInput.addEventListener('click', (event: Event): void => validateTel(event));
telInput.addEventListener('change', (event: Event): void => validateTel(event));
telInput.addEventListener('input', (event: Event): void => validateTel(event));

function validateEmail(event: Event): void {
  const regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  const element = event.target as HTMLInputElement;
  if (regex.test(element.value)) {
    formValues.email = element.value;
    removeError(emailInputContainer);
  } else {
    showError(emailInputContainer, errors.invalidEmail);
  }
}

emailInput.addEventListener('change', (event: Event): void => validateEmail(event));

nameInput.addEventListener('change', (event: Event): void => {
  const element = event.target as HTMLInputElement;
  if (element.value.length < 3) {
    showError(nameInputContainer, errors.tooShortName);
  } else {
    formValues.name = element.value;
    removeError(nameInputContainer)
  }
});

aboutInput.addEventListener('change', (event: Event): void => {
  const element = event.target as HTMLInputElement;
  if (element.value.length < 3) {
    showError(aboutInputContainer, errors.tooShortAbout);
  } else {
    formValues.about = element.value;
    removeError(aboutInputContainer)
  }
});

agreemrntInput.addEventListener('change', (event: Event): void => {
  const element = event.target as HTMLInputElement;
  removeError(checkboxContainer);
  formValues.checkbox = element.checked;
});

submitBTN.addEventListener('click', (): void => {
  if (!formValues.name.length) showError(nameInputContainer, errors.tooShortName);
  if (!formValues.tel.length) showError(telInputContainer, errors.tooShortTel);
  if (!formValues.email.length) showError(emailInputContainer, errors.tooShortEmail);
  if (!formValues.about.length) showError(aboutInputContainer, errors.tooShortAbout);
  if (!formValues.checkbox) showError(checkboxContainer, errors.isNotChecked);

  const errorsOnPage: NodeListOf<HTMLElement> = document.querySelectorAll('.input-error');

  if (!errorsOnPage.length) {
    const randomNumber: number = getRandomNumber();

    if (randomNumber < 0.7) {
      modalOpen('succes');
    } else {
      modalOpen('error');
    }

    toogleModal();
  };
});

function getRandomNumber(): number {
  return Math.random();
}

function modalOpen(type: 'succes'|'error'|'agreement'): void {
  modal?.classList.remove('agreement');

  modalCaptionEl!.innerHTML = modalContent[type].caption;
  modalTextEl!.innerHTML = modalContent[type].text;
  if (type === 'agreement') {
    modal?.classList.add('agreement');
  }
}

function toogleModal(): void {
  modalBCG!.classList.toggle('visible');
}

modalCloseBtns.forEach((btn: HTMLElement): void => {
  btn.addEventListener('click', (event: Event): void => {
    event.stopPropagation();
    toogleModal();
  });
})

modalBCG?.addEventListener('click', (event: Event): void => {
  event.stopPropagation();
  toogleModal();
});

agreeLink!.addEventListener('click', (event: Event): void => {
  event.stopPropagation();
  modalOpen('agreement');
  toogleModal();
});

interface IBTNUp {
  el: HTMLElement;
  show(): void;
  hide(): void;
  addEventListener(): void;
}

const btnUp: IBTNUp = {
  el: document.querySelector('.top-btn')!,
  show(): void {
    if (this.el) this.el.classList.remove('top-btn_hide');
  },
  hide(): void {
    if (this.el) this.el.classList.add('top-btn_hide');
  },
  addEventListener(): void {
    window.addEventListener('scroll', (): void => {
      const scrollY: number = window.scrollY || document.documentElement.scrollTop;
      scrollY && document.documentElement.clientWidth <= 1180 ? this.show() : this.hide();
      const RestToBottom: number = document.documentElement.scrollHeight - scrollY - document.documentElement.clientHeight;
      if (RestToBottom < 210) {
        this.el.style.bottom = `${242 - RestToBottom}px`;
        console.log(242 - RestToBottom);
      } else {
        this.el.style.bottom = '32px';
      }
    });
  }
}

btnUp.addEventListener();

menuBTN.addEventListener('click', (): void => {
  menu.classList.toggle('nav_open');
  menuBTN.classList.toggle('nav-btn_open');
});

menuItems.forEach((item: HTMLElement): void => {
  item.addEventListener('click', (): void => {
    menu.classList.remove('nav_open');
    menuBTN.classList.remove('nav-btn_open');
  })
});

function deleteFile(index: number): void {
  formValues.files.splice(index, 1);
  renderFiles(formValues.files);
  if (!formValues.files.length) {
    filesLabel?.classList.remove('file-input-container__label_checked');
  }
}
