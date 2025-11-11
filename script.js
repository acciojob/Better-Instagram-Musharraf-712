//your code here
const divs = document.querySelectorAll('#parent div');
let dragged = null;

divs.forEach((div) =>{
	div.addEventListener('dragstsrt', (e) => {
		dragged = e.target;
		e.target.classList.add('selected');
	})

	div.addEventListener('dragend',(e) => {
		e.target.classList.remove('selected');
	})
	
	div.addEventListener('dragover',(delt)=>{
		delt.preventDefault();
	})

	div.addEventListener('drop',(delt)=>{
		delt.preventDefault();
		if(dragged === delt.target) return;

		const temp = dragged.style.bckgroundImage;
		dragged.style.backgroundImage = delt.target.style.backgroundImage;
		delt.target.style.backgroundImage = temp
	})
})