var __QUIZ = {
	'intro' : {
		'title' : 'Temukan Produk Eteris Sesuai Kebutuhanmu!',
		'text' : '',
	},
    'questionnaire': {
        'currentQuestion': 0,
        'numberOfQuestions': 4,
        'questions': {
            '1': {
                'question': 'Apa yang sedang kamu butuhkan?',
                'choices': {
                    '1': {
                        'text': 'Penolak nyamuk',
                        'score': [1, 0, 0, 0, 0]
                    },
                    '2': {
                        'text': 'Mengurangi rasa gatal pada kulit',
                        'score': [0, 1, 0, 0, 0]
                    },
                    '3': {
                        'text': 'Memperbaiki kualitas tidur',
                        'score': [0, 0, 0, 1, 0]
                    },
                    '4': {
                        'text': 'Alasan kesehatan lainnya',
                        'score': [0, 0, 0, 0, 1]
                    },
                    '5': {
                        'text': 'Anti-aging',
                        'score': [0, 0, 1, 0, 0]
                    }
                }
            },
            '2': {
                'question': 'Material apa yang menjadi preferensi anda?',
                'choices': {
                    '1': {
                        'text': 'Lembab untuk kulit di muka',
                        'score': [0, 0, 1, 0, 0]
                    },
                    '2': {
                        'text': 'Kental seperti lotion',
                        'score': [0, 1, 0, 0, 0]
                    },
                    '3': {
                        'text': 'Dapat dituang ke Humidifier menjadi Uap',
                        'score': [0, 0, 0, 1, 0]
                    },
                    '4': {
                        'text': 'Cair dan bisa dispray',
                        'score': [1, 0, 0, 0, 0]
                    }
                }
            },
            '3': {
                'question': 'Wenn Sie sich für eine Maßnahme entscheiden müssten…',
                'choices': {
                    '1': {
                        'text': 'Kental seperti lotion',
                        'score': [0, 1, 0, 0, 0]
                    },
                    '2': {
                        'text': 'Mencegah Penuaan',
                        'score': [0, 0, 1, 0, 0]
                    },
                    '3': {
                        'text': 'Padat dan berbentuk pil ',
                        'score': [0, 0, 0, 0, 1]
                    }
                }
            },
            '4': {
                'question': 'Wo sehen Sie für sich selbst wichtiges Optimierungspotential?',
                'choices': {
                    '1': {
                        'text': 'Cair dan bisa dispray',
                        'score': [1, 0, 0, 0, 0]
                    },
                    '2': {
                        'text': 'Dapat Tidur Nyenyak',
                        'score': [0, 0, 0, 1, 0]
                    },
                    '3': {
                        'text': 'Mudah ditelan dan mudah dicerna',
                        'score': [0, 0, 0, 0, 1]
                    }
                }
            }
        }
    },
    'results': {
        'numberOfTypes': 5,
        'questionScore': [],
        'finalScore': [0, 0, 0, 0, 0],
        'types': {
            '1': {
                'name': 'Spray',
                'text': 'Penolak nyamuk yang harum!',
            },
            '2': {
                'name': 'Lotion',
                'text': 'Melembabkan kulit, mengurangi gatal, dapat dibawa kemana saja!',
            },
            '3': {
                'name': 'Aromaterapi',
                'text': 'Harum dan menenangkan pikiran untuk tidur.',
            },
            '4': {
                'name': 'Obat Herbal',
                'text': 'Menjaga kesehatan dari penyakit.',
            },
            '5': {
                'name': 'Serum Anti-aging',
                'text': 'Sacha-Inchi si penyelamaat penuaan.',
            }
        }
    }
};

function QUIZElement(id) {
	return document.getElementById(id);
}

function QUIZDoSomething(question, choice) {
	if(QUIZElement('quiz_next').disabled) {
		QUIZElement('quiz_next').disabled = false;
	}

	__QUIZ.results.questionScore = __QUIZ.questionnaire.questions[question].choices[choice].score;
}

function QUIZNext() {
	if(__QUIZ.questionnaire.currentQuestion === __QUIZ.questionnaire.numberOfQuestions) {
		var characterType = __QUIZ.results.finalScore.indexOf(Math.max(...__QUIZ.results.finalScore)) + 1;
		var resultHTML = '<h3>' + __QUIZ.results.types[characterType].name + '</h3>' + '<p>' + __QUIZ.results.types[characterType].text + '</p>';
		QUIZElement('quiz_result').innerHTML = resultHTML;
	}
	else {
		for(var i = 0; i < __QUIZ.results.questionScore.length; i++) {
			__QUIZ.results.finalScore[i] += __QUIZ.results.questionScore[i];
		}
		__QUIZ.questionnaire.currentQuestion += 1;
		QUIZShowChoices();
		QUIZElement('quiz_next').disabled = true;
	}
}

function QUIZShowChoices() {
	var question = __QUIZ.questionnaire.currentQuestion;
	var choices = '';
	var choice = 1;

	if(question != 0) {
		QUIZElement('quiz_text').innerText = '';
		QUIZElement('quiz_question').innerText = __QUIZ.questionnaire.questions[question].question;
	
		do {
			choices += '<li><label><input type="radio" name="block" onclick="QUIZDoSomething(' + question + ', ' + choice + ')"><span>' + __QUIZ.questionnaire.questions[question].choices[choice].text + '</span></label></li>';
			choice++;
		} while(typeof __QUIZ.questionnaire.questions[question].choices[choice] != 'undefined')

			QUIZElement('quiz_choices').innerHTML = choices;

		if(question < __QUIZ.questionnaire.numberOfQuestions) {
			QUIZElement('quiz_next').innerText = 'Selanjutnya';
		}
		else {
			QUIZElement('quiz_next').innerText = 'Lihat Hasil';
		}
	}
	else {
		QUIZElement('quiz_question').innerText = __QUIZ.intro.title;
		QUIZElement('quiz_text').innerText = __QUIZ.intro.text;
		QUIZElement('quiz_next').innerText = 'Ikuti Quiz!';
	}
}

QUIZShowChoices();