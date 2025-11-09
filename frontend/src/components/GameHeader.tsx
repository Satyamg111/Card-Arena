import React from 'react';

const GameHeader = ({ room, isWaiting, onLeave }: any) => {
  const copyRoomCode = () => {
    navigator.clipboard.writeText(room.code);
    alert('Room code copied!');
  };

  return (
    <div className="max-w-7xl mx-auto mb-4">
      <div className="bg-white/90 rounded-lg shadow-lg p-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isWaiting ? '⏳ Waiting for Players...' : '🎮 Game In Progress'}
          </h2>
          <p className="text-sm text-purple-600 font-semibold">
            {room.gameType === 'easy_peasy' ? '🎯 Easy-Peasy' : '🎲 Dehla-Pakad'}
          </p>
          <p className="text-gray-600">
            Room Code: <span className="font-mono font-bold">{room.code}</span>
            <button
              onClick={copyRoomCode}
              className="ml-2 text-blue-500 hover:text-blue-700 text-sm"
            >
              📋 Copy
            </button>
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-600">Players: {room.players.length}/4</p>
          <button
            onClick={onLeave}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
