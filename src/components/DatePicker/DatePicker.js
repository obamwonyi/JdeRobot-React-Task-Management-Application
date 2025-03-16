import React, { useState } from 'react';
import styles from './DatePicker.module.css';
import {ReactComponent as Navigator} from "../../assets/icons/datenavigator.svg";

export default function DatePicker({ onDateSelect })
{
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    // Get days in month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    // Format date as YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Navigate to previous month
    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    // Navigate to next month
    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    // Handle date selection
    const handleDateClick = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
        if (onDateSelect) {
            onDateSelect(formatDate(newDate));
        }
    };

    // Render calendar
    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
        const days = [];

        // Add empty cells for days before the first day of month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className={styles.emptyCell}></div>);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isSelected = selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();

            days.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`${styles.dayCell} ${isSelected ? styles.selectedDay : ''}`}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    // Format month name
    const formatMonth = (date) => {
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    return (
        <div className={styles.datePicker}>
            {/* Header */}
            <div className={styles.header}>
                <button onClick={prevMonth} className={styles.navButton}>
                    <Navigator className={styles.navButtonSvgLeft} />
                </button>
                <h2 className={styles.monthTitle}>{formatMonth(currentMonth)}</h2>
                <button onClick={nextMonth} className={styles.navButton}>
                    <Navigator className={styles.navButtonSvg} />
                </button>
            </div>

            {/* Weekdays */}
            <div className={styles.weekdays}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className={styles.weekday}>
                        {day}
                    </div>
                ))}
            </div>

            {/* Days */}
            <div className={styles.calendarGrid}>
                {renderCalendar()}
            </div>

            {/* Selected date display */}
            {selectedDate && (
                <div className={styles.selectedDate}>
                    Selected: {formatDate(selectedDate)}
                </div>
            )}
        </div>
    );
};

