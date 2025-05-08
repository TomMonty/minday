import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import styles from './QuizQuestion.module.css';
import { Check, X } from 'lucide-react';

const QuizQuestion = ({ question, onAnswer, isAnswered }) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  
  const handleSelectAnswer = (answerId) => {
    if (isAnswered) return;
    
    setSelectedAnswerId(answerId);
    const answer = question.answers.find(a => a.id === answerId);
    
    if (answer) {
      if (!answer.isCorrect && 'vibrate' in navigator) {
        navigator.vibrate(200);
      }
      
      onAnswer(answerId, answer.isCorrect);
    }
  };
  
  const getAnswerClassName = (answer) => {
    if (!isAnswered || selectedAnswerId !== answer.id) {
      return selectedAnswerId === answer.id ? styles.selectedAnswer : '';
    }
    
    return answer.isCorrect ? styles.correctAnswer : styles.incorrectAnswer;
  };

  const getAnswerIcon = (answer) => {
    if (!isAnswered || selectedAnswerId !== answer.id) return null;
    
    return answer.isCorrect ? 
      <Check className={styles.answerIcon} /> : 
      <X className={styles.answerIcon} />;
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.questionText}>{question.text}</div>
      
      <div className={styles.answerList}>
        {question.answers.map((answer) => (
          <Button
            key={answer.id}
            variant="outline"
            className={`${styles.answerButton} ${getAnswerClassName(answer)}`}
            onClick={() => handleSelectAnswer(answer.id)}
            disabled={isAnswered}
          >
            {answer.text}
            {getAnswerIcon(answer)}
          </Button>
        ))}
      </div>
    </div>
  );
};

QuizQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        isCorrect: PropTypes.bool.isRequired
      })
    ).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  isAnswered: PropTypes.bool.isRequired
};

export default QuizQuestion;
