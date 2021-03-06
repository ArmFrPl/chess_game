import './App.css';
import Chessboard from "chessboardjsx";
import Chess from "chess.js";
import {useState} from "react";
import YoutubeEmbed from "./youtubeEmbed";

function App() {
  const url = new URL(window.location.href).pathname;
  const [chess] = useState(
    new Chess("rnqqkqnr/qqppppqq/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  const [fen, setFen] = useState(chess.fen());
  const [showVideo, setShowVideo] = useState(false);
  const {innerWidth: width, innerHeight: height} = window;
  const handleMove = (move) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);

      setFen(chess.fen());
    }
    if (chess.game_over()) {
      setShowVideo(true)
    }
  };

  const newGame = () => {
    chess.load("rnqqkqnr/qqppppqq/pppppppp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    setFen(chess.fen());
  }
  return (
    <div className="App">
      {['/team1', '/team2'].includes(url) ? (<>
        <button className="button button1" onClick={newGame}>new Game</button>
        {!showVideo ? <Chessboard
          width={Math.min(width, height) - 80}
          position={fen}
          boardStyle={{
            margin: 'auto'
          }}
          onDrop={(move) =>
            handleMove({
              from: move.sourceSquare,
              to: move.targetSquare,
              promotion: "q",
            })
          }
        /> : <div>
          {url === '/team1' && <h1>Գնացեք դեպի ճաշարան</h1>}
        </div>}
      </>) : <h1>Բարի գալուստ ֆրիզբիի ճամբար</h1>}
      {url === '/mmm1' && <h2>Գնացեք դեպի ճաշարան</h2>}
      {url === '/mmm2' && <YoutubeEmbed embedId="XJdolQZedXY"/>}
    </div>
  );
}

export default App;
