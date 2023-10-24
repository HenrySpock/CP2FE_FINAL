import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../user/UserContext'; 

const WebSocketContext = React.createContext(null);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const { user } = useContext(UserContext); 

    useEffect(() => {
        if (user && user.user_id) {
            const newSocket = io('http://localhost:5000', { query: { userId: user.user_id } });
            
            newSocket.on('connect_error', (error) => {
                console.error('Connection Error:', error);
            });

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.connected);
            });
    
            newSocket.on('disconnect', () => {
                console.log('Socket disconnected');
            });
    
            setSocket(newSocket);
    
            // newSocket.on('new-notification', (notification, ack) => {
            //     console.log('Received notification:', notification);
            //     setNotifications(prevNotifications => [...prevNotifications, notification]);
            //     ack(); 
            // });

            newSocket.on('new-notification', (notification) => {
                try {
                    console.log('Received notification:', notification);
                    setNotifications(prevNotifications => [...prevNotifications, notification]);
                    // ack({ success: true });
                } catch (error) {
                    console.error('Error processing notification:', error);
                    // ack({ error: error.message });
                }
            });
            
            // Attach the listener to newSocket instead of socket
            newSocket.on('notification-deleted', (data) => {
                const { notificationId } = data;
                console.log('notification-deleted event received with data:', data);
            
                setNotifications(prevNotifications => {
                    console.log('prevNotifications:', prevNotifications);
                    const updatedNotifications = prevNotifications.filter(notification => notification.notificationId !== notificationId);
                    console.log('updatedNotifications:', updatedNotifications);
                    return updatedNotifications;
                });
            });
    
            return () => {
                newSocket.close();
            };
        }
    }, [user]);

    return (
        <WebSocketContext.Provider value={{ socket, notifications }}>
            {children}
        </WebSocketContext.Provider>
    );
};

