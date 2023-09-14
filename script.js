const navButton = document.getElementById('menu-button');
const navItems = document.querySelector('.navbar');
const input = document.querySelector('#phone');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

// EVENT : toggle mobile navigation
navButton.addEventListener('click', () => {
  navItems.classList.toggle('hidden');
  navItems.classList.toggle('flex');

  if (navItems.classList.contains('flex')) {
    navItems.classList.add('justify-center');
  } else {
    navItems.classList.remove('justify-center');
  }
});

// EVENT : active navbar when scroll
window.addEventListener('scroll', () => {
  sections.forEach((item) => {
    let top = window.scrollY;
    let offset = item.offsetTop - 100;
    let height = item.offsetHeight;
    let id = item.getAttribute('id');

    if (top < 580) {
      navLinks[0].classList.add('active');
      navLinks[1].classList.remove('active');
    } else if (top > 1650) {
      navLinks[0].classList.add('active');
      navLinks[2].classList.remove('active');
    } else if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
      });
      document
        .querySelector('.navbar a[href*=' + id + ']')
        .classList.add('active');
    }
  });
});

// PLUGINS : intl-tel-input form
window.intlTelInput(input, {
  initialCountry: 'id',
  separateDialCode: true,
  utilsScript:
    'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
});

// LEGACY CODE

// let scrollY = window.pageYOffset;

// sections.forEach((current) => {
//   const sectionHeight = current.offsetHeight;

//   const sectionTop =
//     current.getBoundingClientRect().top + window.pageYOffset - 50;

//   const sectionId = current.getAttribute('id');

//   if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//     document
//       .querySelector('.navbar a[href*=' + sectionId + ']')
//       .classList.add('active');
//   } else {
//     document
//       .querySelector(`.navbar a[href*='${sectionId}']`)
//       .classList.remove('active');
//   }
// });
