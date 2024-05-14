export enum OPTIONS {
    SAVE='save',
    UPDATE='update',
    DELETE='delete',
    DISABLE='disable'
}

export interface DataConfirmDialog{ 
    title: string,
    description?: string 
};