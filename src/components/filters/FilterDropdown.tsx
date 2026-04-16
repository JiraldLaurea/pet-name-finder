import type { FilterGroup } from "../../types";
import { RxCaretUp, RxCaretDown } from "react-icons/rx";

interface FilterDropdownProps {
    group: FilterGroup;
    activeGroupId: string | null;
    onToggle: (id: string | null) => void;
}

function FilterDropdown({
    group,
    activeGroupId,
    onToggle,
}: FilterDropdownProps) {
    const open = activeGroupId === group.id;

    return (
        <button
            onClick={() => onToggle(open ? null : group.id)}
            aria-expanded={activeGroupId === group.id}
            aria-controls={`dropdown-${group.id}`}
            aria-label={`Toggle ${group.label} filter`}
            className={`cursor-pointer relative flex items-center gap-2 px-2 lg:text-base text-sm lg:px-5 py-5 border-l border-r border-t -mb-px ${
                open
                    ? "border-red-500 border-b-white text-black bg-white z-10"
                    : "border-transparent text-gray-700"
            }`}
        >
            {group.label}
            <span className="text-red-600">
                {open ? <RxCaretUp /> : <RxCaretDown />}
            </span>
        </button>
    );
}

export default FilterDropdown;
