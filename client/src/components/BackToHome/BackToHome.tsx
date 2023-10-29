import Home from "../../pages/Home/Home";
import "./BackToHome.css";
import { Link } from "react-router-dom";

function BackToHome() {
  return (
    <>
      <Link to='/' className="button">Back To Home</Link>
    </>
  );
}

export default BackToHome