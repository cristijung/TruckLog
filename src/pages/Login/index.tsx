import { useContext } from 'react';
import { LoginContainer } from './styles';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../shared/context/AuthContext';
import { Link } from 'react-router-dom';
import { FaHome, BsArrowLeft } from 'react-icons/all';
import { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

import truckImg from '../../assets/truck.png';
import bgObject1Img from '../../assets/bg-item3.svg';
import bgObject2Img from '../../assets/bg-item2.svg';
import InterestModal from '../../shared/components/User/Modals/LoginModal/InterestModal';

export const Login = () => {
  const { register, handleSubmit } = useForm({});
  const { handleLogin } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <form
        onSubmit={handleSubmit(async (data) => {
          const isOk = await handleLogin({
            login: data.login,
            senha: data.senha,
          });

          !isOk &&
            (document.querySelector('.error')?.classList.add('visible'),
            document.querySelectorAll('.input-container').forEach((input) => {
              input.classList.add('outlined-error');
            }));
        })}
      >
        <div className="form-section">
          <h1>Login</h1>
          <h3>Insira seus dados de acesso:</h3>

          <div className={`input-container `}>
            <i className="ph ph-envelope"></i>
            <input
              type="text"
              placeholder="login"
              id="login"
              required
              {...register('login')}
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

          <div className="input-container visible">
            <i className="ph ph-lock-key"></i>
            <input
              type="password"
              id="senha"
              placeholder="senha"
              required
              {...register('senha')}
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

          <p className="error">*Login ou senha inválidos</p>
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
