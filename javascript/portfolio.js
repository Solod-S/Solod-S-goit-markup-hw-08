import products from './services/portfolio-data.js';
const source = document.getElementById('entry-template').innerHTML;
const template = Handlebars.compile(source);
const STORAGE_KEY = 'selectedFilter';

const filtersOnPortfolio = {
  btnPanelEl: document.querySelector('.buttons-set'),
  portfolioEl: document.querySelector('.card-set'),
  filterData: JSON.parse(localStorage.getItem(STORAGE_KEY)),

  populateFromLocalStorage() {
    const { filterData } = filtersOnPortfolio;
    if (filterData) {
      this.createMarkUp(filterData);
      const allBtns = document.querySelectorAll('.buttons-set__button');
      for (const Btn of allBtns) {
        if (Btn.dataset.filter === filterData) {
          Btn.focus();
        }
      }
    } else {
      return;
    }
  },

  filterChose(event) {
    const { nodeName, dataset } = event.target;
    if (nodeName !== 'BUTTON') {
      return;
    }
    const selectedFilter = dataset.filter;
    this.createMarkUp(selectedFilter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilter));
  },

  createMarkUp(selectedFilter) {
    const { portfolioEl } = this;
    const filteredArrays = products.filter(product => product.filter.includes(selectedFilter));
    const cardsEl = template(filteredArrays);
    portfolioEl.innerHTML = '';
    portfolioEl.insertAdjacentHTML('beforeend', cardsEl);
  },
};

filtersOnPortfolio.btnPanelEl.addEventListener(
  'click',
  filtersOnPortfolio.filterChose.bind(filtersOnPortfolio)
);
filtersOnPortfolio.populateFromLocalStorage();
