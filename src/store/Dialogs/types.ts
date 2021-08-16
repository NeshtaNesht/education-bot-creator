import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from 'store/types';

// Ответ
type Answer = {
  answerNum: number;
  answer: string;
  point: number;
};

// Вопрос
type Question = {
  questionNum: number;
  question: string;
  answers: Answer[];
};

// Диалог
type Dialog = {
  _id: string;
  dialogName: string;
  questions: Question[];
};

interface DialogsState {
  dialogs: Dialog[];
  loading: LoadingState;
}

type ReducerFunction<T = null | undefined> = CaseReducer<
  DialogsState,
  PayloadAction<T>
>;

export type { Answer, Question, Dialog, DialogsState, ReducerFunction };
