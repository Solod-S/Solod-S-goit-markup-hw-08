import refs from '../../refs/index.js';

const onKeyPresEsq = event => {
  const { modalWindow } = refs;
  const { modal, body } = modalWindow;
  const { code } = event;
  if (code === 'Escape') {
    modal.classList.toggle('bacdrop--is-hidden');
    body.classList.toggle('no-scroll');
    window.removeEventListener('keydown', onKeyPresEsq);
  }
};

export default onKeyPresEsq;
