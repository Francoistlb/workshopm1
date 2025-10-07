import { useState } from "react";
import Plateau from "./components/plateau/Plateau.jsx";
import Home from "./components/home/home.jsx";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home"); // 'home' ou 'plateau'
  const [gameData, setGameData] = useState({
    players: [],
    sessionCode: "",
    currentPlayer: "",
  });

  const startGame = (players, sessionCode, currentPlayer) => {
    setGameData({ players, sessionCode, currentPlayer });
    setCurrentView("plateau");
  };

  const returnToHome = () => {
    setCurrentView("home");
    setGameData({ players: [], sessionCode: "", currentPlayer: "" });
  };

  return (
    <div className="App">
      {currentView === "home" ? (
        <Home onStartGame={startGame} />
      ) : (
        <Plateau
          players={gameData.players}
          sessionCode={gameData.sessionCode}
          currentPlayer={gameData.currentPlayer}
          onReturnHome={returnToHome}
        />
      )}
    </div>
  );
}

export default App;
