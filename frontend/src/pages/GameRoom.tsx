import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socketService } from '../services/socket';
import { useGameStore } from '../store/gameStore';
import { SocketEvents, RoomStatus } from '@shared/types';
import ScoreBoard from '../components/ScoreBoard';
import GameHeader from '../components/GameHeader';
import GameWinnerModal from '../components/GameWinnerModel';
import HandWinnerNotification from '../components/HandWinnerNotification';
import TrumpDecisionNotification from '../components/TrumpDecisionNotifcation';
import ChatBox from '../components/ChatBox';
import GameTable from '../components/GameTable';
import PlayerHand from '../components/PlayerHand';

const GameRoom: React.FC = () => {
  const navigate = useNavigate();
  const {
    playerId, currentRoom, myHand, setCurrentRoom, setMyHand,
    removeCardFromHand, chatMessages, addChatMessage, reset
  } = useGameStore();

  const [chatInput, setChatInput] = useState('');
  const [currentTurn, setCurrentTurn] = useState(0);
  const [lastHandWinner, setLastHandWinner] = useState<any>(null);
  const [currentHandCards, setCurrentHandCards] = useState<any[]>([]);
  const [gameWinner, setGameWinner] = useState<any>(null);
  const [showHandWinner, setShowHandWinner] = useState(false);
  const [trumpDecision, setTrumpDecision] = useState<any>(null);
  const [showTrumpDecision, setShowTrumpDecision] = useState(false);

  /** 🔌 SOCKET HANDLERS **/
  useEffect(() => {
    if (!playerId || !currentRoom) return navigate('/');
    const socket = socketService.getSocket();
    if (!socket) return navigate('/');

    const updateRoom = (room: any) => setCurrentRoom(room);

    socket.on(SocketEvents.PLAYER_JOINED, ({ room }) => updateRoom(room));
    socket.on(SocketEvents.PLAYER_LEFT, ({ room }) => updateRoom(room));
    socket.on(SocketEvents.GAME_START, ({ room }) => updateRoom(room));

    socket.on(SocketEvents.CARD_PLAYED, ({ playerId: cardPlayerId, card, playerPosition }) => {
      setCurrentHandCards(prev => [...prev, { card, playerPosition }]);
      if (cardPlayerId === playerId) removeCardFromHand(card.id);
    });

    socket.on(SocketEvents.TURN_CHANGE, ({ currentTurn }) => setCurrentTurn(currentTurn));

    socket.on(SocketEvents.HAND_WINNER, (data) => {
      setLastHandWinner(data);
      setShowHandWinner(true);
      setTimeout(() => setShowHandWinner(false), 3000);
    });

    socket.on(SocketEvents.HAND_COMPLETE, () => {
      setTimeout(() => setCurrentHandCards([]), 3000);
    });

    socket.on(SocketEvents.NEW_HAND_START, () => {
      setCurrentHandCards([]);
      setShowHandWinner(false);
    });

    socket.on(SocketEvents.SCORE_UPDATE, ({ scores }) => {
      if (currentRoom) {
        const updatedPlayers = currentRoom.players.map(player => {
          const scoreInfo = scores.find((s: any) => s.playerId === player.id);
          return scoreInfo
            ? { ...player, handsWon: scoreInfo.handsWon, score: scoreInfo.score }
            : player;
        });
        setCurrentRoom({ ...currentRoom, players: updatedPlayers });
      }
    });

    socket.on(SocketEvents.GAME_WINNER, ({ winners, finalScores }) =>
      setGameWinner({ winners, finalScores })
    );

    socket.on(SocketEvents.RECEIVE_MESSAGE, addChatMessage);

    socket.on(SocketEvents.TRUMP_DECIDED, (data) => {
      setTrumpDecision(data);
      setShowTrumpDecision(true);
      if (currentRoom)
        setCurrentRoom({ ...currentRoom, trumpSuit: data.trumpSuit, trumpDecided: true });
      setTimeout(() => setShowTrumpDecision(false), 5000);
    });

    socket.on(SocketEvents.ADDITIONAL_CARDS_DEALT, ({ hand }) => setMyHand(hand));

    return () => socket.removeAllListeners();
  }, [playerId, currentRoom, navigate]);

  /** 🎮 HANDLERS **/
  const handlePlayCard = (cardId: string) => {
    if (!playerId || !currentRoom) return;
    const myPlayer = currentRoom.players.find(p => p.id === playerId);
    if (!myPlayer || myPlayer.position !== currentTurn)
      return alert("It's not your turn!");

    socketService.playCard({ roomId: currentRoom.id, playerId, cardId });
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      socketService.sendMessage(chatInput);
      setChatInput('');
    }
  };

  const handleLeaveRoom = () => {
    socketService.leaveRoom();
    reset();
    navigate('/');
  };

  if (!currentRoom) return null;

  const myPlayer = currentRoom.players.find(p => p.id === playerId);
  const isMyTurn = myPlayer?.position === currentTurn;
  const isWaiting = currentRoom.status === RoomStatus.WAITING;

  return (
    <div className="min-h-screen bg-gradient-to-br from-table-green to-table-felt p-4">
      <GameWinnerModal gameWinner={gameWinner} onLeave={handleLeaveRoom} />
      <HandWinnerNotification visible={showHandWinner} winner={lastHandWinner} />
      <TrumpDecisionNotification visible={showTrumpDecision} trump={trumpDecision} />
      <GameHeader
        room={currentRoom}
        isWaiting={isWaiting}
        onLeave={handleLeaveRoom}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <ScoreBoard
            players={currentRoom.players}
            currentPlayerId={playerId}
            trumpSuit={currentRoom.trumpSuit || 'spades'}
          />
          <ChatBox
            messages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            onSend={handleSendMessage}
          />
        </div>

        <div className="lg:col-span-3">
          <GameTable
            currentRoom={currentRoom}
            currentHandCards={currentHandCards}
            isWaiting={isWaiting}
            isMyTurn={isMyTurn}
            currentTurn={currentTurn}
          />
          <PlayerHand
            myHand={myHand}
            onPlayCard={handlePlayCard}
            disabled={!isMyTurn || isWaiting}
          />
        </div>
      </div>
    </div>
  );
};

export default GameRoom;
