export interface CategoryResponse {
    id: number;
    name: string;
};

export interface ProductResponse {
    id: string;
    description: string;
    price: number;
    available: boolean;
    img:string;
    category: CategoryResponse;
}

export enum OPTIONS{
    SAVE='save',
    UPDATE='update',
    DELETE='delete',
    DISABLE='disable'
}

export interface ImageResponse {
    filename: string,
    url: string
}