import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ChatMessage, ChatSession, ChatSessionDeleted, ChatSessionUpdate, ChatSessionUpdateResponse } from "../../Services/Home/Interfaces"
import { listChatSessions, sendChatMessage as sendMessageApi, createChatSession as createChatSessionApi, deleteChatSession as deleteChatSessionApi, updateChatSessionName as updateChatSessionNameApi } from "../../Services/Home/homeApiService";

import type { RootState } from "../store";


export interface ChatSessionState {
    currentMessage: string;
    currentChatSession: ChatSession| null;
    chatSessions: ChatSession[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ChatSessionState = {
    currentMessage: '',
    currentChatSession: null,
    chatSessions: [],
    status: 'idle',
    error: null
}

//Middlewares to handle http requests
export const fetchChatSessions = createAsyncThunk( 
    'chatSession/listChatSessions',
    async (_, { rejectWithValue }) => {
        try {
            const response: ChatSession[] | void[] = await listChatSessions();
            return response;
        } catch (error) {
            return rejectWithValue('An unexpected error has');
        }
    }
)

export const createChatSession = createAsyncThunk( 
    'chatSession/createChatSession',
    async (_, { rejectWithValue }) => {
        try {
            const response: ChatSession = await createChatSessionApi();
            return response;
        } catch (error) {
            return rejectWithValue('An unexpected error has');
        }
    }
)

export const updateChatSessionName = createAsyncThunk( 
    'chatSession/updateChatSessionName',
    async ({chatSession_id, chatSession}:{chatSession_id: string, chatSession: ChatSessionUpdate}, { rejectWithValue }) => {
        try {
            const response: ChatSessionUpdateResponse = await updateChatSessionNameApi(chatSession_id, chatSession)
            return response;
        } catch (error) {
            return rejectWithValue('An unexpected error has');
        }
    }
)

export const deleteChatSession = createAsyncThunk( 
    'chatSession/deleteChatSession',
    async ({chatSession_id}:{chatSession_id: string}, { rejectWithValue }) => {
        try {
            const response: ChatSessionDeleted = await deleteChatSessionApi(chatSession_id)
            return response;
        } catch (error) {
            return rejectWithValue('An unexpected error has');
        }
    }
)

export const sendMessage = createAsyncThunk( 
    'chatSession/sendMessage',
    async ({chatSession_id, message}: { chatSession_id: string; message: string }, ) => {
        try {
            const response: {id: string, messages: ChatMessage[]} = await sendMessageApi(chatSession_id, message);
            console.log("respuesta", response);
            
            return response;
        } catch (error) {
            console.log(error);
            
           /*  return rejectWithValue('An unexpected error has ocurred'); */
        }
    }
)




//createSlice function allow us to create actions and reducers in a single function
const chatSesssionSlice = createSlice({
    name: 'chatSession',
    initialState,
    reducers: {
        currentMessageUpdated: (state, action) => {
            console.log("current message" ,action.payload);
            state.currentMessage = action.payload
        },
        currentChatSessionUpdated: (state, action) => {
            console.log("current chat" ,action.payload);

            state.currentChatSession = action.payload
        },
        
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchChatSessions.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchChatSessions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.chatSessions = action.payload
                
            })
            .addCase(createChatSession.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(createChatSession.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.chatSessions.push(action.payload)
                state.currentChatSession = action.payload
            })
            .addCase(updateChatSessionName.pending, (state) => {
                state.status = 'pending';
                
            })
            .addCase(updateChatSessionName.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const index = state.chatSessions.findIndex((session) => session.id === action.payload.id)
                if (index !== -1){
                     state.chatSessions[index].name = action.payload.name;
                     state.currentChatSession = state.chatSessions[index]
                    }
                
            })
            .addCase(deleteChatSession.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteChatSession.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.chatSessions = state.chatSessions.filter(session => session.id !== action.payload.chatSessionId)
            })
            .addCase(sendMessage.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                console.log("payload", action.payload);
                
                
                state.status = 'succeeded'
                state.currentMessage = ''
                if (action.payload){

                    const index = state.chatSessions.findIndex(session => session.id === action.payload?.id) 
                    if(index !== -1 ){
                        state.chatSessions[index].messages = action.payload.messages
                    }
                }
                
            })
          
           
            
    }
})


//Selectors 
export const selectCurretChatSession = (state: RootState) => state.chatSessions.currentChatSession
export const selectCurretChatSessionId = (state: RootState) => state.chatSessions.currentChatSession?.id
export const selectCurrentChatSessionMessages = ( state: RootState ) => {
      const chatSession =  state.chatSessions.chatSessions.find(session => session.id === state.chatSessions.currentChatSession?.id)
      return  chatSession ? chatSession.messages :  [];
}
export const selectCurrentMessage = (state: RootState) => state.chatSessions.currentMessage
export const selectChatSessions =  (state: RootState) => state.chatSessions.chatSessions

export default chatSesssionSlice.reducer;

export const {currentChatSessionUpdated, currentMessageUpdated} = chatSesssionSlice.actions;

