import Modal from "@/components/Modal";
import useGetQuestionDataQuery from "@/services/getQustions";
import { MovieList, Movie } from "@/services/interface";
import { GetServerSideProps } from "next";
import { useQueryStates, queryTypes } from "next-usequerystate";
import { useRouter } from "next/router";
import { useState } from "react";
import { params } from "./home";

const game: React.FC<{ params: params }> = ({ params: initialParams }) => {
  const router = useRouter();
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

  const [correctNum, setCorrectNum] = useState<number>(0);

  const [modalView, setModalView] = useState<boolean>(false);

  const { data: questionData, isLoading } = useGetQuestionDataQuery(params);
  if (isLoading) return <p>Loading...</p>;

  const incorrectAnswers = questionData?.results[
    questionNum - 1
  ].incorrect_answers.map((answer) => {
    return { value: false, content: answer };
  });

  const correctAnswer = [
    {
      value: true,
      content: questionData?.results[questionNum - 1].correct_answer
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'"),
    },
  ];

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const answers = shuffleArray(correctAnswer.concat(incorrectAnswers || []));

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center">
        {modalView && <Modal points={correctNum} />}
        <div className="w-2/4 flex flex-col items-center">
          <h1 className="m-10 font-extrabold text-6xl">Game desu!</h1>
          <div className="flex w-full justify-evenly m-5 border-2 border-black py-2">
            <p>Difficulty: {params.difficulty || "Any"}</p>
            <p>Questions: {params.questions}</p>
            <p>Topic: {params.category || "Any"}</p>
          </div>
          <div className={`flex flex-col items-center w-full my-10`}>
            <p>Question {questionNum}:</p>
            <p className="m-2 py-4 px-10 bg-slate-300 mb-8 rounded-md">
              {questionData?.results[questionNum - 1].question
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&ldquo;/g, "'")
                .replace(/&rsquo;/g, "'")}
            </p>
            <div className="flex w-full justify-evenly">
              {answers.map((answer) => (
                <button
                  value={answer.value || ""}
                  onClick={(el) => {
                    el.target.value && setCorrectNum(correctNum + 1);
                    questionNum < (questionData?.results.length || 0)
                      ? setQuestionNum(questionNum + 1)
                      : setModalView(true);
                  }}
                >
                  {answer.content}
                </button>
              ))}
            </div>
          </div>
          <div className="fixed top-5 right-5">
            <button
              className="w-[200px] h-[50px] border-2 border-blue-400 bg-blue-400 text-white shadow-lg font-bold rounded-md active:bg-blue-800"
              onClick={() => {
                router.push("/home");
              }}
            >
              Go hom kid!
            </button>
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
