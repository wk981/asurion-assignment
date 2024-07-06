import React from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface ScrollIntoViewButtonProps {
    handleClickScrollIntoView: (e: React.MouseEvent<HTMLElement>) => void;
    isBottom: boolean;
}

export const ScrollIntoViewButton = ({handleClickScrollIntoView ,isBottom}:ScrollIntoViewButtonProps) => {
    return (
        <button
            className={`absolute transition-opacity ease-in-out ${
                isBottom !== true
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
            } z-50 border bg-gray-300 rounded-full flex items-center justify-center w-10 h-10 bottom-24 left-[50%]`}
            onClick={handleClickScrollIntoView}
        >
            <div>
                <FaChevronDown />
            </div>
        </button>
    )
}
