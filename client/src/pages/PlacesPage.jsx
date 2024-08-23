import { Link, useParams } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import Perks from "../components/Perks";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedphotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");

  const [perks, setPerks] = useState([""]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuests] = useState(1);

  async function addPhotoByLink() {
    const { data: filename } = await axios.post("/upload-link", {
      link: photoLink,
    });

    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filename } = response;
        console.log(response.data);
        setAddedPhotos((prev) => {
          return [...prev, filename];
        });
      });
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/account/places/new"}
            className="bg-black  text-white py-2 px-6 text-center rounded-full inline-flex gap-2"
          >
            <svg
              color="white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="white" fill-rule="evenodd" clip-rule="evenodd">
                <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16" />
                <path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z" />
              </g>
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action == "new" && (
        <div className="">
          <form className="flex flex-col space-y-6 max-w-md mx-auto ">
            <div>
              <h2 className="text-lg  mt-4">Name of your place</h2>
              <input
                type="text"
                placeholder="Place name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <h2 className="text-lg mt-4">Address</h2>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <h2 className="text-lg mt-4">Photos</h2>
              <div className="flex   gap-2 w-full">
                <input
                  type="text"
                  placeholder={"Add using a link... .jpeg"}
                  value={photoLink}
                  onChange={(e) => setPhotoLink(e.target.value)}
                />
                <button
                  className=""
                  onClick={(e) => {
                    e.preventDefault();
                    addPhotoByLink();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#f53850"
                      d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {addedphotos.length > 0 &&
                addedphotos.map((filename) => (
                  <div key={filename} className="py-1 h-32 flex">
                    <img
                      src={"http://localhost:3001/uploads/" + filename}
                      alt="photos"
                      className="rounded-2xl w-full object-cover"
                    />
                  </div>
                ))}
            </div>
            <label className=" flex justify-center items-center cursor-pointer border text-center gap-1 bg-transparent rounded-2xl p-10 px-20 text-2xl text-gray-600">
              <input type="file" className=" hidden" onChange={uploadPhoto} />
              <FaCloudUploadAlt />
              <h3 className="text-center">Upload</h3>
            </label>

            <div className="flex flex-col  gap-2">
              <h2 className="text-lg mt-4">Description</h2>
              <textarea
                className="rounded-lg border py-4 px-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <Perks selected={perks} onChange={setPerks} />
            <div className="space-y-2">
              <h2 className="text-lg mt-4">Exta Information</h2>
              <p className="text-gray-600 text-sm">house rules, notes,etc</p>
              <textarea
                className="rounded-lg border py-4 px-4 w-full"
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
              ></textarea>
            </div>
            <div>
              <h2 className="text-lg mt-4">Check in & out time, max guests</h2>
              <div className="flex items-center gap-3 text-center mt-3">
                <div>
                  <h3>Check-in</h3>
                  <input
                    type="text"
                    placeholder="14:00"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div>
                  <h3>Check-out</h3>
                  <input
                    type="text"
                    placeholder="14:00"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
                <div>
                  <h3>Max Guests</h3>
                  <input
                    type="number"
                    placeholder="0"
                    value={maxGuest}
                    onChange={(e) => setMaxGuests(e.target.value)}
                  />
                </div>
              </div>
              <div className="items-center flex justify-center mt-4">
                <button className="bg-red-500 items-center flex justify-center px-6 py-2 rounded-full text-xl">
                  SAVE
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
