import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth/Login.css";
import Api from "../../service/conn2"


export default function Login() {


  // estados para controlar os campos de email, senha, mensagens de erro e loading
 const [usu_email, setEmail] = useState("");
 const [usu_senha, setSenha] = useState("");  
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);

//   async function handleLogin() {
//   if( !usu_email || !usu_senha ) {
//     setError("Preencha email e senha");
//     return;
//   }
//   try {
//   setLoading(true);
//   setError(null);

//   const response = await Api.post("/login", {
//   usu_email: usu_email,
//   usu_password: usu_senha
// });

// localStorage.setItem("token", response.data.data.token);

// navigate("/main");

//   } catch (error) {

//    const errorMessage = error.response?.data?.message || "Ocorreu um erro no login";
//    setError(errorMessage);

//   }
//   finally {
//     setLoading(false);
//   }

//  }
//  /// estado para controlar a animação de transição entre login e cadastro

  const [active, setActive] = useState(false);

  // funcion para navegar entre as páginas
  const navigate = useNavigate();
  const goToLogin  = () => {
    // aqui você pode validar login
    navigate("/landing-page");
  };
  // const teste = () => {
  //   navigate("/Main");
  // };

  //by haines
  const handleLogin = async () => {
    try {
      const response = await Api.post("/login", {
        usu_email: usu_email,
        usu_password: usu_senha
      });

      console.log("SUCESSO:", response);

    } catch (error) {
      if (error.response) {
        // 🔥 aqui está a resposta do backend (mesmo 403, 401, 500...)
        console.log("ERRO STATUS:", error.response.status);
        console.log("ERRO DATA:", error.response.data);
        console.log("ERRO COMPLETO:", error.response);
      } else {
        // erro tipo: sem internet, timeout, etc
        console.log("ERRO GERAL:", error.message);
      }
    }
  };
 
  return (

    
   <div className="auth">
     {/* BOTÃO SAIR */}
     <button className="btn-voltar" onClick={goToLogin}>
       <i className="fas fa-sign-out-alt"></i> Voltar
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
          <button type="button">Cadastrar</button>
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
          <input type="email" value={usu_email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={usu_senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
          <a href="#">Esqueceu sua senha?</a>
          <button type="button" onClick={handleLogin}>
            Entrar
          </button>
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
              Cadastrar
            </button>
          </div>

        </div>
      </div>

    </div>
   </div>
  );
}