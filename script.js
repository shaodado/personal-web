const revealItems = document.querySelectorAll('.reveal');
const imageFlip = document.querySelector('.image-flip');

const toggleImageFlip = () => {
  const isFlipped = imageFlip.classList.toggle('is-flipped');
  imageFlip.setAttribute('aria-pressed', String(isFlipped));
};

imageFlip.addEventListener('click', toggleImageFlip);
imageFlip.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleImageFlip();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item) => observer.observe(item));
