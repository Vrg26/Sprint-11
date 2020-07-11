class Api {
	constructor(config) {
		this.url = config.url;
		this.headers = config.headers;
	}
	getCards() {
		return fetch(this.url + 'cards', {
			headers: this.headers
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}

				return Promise.reject(res.status);
			})
	}
	addCard(card) {
		return fetch(this.url + 'cards', {
			headers: this.headers,
			method: 'POST',
			body: JSON.stringify(card)
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(res.status);
		}
		);
	}
	putLikeCard(id) {
		return fetch(this.url + 'cards/like/' + id, {
			headers: this.headers,
			method: 'PUT'
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(res.status);
			})
	}
	deleteLikeCard(id) {
		return fetch(this.url + 'cards/like/' + id, {
			headers: this.headers,
			method: 'DELETE'
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(res.status);
			})
	}
	deleteCard(id) {
		return fetch(this.url + 'cards/' + id, {
			headers: this.headers,
			method: 'DELETE',
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(res.status);
			})
	}
	getUserInfo() {
		return fetch(this.url + 'users/me', {
			headers: this.headers
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(res.status);
			})
	}
	updateAvatar(avatar) {
		return fetch(this.url + 'users/me/avatar', {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify(avatar)
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(res.status);
			})
	}

	setUserInfo(userInfo) {
		return fetch(this.url + 'users/me', {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify(userInfo)
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(res.status);
			})
	}

}