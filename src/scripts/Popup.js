class Popup {
	constructor(view) {
		this._view = view;

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.setEventListeners();
	}
	open() {
		this._view.classList.add('popup_is-opened');
	}
	close() {
		this._view.classList.remove('popup_is-opened');
	}
	setEventListeners() {
		this._view.querySelector(".popup__close").addEventListener("click", this.close);
	}
}