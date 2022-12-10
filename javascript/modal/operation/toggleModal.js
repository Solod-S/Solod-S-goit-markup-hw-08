import refs from '../../refs/index.js';
import operation from './index.js';

const toggleModal = () => {
  const { modalWindow } = refs;
  const { modal, body } = modalWindow;
  const { onKeyPresEsq } = operation;

  window.addEventListener('keydown', onKeyPresEsq);
  modal.classList.toggle('bacdrop--is-hidden');
  body.classList.toggle('no-scroll');
};

export default toggleModal;
