import products from './portfolio-data.js';
console.log(products);
const source = document.getElementById('entry-template').innerHTML;
const template = Handlebars.compile(source);

const STORAGE_KEY = 'selectedFilter';

const refs = {
  btnPanel: document.querySelector('.buttons-set'),
  portfolio: document.querySelector('.card-set'),
  filterData: JSON.parse(localStorage.getItem(STORAGE_KEY)),
  filterChose(event) {
    if (event.target.nodeName !== 'BUTTON') {
      return;
    }
    const selectedFilter = event.target.dataset.filter;
    refs.createMarkUp(selectedFilter);
    console.log(selectedFilter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilter));
  },
  createMarkUp(selectedFilter) {
    const filteredArrays = products.filter(product => product.filter.includes(selectedFilter));
    console.log(filteredArrays);
    console.log(template(filteredArrays));
    const cardsEl = template(filteredArrays);

    refs.portfolio.innerHTML = '';
    refs.portfolio.insertAdjacentHTML('beforeend', cardsEl);
  },

  // createMarkUp(selectedFilter) {
  //   const filteredArrays = products.filter(product => product.filter.includes(selectedFilter));
  //   const cardsEl = filteredArrays
  //     .map(
  //       ({
  //         alt,
  //         name,
  //         description,
  //         category,
  //         filter,
  //         generalImg,
  //         imgDesctop,
  //         imgTable,
  //         imgMobile,
  //       }) => {
  //         return `
  //                  <li class="card-set__item" data-filter="${filter}">
  //                 <a
  //                   href="https://google.com/"
  //                   target="_blank"
  //                   rel="noopener noreferrer nofollow"
  //                   class="card-set__link"
  //                 >
  //                   <div class="graphic-content">
  //                     <picture>
  //                       <source
  //                         srcset="${imgDesctop}"
  //                         media="(min-width: 1200px)"
  //                       />
  //                       <source
  //                         srcset="${imgTable}"
  //                         media="(min-width: 768px)"
  //                       />
  //                       <source
  //                         srcset="${imgMobile}"
  //                         media="(min-width: 320px)"
  //                       />
  //                       <img
  //                         class="graphic-content__img"
  //                         src="${generalImg}"
  //                         alt="${alt}"
  //                         width="370"
  //                       />
  //                     </picture>
  //                     <div class="overflow">
  //                       <p class="graphic-content__img-overflow">${description}
  //                       </p>
  //                     </div>
  //                   </div>
  //                   <div class="text-content">
  //                     <h2 class="text-content__title">${name}</h2>
  //                     <p class="text-content__text">${category}</p>
  //                   </div>
  //                 </a>
  //               </li>
  //       `;
  //       }
  //     )
  //     .join('');
  //   refs.portfolio.innerHTML = '';
  //   refs.portfolio.insertAdjacentHTML('beforeend', cardsEl);
  // },
};

if (refs.filterData) {
  // если в refs.filterData есть значения
  refs.createMarkUp(refs.filterData);
  // передаем его в разметку
  const allBtns = document.querySelectorAll('.buttons-set__button');
  // делаем переменную со всеми кнопками в панели
  for (const Btn of allBtns) {
    // перебираем все кнопки
    if (Btn.dataset.filter === refs.filterData) {
      // data-filter=".." кнопки ==== записи в refs.filterData
      Btn.focus();
      //делаем фокус на кнопку
      // в css убрал на focus outline: none;
    }
  }
}
refs.btnPanel.addEventListener('click', refs.filterChose);
