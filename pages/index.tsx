import { useRouter } from "next/router";

import React, { useState } from "react";

export interface params {
  questions: string;
  category: string;
  type: string;
  difficulty: string;
}

export default function Home() {
  const router = useRouter();
  const [params, getParams] = useState<params>({
    category: "",
    difficulty: "",
    questions: "5",
    type: "",
  });
  const categories = [
    {
      key: "9",
      category: "General knowledge",
    },
    {
      key: "10",
      category: "Books",
    },
    {
      key: "11",
      category: "Film",
    },
    {
      key: "12",
      category: "Music",
    },
    {
      key: "13",
      category: "Musicals",
    },
    {
      key: "14",
      category: "Television",
    },
    {
      key: "15",
      category: "Video games",
    },
    {
      key: "16",
      category: "Board games",
    },
    {
      key: "17",
      category: "Science and nature",
    },
    {
      key: "18",
      category: "Computer",
    },
    {
      key: "19",
      category: "Mathematics",
    },
    {
      key: "20",
      category: "Mithology",
    },
    {
      key: "21",
      category: "Sports",
    },
    {
      key: "22",
      category: "Geography",
    },
    {
      key: "23",
      category: "History",
    },
    {
      key: "24",
      category: "Politics",
    },
    {
      key: "25",
      category: "Art",
    },
    {
      key: "26",
      category: "Celebrities",
    },
    {
      key: "27",
      category: "Animals",
    },
    {
      key: "28",
      category: "Vehicles",
    },
    {
      key: "29",
      category: "Comics",
    },
    {
      key: "30",
      category: "Gadgets",
    },
    {
      key: "31",
      category: "Anime and manga",
    },
    {
      key: "32",
      category: "Cartoon and animation",
    },
  ];
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-slate-600">
      <div className="w-[920px] m-4 flex flex-col items-center phone:w-full phone:m-4 phone:text-center border-1 border-slate-400 p-4 rounded-lg bg-slate-400">
        <h1 className="m-10 font-extrabold text-6xl text-slate-50 phone:text-5xl">
          Quiz for plebs!
        </h1>
        <div className="flex justify-center my-10 w-full phone:flex-col phone:mb-0 phone:h-[110px] phone:justify-evenly text-slate-600 text-lg font-semibold">
          <select
            className="px-2 py-2 rounded-lg border-[2px] border-slate-400 focus:outline-none shadow-lg"
            onChange={(el) =>
              getParams({ ...params, category: el.target.value })
            }
          >
            <option value="none" disabled selected hidden>
              Pick Category:
            </option>
            <option value="">Any</option>
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.category}
              </option>
            ))}
          </select>
          <select
            className="px-2 py-2 rounded-lg border-[2px] border-slate-400 focus:outline-none shadow-lg"
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
        <div className="flex  justify-center w-full phone:flex-col phone:h-[110px] phone:justify-evenly text-slate-600 text-lg font-semibold">
          <select
            className="px-2 py-2 rounded-lg border-[2px] border-slate-400 focus:outline-none shadow-lg"
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
            className="px-2 py-2 rounded-lg border-[2px] border-slate-400 focus:outline-none shadow-lg"
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
          className="mt-14 w-[200px] h-[50px] border-2 border-blue-400 bg-blue-400 text-white shadow-lg font-bold rounded-md active:bg-blue-800"
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
  );
}
