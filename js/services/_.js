const STORAGE_KEY = 'inputLocallStorageKey';
// import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.modal__form'),
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  sendModalBtn: document.querySelector('.modal__button'),
  checkBox: document.querySelector('.modal__checkbox-input'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
  formData: { ...JSON.parse(localStorage.getItem(STORAGE_KEY)) },
  // по умолчанию берет данные из локал стоража
  toggleModal() {
    window.addEventListener('keydown', refs.onKeyPresEsq);
    //при открытии модалки добавляем слушателя событий - чтобы слушать глобально (чтобы при нажатии `esc` срабатывала функция)
    refs.modal.classList.toggle('bacdrop--is-hidden');
    // переключаем класс
    refs.body.classList.toggle('no-scroll');
    // переключаем класс
  },

  onKeyPresEsq(event) {
    if (event.code === 'Escape') {
      refs.modal.classList.toggle('bacdrop--is-hidden');
      refs.body.classList.toggle('no-scroll');
      window.removeEventListener('keydown', refs.onKeyPresEsq);
      // убираем слушателя событий на ОКНО - чтобы слушать глобально (чтобы при нажатии ескейп НЕ РАБОТАЛА функция)
    }
  },
  closeOnTargetClick(event) {
    // console.log(event.currentTarget);
    //event.currentTarget -- текущий єлемент где висит евент листнер
    // console.log(event.target); // используем чтобы точно указать что выбираем
    //event.target -- целевой єлемент, куда мы в интерфейсе жмакнули
    if (event.currentTarget === event.target) {
      refs.toggleModal();
    }
    // event.currentTarget передает ссылку на тот элемент на котором его закрепили в addEventListener
    // event.target === выосоточная 🚀 которая показывает ссылку на тот элент на которой мы кликнули
    // если при клике две ссылки совпадут то вызовем колбек функцию которая переключает классы  на боди
  },
  onSubmit(event) {
    event.preventDefault();
    //При отправке формы страница не делает перезагрузку.
    if (
      event.currentTarget.elements.mail.value === '' ||
      //если поле с почтой пустое или
      event.currentTarget.elements.name.value === '' ||
      //если поле с паролем пустое
      !event.currentTarget.elements.policy.checked === true ||
      //если на чекбоксе не стоит галочка
      event.currentTarget.elements.feedback.value === '' ||
      //если поле с коментарием пустое
      event.currentTarget.elements.pnone.value === ''
      //если поле телефоном пустое
    ) {
      Notiflix.Notify.failure('Attention! All fields must be filled.');
      return;
      // выводим строку о проблеме
      // не вЫполняем код ниже
    }

    const formData = new FormData(event.currentTarget);
    // собирает всю дату из полей и под капотом делает огромный итератор который жанглирует этими данными (интерфейс для данных которе там лежат)
    const saveData = {};
    // делаем переменную с пустым объектом для данных которые получим от пользователя
    formData.forEach((value, key) => {
      saveData[key] = value;
      //  собираем данные в объект
      refs.modal.classList.toggle('bacdrop--is-hidden');
      //закрываем модалку
      refs.body.classList.toggle('no-scroll');
      // возвращаем скрол
    });

    Notiflix.Notify.info('We have collected data, our manager will contact you soon');
    console.log('We have collected data ==>', saveData);
    // выводим собранные данные
    event.currentTarget.reset();
    //делаем сброс
    localStorage.removeItem(STORAGE_KEY);
    //очистка локального хранилища
  },
  onFormInput(event) {
    refs.formData[event.target.name] = event.target.value;
    // в refs.formData создаем ключ (event.target.name ==> в нашей feedback.formData.email или feedback.formData.message), если оно есть то не создаем + записываем значение event.target.value (то что вбиваем в поля)
    console.log(refs.formData);
    // console.log((refs.formData[event.target.name] = event.target.value));
    if (refs.checkBox.checked) {
      refs.formData.policy = 'on';
    } else if (!refs.checkBox.checked) {
      refs.formData.policy = 'off';
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(refs.formData));
    // переделываем в JSON {email: "value", message: "value"} ==> {"email": "value", "message": "value"} и записываем в локальное хранилище STORAGE_KEY
  },

  populateTextareaMulti() {
    //{'mail', 'sergey@gmail.com', 'policy', 'on'...} => {mail: 'sergey@gmail.com', policy: 'on'...} => [['mail', 'sergey@gmail.com'], ['policy', 'on']...] и перебираем + записуем значения в value
    const message = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // возвращаем JSON в обычный объект и записываем в переменную
    if (!message) {
      return;
    }

    // если в localStorage нет интирисующей нас записи то заканчиваем функцию
    if (message) {
      for (let i of refs.form.elements) {
        // запускаем цикл в котором перебираем по штучно каждый элемент формы
        // console.log(i.name, i);
        // refs.form.elements => .elements показывает все элементы + name покажет значения атрибута name
        const entris = Object.entries(message);
        // {mail: 'sergey@gmail.com', policy: 'on'...} => [['mail', 'sergey@gmail.com'], ['policy', 'on']...]
        if (i.name === 'policy') {
          // если атрибут name == policy (отлавливаем соглашщение checkbox)
          entris.forEach(([name, value]) => {
            // запускае перебор forEach на подготовленном массиве с массивами [['policy', 'on']...]
            if (name === 'policy' && value === 'on') {
              // если ['policy', 'on']
              refs.checkBox.checked = true;
              // ставим чекбокс активным
            }
          });
        }
        entris.forEach(([name, value]) => {
          // запускае перебор forEach на подготовленном массиве с массивами [['policy', 'on']...]
          if (i.name === name) {
            // если в эл атрибут name === name  (['mail', 'sergey@gmail.com'])
            i.value = value;
            //записуем значение в инпут
          }
        });
      }
    }
  },
};
refs.populateTextareaMulti();
// запускаем функцию которая заполняет поля из localStorage

refs.openModalBtn.addEventListener('click', refs.toggleModal);
refs.closeModalBtn.addEventListener('click', refs.toggleModal);
refs.modal.addEventListener('click', refs.closeOnTargetClick);
refs.form.addEventListener('submit', refs.onSubmit);
refs.form.addEventListener('input', _.throttle(refs.onFormInput, 500));
// запускаем слушателя событий на заполнение форм + колбек функцию + lodash.throttle (задержка 500 секунд)

//настройки Notiflix
Notiflix.Notify.init({
  width: '280px',
  position: 'right-bottom', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '17px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade' - 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: false,
  useFontAwesome: true,
  fontAwesomeIconStyle: 'basic' - 'shadow', // 'basic' - 'shadow'
  fontAwesomeIconSize: '34px',

  success: {
    background: '#32c682',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },

  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },

  warning: {
    background: '#F5F4FA',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },

  info: {
    background: '#2196F3',
    textColor: '#FFFFFF',
    childClassName: 'notiflix-notify-info',
    notiflixIconColor: 'rgba(255,255,255)',
    fontAwesomeClassName: 'fas fa-info-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(38,192,211,0.2)',
  },
});
