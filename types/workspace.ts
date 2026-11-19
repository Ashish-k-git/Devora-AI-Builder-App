export type MessageRole = "user"|"assistant";

export interface Message{
    role:MessageRole; 
    content:string; 
    imageUrl?:string;
}


//files + dependencis always travel todether as one unit 
//this is what gets saved to prisma as a single Json column
export interface FileData{
    files: Record<string,{code:string}>; 
    dependencies:Record<string,string>; 
    title?: string; 
}

export interface StatusStep{
    label:string;
    status:"running"|"done"
}

export interface WorkspaceData{
    id:string; 
    title:string|null; 
    messages:unknown ; //prisma reuturns json -we parse it at runtime 
    fileData:unknown; 
}

export interface WorkspaceUser{
    id:string ; 
    credits: number; 
    plan : string; 
}

