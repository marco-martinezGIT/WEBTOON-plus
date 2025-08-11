// OVERLAY //

const overlay = document.createElement('div');
Object.assign(overlay.style, {
  position: 'fixed',
  top: '5px',
  padding: '0 12px 12px 12px',
  right: '20px',
  background: 'rgba(0,0,0,0.8)',
  color: 'white',
  borderRadius: '8px',
  zIndex: '9999',
  width: '280px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  userSelect: 'none',
});
overlay.setAttribute('tabindex', '-1');
document.body.appendChild(overlay);

// Initialize position with left and top, remove right
if (!overlay.style.left) {
  const rightVal = parseInt(overlay.style.right || 10);
  overlay.style.left = (window.innerWidth - rightVal - overlay.offsetWidth) + 'px';
  overlay.style.top = '10px';
  overlay.style.right = 'auto';
}

// DRAG BAR //
const dragBar = document.createElement('div');
Object.assign(dragBar.style, {
  height: '24px',
  background: '#222',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  cursor: 'move',
  position: 'relative',
  left: '-12px',
  width: 'calc(100% + 24px)',
  marginBottom: '12px',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});
dragBar.innerText = 'WEBTOON+';
overlay.appendChild(dragBar);

// START BUTTON //
const statusText = document.createElement('div');
statusText.style.marginTop = '8px';
statusText.style.fontWeight = 'bold';
statusText.innerText = 'Status: Waiting to start...';
overlay.appendChild(statusText);

const startStopBtn = document.createElement('button');
startStopBtn.innerText = 'Start Auto-Scroll';
startStopBtn.style.marginTop = '8px';
startStopBtn.style.width = '100%';
startStopBtn.style.padding = '6px';
startStopBtn.style.borderRadius = '4px';
startStopBtn.style.border = 'none';
startStopBtn.style.cursor = 'pointer';
startStopBtn.style.backgroundColor = '#007bff';
startStopBtn.style.color = 'white';
overlay.appendChild(startStopBtn);

// MINIMIZE BUTTON //
const minimizeBtn = document.createElement('button');
minimizeBtn.innerText = 'Hide Controls';
minimizeBtn.style.marginTop = '8px';
minimizeBtn.style.width = '100%';
minimizeBtn.style.padding = '6px';
minimizeBtn.style.borderRadius = '4px';
minimizeBtn.style.border = 'none';
minimizeBtn.style.cursor = 'pointer';
minimizeBtn.style.backgroundColor = '#6c757d';
minimizeBtn.style.color = 'white';
overlay.appendChild(minimizeBtn);

// Container div to hold all sliders and dark mode toggle, so we can hide/show easily
const controlsContainer = document.createElement('div');
overlay.appendChild(controlsContainer);

// Scroll Speed slider & label & value
const speedLabel = document.createElement('label');
speedLabel.innerText = 'Scroll Speed:';
speedLabel.style.display = 'block';
speedLabel.style.marginTop = '10px';
controlsContainer.appendChild(speedLabel);

const speedSlider = document.createElement('input');
speedSlider.type = 'range';
speedSlider.min = '1';
speedSlider.max = '10';
speedSlider.step = '1';
speedSlider.value = '5';
speedSlider.style.width = '100%';
controlsContainer.appendChild(speedSlider);

const speedValue = document.createElement('div');
speedValue.innerText = speedSlider.value;
speedValue.style.textAlign = 'right';
speedValue.style.fontSize = '12px';
speedValue.style.marginTop = '2px';
controlsContainer.appendChild(speedValue);

// Char Count Slowdown Factor slider & label & value
const factorLabel = document.createElement('label');
factorLabel.innerText = 'Char Count Slowdown:';
factorLabel.style.display = 'block';
factorLabel.style.marginTop = '10px';
controlsContainer.appendChild(factorLabel);

const factorSlider = document.createElement('input');
factorSlider.type = 'range';
factorSlider.min = '0';
factorSlider.max = '5';
factorSlider.step = '1';
factorSlider.value = '3';
factorSlider.style.width = '100%';
controlsContainer.appendChild(factorSlider);

const factorValue = document.createElement('div');
factorValue.innerText = factorSlider.value;
factorValue.style.textAlign = 'right';
factorValue.style.fontSize = '12px';
factorValue.style.marginTop = '2px';
controlsContainer.appendChild(factorValue);

// === Hold Key Section ===
const holdControls = document.createElement('div');
holdControls.style.display = 'none';
controlsContainer.appendChild(holdControls);

const holdKeyLabel = document.createElement('label');
holdKeyLabel.innerText = 'Hold to Scroll Key (click to bind):';
holdKeyLabel.style.display = 'block';
holdKeyLabel.style.marginTop = '10px';
holdControls.appendChild(holdKeyLabel);

const holdKeyDisplay = document.createElement('button');
holdKeyDisplay.innerText = 'Not set';
holdKeyDisplay.style.background = '#e3e3e3';
holdKeyDisplay.style.padding = '4px';
holdKeyDisplay.style.textAlign = 'center';
holdKeyDisplay.style.marginTop = '4px';
holdKeyDisplay.style.borderRadius = '4px';
holdKeyDisplay.style.width = '100%';
holdControls.appendChild(holdKeyDisplay);

// DARK MODE TOGGLE //
const darkModeToggleBtn = document.createElement('button');
darkModeToggleBtn.innerText = 'Enable Night Mode';
darkModeToggleBtn.style.marginTop = '0'; // no margin to align side-by-side
darkModeToggleBtn.style.padding = '6px';
darkModeToggleBtn.style.borderRadius = '4px';
darkModeToggleBtn.style.border = 'none';
darkModeToggleBtn.style.cursor = 'pointer';
darkModeToggleBtn.style.backgroundColor = '#30144a';
darkModeToggleBtn.style.color = 'white';

// SWITCH MODE BUTTON //
const modeToggleBtn = document.createElement('button');
modeToggleBtn.innerText = 'Switch Mode';
modeToggleBtn.style.marginTop = '0'; // same here
modeToggleBtn.style.padding = '6px';
modeToggleBtn.style.borderRadius = '4px';
modeToggleBtn.style.border = 'none';
modeToggleBtn.style.cursor = 'pointer';
modeToggleBtn.style.backgroundColor = '#3f989e';
modeToggleBtn.style.color = 'white';

// Container for side-by-side buttons
const bottomButtonContainer = document.createElement('div');
bottomButtonContainer.style.display = 'flex';
bottomButtonContainer.style.justifyContent = 'space-between';
bottomButtonContainer.style.gap = '8px';
bottomButtonContainer.style.marginTop = '12px';

// Both buttons take half width
darkModeToggleBtn.style.width = '50%';
modeToggleBtn.style.width = '50%';

// Append buttons into container
bottomButtonContainer.appendChild(darkModeToggleBtn);
bottomButtonContainer.appendChild(modeToggleBtn);

// Append the container just above minimize button
overlay.appendChild(bottomButtonContainer);

// Then append minimize button
overlay.appendChild(minimizeBtn);

startStopBtn.tabIndex = -1;
minimizeBtn.tabIndex = -1;
darkModeToggleBtn.tabIndex = -1;
modeToggleBtn.tabIndex = -1;

let baseSpeed = parseFloat(speedSlider.value);
let slowDownFactor = parseFloat(factorSlider.value);

let holdKey = null;

let autoScrollActive = false;
let paused = false;
let countdownTimer = null;
let countdownValue = 3;

let images = [];
let currentVisibleImg = null;
let scrollAnimationFrame = null;

let lastScrollSpeed = 0;

let darkModeOn = false;
let darkModeStyleEl = null;

let processedImgs = new WeakMap();
let ocrCooldowns = new WeakMap();
const OCR_COOLDOWN_MS = 60 * 1000;

// Wake Lock support
let wakeLock = null;

function loadSettings() {
  const savedSpeed = localStorage.getItem('webtoonSpeed');
  if (savedSpeed != null) {
    baseSpeed = parseFloat(savedSpeed);
    speedSlider.value = baseSpeed;
    speedValue.innerText = savedSpeed;
  }
  const savedFactor = localStorage.getItem('webtoonFactor');
  if (savedFactor != null) {
    slowDownFactor = parseFloat(savedFactor);
    factorSlider.value = slowDownFactor;
    factorValue.innerText = savedFactor;
  }

  const savedHoldKey = localStorage.getItem('webtoonHoldKey');
  if (savedHoldKey != null) {
    holdKey = savedHoldKey;
    holdKeyDisplay.innerText = holdKey;
  }

  const savedDarkMode = localStorage.getItem('webtoonDarkMode');
  if (savedDarkMode == 'true') {
    // Enable dark mode UI and internal flags
    toggleDarkMode();
  }
}

loadSettings();

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('[WakeLock] Screen Wake Lock activated');

    wakeLock.addEventListener('release', () => {
      console.log('[WakeLock] Screen Wake Lock released');
    });
  } catch (err) {
    console.error('[WakeLock] Failed to acquire:', err);
  }
}

async function releaseWakeLock() {
  if (wakeLock) {
    await wakeLock.release();
    wakeLock = null;
    console.log('[WakeLock] Released on scroll stop');
  }
}

// Optional: Re-acquire on tab focus
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && autoScrollActive) {
    requestWakeLock();
  }
});

function updateImages() {
  const container = document.getElementById('_imageList');
  if (!container) {
    images = [];
    console.log('[Observer] Container #_imageList not found');
    return;
  }
  images = Array.from(container.querySelectorAll('img'));
  console.log('[Observer] Found', images.length, 'images in #_imageList container');
}

// New function: Run OCR on all images sequentially on load
async function runOCRAllImages() {
  if (images.length === 0) return;

  for (const img of images) {
    const lastRun = ocrCooldowns.get(img) || 0;
    if (Date.now() - lastRun < OCR_COOLDOWN_MS) {
      console.log('[OCR] Cooldown active, skipping', img.src);
      continue;
    }
    try {
      console.log('[OCR] Running on:', img.src);
      const { data: { text } } = await Tesseract.recognize(
        img.src,
        'eng',
        { logger: m => console.log('[Tesseract]', m) }
      );
      const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      const charCount = text.trim().length;
      console.log('[OCR Result] Word Count:', wordCount, 'Char Count:', charCount);
      processedImgs.set(img, charCount);
      ocrCooldowns.set(img, Date.now());
    } catch (err) {
      console.error('[OCR] Failed:', err);
    }
  }
}

function calculateScrollSpeed(avgCharCount) {
  const speed = (baseSpeed / 2) - avgCharCount * (slowDownFactor / 400);
  return Math.max(speed, baseSpeed/8);
}

function smoothScrollStep(targetSpeed) {
  lastScrollSpeed += (targetSpeed - lastScrollSpeed) * (3 / 10);
  window.scrollBy(0, lastScrollSpeed);
  scrollAnimationFrame = requestAnimationFrame(() => smoothScrollStep(targetSpeed));
}

function updateScrolling() {
  if (!autoScrollActive || paused) return;

  const vpHeight = window.innerHeight;
  const vpTop = 0;
  const vpBottom = vpHeight;

  let visibleImgs = images.map((img, i) => {
    const rect = img.getBoundingClientRect();
    const top = Math.max(rect.top, vpTop);
    const bottom = Math.min(rect.bottom, vpBottom);
    const visibleHeight = Math.max(0, bottom - top);
    const charCount = processedImgs.get(img) || 0;
    return { img, visibleHeight, charCount };
  }).filter(item => item.visibleHeight > 0);

  if (visibleImgs.length === 0) return;

  // Weighted char count by visible area percentage (like before)
  const weightedTotalCharCount = visibleImgs.reduce((sum, { img, visibleHeight, charCount }) => {
    const rect = img.getBoundingClientRect();
    const visibilityPercent = rect.height > 0 ? visibleHeight / rect.height : 0;
    return sum + (charCount * visibilityPercent);
  }, 0);

  const scrollSpeed = calculateScrollSpeed(weightedTotalCharCount);

  console.log('[Scroll] Weighted Avg Char Count:', weightedTotalCharCount.toFixed(2), 'Speed:', scrollSpeed.toFixed(3));

  if (scrollAnimationFrame) cancelAnimationFrame(scrollAnimationFrame);
  smoothScrollStep(scrollSpeed);
}

function startCountdown(onComplete) {
  countdownValue = 3;
  statusText.innerText = `Starting in ${countdownValue}...`;
  if (countdownTimer) clearInterval(countdownTimer);

  countdownTimer = setInterval(() => {
    countdownValue--;
    if (countdownValue > 0) {
      statusText.innerText = `Starting in ${countdownValue}...`;
    } else {
      clearInterval(countdownTimer);
      countdownTimer = null;
      statusText.innerText = 'Auto-scroll running';
      onComplete();
    }
  }, 1000);
}

function startAutoScroll() {
  if (autoScrollActive) return;
  paused = false;
  startStopBtn.disabled = true;
  startCountdown(() => {
    autoScrollActive = true;
    startStopBtn.disabled = false;
    startStopBtn.innerText = 'Pause Auto-Scroll';
    updateScrolling();
    requestWakeLock();
  });
}

function stopAutoScroll(reason = 'Stopped') {
  if (!autoScrollActive) return;
  autoScrollActive = false;
  paused = false;
  if (scrollAnimationFrame) {
    cancelAnimationFrame(scrollAnimationFrame);
    scrollAnimationFrame = null;
  }
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
  statusText.innerText = reason;
  startStopBtn.innerText = 'Start Auto-Scroll';
  console.log('[AutoScroll]', reason);
  releaseWakeLock();
}

function pauseAutoScroll() {
  if (!autoScrollActive || paused) return;
  paused = true;
  if (scrollAnimationFrame) {
    cancelAnimationFrame(scrollAnimationFrame);
    scrollAnimationFrame = null;
  }
  statusText.innerText = 'Paused';
  startStopBtn.innerText = 'Resume Auto-Scroll';
  console.log('[AutoScroll] Paused');
  releaseWakeLock();
}

function resumeAutoScroll() {
  if (!autoScrollActive || !paused) return;
  paused = false;
  startStopBtn.disabled = true;             
  startStopBtn.innerText = 'Pause Auto-Scroll';
  startStopBtn.disabled = false;
  statusText.innerText = 'Auto-scroll running';
  updateScrolling();
  requestWakeLock();
}

function togglePauseResume() {
  if (!autoScrollActive) {
    startAutoScroll();
  } else if (paused) {
    resumeAutoScroll();
  } else {
    pauseAutoScroll();
  }
}

let holdScrollAnimationFrame = null;

function holdScrollLoop(){
  if (!holdScrolling) return;  // Exit early if key is no longer held
  window.scrollBy(0, baseSpeed*1.5); // Scroll the page
  holdScrollAnimationFrame = requestAnimationFrame(holdScrollLoop); // Schedule next scroll
}

function onKeyDown(e) {
  e.preventDefault();
  if (settingHoldKey) {
    holdKey = e.code;
    holdKeyDisplay.innerText = holdKey;
    localStorage.setItem('webtoonHoldKey', holdKey);
    settingHoldKey = false;
  }
  else if (e.code == holdKey && currentMode == 'hold'){
    if (!holdScrolling) {
      holdScrolling = true;
      holdScrollLoop();  // Start the loop only once
    }
  }
  else if (e.code == 'Space' && currentMode == 'auto') {
    togglePauseResume();
  }
  else if (e.code === 'ArrowRight') {
    const nextLink = document.querySelector('.pg_next._nextEpisode');
    if (!nextLink) return;
    if (autoScrollActive) stopAutoScroll();
    clearScrollData();
    if (nextLink && nextLink.href) {
      window.location.href = nextLink.href;
    }
  }
  else if (e.code === 'ArrowLeft') {
    const nextLink = document.querySelector('.pg_prev._prevEpisode');
    if (!nextLink) return;
    if (autoScrollActive) stopAutoScroll();
    clearScrollData();
    if (nextLink && nextLink.href) {
      window.location.href = nextLink.href;
    }
  }
}

function clearScrollData() {
  images = [];
  currentVisibleImg = null;
  scrollAnimationFrame = null;
  processing = false;
  processedImgs = new WeakMap();
  ocrCooldowns = new WeakMap();
  statusText.innerText = 'Status: Waiting to start...';
  console.log('[Reset] Cleared scroll data for new chapter');
}

function toggleDarkMode(){
    if (!darkModeOn) {
    darkModeStyleEl = document.createElement('style');
    darkModeStyleEl.textContent = `
      html, body {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
      }
      img {
        filter: brightness(0.8) contrast(1.2);
      }
      a, p, span, div {
        color: #e0e0e0 !important;
      }
    `;
    document.head.appendChild(darkModeStyleEl);
    darkModeOn = true;
    darkModeToggleBtn.innerText = 'Disable Night Mode';
  } else {
    if (darkModeStyleEl) {
      darkModeStyleEl.remove();
      darkModeStyleEl = null;
    }
    darkModeOn = false;
    darkModeToggleBtn.innerText = 'Enable Night Mode';
  }
  localStorage.setItem('webtoonDarkMode', darkModeOn);
}

// Start listening for spacebar immediately on script load
window.addEventListener('keydown', onKeyDown);

window.addEventListener('keyup', (e) => {
  if (e.code === holdKey) {
    holdScrolling = false; // Loop will stop on next frame
  }
  if (holdScrollAnimationFrame) {
    cancelAnimationFrame(holdScrollAnimationFrame);
    holdScrollAnimationFrame = null;
  }
});

speedSlider.addEventListener('input', () => {
  baseSpeed = parseFloat(speedSlider.value);
  speedValue.innerText = speedSlider.value;
  localStorage.setItem('webtoonSpeed', baseSpeed);
  updateScrolling();
});

factorSlider.addEventListener('input', () => {
  slowDownFactor = parseFloat(factorSlider.value);
  factorValue.innerText = factorSlider.value;
  localStorage.setItem('webtoonFactor', slowDownFactor);
  updateScrolling();
});

darkModeToggleBtn.addEventListener('click', (e) => {
  e.currentTarget.blur();
  toggleDarkMode();
});

startStopBtn.addEventListener('click', (e) => {
  e.currentTarget.blur();
  if (!autoScrollActive) {
    startAutoScroll();
  } else if (paused) {
    resumeAutoScroll();
  } else {
    pauseAutoScroll();
  }
});

minimizeBtn.addEventListener('click', (e) => {
  e.currentTarget.blur();
  if (controlsContainer.style.display === 'none') {
    // Maximize
    controlsContainer.style.display = 'block';
    minimizeBtn.innerText = 'Hide Controls';
    overlay.style.width = '280px';
    
    // Wait for width change to apply
    setTimeout(() => {
      const rect = overlay.getBoundingClientRect();
      let newLeft = rect.left;
      let newTop = rect.top;

      // Adjust horizontal position if overflowing right edge
      const overflowRight = rect.right - window.innerWidth;
      if (overflowRight > 0) {
        newLeft = Math.max(0, rect.left - overflowRight);
      }
      
      // Adjust vertical position if overflowing bottom edge
      const overflowBottom = rect.bottom - window.innerHeight;
      if (overflowBottom > 0) {
        newTop = Math.max(0, rect.top - overflowBottom);
      }
      
      overlay.style.left = newLeft + 'px';
      overlay.style.top = newTop + 'px';
      overlay.style.right = 'auto'; // disable right positioning for consistent left
    }, 10); // slight delay for style changes to apply
    
  } else {
    // Minimize
    controlsContainer.style.display = 'none';
    minimizeBtn.innerText = 'Controls';
    overlay.style.width = '160px';
  }
});


window.addEventListener('load', async () => {
  console.log('[Extension] Page loaded, starting image observer');
  updateImages();
  await runOCRAllImages(); // Run OCR on all images once on load
  // Remove existing scroll visibility check listener, we don't need it
  // We'll just update scrolling speed continuously when auto-scroll is active
});

// Continuously update scrolling speed (if active) on animation frame
function continuousScrollSpeedUpdate() {
  if (autoScrollActive && !paused) {
    updateScrolling();
  }
  requestAnimationFrame(continuousScrollSpeedUpdate);
}
continuousScrollSpeedUpdate();

window.addEventListener('scroll', throttle(() => {
  // Optionally, update images or OCR if you want here (not needed if static)
  // updateImages();
  // checkVisibility();
}, 1000));

window.addEventListener('resize', throttle(() => {
  // updateImages();
  // checkVisibility();
}, 1000));

function throttle(func, limit) {
  let inThrottle;
  return function() {
    if (!inThrottle) {
      func();
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Make the overlay draggable

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let origX = 0;
let origY = 0;

dragBar.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  // Get current position in pixels and parse to int
  origX = parseInt(overlay.style.left || overlay.style.right || 0);
  origY = parseInt(overlay.style.top || 0);
  
  // To allow dragging, fix position to 'fixed' and set left and top explicitly
  if (!overlay.style.left) {
    // Convert right to left for consistent positioning
    const rightVal = parseInt(overlay.style.right || 10);
    overlay.style.left = (window.innerWidth - rightVal - overlay.offsetWidth) + 'px';
    overlay.style.right = 'auto';
    origX = parseInt(overlay.style.left);
  }
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;

  // Calculate new position
  let newLeft = origX + dx;
  let newTop = origY + dy;

  // Constrain inside viewport horizontally
  const maxLeft = window.innerWidth - overlay.offsetWidth;
  if (newLeft < 0) newLeft = 0;
  else if (newLeft > maxLeft) newLeft = maxLeft;

  // Constrain inside viewport vertically
  const maxTop = window.innerHeight - overlay.offsetHeight;
  if (newTop < 0) newTop = 0;
  else if (newTop > maxTop) newTop = maxTop;

  overlay.style.left = newLeft + 'px';
  overlay.style.top = newTop + 'px';
  overlay.style.right = 'auto';
});

window.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
  }
});

let currentMode = 'auto'; // 'auto' or 'hold'
let settingHoldKey = false;
let holdScrolling = false;

// Switch modes
modeToggleBtn.addEventListener('click', (e) => {
  e.currentTarget.blur();
  currentMode = currentMode === 'auto' ? 'hold' : 'auto';
  modeToggleBtn.innerText = currentMode === 'auto' ? 'Switch to Hold Mode' : 'Switch to Auto Mode';
  // Toggle visibility
  factorLabel.style.display = 
    factorSlider.style.display =
    factorValue.style.display = 
    startStopBtn.style.display = statusText.style.display =
    currentMode === 'auto' ? 'block' : 'none';
  holdControls.style.display = currentMode === 'hold' ? 'block' : 'none';
  stopAutoScroll('Switched Mode');
});

holdKeyDisplay.addEventListener('click', (e) => {
  e.currentTarget.blur();
  settingHoldKey = true;
  holdKeyDisplay.innerText = 'Press any key...';
});

