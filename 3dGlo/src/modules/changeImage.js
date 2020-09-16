const changeImage = () => {
	const image = document.querySelectorAll(".command__photo");
	image.forEach((elem) => {
		const img = elem.src;
		elem.addEventListener("mouseenter", (e) => {
			e.target.src = e.target.dataset.img;
		});
		elem.addEventListener("mouseout", (e) => {
			e.target.src = img;
		});
	});
};
export default changeImage;