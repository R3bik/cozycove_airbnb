import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";

const AccountPage = () => {
  const [home, setHome] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  //logout functionality:
  async function logOut() {
    await axios.post("/logout");
    setHome("/");
    setUser(null);
  }

  if (!ready) {
    return "loading....";
  }
  if (ready && !user && !home) {
    return <Navigate to={"/login"} />;
  }
  if (home) {
    return <Navigate to={home} />;
  }

  //we assign active subpages:
  function linkClases(type = null) {
    let classes = "py-2 px-6 inline-flex gap-2 ";
    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes += "bg-primary text-white rounded-full";
    } else {
      classes += "bg-gray-300 rounded-full";
    }
    return classes;
  }
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-8 mb-10">
        <Link to={"/account/profile"} className={linkClases("profile")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
              <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
              <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21" />
            </g>
          </svg>
          Profile
        </Link>
        <Link to={"/account/bookings"} className={linkClases("bookings")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .825-.587 1.413T18 22zm0-2h12V4h-2v7l-2.5-1.5L11 11V4H6zm0 0V4zm5-9l2.5-1.5L16 11l-2.5-1.5z"
            />
          </svg>
          Bookings
        </Link>
        <Link to={"/account/places"} className={linkClases("places")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 14 14"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 10.5v3m2-13l-8.5 13h13L5 .5"
            />
          </svg>
          Accommodations
        </Link>
      </nav>
      {/* when profile page is active: */}
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto py-6 space-y-8">
          Logged in as {user.userName}
          <br />
          <div className=" flex flex-col space-y-4">
            <span>Username : {user.userName}</span>
            <span>Email : {user.email}</span>
          </div>
          <br />
          <button onClick={logOut} className="primary max-w-[5rem]">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default AccountPage;
