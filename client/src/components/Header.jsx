import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <header className="p-4 flex justify-between">
        <a href="/" className="flex items-center gap-1 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M237.9 200.09L141.85 32.18a16 16 0 0 0-27.89 0l-95.89 168a16 16 0 0 0 19.25 22.92l90.47-31h.19l90.68 31a16 16 0 0 0 19.24-23Zm-14 7.84L136 177.86V120a8 8 0 0 0-16 0v57.78l-87.88 30.16l-.12.06l95.86-168L224 208Z"
            />
          </svg>
          <span className="font-bold text-3xl">Cove</span>
        </a>
        <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 items-center shadow-gray-300 shadow-md font-semibold">
          <div>Any where</div>

          <div className="border-l pl-2 border-gray-300"> Any week</div>
          <div className="border-l border-gray-300 pl-2">Add guests</div>
          <button className="bg-primary p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 36 36"
            >
              <path
                fill="currentColor"
                d="M16.33 5.05A10.95 10.95 0 1 1 5.39 16A11 11 0 0 1 16.33 5.05m0-2.05a13 13 0 1 0 13 13a13 13 0 0 0-13-13"
                class="clr-i-outline clr-i-outline-path-1"
              />
              <path
                fill="currentColor"
                d="m35 33.29l-7.37-7.42l-1.42 1.41l7.37 7.42A1 1 0 1 0 35 33.29"
                class="clr-i-outline clr-i-outline-path-2"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
          </button>
        </div>
        <Link
          to={user ? "/account" : "/login"}
          className="flex gap-2 border border-gray-300 rounded-full py-1 px-4 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 17h14M5 12h14M5 7h14"
            />
          </svg>
          <div className="bg-gray-500 text-white rounded-full p-1 border border-gray-500 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56"
              />
            </svg>
          </div>
          {!!user && <div className="uppercase">{user.userName}</div>}
        </Link>
      </header>
    </div>
  );
};

export default Header;
