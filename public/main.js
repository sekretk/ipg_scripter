const activate = (user) => () => {
  document.getElementById('veil').style.display = 'block';
  console.log('Activate user', user);
  fetch(`/users/${user}/activate`, { method: 'POST' })
    .then(() => {
      console.log('Activate user success', user);
    })
    .catch((_) => {
      console.error('Activate user FAILED', user);
    })
    .finally(() => {
      window.location.reload();
    });
};

const deactivate = (user) => () => {
  document.getElementById('veil').style.display = 'block';
  console.log('Deactivate user', user);
  fetch(`/users/${user}/deactivate`, { method: 'POST' })
    .then(() => {
      console.log('Deactivate user success', user);
    })
    .catch((_) => {
      console.error('Deactivate user FAILED', user);
    })
    .finally(() => {
      window.location.reload();
    });
};

// Create an instance of Notyf
var notyf = new Notyf();

const addToGroup = (user) => (event) => {
  document.getElementById('veil').style.display = 'block';
  console.log('addToGroup', user, event.target.checked, event.target.id);

  if (Boolean(event.target.checked)) {
    fetch(`/users/${user}/addToGroup/${event.target.id}`, { method: 'POST' })
      .then(() => {
        notyf.success(
          `Пользователь ${user} добавлен в группу ${event.target.id}`,
        );
        console.log('addToGroup user success', user);
      })
      .catch((_) => {
        notyf.error(
          `Ошибка при добавлении пользователя ${user} в группу ${event.target.id}`,
        );

        console.error('addToGroup user FAILED', user);
      })
      .finally(() => {
        document.getElementById('veil').style.display = 'none';
      });
  } else {
    fetch(`/users/${user}/removeFromGroup/${event.target.id}`, {
      method: 'POST',
    })
      .then(() => {
        notyf.success(
          `Пользователь ${user} удалён из группы ${event.target.id}`,
        );
        console.log('removeFromGroup user success', user);
      })
      .catch((_) => {
        notyf.error(
          `Ошибка при удалении пользователя ${user} из группы ${event.target.id}`,
        );
        console.error('removeFromGroup user FAILED', user);
      })
      .finally(() => {
        document.getElementById('veil').style.display = 'none';
      });
  }
};
