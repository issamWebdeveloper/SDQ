(() => {
  const dialog = document.createElement('dialog');
  if (typeof dialog.showModal !== 'function') return;

  dialog.id = 'diagram-zoom';
  dialog.className = 'diagram-zoom-dialog';
  dialog.innerHTML = `
    <div class="diagram-zoom-toolbar">
      <button type="button" class="diagram-zoom-button diagram-zoom-restore" autofocus></button>
    </div>
    <div class="diagram-zoom-canvas" tabindex="0"><img alt=""></div>
  `;
  document.body.append(dialog);
  document.documentElement.classList.add('diagram-zoom-enabled');

  const restore = dialog.querySelector('button');
  const canvas = dialog.querySelector('.diagram-zoom-canvas');
  const image = canvas.querySelector('img');
  let opener;

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-enlarge-diagram]');
    if (!button || dialog.open) return;

    const source = button.closest('.diagram-frame').querySelector('img');
    const backLabel = document.documentElement.lang === 'fr'
      ? 'Revenir à la taille normale'
      : 'Return to normal size';
    opener = button;
    dialog.setAttribute('aria-label', source.alt);
    restore.setAttribute('aria-label', backLabel);
    restore.title = backLabel;
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    image.width = Number(source.getAttribute('width'));
    image.height = Number(source.getAttribute('height'));

    dialog.showModal();
    canvas.scrollTo(0, 0);
  });

  restore.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    opener = undefined;
  });
})();
