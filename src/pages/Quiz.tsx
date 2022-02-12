import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getQuizServices } from '../services/quizServices';

enum quizView {
  INITIAL = 'INITIAL',
  GAME = 'GAME',
  RESULT = 'RESULT'
}

function QuizApp() {
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [questions, setQuestions] = useState<any>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeView, setActiveView] = useState(quizView.INITIAL);

  const getQuizQuestions = async () => {
    const res = await getQuizServices(difficulty);
    // eslint-disable-next-line no-console
    setQuestions(res?.data?.results ?? []);
  };
  useEffect(() => {
    if (activeQuestion === 0) {
      getQuizQuestions();
    }
  }, [activeQuestion]);

  const arraySuffler = (arr: any) => {
    // randomize the array
    if (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i];
        arr[i] = arr[random];
        arr[random] = tmp;
      }
      return arr;
    }
    return [];
  };

  const chooseAnswer = (answer: any) => {
    if (questions[activeQuestion].correct_answer === answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      setActiveView(quizView.RESULT);
      const getPrevScores = localStorage.getItem('score-history')?.split(',') ?? [];
      localStorage.setItem(
        'score-history',
        // eslint-disable-next-line no-unsafe-optional-chaining
        [...getPrevScores, `${score}/${questions?.length}`].toString()
      );
    }
  };

  const switchView = () => {
    switch (activeView) {
      case quizView.INITIAL:
        return initialView();
      case quizView.GAME:
        return gameView();
      case quizView.RESULT:
        return resultView();
      default:
    }
  };

  const initialView = () => {
    return (
      <div className="game-quiz-container">
        <FormControl style={{ width: '80%' }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={difficulty}
            label="Select Difficulty"
            onChange={(e: any) => setDifficulty(e.target.value)}>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => setActiveView(quizView.GAME)}>
          Start game
        </Button>
      </div>
    );
  };

  const gameView = () => {
    return (
      <div className="game-quiz-container">
        <div className="game-details-container">
          <h1>
            {' '}
            Question : {activeQuestion + 1} / {questions?.length}
          </h1>
        </div>

        <div className="game-question-container">
          <h1 id="display-question">
            <p dangerouslySetInnerHTML={{ __html: questions[activeQuestion]?.question }} />
          </h1>
        </div>

        <div className="game-options-container">
          <div className="modal-container" id="option-modal">
            <div className="modal-content-container">
              <h1>Please Pick An Option</h1>

              <div className="modal-button-container">
                <button>Continue</button>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line no-console */}
          {questions[activeQuestion] &&
            arraySuffler([
              // eslint-disable-next-line no-unsafe-optional-chaining
              ...questions[activeQuestion]?.incorrect_answers,
              questions[activeQuestion]?.correct_answer
            ]).map((el: any, index: number) => {
              return (
                <span key={index}>
                  <label htmlFor="option-one" className="option" id="option-one-label">
                    <input
                      onClick={() => chooseAnswer(el)}
                      type="radio"
                      id="option-one"
                      name="option"
                      className="radio"
                      value="optionA"
                    />
                    <p dangerouslySetInnerHTML={{ __html: el }} />
                  </label>
                </span>
              );
            })}
        </div>
      </div>
    );
  };
  const [isCurrent, setIsCurrent] = useState(true);

  const scoreHistory = localStorage.getItem('score-history')?.split(',') ?? [];

  const resultView = () => {
    return (
      <div className="game-quiz-container" id="score-modal">
        <div className="modal-content-container">
          {isCurrent ? (
            <>
              <h1>Congratulations, Quiz Completed.</h1>

              <div className="grade-details">
                <p>Attempts : {questions?.length}</p>
                <p>
                  Score : {score}/{questions?.length}
                </p>
                {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                <p>Grade : {(score / questions?.length) * 100}%</p>
                <p>
                  <span id="remarks" />
                </p>
              </div>
            </>
          ) : (
            <>
              <h1>Your Score History</h1>

              <div className="grade-details">
                <List
                  style={{
                    overflow: 'auto',
                    width: '100%'
                  }}>
                  {scoreHistory?.map((score: string, index) => (
                    <ListItem style={{ color: '#fff' }} key={index}>
                      <ListItemText primary={`${index + 1}) ${score}`} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </>
          )}

          <div className="modal-button-container">
            <button onClick={() => setIsCurrent(!isCurrent)}>
              {isCurrent ? 'Previous Scores' : 'Show score'}
            </button>
            <button
              onClick={() => {
                setActiveView(quizView.INITIAL);
                setActiveQuestion(0);
              }}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  };
  return <main>{switchView()}</main>;
}

export default QuizApp;
