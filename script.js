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

// 3D Horizontal Scroll Timeline
const timelineWrapper = document.querySelector('.timeline-wrapper');
const timelineSticky = document.querySelector('.timeline-sticky');
const timelineContainer = document.querySelector('.timeline-container');
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineWrapper && timelineSticky && timelineContainer) {
  let containerBaseLeft = 0;
  
  const initTimeline = () => {
    timelineContainer.style.transform = 'none';
    timelineItems.forEach(item => {
      item.style.transform = 'none';
      item.style.opacity = '1';
    });
    containerBaseLeft = timelineContainer.getBoundingClientRect().left;
  };

  const updateTimeline = () => {
    const rect = timelineWrapper.getBoundingClientRect();
    const wrapperTop = rect.top;
    const wrapperHeight = rect.height;
    const stickyHeight = window.innerHeight;
    
    let progress = -wrapperTop / (wrapperHeight - stickyHeight);
    progress = Math.min(Math.max(progress, 0), 1);
    
    const maxTranslate = timelineContainer.scrollWidth - window.innerWidth;
    const currentTranslate = -progress * maxTranslate;
    
    timelineContainer.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;

    const windowCenter = window.innerWidth / 2;

    timelineItems.forEach((item) => {
      const itemLeft = containerBaseLeft + currentTranslate + item.offsetLeft;
      const itemCenter = itemLeft + item.offsetWidth / 2;
      
      const dist = itemCenter - windowCenter;
      // Affects how fast the 3D effect kicks in relative to screen center
      const maxDist = window.innerWidth * 0.6; 
      let normalizedDist = dist / maxDist;
      normalizedDist = Math.min(Math.max(normalizedDist, -1), 1);
      
      const rotateY = normalizedDist * 40; 
      const scale = 1 - Math.abs(normalizedDist) * 0.15;
      const translateZ = -Math.abs(normalizedDist) * 200;
      const opacity = 1 - Math.abs(normalizedDist) * 0.5;
      
      item.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      item.style.opacity = opacity;
    });
  };

  window.addEventListener('resize', () => {
    initTimeline();
    updateTimeline();
  });
  
  initTimeline();
  window.addEventListener('scroll', updateTimeline);
  updateTimeline();
}
