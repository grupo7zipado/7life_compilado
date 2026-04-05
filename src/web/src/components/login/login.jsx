import "../login/login.css";


export default function Home() {
  return (
    <div className="home">

      {/* BACKGROUND */}
      <div className="bg-effect"></div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <h2>7-LIFE</h2>
        </div>

        <nav>
          <a href="#">Início</a>
          <a href="#">Funcionalidades</a>
          <a href="#">Solução</a>
          <a href="#">Tecnologias</a>
          <a href="#">Sobre o Projeto</a>
          <a href="#">Contato</a>
        </nav>

        <button className="btn-primary">Login</button>
      </header>

      {/* HERO */}
      <section className="hero">

        <div className="left">
          <h1>
            Monitoramento Inteligente de Sinais Vitais em Ambientes Industriais
          </h1>

          <p>
            Uma solução baseada em IoT para coleta, transmissão e análise de dados biométricos em tempo real.
          </p>

          <div className="buttons">
            <button className="btn-primary">Acessar Sistema</button>

            
          </div>

          <span>
            Utilizando sensores biométricos integrados ao ESP32 e comunicação via MQTT.
          </span>
        </div>

        <div className="right">
          <img src="/img/img_banner.png" alt="ESP32" />
        </div>

      </section>
    </div>
    
  );
}
