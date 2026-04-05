import './App.css';
import './reset.css';
import Main from './components/main/main';
import Landing_page from './components/Landing-Page/Landing-Page';
import Login from './components/Auth/Auth';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <>
//       <Landing_page />
//     </>
//   );
// }
// export default App;




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_page />} />
        <Route path="/Auth" element={<Login />} />
        <Route path="/landing-page" element={<Landing_page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// <Main />
// <Landing_page />
// <Auth />

