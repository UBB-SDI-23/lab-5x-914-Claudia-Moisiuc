import {Gallery} from "./Gallery";
import {Author} from "./Author";

export interface Art{
    id: number;
    title: string;
    author: Author;
    year: number;
    type: string;
    material: string;
    gallery: Gallery;
}
