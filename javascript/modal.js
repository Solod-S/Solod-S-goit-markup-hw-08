const refs = {
  form: document.querySelector('.modal__form'),
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  sendModalBtn: document.querySelector('.modal__button'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
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
  cachingData(event) {
    event.preventDefault();
    //При отправке формы страница не делает перезагрузку.
    const formData = new FormData(event.currentTarget);
    // собирает всю дату из полей и под капотом делает огромный итератор который жанглирует этими данными (интерфейс для данных которе там лежат)
    const saveData = {};
    // делаем переменную с пустым объектом для данных которые получим от пользователя
    formData.forEach((value, key) => {
      saveData[key] = value;
      //  собираем данные в объект
    });
    if (
      event.currentTarget.elements.mail.value === '' ||
      //если поле с почтой пустое или
      event.currentTarget.elements.name.value === '' ||
      //если поле с паролем пустое
      !event.currentTarget.elements.policy.checked ||
      //если на чекбоксе не стоит галочка
      event.currentTarget.elements.feedback.value === '' ||
      //если поле с коментарием пустое
      event.currentTarget.elements.pnone.value === ''
      //если поле телефоном пустое
    ) {
      return alert('Внимание! Все поля должны быть заполнены =)');
      // выводим строку о проблеме
    }
    console.log('Мы собрали данные ==>', saveData);
    // выводим собранные данные
    event.currentTarget.reset();
    //делаем сброс
  },
};

refs.openModalBtn.addEventListener('click', refs.toggleModal);
refs.closeModalBtn.addEventListener('click', refs.toggleModal);
refs.modal.addEventListener('click', refs.closeOnTargetClick);
refs.form.addEventListener('submit', refs.cachingData);

// (() => {
//   const refs = {
//     openModalBtn: document.querySelector('[data-modal-open]'),
//     closeModalBtn: document.querySelector('[data-modal-close]'),
//     modal: document.querySelector('[data-modal]'),
//     body: document.querySelector('body'),
//   };

//   refs.openModalBtn.addEventListener('click', toggleModal);
//   refs.closeModalBtn.addEventListener('click', toggleModal);

//   function toggleModal() {
//     refs.modal.classList.toggle('bacdrop--is-hidden');
//     refs.body.classList.toggle('no-scroll');
//   }
// })();
