export class UserInfo {
	constructor(view, api) {
		this._view = view;
		this.api = api;
	}
	setUserInfo(user) {
		this._nameData = user.name;
		this._jobData = user.about;
		this._avatar = user.avatar;
		this.id = user._id;
	}
	getData() {
		return {
			name: this._nameData,
			about: this._jobData
		}
	}
	update() {
		this._view.querySelector('.user-info__photo').style.backgroundImage = `url(${this._avatar})`;
		this._view.querySelector('.user-info__name').textContent = this._nameData;
		this._view.querySelector('.user-info__job').textContent = this._jobData;
	}
}