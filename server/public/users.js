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

document.querySelectorAll('.deleteuser').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    console.log(event.target.id);
    event.preventDefault();
    event.stopPropagation();
    fetch(`/users/${event.target.id.substring(4)}`, {
      method: 'DELETE',
    })
      .then(() => {
        notyf.success(`Пользоватлель ${event.target.id.substring(4)} удалён`);
        console.log('delete user success', event.target.id.substring(4));
        window.location.reload();
      })
      .catch((_) => {
        notyf.error(
          `Ошибка при удалении пользователя ${event.target.id.substring(4)}`,
        );

        console.error('delete user FAILED', event.target.id.substring(4));
      });
  });
});
