import refs from '../../refs/index.js';

const STORAGE_KEY = 'inputLocallStorageKey';
const formData = { ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };

const onFormInput = event => {
  const { modalWindow } = refs;
  const { checkBox } = modalWindow;
  const { name, value } = event.target;
  formData[name] = value;

  if (checkBox.checked) {
    formData.policy = 'on';
  } else if (!checkBox.checked) {
    formData.policy = 'off';
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

export default onFormInput;
