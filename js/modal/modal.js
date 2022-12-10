import refs from '../refs/index.js';
import operation from './operation/index.js';

const {
  toggleModal,
  onKeyPresEsq,
  closeOnTargetClick,
  onSubmit,
  onFormInput,
  populateTextareaMulti,
} = operation;
const { modalWindow } = refs;



modalWindow.openModalBtn.addEventListener('click', toggleModal.bind(modalWindow));
modalWindow.closeModalBtn.addEventListener('click', toggleModal.bind(modalWindow));
modalWindow.modal.addEventListener('click', closeOnTargetClick.bind(modalWindow));
modalWindow.form.addEventListener('submit', onSubmit.bind(modalWindow));
modalWindow.form.addEventListener('input', _.throttle(onFormInput.bind(modalWindow), 500));
populateTextareaMulti();