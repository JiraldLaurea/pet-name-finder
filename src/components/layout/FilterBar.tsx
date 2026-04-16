import { useEffect, useState } from "react";
import { fetchCategories } from "../../services/api";
import type { Category, FilterGroup } from "../../types";
import FilterDropdown from "../filters/FilterDropdown";
import { motion, AnimatePresence } from "framer-motion";

interface FilterBarProps {
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
}

function FilterBar({ selectedCategories, onCategoryChange }: FilterBarProps) {
    const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

    useEffect(() => {
        async function loadFilters() {
            const data = await fetchCategories();
            setFilterGroups(data.filterGroups);
            setCategories(data.data);
        }

        loadFilters();
    }, []);

    const activeGroup = filterGroups?.find(
        (group) => group.id === activeGroupId,
    );

    function toggleCategory(categoryId: string) {
        if (selectedCategories.includes(categoryId)) {
            onCategoryChange(
                selectedCategories.filter((id) => id !== categoryId),
            );
        } else {
            onCategoryChange([...selectedCategories, categoryId]);
        }
    }

    const activeGroupCategories = activeGroup
        ? categories.filter((cat) => activeGroup.categoryIds.includes(cat.id))
        : [];

    return (
        <div className="border-gray-300 bg-white">
            <div className="">
                {/* Filter Row */}
                <div className="border-b border-gray-300">
                    <div className="flex items-center max-w-7xl mx-auto">
                        <div className="px-6 lg:text-base text-sm py-5 font-semibold border-r border-gray-300">
                            Filters:
                        </div>

                        <div className="flex text-gray-700 border-r border-gray-300">
                            {filterGroups?.map((group) => (
                                <FilterDropdown
                                    key={group.id}
                                    group={group}
                                    activeGroupId={activeGroupId}
                                    onToggle={setActiveGroupId}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Shared Dropdown Panel */}
                <AnimatePresence mode="wait">
                    {activeGroup && (
                        <motion.div
                            key={activeGroup.id}
                            id={`dropdown-${activeGroup.id}`}
                            role="region"
                            aria-label={`${activeGroup.label} filter options`}
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-white"
                        >
                            <div className="px-8 py-5 lg:py-7 flex flex-wrap gap-12 max-w-7xl mx-auto">
                                {activeGroupCategories.map((cat) => (
                                    <label
                                        key={cat.id}
                                        className="flex items-center gap-3 lg:text-base text-sm text-gray-700"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(
                                                cat.id,
                                            )}
                                            onChange={() =>
                                                toggleCategory(cat.id)
                                            }
                                            className="w-4 h-4 border border-red-500 accent-red-500 rounded-none"
                                        />
                                        {cat.name}
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default FilterBar;
