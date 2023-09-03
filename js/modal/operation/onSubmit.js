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
    Notiflix.Notify.failure('Attention! All fields must be filled.');
    return;
  }
  const capturedData = new FormData(event.currentTarget);
  const saveData = {};
  capturedData.forEach((value, key) => {
    saveData[key] = value;
    modal.classList.toggle('bacdrop--is-hidden');
    body.classList.toggle('no-scroll');
  });

  Notiflix.Notify.info('We have collected data, our manager will contact you soon');
  console.log('We have collected data ==>', saveData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
};

export default onSubmit;
