let donations = [];

document.getElementById('createForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const category = new URLSearchParams(window.location.search).get('category');
  const title = document.getElementById('title').value;
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const email = document.getElementById('email').value;

  const donation = { category, title, amount, description, email };
  donations.push(donation);
  localStorage.setItem('donations', JSON.stringify(donations));
  alert('Збір створено!');
  window.location.href = 'donate.html';
});

document.addEventListener('DOMContentLoaded', () => {
  const donationsContainer = document.getElementById('donations');
  if (donationsContainer) {
    donations = JSON.parse(localStorage.getItem('donations')) || [];
    donations.forEach((donation, index) => {
      const donationElement = document.createElement('div');
      donationElement.innerHTML = `
        <h3>${donation.title} (${donation.category})</h3>
        <p>${donation.description}</p>
        <p>Сума: $${donation.amount}</p>
        <form action="https://www.paypal.com/donate" method="post" target="_blank">
          <input type="hidden" name="business" value="${donation.email}">
          <input type="hidden" name="item_name" value="${donation.title}">
          <input type="hidden" name="amount" value="${donation.amount}">
          <button type="submit">Підтримати</button>
        </form>
      `;
      donationsContainer.appendChild(donationElement);
    });
  }
});

const burgerMenu = document.getElementById('burgerMenu');
const menu = document.getElementById('menu');

burgerMenu.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
    dots[i].classList.toggle('active', i === index);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    showSlide(currentIndex);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentIndex);
});
