import type { PetName } from "../../types";
import { IoIosMale, IoIosFemale } from "react-icons/io";

interface NameDetailProps {
    pet: PetName | null;
    categoriesMap: Record<string, string>;
    allNames: PetName[];
}

function NameDetail({ pet, categoriesMap, allNames }: NameDetailProps) {
    if (!pet) return null;

    function getGenderSymbol(gender: string[]) {
        const hasMale = gender.includes("M");
        const hasFemale = gender.includes("F");

        if (hasMale && hasFemale)
            return (
                <>
                    <IoIosMale />
                    <IoIosFemale />
                </>
            );
        if (hasMale) return <IoIosMale />;
        if (hasFemale) return <IoIosFemale />;

        return "⚥";
    }

    const categoryLabels = pet.categories
        .map((id) => categoriesMap[id])
        .filter(Boolean);

    // Generate related names dynamically
    const sortedNames = [...allNames].sort((a, b) =>
        a.title.localeCompare(b.title),
    );

    const currentIndex = sortedNames.findIndex((item) => item.id === pet.id);

    const relatedNames = sortedNames
        .slice(currentIndex + 1, currentIndex + 4)
        .map((item) => item.title);

    return (
        <div className="pt-10 flex-1">
            <div className="text-3xl mb-6 flex items-center gap-4">
                <div className="flex items-center">
                    {getGenderSymbol(pet.gender)}
                </div>{" "}
                <p>{categoryLabels.join(" - ")}</p>
            </div>

            <div className="border-t border-gray-300 pt-6 text-xl leading-relaxed text-gray-700">
                <p>
                    {pet.definition
                        .replace(/<[^>]*>/g, "")
                        .replace(/&nbsp;/g, " ")
                        .trim()}
                </p>
            </div>

            <div className="border-t border-gray-300 mt-8 pt-6">
                <h3 className="font-semibold mb-3">Related name</h3>
                <p className="text-gray-500">{relatedNames.join(" - ")}</p>
            </div>
        </div>
    );
}

export default NameDetail;
