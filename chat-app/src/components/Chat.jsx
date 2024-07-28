import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const auth = getAuth();
  const db = getFirestore();
  const messagesRef = collection(db, 'messages');

  useEffect(() => {
    const q = query(messagesRef, orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: new Date(),
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName || auth.currentUser.email
    });

    setNewMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-5">Chat</h1>
      <div className="overflow-y-auto h-80 mb-4 border rounded p-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-3">
            <p><strong>{msg.displayName}: </strong>{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="ml-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
