const divs = document.querySelectorAll('#parent div');
let dragged = null;

divs.forEach((div) => {
  div.addEventListener('dragstart', (e) => {
    dragged = e.target.querySelector('img'); // pick the img inside
    e.target.classList.add('selected');
  });

  div.addEventListener('dragend', (e) => {
    e.target.classList.remove('selected');
  });

  div.addEventListener('dragover', (e) => e.preventDefault());

  div.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!dragged) return;
    const targetImg = e.target.querySelector('img');
    if (!targetImg || dragged === targetImg) return;

    // Swap the src attributes
    const temp = dragged.src;
    dragged.src = targetImg.src;
    targetImg.src = temp;
  });
});
