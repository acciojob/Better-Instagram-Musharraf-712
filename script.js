// Works with your existing HTML/CSS:
// - Six divs with ids: drag1..drag6, each has background-image in CSS
// - No <img> tags used; swap background-image between divs

const tiles = document.querySelectorAll('#parent .image');

// Track the source being dragged
let dragSourceId = null;

function getBg(el) {
  // Computed style returns values like: url("...") or none
  return getComputedStyle(el).backgroundImage;
}

function setBg(el, value) {
  el.style.backgroundImage = value;
}

tiles.forEach(tile => {
  tile.addEventListener('dragstart', (e) => {
    dragSourceId = e.currentTarget.id;
    e.currentTarget.classList.add('selected');

    // Provide data for HTML5 DnD and test frameworks
    // Use source id so the drop handler can find the origin
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', dragSourceId);
      // Optional: customize drag image if desired
      // e.dataTransfer.setDragImage(e.currentTarget, 10, 10);
    }
  });

  tile.addEventListener('dragend', (e) => {
    e.currentTarget.classList.remove('selected');
    document.querySelectorAll('.drop-target').forEach(t => t.classList.remove('drop-target'));
    dragSourceId = null;
  });

  // Allow dropping
  tile.addEventListener('dragover', (e) => {
    e.preventDefault(); // required by spec to enable drop
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

    // Retrieve the source id from DataTransfer, fall back to in-memory
    const sourceId = (e.dataTransfer && e.dataTransfer.getData('text/plain')) || dragSourceId;
    if (!sourceId) return;
    if (sourceId === target.id) return; // no-op when dropping on itself

    const sourceEl = document.getElementById(sourceId);
    if (!sourceEl) return;
div4
    // Swap background images between the two divs
    const srcBg = getBg(sourceEl);
    const tgtBg = getBg(target);

    setBg(sourceEl, tgtBg);
    setBg(target, srcBg);

    // Cleanup styles
    sourceEl.classList.remove('selected');
    target.classList.remove('drop-target');
    dragSourceId = null;
  });
});
