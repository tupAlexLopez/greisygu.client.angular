export enum OPTIONS {
    SAVE='save',
    UPDATE='update',
    DELETE='delete',
    DISABLE='disable'
}

export interface DataDialog{ 
    option: OPTIONS, 
    data?: any 
};