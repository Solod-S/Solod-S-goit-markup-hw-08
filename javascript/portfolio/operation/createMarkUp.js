import products from '../../services/portfolio-data.js';

const source = document.getElementById('entry-template').innerHTML;
const template = Handlebars.compile(source);

const createMarkUp = selectedFilter => {
  const cardSet = document.querySelector('.card-set');
  const filteredArrays = products.filter(product => product.filter.includes(selectedFilter));
  const cardsEl = template(filteredArrays);
  cardSet.innerHTML = '';
  cardSet.insertAdjacentHTML('beforeend', cardsEl);
};

export default createMarkUp;
