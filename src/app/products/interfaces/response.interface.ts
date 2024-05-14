export interface CategoryResponse {
    id: number;
    name: string;
};

export interface Product {
    id: string;
    description: string;
    price: number;
    available: boolean;
    img:string;
    category: CategoryResponse;
}

export interface Params {
    description?:string;
    category?:string;
    available?:boolean; 
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

export interface DataPage {
    pageNumber: number;
    isFirst: boolean;
    isLast: boolean;
    totalPages: number;
}

export interface ProductResponse {
    content:          Product[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    unsorted: boolean;
    sorted:   boolean;
}
