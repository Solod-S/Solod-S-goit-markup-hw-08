import operation from './index.js';

const STORAGE_KEY = 'selectedFilter';

const filterChose = event => {
  const { createMarkUp } = operation;
  const { nodeName, dataset } = event.target;
  if (nodeName !== 'BUTTON') {
    return;
  }
  const selectedFilter = dataset.filter;

  createMarkUp(selectedFilter);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilter));
};

export default filterChose;
