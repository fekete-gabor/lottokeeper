import { useMainContext } from "../context/main_context";

export const Navbar = () => {
  const { resetState, resetApp } = useMainContext();

  return (
    <nav className="custom-border flex justify-between p-2">
      <div className=" p-2">
        <h1 className="text-[2rem]">lottokeeper</h1>
      </div>
      <div className="flex gap-4">
        <button
          className="text-xl cursor-pointer capitalize ease-in-out duration-300 p-2 rounded-md hover:bg-red-100"
          onClick={() => resetState()}
        >
          új kör
        </button>
        <button
          className="text-xl cursor-pointer capitalize ease-in-out duration-300 p-2 rounded-md hover:bg-red-100"
          onClick={() => resetApp()}
        >
          új játék
        </button>
      </div>
    </nav>
  );
};
