export interface IProductDto {
    id:      number;
    color:   string;
    size:    string;
    price:   number;
    amount:  number;
}

export interface IProductAddDto {
    color:   string;
    size:    string;
    price:   number;
    amount:  number;
}
export interface IProductUpdateDto {
    price:   number;
    amount:  number;
}
