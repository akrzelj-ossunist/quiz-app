import { params } from "@/pages/index";
import { Movie, MovieList } from "@/services/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getQuestionData = async (questions: string, difficulty: string, type:string, category:string) => {
  try {
    const resp = await axios.get<MovieList<Movie>>(`https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&type=${type}`);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

const useGetQuestionDataQuery = ( {questions, difficulty, type, category}: params ) => {
  return useQuery([], () => getQuestionData(questions, difficulty, type, category));
}

export default useGetQuestionDataQuery