'use client';

import React, { useState } from 'react';
import { CaretLeft, CaretRight, Calendar } from '@phosphor-icons/react';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate,
  maxDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectingStart, setSelectingStart] = useState(true);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Handle date selection
  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

    // Check if date is disabled
    if (minDate && selectedDate < minDate) return;
    if (maxDate && selectedDate > maxDate) return;

    if (selectingStart) {
      onStartDateChange(selectedDate);
      onEndDateChange(null);
      setSelectingStart(false);
    } else {
      if (startDate && selectedDate < startDate) {
        // If end date is before start date, reset and set as new start
        onStartDateChange(selectedDate);
        onEndDateChange(null);
        setSelectingStart(false);
      } else {
        onEndDateChange(selectedDate);
        setSelectingStart(true);
        setIsOpen(false);
      }
    }
  };

  // Check if date is selected
  const isDateSelected = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateStr = date.toDateString();
    return (
      (startDate && startDate.toDateString() === dateStr) ||
      (endDate && endDate.toDateString() === dateStr)
    );
  };

  // Check if date is in range
  const isDateInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date > startDate && date < endDate;
  };

  // Check if date is disabled
  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  // Format display date
  const formatDateDisplay = () => {
    if (!startDate && !endDate) return 'Select dates';
    if (startDate && !endDate) {
      return `${months[startDate.getMonth()]} ${startDate.getDate()}, ${startDate.getFullYear()}`;
    }
    if (startDate && endDate) {
      return `${months[startDate.getMonth()]} ${startDate.getDate()} - ${months[endDate.getMonth()]} ${endDate.getDate()}, ${endDate.getFullYear()}`;
    }
    return 'Select dates';
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ width: '36px', height: '36px' }} />);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const selected = isDateSelected(day);
      const inRange = isDateInRange(day);
      const disabled = isDateDisabled(day);

      days.push(
        <button
          key={day}
          type="button"
          disabled={disabled}
          onClick={() => handleDateClick(day)}
          style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'DM Sans',
            fontSize: '14px',
            fontWeight: selected ? 600 : 400,
            color: disabled ? '#D1D5DB' : selected ? '#FFFFFF' : inRange ? '#1E40AF' : '#374151',
            backgroundColor: disabled
              ? 'transparent'
              : selected
              ? '#1C58F7'
              : inRange
              ? '#EFF6FF'
              : 'transparent',
            border: 'none',
            borderRadius: selected ? '8px' : '8px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!disabled && !selected) {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && !selected && !inRange) {
              e.currentTarget.style.backgroundColor = 'transparent';
            } else if (!disabled && !selected && inRange) {
              e.currentTarget.style.backgroundColor = '#EFF6FF';
            }
          }}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Input Field */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          padding: '10px 12px',
          fontFamily: 'DM Sans',
          fontSize: '14px',
          fontWeight: 400,
          color: startDate || endDate ? '#374151' : '#9CA3AF',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D1D5DB',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#1C58F7';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#D1D5DB';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={16} color="#6B7280" />
          <span>{formatDateDisplay()}</span>
        </div>
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 1000,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            minWidth: '320px',
          }}
        >
          {/* Month Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <button
              type="button"
              onClick={goToPreviousMonth}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <CaretLeft size={20} color="#374151" weight="bold" />
            </button>

            <span
              style={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                fontWeight: 600,
                color: '#17263D',
              }}
            >
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>

            <button
              type="button"
              onClick={goToNextMonth}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <CaretRight size={20} color="#374151" weight="bold" />
            </button>
          </div>

          {/* Days of Week */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 36px)',
              gap: '4px',
              marginBottom: '8px',
            }}
          >
            {daysOfWeek.map((day) => (
              <div
                key={day}
                style={{
                  width: '36px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'DM Sans',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6B7280',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 36px)',
              gap: '4px',
            }}
          >
            {generateCalendarDays()}
          </div>

          {/* Selection Hint */}
          <div
            style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #E5E7EB',
              fontFamily: 'DM Sans',
              fontSize: '12px',
              color: '#6B7280',
              textAlign: 'center',
            }}
          >
            {selectingStart ? 'Select start date' : 'Select end date'}
          </div>
        </div>
      )}
    </div>
  );
};
