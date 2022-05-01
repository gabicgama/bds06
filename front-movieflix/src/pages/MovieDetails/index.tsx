import Reviews from "components/Reviews";
import { AxiosRequestConfig } from "axios";
import { Review } from "types/review";
import { requestBackend } from "util/requests";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { hasAnyRole } from "util/auth";
import "./styles.css";
import { Movie } from "types/movie";
import { toast } from "react-toastify";

type UrlParams = {
  movieId: string;
};

type FormData = {
  review: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [reviewList, setReviewList] = useState(false);

  const [movieReview, setMovieReview] = useState<Array<Review>>();

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      setMovieReview(response.data);
      setReviewList(false);
    });
  }, [movieId, reviewList]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}`,
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

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
    requestBackend(params)
      .then((response) => {
        toast.info("Avaliação adicionada!");
      })
      .catch(() => {
        toast.error("Erro ao adicionar avaliação!");
      });
    setFormData({ review: "" });
    setReviewList(true);
  };

  return (
    <div className="movie-details-container">
      <div className="base-card movie-details-info-container">
        <div className="movie-details-img-container">
          <img src={movie?.imgUrl} alt={movie?.title} />
        </div>
        <div className="movie-details-texts-container">
          <h1>{movie?.title}</h1>
          <h2>{movie?.year}</h2>
          <p>{movie?.subTitle}</p>
          <div className="movie-details-synopsis-container">
            <p>{movie?.synopsis}</p>
          </div>
        </div>
      </div>
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
        {movieReview?.map((movieReview) => (
          <div key={movieReview.id}>
            <Reviews author={movieReview.user.name} text={movieReview.text} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
