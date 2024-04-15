export interface CategoryResponse {
    id: number;
    name: string;
};

export interface ProductResponse {
    img:string;
    id: string;
    description: string;
    price: number;
    available: boolean;
    category: CategoryResponse;
}

export enum OPTIONS{
    SAVE='save',
    UPDATE='update',
    DELETE='delete',
    DISABLE='disable'
}