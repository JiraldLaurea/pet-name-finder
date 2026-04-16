import { useRef } from "react";
import type { PetName } from "../../types";
import ScrollArrows from "../common/ScrollArrows";

interface NamePreviewProps {
    pet: PetName | null;
    names: PetName[];
    onSelectName: (pet: PetName) => void;
}

function NamePreview({ pet, names, onSelectName }: NamePreviewProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    if (!pet) return null;

    function scrollUp() {
        scrollRef.current?.scrollBy({
            top: -120,
            behavior: "smooth",
        });
    }

    function scrollDown() {
        scrollRef.current?.scrollBy({
            top: 120,
            behavior: "smooth",
        });
    }

    return (
        <div className="grid grid-cols-2 gap-16 items-center mt-12">
            {/* Pet Image */}
            <div className="flex justify-center">
                <img src="/img/both.png" alt="Pet" className="object-contain" />
            </div>

            <div className="flex justify-center items-center h-105">
                <div className="grid grid-cols-[1fr_auto] h-full gap-8 items-center">
                    {/* Column 1: Names */}
                    <div
                        ref={scrollRef}
                        className="h-105 overflow-y-auto scrollbar-hide"
                    >
                        <div className="flex flex-col items-center justify-center space-y-2 min-h-full">
                            {names.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => onSelectName(item)}
                                    className={`cursor-pointer font-serif text-gray-400 hover:text-red-600 text-4xl lg:text-6xl leading-none text-center transition-colors`}
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Arrows */}
                    <ScrollArrows
                        show={names.length > 6}
                        onScrollUp={scrollUp}
                        onScrollDown={scrollDown}
                    />
                </div>
            </div>
        </div>
    );
}

export default NamePreview;
