
import axios from "axios";
import "./Details.css";
import Modal from "./Modal";
import { useEffect, useState } from "react";

var data;
const Details = (props) => {
  const [about, setAbout] = useState("");
  const [climate, setClimate] = useState("");
  const [history, setHistory] = useState("");
  const [food, setFood] = useState("")

  useEffect(()=>{
    if(localStorage.getItem("SelectedDestination")){
        data = JSON.parse(localStorage.getItem("SelectedDestination"))
    }
    updateDestination();
  }, [])

  const updateDestination=()=>{
    //setDestination({data});
    setAbout(data.about);
    setClimate(data.climate);
    setFood(data.food);
    setHistory(data.history);

  }

  return (
    <Modal className="modal-overlay">
      <div className="detail-container">
      <button type="button" onClick={props.hidepage} className="close-btn">
          Close
      </button>
        <div className="about">
          <p>{about}</p>
        </div>
        <div className="climate">
          <p>{climate}</p>
        </div>
        <div className="history">
          <p>{history}</p>
        </div>
        <div className="food">
          <p>{food}</p>
        </div>
        
      </div>
    </Modal>
  );
};
export default Details;
