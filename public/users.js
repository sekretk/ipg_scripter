const createFolderBtn = document.getElementById('createFolder');
const folderNameInput = document.getElementById('folderName');

createFolderBtn.addEventListener('click', () => {
  fetch(`/users/createFolder/${folderNameInput.value}`, {
    method: 'POST',
  }).finally(() => {
    folderNameInput.value = '';
  });
});
