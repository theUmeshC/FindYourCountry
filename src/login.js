/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable linebreak-style */
const userName = document.querySelector('#login__userName');
const password = document.querySelector('#login__password');
const form = document.querySelector('#formTag');

const locationw = window.location.href;

function formSubmit(e) {
  e.preventDefault();
  const userNameValue = userName.value;
  const passwordValue = password.value;
  const regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (userNameValue === '' || passwordValue === '') {
    alert(
      'You have to fill all information to add a new item! Try again.',
    );
    return;
  }
  if (!regularExpression.test(passwordValue)) {
    alert(
      'password should contain atleast one number and one special character',
    );
    return;
  }

  window.location.href = `${locationw}page2`;
}
form.addEventListener('submit', formSubmit);
