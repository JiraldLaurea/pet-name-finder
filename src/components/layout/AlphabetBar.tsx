import { useEffect, useState } from "react";
import { fetchLetters } from "../../services/api";
import type { Letter } from "../../types";

interface AlphabetBarProps {
    selectedLetter: string;
    onLetterChange: (letter: string) => void;
}

function AlphabetBar({ selectedLetter, onLetterChange }: AlphabetBarProps) {
    const [letters, setLetters] = useState<Letter[]>([]);

    useEffect(() => {
        async function loadLetters() {
            const response = await fetchLetters();
            setLetters(response.data);
        }

        loadLetters();
    }, []);

    return (
        <div className="bg-white rounded-full shadow lg:justify-between px-4 py-3 flex flex-wrap text-lg font-serif">
            {letters.map((letter) => (
                <button
                    onClick={() => onLetterChange(letter)}
                    key={letter}
                    className={`cursor-pointer w-9 h-9 rounded-full flex items-center justify-center ${
                        selectedLetter === letter
                            ? "bg-red-600 text-white"
                            : "text-[#2f2b28]"
                    }`}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}

export default AlphabetBar;
