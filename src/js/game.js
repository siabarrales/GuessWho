async function fetchCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    const data = await response.json();
    //console.log(data.info.pages);
    let allData = [];
    let currentPage = 0;

    while (currentPage < data.info.pages) {
      currentPage++;
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${currentPage}`
      );
      let data = await response.json();
      allData.unshift(data);
    }
    //console.log(allData);

    let characters = [];
    let images = [];
    //Traigo 20 personajes aleatorios
    for (let i = 0; i < 20; i++) {
      let numData = Math.round(Math.random() * (33 - 1) + 1);
      let numResult = Math.round(Math.random() * (19 - 1) + 1);
      characters.push(allData[numData].results[numResult].name);
      images.push(allData[numData].results[numResult].image);
    }
    //console.log(characters);
    //console.log(images);
    let questions = [
      {
        question: "¿Who is it?",
        choice1: characters[0],
        choice2: characters[15],
        choice3: characters[2],
        choice4: characters[6],
        answer: 1,
        imagen: images[0],
      },
      {
        question: "¿Who is it?",
        choice1: characters[9],
        choice2: characters[10],
        choice3: characters[14],
        choice4: characters[7],
        answer: 3,
        imagen: images[14],
      },
      {
        question: "¿Who is it?",
        choice1: characters[11],
        choice2: characters[10],
        choice3: characters[0],
        choice4: characters[5],
        answer: 4,
        imagen: images[5],
      },
      {
        question: "¿Who is it?",
        choice1: characters[5],
        choice2: characters[17],
        choice3: characters[8],
        choice4: characters[9],
        answer: 2,
        imagen: images[17],
      },
      {
        question: "¿Who is it?",
        choice1: characters[18],
        choice2: characters[10],
        choice3: characters[3],
        choice4: characters[9],
        answer: 2,
        imagen: images[10],
      },
      {
        question: "¿Who is it?",
        choice1: characters[19],
        choice2: characters[17],
        choice3: characters[12],
        choice4: characters[4],
        answer: 1,
        imagen: images[19],
      },
      {
        question: "¿Who is it?",
        choice1: characters[10],
        choice2: characters[3],
        choice3: characters[1],
        choice4: characters[6],
        answer: 3,
        imagen: images[1],
      },
      {
        question: "¿Who is it?",
        choice1: characters[7],
        choice2: characters[14],
        choice3: characters[16],
        choice4: characters[15],
        answer: 4,
        imagen: images[15],
      },
      {
        question: "¿Who is it?",
        choice1: characters[19],
        choice2: characters[10],
        choice3: characters[12],
        choice4: characters[18],
        answer: 3,
        imagen: images[12],
      },
      {
        question: "¿Who is it?",
        choice1: characters[11],
        choice2: characters[8],
        choice3: characters[4],
        choice4: characters[16],
        answer: 4,
        imagen: images[16],
      },
    ];
    const question = document.querySelector("#question");
    const choices = Array.from(document.querySelectorAll(".choice-text"));
    const progressText = document.querySelector("#progressText");
    const scoreText = document.querySelector("#score");
    const progressBarFull = document.querySelector("#progressBarFull");

    let currentQuestion = {};
    let acceptingAnswers = true;
    let score = 0;
    scoreText.innerText = score;
    let questionCounter = 0;
    let availableQuestions = [];
    //console.log(questions);

    const SCORE_POINTS = 100;
    const MAX_QUESTIONS = 10;

    startGame = () => {
      questionCounter = 0;
      score = 0;
      availableQuestions = [...questions];
      getNewQuestion();
    };

    getNewQuestion = async () => {
      if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        //localStorage.setItem("mostRecentScore", score);
        Swal.fire({
          html:"<pro>Thanks For Playing! :)</pro><br><br><pre>Correct Answers: "+ (score/100) + "<br>Your Score: "+score+"</pre>",
          background: "rgb(29, 26, 26)",
          showDenyButton: true,
          confirmButtonText: `Play Again`,
          confirmButtonColor: 'rgb(41, 232, 111)',
          denyButtonText: `Go Home`,
          denyButtonColor: '#3071a9',
          allowOutsideClick: false,
          customClass: {
            popup: 'format-pre'
          }
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            fetchCharacters();
          } else if (result.isDenied) {
            window.location.assign("../../index.html")
          }
        });
      }
      if(questionCounter<10){
        questionCounter++;
      }
      progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
      progressBarFull.style.width = `${
        (questionCounter / MAX_QUESTIONS) * 100
      }%`;

      const questionsIndex = Math.floor(
        Math.random() * availableQuestions.length
      );

      currentQuestion = availableQuestions[questionsIndex];
      question.innerText = currentQuestion.question;
      //console.log(currentQuestion);

      choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
      });

      var img = document.getElementById("character");
      img.style.content = "url('" + currentQuestion["imagen"] + "')";

      availableQuestions.splice(questionsIndex, 1);

      acceptingAnswers = true;
    };

    choices.forEach((choice) => {
      choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply =
          selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
          incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion();
        }, 1000);
      });
    });

    incrementScore = (num) => {
      score += num;
      scoreText.innerText = score;
    };

    startGame();

    //console.log(questions);
  } catch (error) {
    console.error(error);
  }
}
fetchCharacters();
