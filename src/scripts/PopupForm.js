import {Popup} from "./Popup";
export class PopupForm extends Popup {
	constructor(view, validation) {
		super(view);
		this._form = view.querySelector('form');
		this.validation = validation(this._form);
	}
	open() {
		super.open();
		this.validation.setSubmitButtonState();
	}
	close() {
		super.close();
		this.resetForm();
		this.validation.resetErrors();
	}
	resetForm() {
		this._form.reset();
	}
	setInputsValue(data) {
		this._form.name.value = data.name;
		this._form.job.value = data.about;
	}
}