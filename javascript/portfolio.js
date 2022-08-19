import products from './portfolio-data.js';
console.log(products);

const refs = {
  btnPanel: document.querySelector('.buttons-set'),
  portfolio: document.querySelector('.card-set'),
  filterChose(event) {
    if (event.target.nodeName !== 'BUTTON') {
      return;
    }
    console.log(event.target.dataset.filter);
    const selectedFilter = event.target.dataset.filter;
    refs.createMarkUp(selectedFilter);
  },

  createMarkUp(selectedFilter) {
    const filteredArrays = products.filter(product => product.filter.includes(selectedFilter));
    const cardsEl = filteredArrays
      .map(
        ({
          alt,
          name,
          description,
          category,
          filter,
          generalImg,
          imgDesctop,
          imgTable,
          imgMobile,
        }) => {
          return `
               <li class="card-set__item" data-filter="${filter}">
              <a
                href="https://google.com/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="card-set__link"
              >
                <div class="graphic-content">
                  <picture>
                    <source
                      srcset="${imgDesctop}"
                      media="(min-width: 1200px)"
                    />
                    <source
                      srcset="${imgTable}"
                      media="(min-width: 768px)"
                    />
                    <source
                      srcset="${imgMobile}"
                      media="(min-width: 320px)"
                    />
                    <img
                      class="graphic-content__img"
                      src="${generalImg}"
                      alt="${alt}"
                      width="370"
                    />
                  </picture>

                  <div class="overflow">
                    <p class="graphic-content__img-overflow">${description}
                    </p>
                  </div>
                </div>
                <div class="text-content">
                  <h2 class="text-content__title">${name}</h2>
                  <p class="text-content__text">${category}</p>
                </div>
              </a>
            </li>
    `;
        }
      )
      .join('');
    refs.portfolio.innerHTML = '';
    refs.portfolio.insertAdjacentHTML('beforeend', cardsEl);
  },
};

refs.btnPanel.addEventListener('click', refs.filterChose);
