export class CardList {
	constructor(container, cards = [], createCard) {
		this._container = container;
		this.cards = cards;
		this.createCard = createCard;
	}
	render(userId) {
		this.cards.forEach(card => {
			this.addCard(card, userId);
		});
	}
	addCard(card, userId) {
		this._container.appendChild(this.createCard(card, userId));
	}
}