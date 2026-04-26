
export interface ChatSessionApiResponse {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string;
  messages: ChatMessageApiResponse[];
}


export interface ChatSession {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string; 
  messages: ChatMessage[];
}


export interface ChatSessionUpdate {
  name: string;
}


export interface ChatSessionUpdateApiResponse {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string; 
}


export interface ChatSessionUpdateResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string; 
}

export interface ChatMessage {
  role: string;
  content: string;
  createdAt: string | any;
}


export interface ChatMessageApiResponse {
  role: string;
  content: string;
  created_at: string | any;
}


export interface ChatSessionMessageRequest {
  chatSessionId: string;
  message: string;
  domain: string;
}


export interface ChatSessionDeleted{
  chatSessionId: string;
  message: string;
}

