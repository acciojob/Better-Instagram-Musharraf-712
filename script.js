// Drag-and-drop that swaps the entire tiles (DOM nodes), not just images.
// Works with your existing HTML/CSS (ids drag1..drag6, class "image").

const tiles = document.querySelectorAll('#parent .image');
const parent = document.getElementById('parent');

let dragSourceId = null;

tiles.forEach(tile => {
  tile.addEventListener('dragstart', (e) => {
    dragSourceId = e.currentTarget.id;
    e.currentTarget.classList.add('selected');

    if (e.dataTransfer) {
      // identify the source element by id for the drop handler
      e.dataTransfer.setData('text/plain', dragSourceId);
      // optionally: e.dataTransfer.effectAllowed = 'move';
    }
  });

  tile.addEventListener('dragend', (e) => {
    e.currentTarget.classList.remove('selected');
    document.querySelectorAll('.drop-target').forEach(t => t.classList.remove('drop-target'));
    dragSourceId = null;
  });

  // Required so drop will fire
  tile.addEventListener('dragover', (e) => {
    e.preventDefault();
    // optionally: e.dataTransfer.dropEffect = 'move';
  });

  tile.addEventListener('dragenter', (e) => {
    if (e.currentTarget.id !== dragSourceId) {
      e.currentTarget.classList.add('drop-target');
    }
  });

  tile.addEventListener('dragleave', (e) => {
    e.currentTarget.classList.remove('drop-target');
  });

  tile.addEventListener('drop', (e) => {
    e.preventDefault();

    const target = e.currentTarget;
    const sourceId = (e.dataTransfer && e.dataTransfer.getData('text/plain')) || dragSourceId;
    if (!sourceId || sourceId === target.id) return;

    const sourceEl = document.getElementById(sourceId);
    if (!sourceEl || !sourceEl.parentNode || !target.parentNode) return;

    // Swap the two nodes in the DOM
    // Technique: insert a temporary placeholder, then move nodes around it.
    const placeholder = document.createElement('div');
    placeholder.style.display = 'none';

    const sourceParent = sourceEl.parentNode;
    const targetParent = target.parentNode;

    // Insert placeholder where the source is
    sourceParent.insertBefore(placeholder, sourceEl);

    // Move source to target's position
    targetParent.insertBefore(sourceEl, target);

    // Move target to placeholder's original position
    sourceParent.insertBefore(target, placeholder);

    // Remove placeholder
    placeholder.remove();

    // Cleanup styles
    sourceEl.classList.remove('selected');
    target.classList.remove('drop-target');
    dragSourceId = null;
  });
});
