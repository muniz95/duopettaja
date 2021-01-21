import React from "react";
import Word from "../../models/Word";
import * as S from "./styled";

interface IProps {
  question: string;
  options: Word[];
  onChange: Function;
}

const byIdAscending: (a: Word, b: Word) => number = (a: Word, b: Word) => a.id - b.id;

const CompoundQuestion = ({question, options, onChange}: IProps) => {
  const [availableWords, setAvailableWords] = React.useState<Word[]>([...options]);
  const [selectedWords, setSelectedWords] = React.useState<Word[]>([]);

  const selectWord = (option: Word): void => {
    if (option.selected) {
      return;
    }
    option.selected = true;
    const chosenWords: Word[] = [...selectedWords, option];
    const availableWords: Word[] = [
      option,
      ...options.filter((el: Word) => el.id !== option.id),
    ].sort(byIdAscending);
    setAvailableWords(availableWords);
    setSelectedWords(chosenWords);
    getAnswer(chosenWords);
  }
  
  const deselectWord = (option: Word): void => {
    option.selected = false;
    const chosenWords: Word[] = selectedWords.filter((el: Word) => el.id !== option.id);
    const availableWords: Word[] = [
      option,
      ...options.filter((el: Word) => el.id !== option.id)
    ].sort(byIdAscending);
    setAvailableWords(availableWords);
    setSelectedWords(chosenWords);
    getAnswer(chosenWords);
  }

  const getAnswer = (selectedWords: Word[]): void => {
    onChange(selectedWords);
  }

  return (
    <div>
      <S.QuestionRow>
        <h2>{question}</h2>
      </S.QuestionRow>
      <div className="row">
        <S.SelectedWordsContainer>
          <S.SelectedWordsBox>
            {selectedWords.map((option: Word) =>
              <S.WordBox key={option.id} selected={false} onClick={() => deselectWord(option)}>
                {option.text}
              </S.WordBox>,
            )}
          </S.SelectedWordsBox>
        </S.SelectedWordsContainer>
      </div>
      <div className="row">
        <S.AvailableWordsContainer>
          {availableWords.map((option: Word) =>
            <S.WordBox key={option.id} selected={option.selected} onClick={() => selectWord(option)}>
              {option.text}
            </S.WordBox>,
          )}
        </S.AvailableWordsContainer>
      </div>
    </div>
  );
}

(CompoundQuestion as any).whyDidYouRender = true;

export default CompoundQuestion;
