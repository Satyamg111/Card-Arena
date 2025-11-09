import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socketService } from '../services/socket';
import { useGameStore } from '../store/gameStore';
import { SocketEvents, GameType } from '@shared/types';

export const useLobbyActions = () => {
  const navigate = useNavigate();
  const { setPlayerId, setPlayerName, setCurrentRoom, setMyHand } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const connectSocket = () => {
    const socket = socketService.connect();
    socket.once(SocketEvents.ERROR, ({ message }) => {
      setError(message);
      setIsLoading(false);
    });
    return socket;
  };

  const handleQuickPlay = (name: string, selectedGame: GameType) => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    setError('');
    const socket = connectSocket();

    socket.once(SocketEvents.ROOM_JOINED, ({ room, playerId }) => {
      setPlayerId(playerId);
      setPlayerName(name);
      setCurrentRoom(room);
      navigate('/game');
    });

    socket.once(SocketEvents.CARDS_DEALT, ({ hand }) => setMyHand(hand));
    socketService.joinRoom({ playerName: name, gameType: selectedGame });
  };

  const handleCreatePrivateRoom = (name: string, selectedGame: GameType) => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    setError('');
    const socket = connectSocket();

    socket.once(SocketEvents.ROOM_CREATED, ({ room, playerId }) => {
      setPlayerId(playerId);
      setPlayerName(name);
      setCurrentRoom(room);
      navigate('/game');
    });

    socketService.createRoom({ playerName: name, isPublic: false, gameType: selectedGame });
  };

  const handleJoinPrivateRoom = (name: string, roomCode: string) => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!roomCode.trim()) {
      setError('Please enter room code');
      return;
    }

    setIsLoading(true);
    setError('');
    const socket = connectSocket();

    socket.once(SocketEvents.ROOM_JOINED, ({ room, playerId }) => {
      setPlayerId(playerId);
      setPlayerName(name);
      setCurrentRoom(room);
      navigate('/game');
    });

    socket.once(SocketEvents.ROOM_NOT_FOUND, () => {
      setError('Room not found');
      setIsLoading(false);
    });
    socket.once(SocketEvents.ROOM_FULL, () => {
      setError('Room is full');
      setIsLoading(false);
    });
    socket.once(SocketEvents.CARDS_DEALT, ({ hand }) => setMyHand(hand));

    socketService.joinRoom({ playerName: name, roomCode: roomCode.toUpperCase() });
  };

  return {
    error,
    isLoading,
    setError,
    handleQuickPlay,
    handleCreatePrivateRoom,
    handleJoinPrivateRoom,
  };
};
