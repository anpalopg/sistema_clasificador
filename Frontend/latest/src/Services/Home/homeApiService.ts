// ------------------------------------------------------
// Nombre del archivo: chatServiceApi.ts
// Descripción: Servicio que encapsula las llamadas HTTP a la API de chat.
// Incluye operaciones CRUD sobre sesiones y envío de mensajes.
// ------------------------------------------------------

/*
  Importaciones
  - axios: cliente HTTP para realizar peticiones.
  - Tipos: ChatSession, ChatMessage y respuestas tipadas de la API.
*/

import axios from 'axios';
import type { ChatSessionDeleted, ChatSession, ChatSessionApiResponse, ChatSessionUpdate, ChatSessionUpdateResponse, ChatSessionUpdateApiResponse } from './Interfaces';
import type { ChatMessage, ChatMessageApiResponse } from './Interfaces';


const  BACKEND_URL = import.meta.env.VITE_API_URL;
console.log("backend url",BACKEND_URL);

const chatServiceApi = axios.create({
  baseURL: `${BACKEND_URL}/chat`
})


/*
  Función: listChatSessions
  - Obtiene todas las sesiones de chat desde la API.
  - Mapea la respuesta para normalizar nombres de campos.
*/

export const listChatSessions = async (): Promise<ChatSession[]> => {
  const response = await chatServiceApi.get<ChatSessionApiResponse[]>("/list_chat_sessions")


  return response.data.map((session) => ({
    id: session._id,
    name: session.name,
    createdAt: session.created_at,
    updatedAt: session.updated_at,
    messages: session.messages.map(
      (message) => {
        return {
          role: message.role,
          content: message.content,
          createdAt: message.created_at

        }
      }
    )

  }))
}


/*
  Función: createChatSession
  - Crea una nueva sesión de chat en la API.
  - Devuelve la sesión creada con sus datos normalizados.
*/

export const createChatSession = async (): Promise<ChatSession> => {
  const result = await chatServiceApi.post<ChatSessionApiResponse>("/create_chat_session",{})

  const formated_messages = result.data.messages.map((message) => {
    return {
      role: message.role,
      content: message.content,
      createdAt: message.created_at

    }
  })
  return {
    id: result.data._id,
    name: result.data.name,
    createdAt: result.data.created_at,
    updatedAt: result.data.updated_at,
    messages: formated_messages
  }

}

/*
  Función: deleteChatSession
  - Elimina una sesión de chat por ID.
  - Devuelve un string con el resultado de la operación.
*/

export const deleteChatSession = async (id: string): Promise<ChatSessionDeleted> => {
  const result = await chatServiceApi.delete<string>(`/delete_chat_session/${id}`)
  return {
    chatSessionId: id,
    message: result.data
  }

}


/*
  Función: updateChatSessionName
  - Actualiza el nombre de una sesión de chat.
  - Recibe el ID y un objeto con el nuevo nombre.
  - Devuelve la sesión actualizada.
*/

export const updateChatSessionName = async (id: string, chatSession: ChatSessionUpdate): Promise<ChatSessionUpdateResponse> => {
  const result = await chatServiceApi.patch<ChatSessionUpdateApiResponse>(`update_chat_session_name/${id}`, chatSession)
  return {
    id: result.data._id,
    name: result.data.name,
    createdAt: result.data.created_at,
    updatedAt: result.data.updated_at

  }
}



// ________________________________________________________

/*
  Función: SendChatMessage
  - Envía un mensaje a una sesión de chat.
  - Recibe el ID de la sesión y el contenido del mensaje.
  - Devuelve un array de mensajes formateados.
*/


export const sendChatMessage = async (chat_session_id: string, message: string ,domain:string | null =null) : Promise<{id: string, messages: ChatMessage[]}> => {
  const response = await chatServiceApi.post<ChatMessageApiResponse[]>("/send_message", {
    chat_session_id, message, domain
  })
  console.log("api", response.data);
  console.log("status",response.status);
  console.log("status text",response.statusText);
  

  const formated_messages =  response.data.map((message) => {
    return {
      role: message.role,
      content: message.content,
      createdAt: message.created_at

    }
  })
  return {
  id: chat_session_id,
  messages: formated_messages
 };
 
}