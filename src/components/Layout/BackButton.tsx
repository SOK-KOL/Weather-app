import { useNavigate } from "react-router-dom";
import Back from "../../assets/icons/back.svg?react";
import "./BackButton.scss";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="back__btn" onClick={() => navigate(-1)}>
      <Back />
      <span className="back__btn-text">Назад</span>
    </button>
  );
}

export default BackButton;
