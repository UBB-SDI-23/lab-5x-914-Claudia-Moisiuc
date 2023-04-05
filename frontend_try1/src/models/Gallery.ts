import {Location} from "./Location";
import {Author} from "./Author";

export interface Gallery{
    id: number;
    name: string;
    location: Location;
    theme: string;
    street: string;
    capacity: number;
    authors?: Author[];
}