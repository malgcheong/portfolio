// Progressive enhancement: all case-study content remains accessible without JS.
// Theme: default follows the system (CSS media query); a manual choice is stored
// and wins. JS resolves the effective theme onto <html data-theme> so the toggle
// icon and subsequent clicks are deterministic.
const root = document.documentElement;
const stored = localStorage.getItem('theme');
root.dataset.theme = stored || 'dark'; // dark is the site default; a stored choice wins
document.querySelector('#theme-toggle').addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});

const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#viewer-image');
const caption = document.querySelector('#image-caption');
const error = document.querySelector('#image-error');
let opener;
for (const button of document.querySelectorAll('[data-image]')) {
  button.addEventListener('click', () => {
    opener = button;
    caption.textContent = button.dataset.caption;
    viewerImage.alt = button.dataset.caption;
    error.hidden = true;
    viewerImage.hidden = false;
    viewerImage.src = button.dataset.image;
    viewer.showModal();
    document.body.classList.add('viewer-open');
  });
}
viewerImage.addEventListener('error', () => { error.hidden = false; viewerImage.hidden = true; });
document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  const r = viewer.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) viewer.close();
});
viewer.addEventListener('close', () => {
  document.body.classList.remove('viewer-open');
  opener?.focus();
});
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('enter');
      observer.unobserve(entry.target);
    }
  }, {threshold: .08});
  document.querySelectorAll('.project-title, .analysis-heading, .evo, .about').forEach(el => observer.observe(el));
}
