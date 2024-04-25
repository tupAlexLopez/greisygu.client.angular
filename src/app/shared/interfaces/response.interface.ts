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
    pageable: Pageable,
    isFirst: boolean,
    isLast: boolean,
    numberOfElements: number,
    totalPages: number
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

export interface Category {
    id:   number;
    name: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    empty:    boolean;
    unsorted: boolean;
    sorted:   boolean;
}
