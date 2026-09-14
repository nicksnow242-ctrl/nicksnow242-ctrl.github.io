// 1. Define all the data for our images
// (Notice the keys 1, 2, 3 match the ?id=1, ?id=2 from the gallery links)
const imageData = {
    1: {
        src: "https://picsum.photos/id/1015/1200/800",
        title: "River and Mountains",
        desc: "A beautiful, winding river flowing through a lush mountain valley."
    },
    2: {
        src: "https://picsum.photos/id/1016/1200/800",
        title: "Snowy Peaks",
        desc: "Towering mountains covered in fresh, pristine snow under a clear sky."
    },
    3: {
        src: "https://picsum.photos/id/1018/1200/800",
        title: "Misty Forest",
        desc: "A dense, mysterious forest shrouded in early morning fog."
    },
    4: {
        src: "https://picsum.photos/id/1019/1200/800",
        title: "Ocean Waves",
        desc: "Powerful ocean waves crashing against a rocky shoreline."
    },
    5: {
        src: "https://picsum.photos/id/1022/1200/800",
        title: "Hidden Waterfall",
        desc: "A serene waterfall cascading down moss-covered rocks."
    },
    6: {
        src: "https://picsum.photos/id/1025/1200/800",
        title: "Curious Pup",
        desc: "An adorable dog looking curiously at the camera."
    }
};

// 2. Get the ID from the URL (e.g., ?id=3)
const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('id');

// 3. Update the page with the correct data
if (imageId && imageData[imageId]) {
    const data = imageData[imageId];

    // Find the HTML elements and update them
    document.getElementById('detail-image').src = data.src;
    document.getElementById('detail-image').alt = data.title;
    document.getElementById('detail-title').textContent = data.title;
    document.getElementById('detail-description').textContent = data.desc;

    // Update the browser tab title
    document.title = data.title + " | My Gallery";
} else {
    // Fallback if the ID is invalid or missing
    document.querySelector('.detail-container').innerHTML = "<h2>Image not found!</h2><p>Please go back and select a valid image.</p>";
}
(() => {
  const machine = document.querySelector('.ccm-11__machine');
  const wheel = machine.querySelector('.ccm-11__wheel');
  const stops = [...machine.querySelectorAll('.ccm-11__stop')];
  const current = machine.querySelector('.ccm-11__current');
  const live = machine.querySelector('.ccm-11__live');
  const n = stops.length, step = 360 / n;
  let rot = 0, active = 0;
  const setStopRot = () => stops.forEach((s) => s.style.rotate = (-rot) + 'deg');
  const goTo = (idx) => {
    idx = ((idx % n) + n) % n;
    const target = -idx * step;
    let delta = target - (((rot % 360) + 360) % 360 === 0 ? 0 : rot % 360);
    delta = ((delta % 360) + 540) % 360 - 180;
    rot += delta;
    wheel.style.setProperty('--rot', rot + 'deg');
    setStopRot();
    stops.forEach((s, k) => { s.classList.toggle('is-active', k === idx); s.setAttribute('aria-pressed', String(k === idx)); });
    active = idx;
    current.textContent = stops[idx].textContent;
    live.textContent = stops[idx].textContent + ' selected';
  };
  stops.forEach((s, k) => s.addEventListener('click', () => goTo(k)));
  machine.querySelector('.ccm-11__prev').addEventListener('click', () => goTo(active - 1));
  machine.querySelector('.ccm-11__next').addEventListener('click', () => goTo(active + 1));
})();
