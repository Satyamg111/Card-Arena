import React from 'react';

interface Props {
  name: string;
  setName: (value: string) => void;
  disabled: boolean;
}

const NameInput: React.FC<Props> = ({ name, setName, disabled }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder="Enter your name"
      disabled={disabled}
      maxLength={20}
    />
  </div>
);

export default NameInput;
