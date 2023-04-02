import { useEffect, useState } from 'react';
import { LoginContainer } from './styles';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaHome, BsArrowLeft } from 'react-icons/all';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from './LoginSchema';
import truckImg from '../../assets/truck.png';
import bgObject1Img from '../../assets/bg-item3.svg';
import bgObject2Img from '../../assets/bg-item2.svg';
import InterestModal from '../../shared/components/User/Modals/LoginModal/InterestModal';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthLoginMutation } from '../../redux/features/Authentication/authenticationSlice';
import { toast } from 'react-toastify';

export interface IUser {
  login: string;
  senha: string;
}

interface ILoginForm {
  login: string;
  senha: string;
}
interface AuthLoginOptions {
  onSuccess?: (token: string) => void;
  onError?: (error: any) => void;
}
export const Login = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const { register, handleSubmit } = useForm();
  const [authLogin] = useAuthLoginMutation();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoginSubmit = (data: ILoginForm) => {
    authLogin({
      login: data.login,
      senha: data.senha,
    })
      .unwrap()
      .then((response: any) => {
        localStorage.setItem('token', response);
        setToken(response);
        navigate('/usuario/dashboard');
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };
  return (
    <LoginContainer>
      <div className="back-button">
        <Link className="link-button" to="/">
          {isMobile ? (
            <>
              <FaHome size={45} />
            </>
          ) : (
            <>
              <BsArrowLeft size={35} />
              <span>Página Inicial</span>
            </>
          )}
        </Link>
      </div>
      <div className="bg-items">
        <img className="bg-object1" src={bgObject1Img} alt="" />
        <img className="bg-object2" src={bgObject2Img} alt="" />
        <img
          className="bg-truck"
          src={truckImg}
          alt="imagem de uma caminhão em uma extremidade com a logo do trucklog"
        />
      </div>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <div className="form-section">
          <h1>Login</h1>
          <h3>Insira seus dados de acesso:</h3>

          <div className={`input-container `}>
            <i className="ph ph-envelope"></i>
            <input
              type="text"
              placeholder="login"
              id="login"
              {...register('login')}
              name="login"
              onFocus={() => {
                document
                  .querySelectorAll('.input-container')[0]
                  .classList.add('outlined');
              }}
              onBlur={() => {
                document
                  .querySelectorAll('.input-container')[0]
                  .classList.remove('outlined');
                document
                  .querySelectorAll('.input-container')[0]
                  .classList.remove('outlined-error');
              }}
            />
          </div>
          <div className="error-yup"></div>

          <div className="input-container visible">
            <i className="ph ph-lock-key"></i>
            <input
              type="password"
              id="senha"
              placeholder="senha"
              {...register('senha')}
              required
              name="senha"
              onFocus={() => {
                document
                  .querySelectorAll('.input-container')[1]
                  .classList.add('outlined');
              }}
              onBlur={() => {
                document
                  .querySelectorAll('.input-container')[1]
                  .classList.remove('outlined');

                document
                  .querySelectorAll('.input-container')[1]
                  .classList.remove('outlined-error');
              }}
            />
          </div>
          <div className="error-yup"></div>
          <div className="button-section">
            <InterestModal />
            <a href="#">Esqueceu sua senha?</a>
            {/* <a href="#" onClick={() => setIsLogin(false)}>
                Ainda não possui uma conta?
              </a> */}
            <button type="submit">
              Entrar <i className="ph ph-sign-in"></i>
            </button>
          </div>
        </div>
      </form>
    </LoginContainer>
  );
};
