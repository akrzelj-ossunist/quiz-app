import { useRouter } from "next/router";

import React, { useState } from "react";

export interface params {
  questions: string;
  category: string;
  type: string;
  difficulty: string;
}

const home: React.FC = () => {
  const router = useRouter();
  const [params, getParams] = useState<params>({
    category: "",
    difficulty: "",
    questions: "5",
    type: "",
  });

  return (
    <>
      <div className="w-full h-[70vh] flex justify-center items-center">
        <div className="w-2/4 flex flex-col items-center">
          <h1 className="m-10 font-extrabold text-6xl">Quiz for plebs!</h1>
          <div className="flex justify-between w-[50%] my-10">
            <select
              onChange={(el) =>
                getParams({ ...params, category: el.target.value })
              }
            >
              <option value="none" disabled selected hidden>
                Pick Category:
              </option>
              <option value="">Any</option>
              <option value="9">General knowledge</option>
              <option value="10">Books</option>
              <option value="11">Film</option>
              <option value="12">Music</option>
              <option value="13">Musicals</option>
              <option value="14">Television</option>
              <option value="15">Video games</option>
              <option value="16">Board games</option>
              <option value="17">Science and nature</option>
              <option value="18">Computer</option>
              <option value="19">Mathematics</option>
              <option value="20">Mithology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Comics</option>
              <option value="30">Gadgets</option>
              <option value="31">Anime and manga</option>
              <option value="32">Cartoon and animation</option>
            </select>
            <select
              onChange={(el) =>
                getParams({ ...params, difficulty: el.target.value })
              }
            >
              <option value="none" disabled selected hidden>
                Difficulty:
              </option>
              <option value="">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex  justify-between w-[50%]">
            <select
              onChange={(el) =>
                getParams({ ...params, questions: el.target.value })
              }
            >
              <option value="none" disabled selected hidden>
                Questions:
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <select
              onChange={(el) => getParams({ ...params, type: el.target.value })}
            >
              <option value="none" disabled selected hidden>
                Type:
              </option>
              <option value="">Any</option>
              <option value="multiple">Multiple choices</option>
              <option value="boolean">True/False</option>
            </select>
          </div>
          <button
            className="mt-24 w-[200px] h-[50px] border-2 border-blue-400 bg-blue-400 text-white shadow-lg font-bold rounded-md active:bg-blue-800"
            onClick={() => {
              router.push(
                `/game?questions=${params.questions}&category=${params.category}&type=${params.type}&difficulty=${params.difficulty}`
              );
            }}
          >
            Play
          </button>
        </div>
      </div>
    </>
  );
};

export default home;
