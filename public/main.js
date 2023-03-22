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
var myAlert = document.getElementById('toastNotice');
const toast = new bootstrap.Toast(myAlert);
toast.show();
const addToGroup = (user) => (event) => {
  document.getElementById('veil').style.display = 'block';
  console.log('addToGroup', user, event.target.checked, event.target.id);

  if (Boolean(event.target.checked)) {
    fetch(`/users/${user}/addToGroup/${event.target.id}`, { method: 'POST' })
      .then(() => {
        console.log('addToGroup user success', user);
      })
      .catch((_) => {
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
        console.log('removeFromGroup user success', user);
      })
      .catch((_) => {
        console.error('removeFromGroup user FAILED', user);
      })
      .finally(() => {
        document.getElementById('veil').style.display = 'none';
      });
  }
};
