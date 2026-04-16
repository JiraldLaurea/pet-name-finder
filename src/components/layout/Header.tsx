interface HeaderProps {
    selectedGender: "M" | "F" | "BOTH";
    onGenderChange: (gender: "M" | "F" | "BOTH") => void;
}

function Header({ selectedGender, onGenderChange }: HeaderProps) {
    const buttons = [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
        { label: "Both", value: "BOTH" },
    ] as const;

    return (
        <header className="border-b border-gray-300 bg-[#f7f6f3] py-10">
            <div className="flex flex-col items-center">
                <h2 className="text-4xl font-serif mb-6">
                    Choose your pet's gender
                </h2>

                <div className="flex gap-4">
                    {buttons.map((button) => (
                        <button
                            key={button.value}
                            onClick={() => onGenderChange(button.value)}
                            className={`cursor-pointer px-6 py-3 rounded border ${
                                selectedGender === button.value
                                    ? "bg-red-600 text-white border-red-600"
                                    : "bg-white text-red-600 border-red-600"
                            }`}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default Header;
