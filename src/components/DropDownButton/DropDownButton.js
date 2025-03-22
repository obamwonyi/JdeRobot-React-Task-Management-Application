import { useState, useRef, useEffect } from 'react';
import dropDownButtonStyles from './DropDownButton.module.css';

export default function CustomSelect({ options, onChange, defaultValue }) {
    // Create a safe initial value that won't cause errors
    const initialValue = defaultValue || (options.length > 0 ? options[0] : { value: '', label: 'Loading...' });

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(initialValue);
    const dropdownRef = useRef(null);

    // Update selectedOption when options or defaultValue changes
    useEffect(() => {
        // When options are loaded, update the selected option
        if (defaultValue) {
            setSelectedOption(defaultValue);
        } else if (options.length > 0 && !selectedOption.value) {
            setSelectedOption(options[0]);
        }
    }, [options, defaultValue, selectedOption.value]);

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

    // Disable the dropdown if there are no options
    const isEmpty = options.length === 0;

    return (
        <div className={dropDownButtonStyles.customSelect} ref={dropdownRef}>
            <div
                className={`${dropDownButtonStyles.selectHeader} ${isEmpty ? dropDownButtonStyles.disabled : ''}`}
                onClick={() => !isEmpty && setIsOpen(!isOpen)}
            >
                <span>{selectedOption.label}</span>
                <span className={`${dropDownButtonStyles.arrow} ${isOpen ? dropDownButtonStyles.arrowUp : ''}`}>▼</span>
            </div>

            {isOpen && !isEmpty && (
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