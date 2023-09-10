const navButton = document.getElementById('menu-button');
const navItems = document.querySelector('.navbar');
const input = document.querySelector('#phone');

navButton.addEventListener('click', () => {
  navItems.classList.toggle('hidden');
  navItems.classList.toggle('flex');

  if (navItems.classList.contains('flex')) {
    navItems.classList.add('justify-center');
  } else {
    navItems.classList.remove('justify-center');
  }
});

window.intlTelInput(input, {
  initialCountry: 'id',
  separateDialCode: true,
  utilsScript:
    'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
});
