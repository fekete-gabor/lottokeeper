export const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 w-full p-4 flex justify-center">
      <div className="">
        <h2 className="text-white">
          created by{" "}
          <a
            href="http://feketegabor.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-orange-300 hover:text-orange-500 ease-in-out duration-300"
          >
            Fekete Gábor
          </a>
          , {date}
        </h2>
      </div>
    </footer>
  );
};
