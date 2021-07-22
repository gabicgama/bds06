import { ReactComponent as MainImage } from "assets/images/logo.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { requestBackendLogin } from "util/requests";
import { AuthContext } from "AuthContext";
import { saveAuthData } from "util/storage";
import { getTokenData } from "util/auth";
import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const Home = () => {
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: "/movies" } };

  const { setAuthContextData } = useContext(AuthContext);

  const history = useHistory();

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
      });
  };

  return (
    <div className="home-container">
      <div className="home-content-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        <div className="home-image-container">
          <MainImage />
        </div>
      </div>
      <div className="card-form-container">
        <h1>Login</h1>
        {hasError && (
          <div className="alert alert-danger">
            Ocorreu um erro ao efetuar o login
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
            <div className="mb-4">
              <input
                {...register("username", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                type="text"
                className={`form-control base-input ${
                  errors.username ? "is-invalid" : ""
                }`}
                placeholder="Email"
                name="username"
              />
              <div className="invalid-feedback d-block">
                {errors.username?.message}
              </div>
            </div>
            <div className="mb-2">
              <input
                {...register("password", {
                  required: "Campo obrigatório",
                })}
                type="password"
                className={`form-control base-input ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                name="password"
              />
              <div className="invalid-feedback d-block">
                {errors.password?.message}
              </div>
            </div>
            <div className="login-submit">
              <button className="btn btn-primary login-button">
                Fazer login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
