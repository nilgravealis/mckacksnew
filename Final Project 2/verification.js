const questions = [

    {
        question: "Suppose that in a mammalian species, the allele for black hair (B) is dominant to the allele for brown hair (b), and the allele for curly hair (C) is dominant to the allele for straight hair (c). When an organism of unknown genotype is crossed against one with straight, brown hair, the phenotypic ratio is as follows: 25% curly black hair, 25% straight black hair, 25% curly brown hair, 25% straight brown hair. What is the genotype of the parent?",
        optionA: "BbCC",
        optionB: "bbCc",
        optionC: "Bbcc",
        optionD: "BbCc",
        correctOption: "optionD"
    },

    {
        question: "Which is not a characteristic of protein?",
        optionA: "Self-replication",
        optionB: "Acts as a hormone",
        optionC: "Acts in cell membrane trafficking",
        optionD: "Can bind foreign materials",
        correctOption: "optionA"
    },

    {
        question: "How manay hours can be found in a day ?",
        optionA: "30 hours",
        optionB: "38 hours",
        optionC: "48 hours",
        optionD: "24 hours",
        correctOption: "optionD"
    },

    {
        question: "Which of these numbers is an odd number ?",
        optionA: "Ten",
        optionB: "Twelve",
        optionC: "Eight",
        optionD: "Eleven",
        correctOption: "optionD"
    },

    {
        question: "where is the smallest bone in human body located?",
        optionA: "Toes",
        optionB: "Ears",
        optionC: "Fingers",
        optionD: "Nose",
        correctOption: "optionB"
    },

    {
        question: "How many teeth does an adult human have ?",
        optionA: "28",
        optionB: "30",
        optionC: "32",
        optionD: "36",
        correctOption: "optionC"
    },

    {
        question: "A drug is used that prevents the conversion of angiotensin I to angiotensin II. What is a likely effect of this drug?",
        optionA: "Increased sodium reabsorbtion",
        optionB: "Increase potassium reabsorbtion",
        optionC: "Increased blood pressure",
        optionD: "Increased blood pH",
        correctOption: "optionB"
    },

    {
        question: "C6H12O6 + O2 -> CO2 + H2O happens where?",
        optionA: "in the cytoplasm",
        optionB: "in the area of the cell membrane",
        optionC: "in the mitochondria",
        optionD: "in the area around the ribosomes",
        correctOption: "optionC"
    },

    {
        question: "How many different types of gametes would be produced by an organism of genotype AabbCcDdEE, if all of the genes assort independently?",
        optionA: "6",
        optionB: "8",
        optionC: "10",
        optionD: "16",
        correctOption: "optionB"
    },

    {
        question: "How many structural isomers of C3H6Br2 are capable of exhibiting optical activity?",
        optionA: "0",
        optionB: "1",
        optionC: "2",
        optionD: "3",
        correctOption: "optionB"
    },

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 2) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }

}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = '#92C7CF'
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = '#FBF9F1'
            document.getElementById(correctOption).style.backgroundColor = '#92C7CF'
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer();
    unCheckRadioButtons();
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber < 3) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame();
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    
    let remark = null
    document.getElementById('whylink').style.visibility = 'hidden';
    //let remarkColor = "bad";

    // condition check for player remark and remark color
    //debugging: player score cases are working and remark assignment is working
    if (playerScore <= 1) {
        remark = "Make sure to mark that you're delusional today! You cannot contact us yet."
        //remarkColor = "red"
    }
    else if (playerScore == 2) {
        remark = "Make sure to mark that you're mid today! You cannot contact us yet."
        //remarkColor = "orange"
    }
    else if (playerScore >= 3) {
        remark = "Good enough. But if you know so much, why are you here?"
        document.getElementById('whylink').style.visibility = 'visible';
        //remarkColor = "green"
    }
    const playerGrade = (playerScore / 3) * 100;
    //data to display to score board
    document.getElementById("remarks").innerHTML = remark;
    document.getElementById('remarks').style.color = '#92C7CF'; 
    document.getElementById('grade-percentage').innerHTML = playerGrade;
    document.getElementById('wrong-answers').innerHTML = wrongAttempt;
    document.getElementById('right-answers').innerHTML = playerScore;
    
    document.getElementById('score-modal').style.display = "flex";



}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}