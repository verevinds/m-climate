import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Location = () => {
    return (
        <div>
          <span><FontAwesomeIcon icon={faMapMarkerAlt}/></span>
            <span>Новосибирск</span>
        </div>
    );
};

export default Location;
