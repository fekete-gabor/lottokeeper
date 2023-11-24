import notFound from "../assets/not_found.svg";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex w-full h-screen relative">
      <div className="h-full w-full flex flex-col justify-center items-end lg:translate-x-[5rem]">
        <div className="bg-slate-100 p-6 m-2 rounded-md text-center">
          <h1 className="text-[3rem]">a keresett oldal nem található</h1>
          <button
            className="text-[2rem] capitalize bg-blue-200 hover:bg-blue-400 rounded-md p-2 mt-4 cursor-pointer duration-300 ease-in-out hover:text-white"
            onClick={() => navigate("/")}
          >
            vissza a főoldalra
          </button>
        </div>
      </div>
      <div className="h-full w-full lg:p-8 lg:-translate-x-[5rem] absolute md:relative z-[-1]">
        <img src={notFound} alt="404" className="w-full h-full object-cover" />
      </div>
    </section>
  );
};
