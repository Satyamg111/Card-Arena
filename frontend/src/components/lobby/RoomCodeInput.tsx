import React from 'react';

interface Props {
  roomCode: string;
  setRoomCode: (value: string) => void;
  disabled: boolean;
}

const RoomCodeInput: React.FC<Props> = ({ roomCode, setRoomCode, disabled }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">Room Code</label>
    <input
      type="text"
      value={roomCode}
      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 uppercase"
      placeholder="Enter room code"
      disabled={disabled}
      maxLength={6}
    />
  </div>
);

export default RoomCodeInput;
