import "./App.css";
import Header from "./Components/Header/Header";
import MainControl from "./Components/MainControl/MainControl";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <MainControl />
      </ErrorBoundary>
    </>
  );
}

export default App;
