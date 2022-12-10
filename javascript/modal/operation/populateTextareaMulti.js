import refs from '../../refs/index.js';
const STORAGE_KEY = 'inputLocallStorageKey';

const populateTextareaMulti = () => {
  const { modalWindow } = refs;
  const { form, checkBox } = modalWindow;
  const parsedDataFromLocalStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!parsedDataFromLocalStorage) {
    return;
  } else if (parsedDataFromLocalStorage) {
    for (let element of form.elements) {
      const entris = Object.entries(parsedDataFromLocalStorage);
      if (element.name === 'policy') {
        entris.forEach(([name, value]) => {
          if (name === 'policy' && value === 'on') {
            checkBox.checked = true;
          }
        });
      }
      entris.forEach(([name, value]) => {
        if (element.name === name) {
          element.value = value;
        }
      });
    }
  }
};

export default populateTextareaMulti;
