import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";


export default function Login() {
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  const goToLogin  = () => {
    // aqui você pode validar login
    navigate("/landing-page");
  };

  return (

    
   <div className="auth">
     {/* BOTÃO SAIR */}
     <button className="btn-logout" onClick={goToLogin}>
       Voltar
     </button>

     <div className={`container ${active ? "active" : ""}`}>

      {/* SIGN UP */}
      <div className="form-container sign-up">
        <form>
          <h1>Criar uma conta</h1>

          <div className="social-container">
            <a href="#"><i className="fab fa-google-plus-g"></i></a>
           <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-whatsapp"></i></a>
          </div>

          <span>Cadastre-se com seu Email</span>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          <button type="button">Inscrever-se</button>
        </form>
      </div>

      {/* SIGN IN */}
      <div className="form-container sign-in">
        <form>
          <h1>Login</h1>

          <div className="social-container">
            <a href="#"><i className="fab fa-google-plus-g"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-whatsapp"></i></a>
          </div>

          <span>Insira seu Email</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          <a href="#">Esqueceu sua senha?</a>
          <button type="button">Entrar</button>
        </form>
      </div>

      {/* TOGGLE */}
      <div className="toggle-container">
        <div className="toggle">

          <div className="toggle-panel toggle-left">
            <h1>Bem-vindo de volta!</h1>
            <p>Acesse sua conta para continuar</p>
            <button className="hidden" onClick={() => setActive(false)}>
              Entrar
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Olá, amigo!</h1>
            <p>Cadastre-se com seus dados pessoais para usar todos os recursos do Sistema.</p>
            <button className="hidden" onClick={() => setActive(true)}>
              Inscrever-se
            </button>
          </div>

        </div>
      </div>

    </div>
   </div>
  );
}