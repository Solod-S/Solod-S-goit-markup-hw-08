import optionsForNotiflix from '../../services/notiflix-options.js';
import refs from '../../refs/index.js';

Notiflix.Notify.init(optionsForNotiflix);
const STORAGE_KEY = 'inputLocallStorageKey';

const onSubmit = event => {
  const { modalWindow } = refs;
  const { mail, name, policy, feedback, pnone } = event.currentTarget.elements;
  const { modal, body } = modalWindow;
  event.preventDefault();
  if (!mail.value || !name.value || !policy.checked || !feedback.value || !pnone.value) {
    Notiflix.Notify.failure('Внимание! Все поля должны быть заполнены.');
    return;
  }
  const capturedData = new FormData(event.currentTarget);
  const saveData = {};
  capturedData.forEach((value, key) => {
    saveData[key] = value;
    modal.classList.toggle('bacdrop--is-hidden');
    body.classList.toggle('no-scroll');
  });

  Notiflix.Notify.info('Мы собрали данные, скоро с Вами свяжиться наш менеджер');
  console.log('Мы собрали данные ==>', saveData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
};

export default onSubmit;
