import Link from "next/link";
import { useRouter } from "next/router";

const Modal: React.FC<{ points: number }> = ({ points }) => {
  const router = useRouter();
  return (
    <>
      <div className="w-[100vw] h-[100vh] absolute z-10 bg-[rgba(0,0,0,0.4)] flex justify-center items-center">
        <div className="w-[30vw] h-[30vh] bg-blue-500 rounded-lg flex justify-center items-center flex-col phone:w-full phone:text-center phone:m-2">
          <p className="text-white font-bold text-2xl mb-8">
            {points === 0
              ? "U suck"
              : points === 1
              ? "Congratulation u scored 1 point :("
              : `Congratulation u scored ${points} points nerd >:)`}
          </p>
          <button
            onClick={() => router.replace("/")}
            className="w-[200px] h-[50px] border-2 border-blue-400 bg-blue-400 text-white shadow-lg font-bold rounded-md active:bg-blue-800"
          >
            Go hom kid!
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
