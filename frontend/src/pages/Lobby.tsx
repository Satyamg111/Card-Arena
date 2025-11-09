import React, { useState } from 'react';
import { GameType } from '@shared/types';
import { useLobbyActions } from '../hooks/useLobbyActions';
import NameInput from '../components/lobby/NameInput';
import GameSelector from '../components/lobby/GameSelector';
import RoomCodeInput from '../components/lobby/RoomCodeInput';
import LobbyFooter from '../components/lobby/LobbyFooter';
import ErrorAlert from '../components/lobby/ErrorAlert';

const Lobby: React.FC = () => {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [selectedGame, setSelectedGame] = useState<GameType>(GameType.EASY_PEASY);
  const { error, isLoading, handleQuickPlay, handleCreatePrivateRoom, handleJoinPrivateRoom } =
    useLobbyActions();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">🃏 Card Game Lobby</h1>
        {error && <ErrorAlert message={error} />}

        <NameInput name={name} setName={setName} disabled={isLoading} />
        <GameSelector selectedGame={selectedGame} setSelectedGame={setSelectedGame} disabled={isLoading} />

        <button
          onClick={() => handleQuickPlay(name, selectedGame)}
          disabled={isLoading}
          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600"
        >
          {isLoading ? 'Joining...' : '⚡ Quick Play'}
        </button>

        <button
          onClick={() => handleCreatePrivateRoom(name, selectedGame)}
          disabled={isLoading}
          className="w-full mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600"
        >
          {isLoading ? 'Creating...' : '🔒 Create Private Room'}
        </button>

        <RoomCodeInput roomCode={roomCode} setRoomCode={setRoomCode} disabled={isLoading} />
        <button
          onClick={() => handleJoinPrivateRoom(name, roomCode)}
          disabled={isLoading}
          className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
        >
          {isLoading ? 'Joining...' : '🚪 Join Private Room'}
        </button>

        <LobbyFooter selectedGame={selectedGame} />
      </div>
    </div>
  );
};

export default Lobby;
