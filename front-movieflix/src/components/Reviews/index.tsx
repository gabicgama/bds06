import "./styles.css";
import Star from "assets/images/star.png";

type Props = {
  author?: string;
  text?: string;
};

const Reviews = ({ author, text }: Props) => {
  return (
    <div className="result-container">
      <div className="result-author">
        <img src={Star} alt="star" />
        <h3>{author}</h3>
      </div>
      <div className="result-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Reviews;
