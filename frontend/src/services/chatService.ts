import axios from 'axios';
import { ChatMessage, ChatResponse } from '../types/chat';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const sendMessage = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response = await axios.post<ChatResponse>(
      `${API_URL}/chat`,
      { messages }
    );
    return response.data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    return 'Sorry, there was an error processing your request.';
  }
}; 