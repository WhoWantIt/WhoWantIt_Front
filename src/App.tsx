import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./router/Router";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <RoutesConfig />
      </Router>
    </>
  );
}

export default App;
