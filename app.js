const startBtn = document.querySelector('.Start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const ContinueBtn = document.querySelector('.Continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const ResultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.try-again-btn');
const GoToHomeBtn = document.querySelector('.goHome-btn');

startBtn.addEventListener("click", () => {
    popupInfo.classList.add("active");
    main.classList.add("active");

});

exitBtn.addEventListener("click", () => {
    popupInfo.classList.remove("active");
    main.classList.remove("active");

});

ContinueBtn.addEventListener("click", () => {
    quizSection.classList.add("active");
    popupInfo.classList.remove("active");
    main.classList.remove("active");
    quizBox.classList.add("active");

    ShowQuestion(0);
    QuestionCounter(1);
    UserAnswerScore();
});

tryAgainBtn.addEventListener("click", () => {
    quizBox.classList.add("active");
    ResultBox.classList.remove("active");
    nextBtn.classList.remove("active");

    questionCount = 0;
    QuestionNumber = 1;
    UserScore = 0;

    ShowQuestion(questionCount);
    QuestionCounter(QuestionNumber);

    UserAnswerScore();
});

GoToHomeBtn.addEventListener("click", () => {
    quizSection.classList.remove("active");
    ResultBox.classList.remove("active");
    nextBtn.classList.remove("active");

    questionCount = 0;
    QuestionNumber = 1;
    UserScore = 0;

    ShowQuestion(questionCount);
    QuestionCounter(QuestionNumber);

    UserAnswerScore();
});

let questionCount = 0;
let QuestionNumber = 1;
let UserScore = 0;

let OptionList = document.querySelector(".option-list");
let nextBtn = document.querySelector(".next-btn");

nextBtn.addEventListener("click", () => {
    if (questionCount < Questions.length - 1) {
        questionCount++;
        ShowQuestion(questionCount);

        QuestionNumber++;
        QuestionCounter(QuestionNumber);

        nextBtn.classList.remove("active");
    } else {
        console.log('Questions Completed');
        ShowresultBox();
    };
});

function ShowQuestion(index) {
    let QuestionsText = document.querySelector(".question-text");
    QuestionsText.textContent = `${Questions[index].numb}. ${Questions[index].question}`;

    let OptionTag = `<div class="option"><span>${Questions[index].Option[0]}</span></div>
                     <div class="option"><span>${Questions[index].Option[1]}</span></div>
                     <div class="option"><span>${Questions[index].Option[2]}</span></div>
                     <div class="option"><span>${Questions[index].Option[3]}</span></div>`;

    OptionList.innerHTML = OptionTag;

    let Option = document.querySelectorAll(".option");
    for (let i = 0; i < Option.length; i++) {
        Option[i].setAttribute('onclick', 'OptionSelected(this)');
    };

};

function QuestionCounter(index) {
    let TotalQuestion = document.querySelector(".question-total");
    TotalQuestion.textContent = `${index} of ${Questions.length} Questions`;
};

function OptionSelected(answer) {
    let UserAnswer = answer.innerText;
    let CorrectAnswer = Questions[questionCount].answer;
    let AllOptions = OptionList.children.length;

    if (UserAnswer === CorrectAnswer) {
        answer.classList.add("Correct");
        UserScore += 1;
        UserAnswerScore();
    } else {
        answer.classList.add("InCorrect");
        for (let i = 0; i < AllOptions; i++) {
            let optionText = OptionList.children[i].querySelector("span").innerText;

            if (optionText === CorrectAnswer) {
                OptionList.children[i].classList.add("Correct");
            };
        };
    };
    for (let i = 0; i < AllOptions; i++) {
        OptionList.children[i].classList.add("disabled");
    };

    nextBtn.classList.add("active");
};

function UserAnswerScore() {
    let UserCorrectAnsScore = document.querySelector(".header-score");
    UserCorrectAnsScore.textContent = `Score: ${UserScore} / ${Questions.length}`;
};

function ShowresultBox() {
    quizBox.classList.remove("active");
    ResultBox.classList.add("active");

    let ScoreText = document.querySelector(".score-text");
    ScoreText.textContent = `Your Score ${UserScore} out of ${Questions.length}`;

    let UserNumber = document.querySelector(".score-Number");
    UserNumber.textContent = `Total Numbers: ${`${UserScore}` * Questions.length}`;

    let circularProgress = document.querySelector(".circular-progress");
    let progressValue = document.querySelector(".progress-value");

    let progressStartValue = -1;
    let progressEndValue = (UserScore / Questions.length) * 100;
    let Speed = 20;

    let Progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 
    .1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(Progress);
        };

    }, Speed);

};