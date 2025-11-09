import React from 'react';

const HandWinnerNotification = ({ visible, winner }: any) => {
  if (!visible || !winner) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full shadow-2xl">
        <p className="text-xl font-bold">
          🎯 {winner.playerName} wins hand #{winner.handNumber}!
        </p>
        <p className="text-sm text-center">
          with {winner.winningCard?.rank} of {winner.winningCard?.suit}
        </p>
      </div>
    </div>
  );
};

export default HandWinnerNotification;
