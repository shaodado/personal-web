const revealItems = document.querySelectorAll('.reveal');
const imageFlip = document.querySelector('.image-flip');

const toggleImageFlip = () => {
  if (imageFlip) {
    const isFlipped = imageFlip.classList.toggle('is-flipped');
    imageFlip.setAttribute('aria-pressed', String(isFlipped));
  }
};

if (imageFlip) {
  imageFlip.addEventListener('click', toggleImageFlip);
  imageFlip.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleImageFlip();
    }
  });
}

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

// Smooth Scroll Setup (Lerp)
let targetScroll = window.scrollY;
let currentScroll = window.scrollY;
// Change ease from 0.08 to 0.04 for slower momentum
const ease = 0.04; 

window.addEventListener('scroll', () => {
  targetScroll = window.scrollY;
});

// Cache layout metrics to avoid layout thrashing
const metrics = {
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth,
  edu: { top: 0, height: 0, valid: false },
  timeline: { top: 0, height: 0, valid: false },
  proj: { top: 0, height: 0, valid: false },
};

// Selectors
// 1. Education
const eduWrapper = document.querySelector('.edu-wrapper');
const eduTimelineContainer = document.querySelector('.edu-timeline-container');
const eduIntro = document.querySelector('.edu-intro');
const eduItems = document.querySelectorAll('.edu-item');
let eduBaseLeft = 0;

// 2. Experience
const timelineWrapper = document.querySelector('.timeline-wrapper');
const timelineContainer = document.querySelector('.timeline-container');
const timelineItems = document.querySelectorAll('.timeline-item');
let timelineBaseLeft = 0;

// 3. Projects
const projWrapper = document.querySelector('.proj-wrapper');
const projItems = document.querySelectorAll('.proj-item');

const updateMetrics = () => {
  metrics.windowHeight = window.innerHeight;
  metrics.windowWidth = window.innerWidth;
  
  if (eduWrapper && eduTimelineContainer) {
    eduTimelineContainer.style.transform = 'none';
    metrics.edu.top = eduWrapper.getBoundingClientRect().top + window.scrollY;
    metrics.edu.height = eduWrapper.offsetHeight;
    metrics.edu.valid = true;
    eduBaseLeft = eduTimelineContainer.getBoundingClientRect().left;
  }
  
  if (timelineWrapper && timelineContainer) {
    timelineContainer.style.transform = 'none';
    metrics.timeline.top = timelineWrapper.getBoundingClientRect().top + window.scrollY;
    metrics.timeline.height = timelineWrapper.offsetHeight;
    metrics.timeline.valid = true;
    timelineBaseLeft = timelineContainer.getBoundingClientRect().left;
  }
  
  if (projWrapper) {
    metrics.proj.top = projWrapper.getBoundingClientRect().top + window.scrollY;
    metrics.proj.height = projWrapper.offsetHeight;
    metrics.proj.valid = true;
  }
};

window.addEventListener('resize', updateMetrics);

// Initialization
updateMetrics();

// Update functions for each section using interpolated scroll
const updateEduSection = () => {
  if (!metrics.edu.valid) return;
  
  const rawProgress = (currentScroll - metrics.edu.top) / (metrics.edu.height - metrics.windowHeight);
  const progress = Math.min(Math.max(rawProgress, 0), 1);
  
  if (progress < 0.15) {
    eduIntro.style.opacity = 1;
    eduIntro.style.transform = `translate(-50%, -50%) scale(1)`;
  } else if (progress >= 0.15 && progress < 0.25) {
    const fadeProgress = (progress - 0.15) / 0.1;
    eduIntro.style.opacity = 1 - fadeProgress;
    eduIntro.style.transform = `translate(-50%, -50%) scale(${1 + fadeProgress * 0.1})`;
  } else {
    eduIntro.style.opacity = 0;
  }

  if (progress > 0.2) {
    eduTimelineContainer.style.opacity = 1;
    eduTimelineContainer.style.pointerEvents = 'auto';
    
    const scrollProgress = Math.min(Math.max((progress - 0.25) / 0.75, 0), 1);
    const maxTranslate = eduTimelineContainer.scrollWidth - metrics.windowWidth;
    const currentTranslate = -scrollProgress * maxTranslate;
    
    eduTimelineContainer.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;

    const windowCenter = metrics.windowWidth / 2;

    eduItems.forEach((item) => {
      const itemLeft = eduBaseLeft + currentTranslate + item.offsetLeft;
      const itemCenter = itemLeft + item.offsetWidth / 2;
      const dist = itemCenter - windowCenter;
      const maxDist = metrics.windowWidth * 0.6; 
      let normalizedDist = Math.min(Math.max(dist / maxDist, -1), 1);
      
      const rotateY = normalizedDist * 40; 
      const scale = 1 - Math.abs(normalizedDist) * 0.25; // More intense scaling
      // Add blur based on distance
      const blurAmount = Math.abs(normalizedDist) * 6; // Max 6px blur at edges
      // Make them come from deeper Z space (e.g., 400 instead of 300)
      const zDepth = Math.min(400, metrics.windowWidth * 0.6);
      const translateZ = -Math.abs(normalizedDist) * zDepth;
      
      let cardOpacity = 1 - Math.abs(normalizedDist) * 0.7;
      if (progress >= 0.2 && progress < 0.25) {
        cardOpacity *= (progress - 0.2) / 0.05;
      }

      item.style.transform = `translate3d(0, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      item.style.opacity = cardOpacity;
      item.style.filter = `blur(${blurAmount}px)`;
    });
  } else {
    eduTimelineContainer.style.opacity = 0;
    eduTimelineContainer.style.pointerEvents = 'none';
  }
};

const updateTimelineSection = () => {
  if (!metrics.timeline.valid) return;
  
  const rawProgress = (currentScroll - metrics.timeline.top) / (metrics.timeline.height - metrics.windowHeight);
  const progress = Math.min(Math.max(rawProgress, 0), 1);
  
  const maxTranslate = timelineContainer.scrollWidth - metrics.windowWidth;
  const currentTranslate = -progress * maxTranslate;
  
  timelineContainer.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;

  const windowCenter = metrics.windowWidth / 2;

  timelineItems.forEach((item) => {
    const itemLeft = timelineBaseLeft + currentTranslate + item.offsetLeft;
    const itemCenter = itemLeft + item.offsetWidth / 2;
    
    const dist = itemCenter - windowCenter;
    const maxDist = metrics.windowWidth * 0.6; 
    let normalizedDist = Math.min(Math.max(dist / maxDist, -1), 1);
    
    const rotateY = normalizedDist * 45; // slightly sharper rotation 
    const scale = 1 - Math.abs(normalizedDist) * 0.25;
    const blurAmount = Math.abs(normalizedDist) * 6; 
    const zDepth = Math.min(400, metrics.windowWidth * 0.6);
    const translateZ = -Math.abs(normalizedDist) * zDepth;
    const opacity = 1 - Math.abs(normalizedDist) * 0.6;
    
    item.style.transform = `translate3d(0, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
    item.style.opacity = opacity;
    item.style.filter = `blur(${blurAmount}px)`;
  });
};

const updateProjSection = () => {
  if (!metrics.proj.valid || projItems.length === 0) return;

  const rawProgress = (currentScroll - metrics.proj.top) / (metrics.proj.height - metrics.windowHeight);
  const progress = Math.min(Math.max(rawProgress, 0), 1);
  
  const numItems = projItems.length;
  const sectionProgress = 1 / numItems;

  projItems.forEach((item, index) => {
    const start = index * sectionProgress;
    let localProgress = (progress - start) / sectionProgress;
    
    if (localProgress >= 0 && localProgress <= 1) {
      item.style.pointerEvents = 'auto';
      
      let opacity = 0;
      let scale = 0.4;
      let blur = 10; // Start blurry

      if (localProgress < 0.2) {
        const p = localProgress / 0.2;
        opacity = p;
        scale = 0.4 + (0.6 * p); // 0.4 -> 1.0
        blur = 10 * (1 - p);     // 10px -> 0px
      } else if (localProgress < 0.8) {
        opacity = 1;
        scale = 1;
        blur = 0;
      } else {
        const p = (localProgress - 0.8) / 0.2;
        opacity = 1 - p;
        scale = 1 + (0.8 * p);   // 1.0 -> 1.8
        blur = 15 * p;           // 0px -> 15px
      }

      item.style.opacity = opacity;
      item.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
      item.style.filter = `blur(${blur}px)`;
    } else {
      item.style.opacity = 0;
      item.style.pointerEvents = 'none';
      item.style.filter = `blur(10px)`;
    }
  });
};

// Main RAF Loop
const tick = () => {
  // Lerp
  currentScroll += (targetScroll - currentScroll) * ease;
  
  // Update animations
  updateEduSection();
  updateTimelineSection();
  updateProjSection();
  
  requestAnimationFrame(tick);
};

// Start loop
requestAnimationFrame(tick);
