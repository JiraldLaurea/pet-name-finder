export interface PetName {
    id: string;
    title: string;
    definition: string;
    gender: string[];
    categories: string[];
}

export interface NamesResponse {
    data: PetName[];
}

export interface FilterGroup {
    id: string;
    label: string;
    categoryIds: string[];
}

export type Letter = string;

export interface LettersResponse {
    data: Letter[];
}

export interface Category {
    id: string;
    name: string;
    description?: string | null;
}

export interface CategoriesResponse {
    data: Category[];
    filterGroups: FilterGroup[];
}
