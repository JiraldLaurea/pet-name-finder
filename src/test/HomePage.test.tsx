import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import { describe, test, expect, vi } from "vitest";

vi.mock("../services/api", () => ({
    fetchNames: vi.fn(() =>
        Promise.resolve({
            data: [
                {
                    id: "019c8a34-3f34-70c8-8f5e-3657bb9b328b",
                    title: "Aaron",
                    gender: "MALE",
                    categories: ["019c8a34-362d-7087-99c4-1a4eb48d3f6b"],
                },
            ],
        }),
    ),

    fetchCategories: vi.fn(() =>
        Promise.resolve({
            filterGroups: [
                {
                    id: "funny",
                    label: "Funny",
                    categoryIds: ["019c8a34-362d-7087-99c4-1a4eb48d3f6b"],
                },
            ],
            data: [
                {
                    id: "019c8a34-362d-7087-99c4-1a4eb48d3f6b",
                    name: "Unusual",
                    description: null,
                },
            ],
        }),
    ),

    fetchLetters: vi.fn(() =>
        Promise.resolve({
            data: ["A", "B", "C"],
        }),
    ),
}));

describe("HomePage filtering", () => {
    test("filters names when category selected", async () => {
        render(<HomePage />);

        // Open filter dropdown
        const funnyFilter = await screen.findByText("Funny");
        fireEvent.click(funnyFilter);

        // Select category checkbox
        const checkbox = await screen.findByLabelText("Unusual");
        fireEvent.click(checkbox);

        // Verify filtered result appears
        expect(await screen.findByText("Aaron")).toBeInTheDocument();
    });
});
