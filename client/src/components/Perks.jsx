import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faCar,
  faPaw,
  faSwimmingPool,
  faShieldAlt,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

const Perks = ({ selected, onChange }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg mt-4">Perks</h2>
      <p className="text-gray-500 text-sm">
        Select all the perks of your place
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-2 mt-2">
        <label className="border p-4 flex rounded-2xl gap-2 items-center justify-start text-sm">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faWifi} /> Free Wi-Fi
          </span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center justify-start text-sm">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCar} /> Parking space
          </span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center justify-start text-sm">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPaw} /> Pets allowed
          </span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center justify-start text-sm">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faSwimmingPool} /> Pool access
          </span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center justify-start text-sm">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faShieldAlt} /> Security surveillance
          </span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center justify-start text-sm">
          <input type="checkbox" />
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faTv} /> TV
          </span>
        </label>
      </div>
    </div>
  );
};

export default Perks;
