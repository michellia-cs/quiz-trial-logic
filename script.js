var __QUIZ = {
	'intro' : {
		'title' : 'Temukan kombinasi produk Eteris yang cocok untukmu!',
		'text' : '',
	},
    'questionnaire': {
        'currentQuestion': 0,
        'numberOfQuestions': 5,
        'questions': {
            '1': {
                'question': 'Dimana anda sering beraktivitas?',
                'choices': {
                    '1': {
                        'text': 'Luar ruangan',
                        'score': [1, 0, 0, 0, 0]
                    },
                    '2': {
                        'text': 'Seimbang di dalam maupun luar ruangan',
                        'score': [0, 1, 0, 0, 0]
                    },
                    '3': {
                        'text': 'Dalam ruangan',
                        'score': [0, 0, 0, 1, 0]
                    },
                    '4': {
                        'text': 'Tidak menentu',
                        'score': [0, 0, 0, 0, 1]
                    }
                }
            },
            '2': {
                'question': 'Berapa lama anda tidur dalam sehari?',
                'choices': {
                    '1': {
                        'text': 'Kurang dari 6 jam',
                        'score': [1, 0, 0, 0, 0]
                    },
                    '2': {
                        'text': '6 - 7 jam',
                        'score': [0, 1, 0, 0, 0]
                    },
                    '3': {
                        'text': '8 jam',
                        'score': [0, 0, 0, 1, 0]
                    },
                    '4': {
                        'text': 'Lebih dari 8 jam',
                        'score': [0, 0, 0, 0, 1]
                    },
                }
            },
            '3': {
                'question': 'Suasana apa yang anda sukai?',
                'choices': {
                    '1': {
                        'text': 'Tenang di dalam kamar',
                        'score': [1, 0, 0, 0, 0]
                    },
                    '2': {
                        'text': 'Suatu acara bersama teman maupun keluarga',
                        'score': [0, 1, 0, 0, 0]
                    },
                    '3': {
                        'text': 'Lingkungan alam',
                        'score': [0, 0, 0, 1, 0]
                    },
                    '4': {
                        'text': 'Rumah yang nyaman',
                        'score': [0, 0, 0, 0, 1]
                    },
                }
            },
            '4': {
                'question': 'Apa yang sedang anda butuhkan?',
                'choices': {
                    '1': {
                        'text': 'Memperbaiki kualitas tidur',
                        'score': [1, 0, 0, 0, 0]
                    },
                    '2': {
                        'text': 'Memberi hadiah untuk orang terdekat',
                        'score': [0, 1, 0, 0, 0]
                    },
                    '3': {
                        'text': 'Menyehatkan kulit dan anti-aging',
                        'score': [0, 0, 0, 1, 0]
                    },
                    '4': {
                        'text': 'Terlindung dari nyamuk',
                        'score': [0, 0, 0, 0, 1]
                    },
                }
            },
            '5': {
                'question': 'Apa perasaan yang anda cari pada suatu produk?',
                'choices': {
                    '1': {
                        'text': 'Menenangkan',
                        'score': [1, 0, 0, 0, 0]
                    },
                    '2': {
                        'text': 'Membahagiakan',
                        'score': [0, 1, 0, 0, 0]
                    },
                    '3': {
                        'text': 'Menyehatkan',
                        'score': [0, 0, 0, 1, 0]
                    },
                    '4': {
                        'text': 'Melindungi',
                        'score': [0, 0, 0, 0, 1]
                    },
                }
            }
        }
    },
    'results': {
        'numberOfTypes': 4,
        'questionScore': [],
        'finalScore': [0, 0, 0, 0, 0],
        'types': {
            '1': {
                'name': 'Sleep Set',
                'text': 'Tenangkan pikiran dan tidur nyaman dengan ETERIS.',
            },
            '2': {
                'name': 'Gift Set',
                'text': 'Beri orang terdekat hadiah terbaik dengan ETERIS!',
            },
            '3': {
                'name': 'Bodycare Set',
                'text': 'Rawat dan jaga kesehatan kulitmu dengan ETERIS.',
            },
            '4': {
                'name': 'Mosquito-Free Set',
                'text': 'Lindungi diri dari gigitan nyamuk dengan ETERIS!',
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
        QUIZElement('quiz_progress').innerText = ' Pertanyaan ' + __QUIZ.questionnaire.currentQuestion + ' dari ' + __QUIZ.questionnaire.numberOfQuestions;

	
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
