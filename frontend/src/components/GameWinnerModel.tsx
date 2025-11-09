import React from 'react';

const GameWinnerModal = ({ gameWinner, onLeave }: any) => {
  if (!gameWinner) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">🎉 Game Over! 🎉</h2>

        <div className="space-y-4">
          {gameWinner.winners.map((winner: any, index: number) => (
            <div key={winner.id} className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg">
              <p className="text-2xl font-bold text-center">
                {index === 0 && '🥇'} {winner.name}
              </p>
              <p className="text-center text-gray-600">{winner.handsWon} hands won</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Final Scores:</h3>
          <div className="space-y-1">
            {gameWinner.finalScores?.map((score: any) => (
              <div key={score.playerId} className="flex justify-between text-sm">
                <span>{score.playerName}</span>
                <span className="font-bold">{score.handsWon} hands</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onLeave}
          className="w-full mt-6 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Back to Lobby
        </button>
      </div>
    </div>
  );
};

export default GameWinnerModal;
