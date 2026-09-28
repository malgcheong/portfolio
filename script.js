// Progressive enhancement: all case-study content remains accessible without JS.
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
  document.querySelectorAll('.project-title, .analysis-heading, .migration, .about').forEach(el => observer.observe(el));
}
