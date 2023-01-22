export interface MovieList<T> {
  results: Array<T>;
}

export interface Movie {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
