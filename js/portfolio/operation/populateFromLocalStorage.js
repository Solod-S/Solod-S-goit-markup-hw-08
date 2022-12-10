import operation from './index.js';

const STORAGE_KEY = 'selectedFilter';
const filterData = JSON.parse(localStorage.getItem(STORAGE_KEY));

const populateFromLocalStorage = () => {
  const { createMarkUp } = operation;
  const allBtns = document.querySelectorAll('.buttons-set__button');
  if (filterData) {
    createMarkUp(filterData);
    for (const Btn of allBtns) {
      if (Btn.dataset.filter === filterData) {
        Btn.focus();
      }
    }
  } else {
    return;
  }
};

export default populateFromLocalStorage;
