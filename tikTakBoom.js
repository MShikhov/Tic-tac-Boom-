tikTakBoom = {
  init(
    tasks,
    timerField,
    gameStatusField,
    textFieldQuestion,
    textFieldAnswer1,
    textFieldAnswer2,
    players,
    time,
  ) {
    
    this.tasks = JSON.parse(tasks);
    this.timerField = timerField;
    this.gameStatusField = gameStatusField;
    this.textFieldQuestion = textFieldQuestion;
    this.textFieldAnswer1 = textFieldAnswer1;
    this.textFieldAnswer2 = textFieldAnswer2;
    this.needRightAnswers = 14;
    this.players = players;
    this.time = parseInt(time.value);
    
  },

  run() {
    this.state = Math.floor(Math.random() * players.value+1);

    this.rightAnswers = 0;

    this.turnOn();

    this.timer();
  },
  turnOn() {
    this.gameStatusField.innerText += ` Вопрос игроку №${this.state}`;
    const taskNumber = randomIntNumber(this.tasks.length - 1);
    this.printQuestion(this.tasks[taskNumber]);
    this.tasks.splice(taskNumber, 1);
    this.state = Math.floor(Math.random() * players.value+1);
    
    
  },

  turnOff(value) {
    if (this.currentTask[value].result) {
      this.gameStatusField.innerText = "Верно!";
      this.rightAnswers += 1;
    } else {
      this.gameStatusField.innerText = "Неверно!";
    }
    if (this.rightAnswers < this.needRightAnswers) {
      if (this.tasks.length === 0) {
        this.finish("lose");
      } else {
        this.turnOn();
      }
    } else {
      this.finish("won");
    }

    this.textFieldAnswer1.removeEventListener("click", answer1);
    this.textFieldAnswer2.removeEventListener("click", answer2);
  },

  printQuestion(task) {
    this.textFieldQuestion.innerText = task.question;
    this.textFieldAnswer1.innerText = task.answer1.value;
    this.textFieldAnswer2.innerText = task.answer2.value;

    this.textFieldAnswer1.addEventListener(
      "click",
      (answer1 = () => this.turnOff("answer1"))
    );
    this.textFieldAnswer2.addEventListener(
      "click",
      (answer2 = () => this.turnOff("answer2"))
    );

    this.currentTask = task;
  },

  finish(result = "lose") {
    this.state = 0;
    if (result === "lose") {
      this.gameStatusField.innerText =
        `Вы проиграли, набрав  ` + this.rightAnswers + ` баллов из 14 😧`;
    }
    if (result === "won") {
      this.gameStatusField.innerText =
        `Вы выиграли, набрав  ` + this.rightAnswers + ` баллов из 14 😃`;
    }

    this.textFieldQuestion.innerText = ``;
    this.textFieldAnswer1.innerText = ``;
    this.textFieldAnswer2.innerText = ``;

    console.log(this);
  },

  timer() {
    if (this.state) {
      this.time -= 1;
      let sec = this.time % 60;
      let min = (this.time - sec) / 60;
      sec = sec >= 10 ? sec : "0" + sec;
      min = min >= 10 ? min : "0" + min;
      this.timerField.innerText = `${min}:${sec}`;

      if (this.time > 0) {
        setTimeout(() => {
          this.timer();
        }, 1000);
      } else {
        this.finish("lose");
      }
    }
  },
};
