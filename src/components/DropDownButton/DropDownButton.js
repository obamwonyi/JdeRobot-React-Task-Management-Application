import { useState, useRef, useEffect } from 'react';
import dropDownButtonStyles from './DropDownButton.module.css';

export default function CustomSelect({ options, onChange, defaultValue }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) onChange(option);
    };

    return (
        <div className={dropDownButtonStyles.customSelect} ref={dropdownRef}>
            <div
                className={dropDownButtonStyles.selectHeader}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption.label}</span>
                <span className={`${dropDownButtonStyles.arrow} ${isOpen ? dropDownButtonStyles.arrowUp : ''}`}>▼</span>
            </div>

            {isOpen && (
                <div className={dropDownButtonStyles.optionsContainer}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`${dropDownButtonStyles.optionItem} ${selectedOption.value === option.value ? dropDownButtonStyles.selected : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}