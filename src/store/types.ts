import { AllEffect, ForkEffect } from 'redux-saga/effects';

enum LoadingState {
  LOADING = 'LOADING', // Старт запроса
  RESOLVE = 'RESOLVE', // Успешное выполнение запроса
  REJECT = 'REJECT', // Неудачное выполнение запроса
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
export type { GeneratorSagaType };
