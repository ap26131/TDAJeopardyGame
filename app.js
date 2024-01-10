const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

// Initialize Category Object
const jeopardyCategories = [
    {
        genre: 'Programming Principles I',
        questions: [
            {
                question: 'What does the term API stand for?',
                answers: ['Application Programmer Interface','Application Program Interchange'],
                correct: 'Application Programmer Interface',
                level: 'easy',
            },
            {
                question: 'What is the purpose of a "while" loop?',
                answers: ['Iteration','Decision'],
                correct: 'Iteration',
                level: 'medium',
            },
            {
                question: 'What is the term for a named storage location in programming?',
                answers: ['Variable','Constant'],
                correct: 'Variable',
                level: 'hard',
            },
        ],  
    },
    {
        genre: 'Programming Principles II',
        questions: [
            {
                question: 'What does "OOP" stand for in programming?',
                answers: ['Object-Oriented Programming','Operator Overloading Principle'],
                correct: 'Object-Oriented Programming',
                level: 'easy',
            },
            {
                question: 'What is the term for creating a new class using existing classes?',
                answers: ['Inheritance','Overloading'],
                correct: 'Inheritance',
                level: 'medium',
            },
            {
                question: 'What is the purpose of the "super" keyword in OOP languages?',
                answers: ['Calls a method from the parent class','Calls a method from the child class'],
                correct: 'Calls a method from the parent class',
                level: 'hard',
            },
        ],
    },
    {
        genre: 'Data Structures',
        questions: [
            {
                question: 'What is the primary advantage of using an array over a linked list?',
                answers: ['Random','Sequential'],
                correct: 'Random',
                level: 'easy',
            },
            {
                question: 'What is the return type for the hashCode() method?',
                answers: ['int','long'],
                correct: 'int',
                level: 'medium',
            },
            {
                question: 'A Huffman tree (a variant of a binary search tree) is constructed using what type of algorithm?',
                answers: ['greedy','back-tracking'],
                correct: 'greedy',
                level: 'hard',
            },
        ],
    },
    {
        genre: 'Software Engineering',
        questions: [
            {
                question: 'What does "UML" stand for in software engineering?',
                answers: [' Unified Modeling Language','Universal Markup Language'],
                correct: ' Unified Modeling Language',
                level: 'easy',
            },
            {
                question: 'Define "agile methodology" in software development.',
                answers: ['Iterative','Waterfall'],
                correct: 'Iterative',
                level: 'medium',
            },
            {
                question: 'What is the purpose of a "use case diagram" in software design?',
                answers: ['Functionality',' Structure'],
                correct: 'Functionality',
                level: 'hard',
            },
        ],
    },
    {
        genre: 'Computer Architecture',
        questions: [
            {
                question: 'What is the primary function of the "ALU" in a CPU?',
                answers: ['Arithmetic','Logic'],
                correct: 'Arithmetic',
                level: 'easy',
            },
            {
                question: 'Define "cache memory" in computer architecture',
                answers: ['Fast','Long-term'],
                correct: 'Fast',
                level: 'medium',
            },
            {
                question: 'Define "bus" in the context of computer architecture.',
                answers: ['Communication','Memory'],
                correct: 'Communication',
                level: 'hard',
            },
        ],
    },
]

let score = 0

// Function to add cateogories and title to html page
function addCategory(category) {
   const column = document.createElement('div')
   column.classList.add('genre-column')

   const genreTitle = document.createElement('div')
   genreTitle.classList.add('genre-title')
   genreTitle.innerHTML = category.genre

   // add title and column to html page
   column.appendChild(genreTitle)
   game.append(column)

   category.questions.forEach(question => {
    const card = document.createElement('div')
    card.classList.add('card')
    column.append(card)

    if (question.level === 'easy') {
        card.innerHTML = 100
    }

    if (question.level === 'medium') {
        card.innerHTML = 200
    }

    if (question.level === 'hard') {
        card.innerHTML = 300
    }

    card.setAttribute('data-question',question.question)
    card.setAttribute('data-answer-1',question.answers[0])
    card.setAttribute('data-answer-2',question.answers[1])
    card.setAttribute('data-correct', question.correct)
    card.setAttribute('data-value', card.getInnerHTML())

    card.addEventListener('click', flipCard)
   })
}

jeopardyCategories.forEach(category => addCategory(category))

function flipCard() {
    this.innerHTML = ""
    this.style.fontSize = "10px"
    this.style.lineHeight = "10px"
    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML = this.getAttribute('data-question')
    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')
    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')
    firstButton.innerHTML = this.getAttribute('data-answer-1')
    secondButton.innerHTML = this.getAttribute('data-answer-2')
    firstButton.addEventListener('click',getResult)
    secondButton.addEventListener('click',getResult)
    this.append(textDisplay,firstButton,secondButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click',flipCard))
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click',flipCard))

    const cardOfButton = this.parentElement

    if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }

            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        },100)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        },100)
    }

    cardOfButton.removeEventListener('click',flipCard)
}