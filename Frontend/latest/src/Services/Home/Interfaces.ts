export interface chatApiResponse{
    id:string;
    name:string;
    message: chatApiResponse[];
}
export interface chatSesion{
    id:string;
    name:string;
    message: chatMessage[];
}
export interface chatMessage{
    role:string;
    content: string;
}
export interface chatMessageApiResponse{
    role:string;
    content: string;
}