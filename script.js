const navButton = document.getElementById('menu-button');
const navItems = document.querySelector('.navbar');
navButton.addEventListener('click', () => {
  navItems.classList.toggle('hidden');
  navItems.classList.toggle('flex');

  if (navItems.classList.contains('flex')) {
    navItems.classList.add('justify-center');
  } else {
    navItems.classList.remove('justify-center');
  }
});
