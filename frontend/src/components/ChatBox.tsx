import React from 'react';

const ChatBox = ({ messages, chatInput, setChatInput, onSend }: any) => (
  <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
    <h3 className="text-xl font-bold mb-4 text-gray-800">Chat</h3>
    <div className="h-48 overflow-y-auto mb-2 space-y-2 bg-gray-50 rounded-lg p-3 border border-gray-200">
      {messages.map((msg: any, i: number) => (
        <div key={i} className="text-sm text-gray-800">
          <span className="font-bold text-purple-600">{msg.playerName}: </span>
          <span className="text-gray-700">{msg.message}</span>
        </div>
      ))}
    </div>
    <div className="flex gap-2">
      <input
        type="text"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSend()}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800"
        placeholder="Type a message..."
      />
      <button
        onClick={onSend}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
      >
        Send
      </button>
    </div>
  </div>
);

export default ChatBox;
