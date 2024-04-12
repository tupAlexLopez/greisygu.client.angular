export interface CategoryResponse {
    id: number;
    name: string;
};

export interface ProductResponse {
    img:string;
    id: number;
    description: string;
    price: number;
    available: boolean;
    category: CategoryResponse;
}