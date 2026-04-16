import type {
    CategoriesResponse,
    LettersResponse,
    NamesResponse,
} from "../types";

export async function fetchNames(): Promise<NamesResponse> {
    const response = await fetch("/data/names.json");
    return response.json();
}

export async function fetchCategories(): Promise<CategoriesResponse> {
    const response = await fetch("/data/categories.json");
    return response.json();
}

export async function fetchLetters(): Promise<LettersResponse> {
    const response = await fetch("/data/letters.json");
    return response.json();
}
