import Modal from "@/components/Modal";
import useGetQuestionDataQuery from "@/services/getQustions";
import {
  getShuffledAnswers,
  replaceChars,
  shuffleArray,
} from "@/utility/functions";
import { GetServerSideProps } from "next";
import { useQueryStates, queryTypes } from "next-usequerystate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { params } from "./index";

const game: React.FC<{ params: params }> = ({ params: initialParams }) => {
  const [params, setParams] = useQueryStates(
    {
      category: queryTypes.string.withDefault(initialParams.category || ""),
      type: queryTypes.string.withDefault(initialParams.type || ""),
      difficulty: queryTypes.string.withDefault(initialParams.difficulty || ""),
      questions: queryTypes.string.withDefault(initialParams.questions || ""),
    },
    { history: "replace" }
  );

  const [questionNum, setQuestionNum] = useState<number>(1);

  const [showCorrect, setShowCorrect] = useState(false);

  const [correctNum, setCorrectNum] = useState<number>(0);

  const [modalView, setModalView] = useState<boolean>(false);

  const [answers, setAnswers] = useState<any[]>([]);

  const { data: questionData, isLoading } = useGetQuestionDataQuery(params);

  useEffect(() => {
    setAnswers(
      getShuffledAnswers(
        questionData?.results[questionNum - 1].correct_answer,
        questionData?.results[questionNum - 1].incorrect_answers
      )
    );
  }, [isLoading, questionNum, questionData]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div
        className={`w-full h-[100vh] flex justify-center items-center bg-slate-600 text-white text-lg font-semibold`}
      >
        {modalView && <Modal points={correctNum} />}
        <div
          className={`w-[920px] mx-4 flex flex-col items-center border-1 border-slate-400 p-4 rounded-lg bg-slate-400 ${
            modalView ? "blur-sm" : "blur-none"
          }`}
        >
          <h1 className="m-10 font-extrabold text-6xl phone:hidden">
            Game desu!
          </h1>
          <div className="flex w-full justify-evenly m-5 border-[2px] border-slate-500 shadow-lg py-2 rounded-lg bg-slate-400 phone:text-sm">
            <p>Difficulty: {params.difficulty || "Any"}</p>
            <p className="phone:border-x-[2px] phone:px-2 phone:border-slate-500">
              Questions: {params.questions}
            </p>
            <p>Topic: {params.category || "Any"}</p>
          </div>
          <p className="hidden phone:flex w-full justify-between items-center border-b-[1px] border-white mb-4">
            Correct: {correctNum}
          </p>
          <div className={`flex flex-col items-center w-full my-10 phone:my-0`}>
            <p>Question {questionNum}:</p>
            <p className="m-2 py-4 px-10 border-1 shadow-lg bg-white text-slate-600 border-slate-400 mb-8 rounded-md overflow-y-auto h-auto">
              {replaceChars(
                questionData?.results[questionNum - 1].question || ""
              )}
            </p>
            <div className="flex w-full justify-evenly phone:flex-col phone:h-auto">
              {answers.map((answer: any) => (
                <button
                  className={`py-2 px-4 ease-[cubic-bezier(1, 0, 0, 0)] duration-500 border-1 shadow-lg bg-white text-slate-600 border-slate-400 rounded-md hover:scale-105 my-2 ${
                    showCorrect
                      ? answer.value
                        ? "bg-green-500"
                        : "bg-red-500"
                      : "bg-none"
                  }`}
                  value={answer.value || ""}
                  onClick={() => {
                    setShowCorrect(true);
                    setTimeout(() => {
                      setShowCorrect(false);
                      answer.value && setCorrectNum(correctNum + 1);
                      questionNum < (questionData?.results.length || 0)
                        ? setQuestionNum(questionNum + 1)
                        : setModalView(true);
                    }, 2000);
                  }}
                >
                  {answer.content}
                </button>
              ))}
            </div>
          </div>
          <div className="fixed top-5 right-5 phone:hidden">
            <Link
              href="/"
              className="w-[200px] h-[50px] border-2 border-blue-400 bg-blue-400 text-white shadow-lg font-bold rounded-md active:bg-blue-800"
            >
              Go hom kid!
            </Link>
            <p className="mt-4">{correctNum}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default game;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = {
    category: context.query.category || "",
    type: context.query.type || "",
    questions: context.query.questions || "",
    difficulty: context.query.difficulty || "",
  };
  return {
    props: { params },
  };
};
