const option1 = document.querySelector('.option1');
	  option2 = document.querySelector('.option2');
	  option3 = document.querySelector('.option3');
	  option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question');
	  numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion;
	indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer');
	  numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');
	  btnTryAgain = document.getElementById('btn-try-again');

const questions = [
	{
		question: 'Что такое домен?',
		options: [
			'Элемент вычислительной машины',
			'Часть адреса сайта, запись в базе данных',
			'Человек, занимающийся продажей адресов для сайтов',
			'Услуга по предоставлению ресурсов для размещения информации на сервере',
		],
		rightAnswer: 1 
	},
	{
		question: 'Что такое регистратор доменов?',
		options: [
			'Человек, оказывающий услуги помощи выбора наиболее подходящего доменного имени для личного сайта или компании',
			'Программа, с помощью которой можно смотреть свободные доменные имена',
			'Организация, регистрирующая доменные имена, обеспечивающая передачу в Реестр необходимой информации о домене и его администраторе и осуществляющая поддержку домена',
			'Система доменных имён, база данных',
		],
		rightAnswer: 2 
	},
	{
		question: 'Что такое домейнер?',
		options: [
			'Человек, который занимается поиском, анализом, покупкой и продажей доменных имен',
			'Человек, который регистрирует доменные имена известных компаний и предлагает их выкупать для собственной выгоды',
			'Программа, генерирующая красивое доменное имя для личного сайта или сайта компании',
			'База данных, в которой хранятся все зарегистрированные доменные имена',
		],
		rightAnswer: 0 
	},
	{
		question: 'Что такое хостинг?',
		options: [
			'Блокировка небезопасных сайтов',
			'Проверка недавно зарегистрированных доменов',
			'Услуга размещения информации на каком – либо сервере',
			'Услуга по предоставлению ресурсов для размещения информации на сервере',
		],
		rightAnswer: 3 
	},
	{
		question: 'Какая главная обязанность хостинг – провайдера?',
		options: [
			'Обеспечение доступности и быстродействия сайта',
			'Недопущение появления сторонней рекламы на сайте',
			'Обеспечение дисковым пространством для размещения сайта в Сети',
			'Обеспечение несколькими серверами, которые заменяют друг друга в случае увеличения нагрузки на один из них',
		],
		rightAnswer: 0 
	},
	{
		question: 'Что такое доменный брокер?',
		options: [
			'Услуга по организации сделок купли-продажи доменных имен на вторичном рынке, осуществляемая, если доменное имя, которое вам нужно, ещё свободно',
			'Услуга по организации сделок купли-продажи доменных имен на вторичном рынке, осуществляемая, если доменное имя, которое вам нужно, уже кем-то занято',
			'Человек, который хочет приобрести уже кем-то занятое доменное имя',
			'Человек, который только что приобрёл ранее кем-то занятое доменное имя',
		],
		rightAnswer: 1 
	},
	{
		question: 'Когда домен можно назвать освобождающимся?',
		options: [
			'Истёк срок регистрации, закончился период преимущественного продления',
			'Истёк срок регистрации, но находится в периоде преимущественного продления',
			'Истекает срок регистрации, ещё не находится в периоде преимущественного продления',
			'Администратор отказался от владения данным доменным именем',
		],
		rightAnswer: 1 
	},
	{
		question: 'Чем занимается ISP (Internet Service Provider)?',
		options: [
			'Регистрацией доменов',
			'Покупкой доменов',
			'Предоставляет доступ к сети Интернет и связанные с этим услуги',
			'Ограничивает доступ к небезопасным сайтам',
		],
		rightAnswer: 2 
	},
	{
		question: 'Для чего киберсквоттеры регистрируют доменные имена, содержащие торговую марку, принадлежащую другому лицу?',
		options: [
			'Для дальнейшей перепродажи или недобросовестного использования',
			'Сотрудники фирмы, отвечающие за сайт компании, быстрее регистрируют доменное имя, чтобы его никто не занял',
			'Регистрация произошла по ошибке',
			'Требуют от лица, желающего владеть этим доменом, плату за освобождение',
		],
		rightAnswer: 0 
	},
	{
		question: 'Чем доменное имя отличается от домена?',
		options: [
			'Разницы нет, это синонимы',
			'Домен - это полный адрес сайта, а доменное имя - его часть',
			'Доменное имя - это полный адрес сайта, а домен - его часть',
			'Доменное имя никак не связано с доменом',
		],
		rightAnswer: 2 
	}
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
	question.innerHTML = questions[indexOfQuestion].question;

	option1.innerHTML = questions[indexOfQuestion].options[0];
	option2.innerHTML = questions[indexOfQuestion].options[1];
	option3.innerHTML = questions[indexOfQuestion].options[2];
	option4.innerHTML = questions[indexOfQuestion].options[3];

	numberOfQuestion.innerHTML = indexOfPage + 1;
	indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDublicate = false;
	if(indexOfPage == questions.length){
		quizOver();
	} else {
		if(completedAnswers.length > 0){
			completedAnswers.forEach(item => {
				if(item == randomNumber){
					hitDublicate = true;
				};
			});
			if(hitDublicate){
				randomQuestion();
			} else {
				indexOfQuestion = randomNumber;
				load();
			}
		}
		if(completedAnswers.length == 0){
			indexOfQuestion = randomNumber;
			load();
		}
	}
	completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
	if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
		el.target.classList.add('correct');
		updateAnswerTracker('correct');
		score++;
	} else {
		el.target.classList.add('wrong');
		updateAnswerTracker('wrong');
	}
	disabledOptions();
};

for(option of optionElements){
	option.addEventListener('click',e => checkAnswer(e));
};

const disabledOptions = () => {
	optionElements.forEach(item => {
		item.classList.add('disabled');
		if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
			item.classList.add('correct')
		}
	})
};

const enabledOptions = () => {
	optionElements.forEach(item => {
		item.classList.remove('disabled', 'correct', 'wrong');
	});
};

const validate = () => {
	if(!optionElements[0].classList.contains('disabled')){
		alert('Вам нужно выбрать один из вариантов ответа')
	} else {
		randomQuestion();
		enabledOptions();
	}
};

btnNext.addEventListener('click', () => {
	validate();
});

const answerTracker = () => {
	questions.forEach(() => {
		const div = document.createElement('div');
		answersTracker.appendChild(div);
	});
};

const updateAnswerTracker = status => {
	answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
};

const quizOver = () => {
	document.querySelector('.quiz-over-modal').classList.add('active');
	correctAnswer.innerHTML = score;
	numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
	window.location.reload();
};

btnTryAgain.addEventListener('click',tryAgain);

window.addEventListener('load', () => {
 	randomQuestion();
 	answerTracker();
});


