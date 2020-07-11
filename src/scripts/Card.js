class Card {
	static templateCard = document.querySelector('#mainCard');

	constructor(objCard, openCard, api) {
		this.likes = objCard.likes;
		this.name = objCard.name;
		this.link = objCard.link;
		this.id = objCard._id;
		this.owner = objCard.owner;
		this.openCard = openCard;
		this.api = api;
		this.remove = this.remove.bind(this);
		this.Like = this.Like.bind(this);
	}
	create(userId) {
		const divPlaceCard = document.createElement('div');

		divPlaceCard.classList.add('place-card');
		divPlaceCard.append(Card.templateCard.content.cloneNode(true));

		divPlaceCard.querySelector('.place-card__image').style.backgroundImage = `url("${this.link}")`;
		divPlaceCard.querySelector('.place-card__name').textContent = this.name;
		divPlaceCard.querySelector('.place-card__like-count').textContent = this.likes.length;
		if (this.isIOwnerCard(userId)) {
			divPlaceCard.querySelector('.place-card__delete-icon').classList.add('place-card__delete-icon_show');
		}
		if (this.isMyLike(userId)) {
			divPlaceCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
		}
		this.cardElement = divPlaceCard;
		this.setEventListeners();
		return this.cardElement;
	}
	setEventListeners() {
		this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.Like);
		this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
		this.cardElement.querySelector('.place-card__image').addEventListener('click', event => {
			if (event.target.classList.contains('place-card__image')) {
				this.openCard(this.link);
			}
		});
	}
	isIOwnerCard(userId) {
		return this.owner._id === userId
	}
	isMyLike(userId) {
		return !this.likes.every(item => item._id != userId);
	}
	Like(event) {
		if (!event.target.classList.contains('place-card__like-icon_liked')) {
			this.cardElement.querySelector('.place-card__like-count').textContent = this.likes.length + 1;
			this.api.putLikeCard(this.id)
				.then((res) => {
					this.cardElement.querySelector('.place-card__like-count').textContent = res.likes.length
				});
			event.target.classList.add('place-card__like-icon_liked');
		}
		else {
			this.cardElement.querySelector('.place-card__like-count').textContent = this.likes.length;
			this.api.deleteLikeCard(this.id)
				.then((res) => {
					this.cardElement.querySelector('.place-card__like-count').textContent = res.likes.length
				});
			event.target.classList.remove('place-card__like-icon_liked');
		}
	}
	remove() {
		if (confirm('Вы действительно хотите удалить эту карточку?')) {
			this.api.deleteCard(this.id)
				.catch(err => console.error(err));
			this.cardElement.remove();
		}
	}
}