import refs from '../../refs/index.js';
import operation from './index.js';

const closeOnTargetClick = event => {
  const { toggleModal } = operation;
  const { modalWindow } = refs;
  const { currentTarget, target } = event;

  if (currentTarget === target) {
    toggleModal();
  }
};

export default closeOnTargetClick;
