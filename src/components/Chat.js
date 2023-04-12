import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config.js'
import '../styles/Chat.css'
import SyncLoader from 'react-spinners/SyncLoader.js';

export const Chat = (props) => {
    const room = props.room;
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const messagesRef = collection(db, "messages")

    useEffect(() => {
        setLoading(true);
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryMessages,
            (snapshot) => {
                let messages = [];
                snapshot.forEach((doc) => {
                    messages.push({ ...doc.data(), id: doc.id });
                })

                setMessages(messages);
                setLoading(false);
            }
        );

        return () => {
            unsubscribe();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newMessage);

        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room,
        });

        setNewMessage("");
    }

    return (
        <div className="chat-app">
            <div className="header">
                <h1> Welcome to : {room.toUpperCase()}</h1>
            </div>
            {
                loading ? (
                    <div className="loading">
                        <SyncLoader color="#3b5998" loading={true} size={10} />
                    </div>
                ) : (<div className="messages">
                    {messages.map((message) => (
                        <div className="message" key={message.id}>
                            <span className="user">{message.user} </span>
                            {message.text}
                        </div>
                    ))}
                </div>)
            }
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    )



}