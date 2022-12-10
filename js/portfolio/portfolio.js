import refs from '../refs/index.js';
import operation from './operation/index.js';

const { populateFromLocalStorage, createMarkUp, filterChose } = operation;

const { portfolio } = refs;

portfolio.btnsSet.addEventListener('click', filterChose.bind(portfolio));
populateFromLocalStorage();
