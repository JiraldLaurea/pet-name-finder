import { useRef } from "react";
import { List, type RowComponentProps } from "react-window";
import type { PetName } from "../../types";
import ScrollArrows from "../common/ScrollArrows";

interface NameListProps {
    names: PetName[];
    selectedName: PetName | null;
    onSelectName: (pet: PetName) => void;
}

interface RowProps {
    names: PetName[];
    selectedName: PetName | null;
    onSelectName: (pet: PetName) => void;
}

function NameList({ names, selectedName, onSelectName }: NameListProps) {
    const listRef = useRef<any>(null);

    function scrollUp() {
        const currentOffset = listRef.current?.state?.scrollOffset || 0;

        listRef.current?.scrollTo({
            scrollTop: Math.max(currentOffset - 120, 0),
        });
    }

    function scrollDown() {
        const currentOffset = listRef.current?.state?.scrollOffset || 0;

        listRef.current?.scrollTo({
            scrollTop: currentOffset + 120,
        });
    }

    function Row({
        index,
        style,
        names,
        selectedName,
        onSelectName,
    }: RowComponentProps<RowProps>) {
        const pet = names[index];

        return (
            <div
                style={style}
                onClick={() => onSelectName(pet)}
                className={`cursor-pointer transition-colors text-3xl lg:text-5xl font-serif flex items-center ${
                    selectedName?.id === pet.id
                        ? "text-red-600"
                        : "text-gray-400 hover:text-red-600"
                }`}
            >
                {pet.title}
            </div>
        );
    }

    return (
        <div className="flex">
            <div className="grid grid-cols-[auto_1fr] gap-10 items-center">
                {/* Column 1: Arrows */}
                <ScrollArrows
                    show={names.length > 6}
                    onScrollUp={scrollUp}
                    onScrollDown={scrollDown}
                />

                {/* Column 2: Virtualized Names */}
                <List
                    listRef={listRef}
                    rowComponent={Row}
                    rowCount={names.length}
                    rowHeight={72}
                    rowProps={{
                        names,
                        selectedName,
                        onSelectName,
                    }}
                    style={{
                        height: 420,
                        width: 320,
                    }}
                    className="scrollbar-hide"
                />
            </div>
        </div>
    );
}

export default NameList;
