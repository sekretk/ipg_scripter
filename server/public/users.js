const createFolderBtn = document.getElementById('createFolder');
const folderNameInput = document.getElementById('folderName');

var notyf = new Notyf();

createFolderBtn.addEventListener('click', () => {
  fetch(`/users/createFolder/${folderNameInput.value}`, {
    method: 'POST',
  })
    .then(() => {
      notyf.success(`Каталог ${folderNameInput.value} создан`);
      console.log('create folder success', folderNameInput.value);
    })
    .catch((_) => {
      notyf.error(`Ошибка при создании каталога ${folderNameInput.value}`);

      console.error('create folder  FAILED', folderNameInput.value);
    })
    .finally(() => {
      document.getElementById('veil').style.display = 'none';
      folderNameInput.value = '';
    });
});
