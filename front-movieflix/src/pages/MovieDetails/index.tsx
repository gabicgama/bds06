import Reviews from "components/Reviews";
import { AxiosRequestConfig } from "axios";
import { Movie } from "types/movie";
import { requestBackend } from "util/requests";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { hasAnyRole } from "util/auth";
import "./styles.css";

type UrlParams = {
  movieId: string;
};

type FormData = {
  review: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [review, setReview] = useState(false);

  const [movie, setMovie] = useState<Array<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      setMovie(response.data);
      setReview(false);
    });
  }, [movieId, review]);

  const [formData, setFormData] = useState<FormData>({
    review: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params: AxiosRequestConfig = {
      method: "POST",
      url: "/reviews",
      withCredentials: true,
      data: {
        text: formData.review,
        movieId: movieId,
      },
    };
    setReview(true);
    requestBackend(params);
  };

  return (
    <div className="movie-details-container">
      <h1>Tela detalhes do filme id: {movieId}</h1>
      {hasAnyRole(["ROLE_MEMBER"]) && (
        <div className="card-revirew-container">
          <form onSubmit={handleSubmit}>
            <div className="form-review-container">
              <input
                type="text"
                name="review"
                value={formData.review}
                className="search-input"
                placeholder="Deixe sua avaliação aqui"
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary">
                Salvar avaliação
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="botton-card-review-container">
        {movie?.map((movie) => (
          <div key={movie.id}>
            <Reviews author={movie.user.name} text={movie.text} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
