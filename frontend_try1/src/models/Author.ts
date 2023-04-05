import {Art} from "./Art";
import {Gallery} from "./Gallery";

export interface Author {
    id: number;
    name: string;
    date_birth: string;
    date_death: string;
    period: string;
    originated: string;
    arts?: Art[];
    galleries?: Gallery[];
}