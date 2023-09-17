const navButton = document.getElementById('menu-button');
const navItems = document.querySelector('.navbar');
const input = document.querySelector('#phone');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');
const reservationForm = document.getElementById('reservation');
const reservationModal = document.querySelector('.modal');
const errorMsg = document.querySelector('#error-msg');
const validMsg = document.querySelector('#valid-msg');
const reservationModalContainer = document.getElementById('reservation-modal');
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const errorMap = [
  'Invalid number',
  'Invalid country code',
  'Phone number is too short',
  'Phone number is too long',
  'Invalid number',
];

if (window.innerWidth < 641) {
  navLinks[0].classList.remove('active');
}

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

// EVENT :
navLinks.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.classList.add('hidden');
    navItems.classList.remove('flex');
  });
});

// EVENT : add shadow to header when scroll
window.addEventListener('scroll', () => {
  let scroll = window.scrollY;
  if (scroll > 0) {
    document.getElementById('header').classList.add('shadow');
  } else {
    document.getElementById('header').classList.remove('shadow');
  }
});

// EVENT : active navbar when scroll
window.addEventListener('scroll', () => {
  if (window.innerWidth < 641) {
    return;
  }
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

// EVENT : submit reservation form
reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const fullName = document.querySelector('input[type="text"]');
  const email = document.querySelector('input[type="email"]');
  const notes = document.querySelector('textarea');
  const id = Math.floor(100000 + Math.random() * 900000);
  let phoneNumber;

  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      phoneNumber = input.value;
    } else {
      input.classList.add('error');
      const errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove('hidden');
      errorMsg.style.color = '#ef4444';
      return;
    }
  }

  if (!notes.value) {
    notes.value = '-';
  }

  renderModal(id, fullName.value, email.value, phoneNumber, notes.value);
  reservationModalContainer.classList.remove('hidden');
  reservationModalContainer.classList.add(
    'flex',
    'justify-center',
    'items-center'
  );
  reservationForm.reset();
});

// EVENT : close reservation modal
reservationModal.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.classList.contains('close-modal')) {
    reservationModalContainer.classList.remove('flex');
    reservationModalContainer.classList.add('hidden');
  }
});

// PLUGINS : intl-tel-input form
const iti = window.intlTelInput(input, {
  initialCountry: 'id',
  separateDialCode: true,
  utilsScript:
    'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
});

const reset = () => {
  input.classList.remove('error');
  errorMsg.innerHTML = '';
  errorMsg.classList.add('hidden');
  validMsg.classList.add('hidden');
};

input.addEventListener('change', reset);
input.addEventListener('keyup', reset);

// FUNCTION : render successful modal reservation form
function renderModal(id, name, email, phone, notes) {
  const spanModal = document.querySelectorAll('.modal span');
  spanModal[0].innerText = id;
  spanModal[1].innerText = name;
  spanModal[2].innerText = email;
  spanModal[3].innerText = phone;
  spanModal[4].innerText = notes;
}

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
