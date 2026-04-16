import { useEffect, useMemo, useState } from "react";
import Header from "../components/layout/Header";
import FilterBar from "../components/layout/FilterBar";
import AlphabetBar from "../components/layout/AlphabetBar";
import NameList from "../components/names/NameList";
import NameDetail from "../components/names/NameDetail";
import { fetchCategories, fetchNames } from "../services/api";
import type { PetName } from "../types";
import NamePreview from "../components/names/NamePreview";

function HomePage() {
    const [names, setNames] = useState<PetName[]>([]);
    const [selectedGender, setSelectedGender] = useState<"M" | "F" | "BOTH">(
        "M",
    );
    const [selectedLetter, setSelectedLetter] = useState("A");
    const [selectedName, setSelectedName] = useState<PetName | null>(null);
    const [categoriesMap, setCategoriesMap] = useState<Record<string, string>>(
        {},
    );
    const [showDetails, setShowDetails] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const filteredNames = useMemo(() => {
        return names.filter((pet) => {
            const genderMatch =
                selectedGender === "BOTH"
                    ? true
                    : pet.gender.includes(selectedGender);

            const letterMatch =
                pet.title.charAt(0).toUpperCase() === selectedLetter;

            const categoryMatch =
                selectedCategories.length === 0
                    ? true
                    : pet.categories.some((catId) =>
                          selectedCategories.includes(catId),
                      );

            return genderMatch && letterMatch && categoryMatch;
        });
    }, [names, selectedGender, selectedLetter, selectedCategories]);

    useEffect(() => {
        async function loadData() {
            // Load names
            const namesResponse = await fetchNames();
            setNames(namesResponse.data);

            // Load categories
            const categoriesResponse = await fetchCategories();

            const map: Record<string, string> = {};

            categoriesResponse.data.forEach((cat) => {
                map[cat.id] = cat.name;
            });

            setCategoriesMap(map);
        }

        loadData();
    }, []);

    useEffect(() => {
        setShowDetails(false);

        if (filteredNames.length > 0) {
            setSelectedName(filteredNames[0]);
        }
    }, [filteredNames]);

    return (
        <div className="min-h-screen bg-[#f7f6f3]">
            <Header
                selectedGender={selectedGender}
                onGenderChange={setSelectedGender}
            />

            <FilterBar
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
            />

            <main className="max-w-7xl mx-auto px-6 py-10">
                <h1 className="text-3xl lg:text-5xl font-serif mb-10 text-[#2f2b28]">
                    All pets names
                </h1>

                <AlphabetBar
                    selectedLetter={selectedLetter}
                    onLetterChange={setSelectedLetter}
                />

                {filteredNames.length === 0 ? (
                    <div className="py-24 text-center">
                        <h2 className="text-4xl font-serif text-gray-500 mb-4">
                            No pet names found
                        </h2>
                        <p className="text-lg text-gray-400">
                            Try changing your filters or selecting another
                            letter.
                        </p>
                    </div>
                ) : (
                    <>
                        {showDetails ? (
                            <div className="flex gap-16 mt-16">
                                <NameList
                                    names={filteredNames}
                                    selectedName={selectedName}
                                    onSelectName={(pet) => {
                                        setSelectedName(pet);
                                        setShowDetails(true);
                                    }}
                                />

                                <NameDetail
                                    pet={selectedName}
                                    categoriesMap={categoriesMap}
                                    allNames={names}
                                />
                            </div>
                        ) : (
                            <div className="mt-16">
                                <NamePreview
                                    pet={selectedName}
                                    names={filteredNames}
                                    onSelectName={(pet) => {
                                        setSelectedName(pet);
                                        setShowDetails(true);
                                    }}
                                />
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default HomePage;
