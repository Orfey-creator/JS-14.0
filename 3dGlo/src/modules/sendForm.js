	const sendForm = () => {
		const errorMessage = "Что то пошло не так...",
			loadMessage = "Загрузка...",
			successMessage = "Спасибо! Мы с вами свяжемся",
			form = document.getElementById("form1"),
			statusMessage = document.createElement("div");
		statusMessage.style.cssText = "font-size: 2rem";
		statusMessage.id = "stat-message";
		//форма вверху страницы
		document.querySelector('body').addEventListener("submit", (e) => {
			if (e.target.matches('#form1') || e.target.matches('#form2') || e.target.matches('#form3')) {
				if (e.target.matches('#form2')) {
					statusMessage.style.color = 'white';
				}
				e.preventDefault();
				e.target.append(statusMessage);
				statusMessage.textContent = loadMessage;
				const formData = new FormData(form);
				const body = {};
				formData.forEach((value, key) => {
					body[key] = value;
				});
				postData(body)
					.then((response) => {
						if (response.status !== 200) {
							throw new Error("status network not 200");
						}
						statusMessage.textContent = successMessage;
						clearForms();
					})
					.catch((error) => {
						statusMessage.textContent = errorMessage;
						console.error(error);
					});
			}

		});

		const postData = (body) => fetch("server.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
			credentials: 'include',
		});
		const clearForms = () => {
			const clear = document.querySelectorAll(".row>div>input");
			const clearModal = document.querySelectorAll("form>div>input");
			const clearAll = [...clear, ...clearModal];
			clearAll.forEach((elem) => {
				elem.value = "";
			});
			const statMessage = document.querySelector("#stat-message");
			setTimeout(() => {
				statMessage.parentNode.removeChild(statMessage);
			}, 3000);
		};
	};
	export default sendForm;