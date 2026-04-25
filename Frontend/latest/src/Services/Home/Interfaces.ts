// ------------------------------------------------------
// Nombre del archivo: interfaces.ts
// Descripción: Define las interfaces y tipos usados en el servicio de chat.
// ------------------------------------------------------

/*
  Interfaz: ChatSessionApiResponse
  - Representa la estructura de una sesión de chat tal como la devuelve la API.
  - Incluye identificador, nombre, fechas y lista de mensajes.
*/
export interface ChatSessionApiResponse {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string; // ⚠️ revisar consistencia, debería ser updated_at
  messages: ChatMessageApiResponse[];
}


export interface ChatSession {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string; // ⚠️ revisar consistencia, debería ser updatedAt
  messages: ChatMessage[];
}


export interface ChatSessionUpdate {
  name: string;
}


export interface ChatSessionUpdateApiResponse {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string; // ⚠️ revisar consistencia, debería ser updated_at
}


export interface ChatSessionUpdateResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string; // ⚠️ revisar consistencia, debería ser updatedAt
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

// ---------------------------e---------------------------
// Nota:
// - Hay inconsistencias en los nombres de campos: "updated_at" y "updateded_at".
//   Conviene normalizarlos a "updatedAt" en la aplicación y mapearlos desde la API.
// - Este archivo sirve como contrato tipado entre el frontend y el backend.
// ------------------------------------------------------
