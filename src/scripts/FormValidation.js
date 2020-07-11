class FormValidation {
	constructor(form) {
		this.form = form;
		this.inputs = Array.from(this.form.querySelectorAll('input'));

		this.submitButton = this.form.querySelector('button');
		this.setEventListeners();
	}
	isValid(input) {
		input.setCustomValidity("");

		if (input.validity.valueMissing) {
			input.setCustomValidity("Это обязательное поле");
			return false;
		}

		if (input.validity.tooShort || input.validity.tooLong) {
			input.setCustomValidity("Должно быть от 2 до 30 символов");
			return false;
		}
		if (input.validity.typeMismatch && input.type === 'url') {
			input.setCustomValidity("Здесь должна быть ссылка");
		}

		return input.checkValidity();
	}

	setSubmitButtonState() {
		let isValidFrom = this.inputs.every(this.isValid)
		if (isValidFrom) {
			this.submitButton.removeAttribute('disabled');
			this.submitButton.classList.add('popup__button_active');
		}
		else {
			this.submitButton.classList.remove('popup__button_active');
			this.submitButton.setAttribute('disabled', true);
		}
	}

	checkFieldValid(input) {
		const errorElem = this.form.querySelector(`#error-${input.id}`);
		this.isValid(input);
		errorElem.textContent = input.validationMessage;
	}
	resetErrors() {
		const errorElem = Array.from(this.form.querySelectorAll('.popup__error'));
		errorElem.forEach(elem => {
			elem.textContent = "";
		})
	}
	setEventListeners() {
		this.form.addEventListener('input', (event) => {
			this.checkFieldValid(event.target);
			this.setSubmitButtonState();
		});
	}
}