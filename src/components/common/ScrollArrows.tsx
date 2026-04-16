import { RxCaretUp, RxCaretDown } from "react-icons/rx";

interface ScrollArrowsProps {
    onScrollUp: () => void;
    onScrollDown: () => void;
    show: boolean;
    height?: string;
}

function ScrollArrows({
    onScrollUp,
    onScrollDown,
    show,
    height = "h-[420px]",
}: ScrollArrowsProps) {
    if (!show) return null;

    return (
        <div className={`flex flex-col justify-between items-center ${height}`}>
            <button
                aria-label="Scroll up"
                onClick={onScrollUp}
                className="cursor-pointer text-red-600 text-5xl leading-none hover:opacity-70"
            >
                <RxCaretUp />
            </button>

            <button
                aria-label="Scroll down"
                onClick={onScrollDown}
                className="cursor-pointer text-red-600 text-5xl leading-none hover:opacity-70"
            >
                <RxCaretDown />
            </button>
        </div>
    );
}

export default ScrollArrows;
