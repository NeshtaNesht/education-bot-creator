import { AllEffect, ForkEffect } from 'redux-saga/effects';
import { AuthState } from './Auth/types';
import { OfficeState } from './Office/types';

enum LoadingState {
  LOADING = 'LOADING', // Старт запроса
  RESOLVE = 'RESOLVE', // Успешное выполнение запроса
  REJECT = 'REJECT', // Неудачное выполнение запроса
  IDLE = 'IDLE',
}

interface ApplicationState {
  auth: AuthState;
  office: OfficeState;
}

/**
 * Тип для создания функции саги
 */
type GeneratorSagaType<T = void | never> = Generator<
  AllEffect<ForkEffect<T>>,
  void,
  unknown
>;

export { LoadingState };
export type { GeneratorSagaType, ApplicationState };
