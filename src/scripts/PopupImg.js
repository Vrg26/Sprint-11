import {Popup} from "./Popup";
export class PopupImg extends Popup {
	open(url) {
		super.open();
		this._view.querySelector('.popup__img').setAttribute('src', url);
	}
}