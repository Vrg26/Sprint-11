(function () {

	const config = {
		url: 'https://praktikum.tk/cohort11/',
		headers: {
			'Content-Type': 'application/json',
			authorization: 'a2fd7302-7b4b-499b-93f5-25da135b9008'
		}
	}

	const root = document.querySelector('.root');

	const openPopupNewPlaceButton = root.querySelector('.user-info__button');
	const openPopupEditProfileButton = root.querySelector('.user-info__edit-button');
	const openPopupChangeAvatarButton = root.querySelector('.user-info__photo');

	const formAdd = root.querySelector('#add-place-form');
	const formEdit = root.querySelector('#edit-profile-form');
	const formAvatar = root.querySelector('#avatar-popup-form');
	const popupEdit = new PopupForm(root.querySelector('#edit-profile-popup'), createValidation);
	const popupAdd = new PopupForm(root.querySelector('#add-place-popup'), createValidation);
	const popupAvatar = new PopupForm(root.querySelector('#avatar-popup'), createValidation);
	const popupImg = new PopupImg(root.querySelector('#popup-img'));

	const placesList = new CardList(root.querySelector('.places-list'), [], createCard);
	const api = new Api(config);
	const userInfo = new UserInfo(root.querySelector('.user-info'), api);

	api.getUserInfo().then(res => {
		userInfo.setUserInfo(res);
	})
		.then(() => {
			userInfo.update();
		})
		.catch((err) => console.log(err));

	function createCard(objCard, userId) {
		return new Card(objCard, popupImg.open, api).create(userId);
	}
	api.getCards().then(res => {
		placesList.cards = res;
		placesList.render(userInfo.id);
	});

	function createValidation(...arg) {
		return new FormValidation(...arg);
	}
	openPopupChangeAvatarButton.addEventListener('click', () => {
		popupAvatar.open();
		popupAvatar.resetForm();
	})
	openPopupNewPlaceButton.addEventListener('click', () => {
		popupAdd.open();
		popupAdd.resetForm();
	});

	openPopupEditProfileButton.addEventListener('click', () => {
		popupEdit.setInputsValue(userInfo.getData());
		popupEdit.open();
	});

	formAvatar.addEventListener('submit', event => {
		event.preventDefault();
		const avatar = {
			avatar: event.target.link.value
		}
		api.updateAvatar(avatar)
			.then(res => userInfo.setUserInfo(res))
			.then(() => userInfo.update())
			.then(() => popupAvatar.close())
			.catch(err => console.log(err));
	});

	formAdd.addEventListener('submit', event => {
		event.preventDefault();
		formAdd.querySelector('.button').textContent = "Загрузка..."
		formAdd.querySelector('.button').classList.add('popup__button_font-size_s');
		const card = {
			name: event.target.name.value,
			link: event.target.link.value,
		};
		api.addCard(card).then(
			res => {
				placesList.addCard(res, userInfo.id);
				popupAdd.close();
				popupAdd.resetForm();
			}
		)
			.catch((err) => console.error(err))
			.finally(() => {
				formAdd.querySelector('.button').textContent = '+';
				formAdd.querySelector('.button').classList.remove('popup__button_font-size_s');
			});
	});

	formEdit.addEventListener('submit', event => {
		event.preventDefault();
		formEdit.querySelector('.button').textContent = "Загрузка..."
		const newUserInfo = {
			name: event.target.name.value,
			about: event.target.job.value
		}
		api.setUserInfo(newUserInfo)
			.then(res => {
				userInfo.setUserInfo(res);
				popupEdit.close();
			})
			.then(() => {
				userInfo.update();
			})
			.catch(err => console.error(err))
			.finally(() => formEdit.querySelector('.button').textContent = "Сохранить")
	});
})();



/*REVIEW. Резюме.

Взаимодействие с сервером осуществляется.

Нужны некоторые корректировки.


Что нужно исправить.

1. Нужно немного преобразовать структуру методов класса Api (подробный комментарий и образец в файле класса Api).

2. Нужно убрать лишнее обращение к серверу после вызовa api.setUserInfo (подробный комментарий в этом файле).

3. Не вижу обработки ссылки на аватар и занесения её в элемент страницы при запросе на сервер из метода api.setUserInfo
после загрузки страницы. Нужно выполнить полностью пункт "1. Загрузка информации о пользователе с сервера" в описании задания.

4. Нужно устранить дублирование кода (подробный комментарий в этом файле в слушателе сабмита формы карточки).

_________________________________________________________________________________________________________________________________

REVIEW2. Резюме2.

Критические неточности оперативно исправлены.

Задание принимается.

Желаю творческих успехов и отличной учёбы!




*/