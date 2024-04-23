export interface ProductRequest {
    description: string;
    price: number;
    available: boolean;
    category: { id:number };
    img?: string;
    file?: File;
}

export interface ImageRequest {
    id: number;
    img: File;
}