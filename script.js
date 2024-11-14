// Sample questions for General Knowledge Exam, now with images
const questions = [
    {
        
        image: "a.png",  // Path to image
        options: ["A", "B", "C", "D"],
        correctAnswer: 0 // "Lion" is the correct answer
    },
    {
    
        image: "b.png",  // Path to image
        options: ["A", "B", "C", "D"],
                correctAnswer: 0 // "Eiffel Tower" is the correct answer
    },
    {
        
        image: "c.png",  // Path to image
        options: ["A", "B", "C", "D"],
                correctAnswer: 0 // "Oxygen" is the correct answer
    },
    {
    
        image: "b.png",  // Path to image
        options: ["A", "B", "C", "D"],
                correctAnswer: 0 // "Eiffel Tower" is the correct answer
    },
    {
    
        image: "b.png",  // Path to image
        options: ["A", "B", "C", "D"],
                correctAnswer: 0 // "Eiffel Tower" is the correct answer
    },
    {
    
        image: "b.png",  // Path to image
        options: ["A", "B", "C", "D"],
                correctAnswer: 0 // "Eiffel Tower" is the correct answer
    },
    {
    
        image: "b.png",  // Path to image
        options: ["A", "B", "C", "D"],
                correctAnswer: 0 // "Eiffel Tower" is the correct answer
    },
    {
    
        image: "b.png",  // Path to image
        options: ["A", "B", "C", "D"],
                correctAnswer: 0 // "Eiffel Tower" is the correct answer
    },
    {
    
        image: "b.png",  // Path to image
        options: ["A", "B", "C", "D"],
                correctAnswer: 0 // "Eiffel Tower" is the correct answer
    },
    {
    
        image: "b.png",  // Path to image
        options: ["A", "B", "C", "D"],
                correctAnswer: 0 // "Eiffel Tower" is the correct answer
    },
];

let timer;
let timeLeft = 4800; // 10 minutes
let selectedAnswers = [];  // This will store the user's answers and the correct answers

// Start the exam from the homepage
function startExam() {
    window.location.href = 'exam.html'; // Redirect to exam page
}

// Render the questions on the exam page
function renderQuestions() {
    const examContent = document.getElementById('exam-content');
    questions.forEach((q, index) => {
        let questionHTML = `
            <div class="question">
                <img src="${q.image}" alt="Question image" class="question-image"><br><br><br>
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        examContent.innerHTML += questionHTML;
    });
}

// Start the countdown timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitExam(); // Automatically submit the exam when time is up
        }
    }, 1000);
}

// Submit the exam and calculate the score
function submitExam() {
    let score = 0;
    selectedAnswers = []; // Clear previous answers if submitting the exam again

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            const selectedAnswerIndex = parseInt(selectedOption.value);
            selectedAnswers.push({
                question: q.question,
                image: q.image,
                options: q.options,
                selectedAnswer: q.options[selectedAnswerIndex],
                correctAnswer: q.options[q.correctAnswer],
                isCorrect: selectedAnswerIndex === q.correctAnswer
            });
            if (selectedAnswerIndex === q.correctAnswer) {
                score++;
            }
        } else {
            selectedAnswers.push({
                question: q.question,
                image: q.image,
                options: q.options,
                selectedAnswer: "No answer selected",
                correctAnswer: q.options[q.correctAnswer],
                isCorrect: false
            });
        }
    });

    // Store the score and the answers in localStorage to show on result page
    localStorage.setItem('score', score);
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    window.location.href = 'result.html';  // Redirect to the result page
}

// Display the result on the result page
function displayResult() {
    const score = localStorage.getItem('score');
    const resultContent = document.getElementById('result-content');
    const selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers'));

    resultContent.innerHTML = `<p>Your score: ${score} / ${questions.length}</p>`;
    
    // Loop through the questions and display the results
    selectedAnswers.forEach((answer, index) => {
        let resultHTML = `
            <div class="result">
                <img src="${answer.image}" alt="Question image" class="result-image">
                <p><strong>Your answer:</strong> ${answer.selectedAnswer}</p>
                <p><strong>Correct answer:</strong> ${answer.correctAnswer}</p>
                <p><strong>${answer.isCorrect ? 'Correct!' : 'Incorrect'}</strong></p>
            </div>
        `;
        resultContent.innerHTML += resultHTML;
    });
}

// Go back to the homepage from the result page
function goBackToHome() {
    window.location.href = 'index.html';
}

// Initialize exam page
if (window.location.pathname.includes('exam.html')) {
    renderQuestions();
    startTimer();
}

// Initialize result page
if (window.location.pathname.includes('result.html')) {
    displayResult();
}
