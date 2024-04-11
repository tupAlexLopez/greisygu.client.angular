export interface CategoryResponse {
    id: number;
    name: string;
};

export interface ProductResponse {
    id: number;
    description: string;
    price: number;
    category: CategoryResponse;
}