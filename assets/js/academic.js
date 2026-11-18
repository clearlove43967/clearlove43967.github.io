'use strict';

// All content remains available when JavaScript is disabled.
function setupFilter(buttonSelector, cardSelector, attribute) {
  const buttons = [...document.querySelectorAll(buttonSelector)];
  const cards = [...document.querySelectorAll(cardSelector)];
  buttons.forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.filter || button.dataset.photoFilter;
    buttons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    cards.forEach(card => {
      card.hidden = value !== 'all' && card.dataset[attribute] !== value;
      if (!card.hidden) count++;
    });
    const status = document.querySelector('.filter-status');
    if (status) status.textContent = `${count} ${cardSelector === '[data-publication]' ? 'publications' : 'photographs'} shown.`;
  }));
}
setupFilter('[data-filter]', '[data-publication]', 'kind');
setupFilter('[data-photo-filter]', '[data-photo-card]', 'category');

const copyButton = document.querySelector('[data-copy-citation]');
if (copyButton) copyButton.addEventListener('click', async () => {
  const citation = document.getElementById('bibtex');
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(citation.textContent.trim());
    status.textContent = 'BibTeX copied to clipboard.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citation);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C (or Command+C) to copy.';
  }
});

const lightbox = document.querySelector('.lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const links = [...document.querySelectorAll('[data-photo-open]')];
  let activeLinks = [], currentIndex = 0, returnFocus = null;
  const showPhoto = index => {
    currentIndex = (index + activeLinks.length) % activeLinks.length;
    const link = activeLinks[currentIndex];
    const image = lightbox.querySelector('.lightbox-image');
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    lightbox.querySelector('#lightbox-title').textContent = link.dataset.title;
    lightbox.querySelector('.lightbox-caption').textContent = link.dataset.caption;
    lightbox.querySelector('.lightbox-position').textContent = `${currentIndex + 1} / ${activeLinks.length}`;
    lightbox.querySelectorAll('[data-photo-prev], [data-photo-next]').forEach(button => button.disabled = activeLinks.length < 2);
  };
  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    returnFocus = link;
    activeLinks = links.filter(item => !item.closest('[data-photo-card]').hidden);
    showPhoto(activeLinks.indexOf(link));
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
  }));
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('[data-photo-prev]').addEventListener('click', () => showPhoto(currentIndex - 1));
  lightbox.querySelector('[data-photo-next]').addEventListener('click', () => showPhoto(currentIndex + 1));
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(currentIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  lightbox.addEventListener('click', event => {
    const bounds = lightbox.getBoundingClientRect();
    if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (returnFocus) returnFocus.focus();
  });
}
