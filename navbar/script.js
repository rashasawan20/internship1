// Navbar 
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[n].classList.add("active");
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);


setInterval(nextSlide, 5000);
