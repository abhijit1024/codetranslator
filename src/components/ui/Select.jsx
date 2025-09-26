// components/ui/Select.jsx - Shadcn style Select
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from 'react-dom';
import { ChevronDown, Check, X, ChevronUp } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "./Button";
import Input from "./Input";

const Select = React.forwardRef(({
    className,
    options = [],
    value,
    defaultValue,
    placeholder = "Select an option",
    multiple = false,
    disabled = false,
    required = false,
    label,
    description,
    error,
    clearable = false,
    loading = false,
    id,
    name,
    onChange,
    onOpenChange,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const selectRef = useRef(null);

    // Generate unique ID if not provided
    const selectId = id || `select-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Use all options since search is removed
    const filteredOptions = options?.filter(option => !option.hidden) || [];

    // Get selected option(s) for display
    const getSelectedDisplay = () => {
        if (!value) return placeholder;

        if (multiple) {
            const selectedOptions = options?.filter(opt => value?.includes(opt?.value));
            if (selectedOptions?.length === 0) return placeholder;
            if (selectedOptions?.length === 1) return selectedOptions?.[0]?.label;
            return `${selectedOptions?.length} items selected`;
        }

        const selectedOption = options?.find(opt => opt?.value === value);
        return selectedOption ? selectedOption?.label : placeholder;
    };

    const updatePosition = () => {
        if (selectRef.current) {
            const rect = selectRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                height: 300
            });
        }
    };

    const isSelected = (optionValue) => {
        if (multiple) {
            return value?.includes(optionValue) || false;
        }
        return value === optionValue;
    };

    const hasValue = multiple ? value?.length > 0 : value !== undefined && value !== '';

    const handleOptionSelect = (option) => {
        if (multiple) {
            const newValue = value || [];
            const updatedValue = newValue?.includes(option?.value)
                ? newValue?.filter(v => v !== option?.value)
                : [...newValue, option?.value];
            onChange?.(updatedValue);
        } else {
            onChange?.(option?.value);
            setIsOpen(false);
            onOpenChange?.(false);
        }
    };

    const handleClickOutside = useCallback((event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
            onOpenChange?.(false);
        }
    }, [onOpenChange]);

    const handleClear = (e) => {
        e?.stopPropagation();
        onChange?.(multiple ? [] : '');
    };

    const handleToggle = (e) => {
        if (!disabled) {
            e.stopPropagation();
            const willOpen = !isOpen;
            if (willOpen) {
                updatePosition();
            }
            setIsOpen(willOpen);
            onOpenChange?.(willOpen);
        }
    };

    useEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition, true);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, handleClickOutside]);

    const dropdownContent = isOpen && (
        <div 
            className="fixed z-[9999] bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 rounded-md shadow-xl shadow-black/20 dark:shadow-black/40 overflow-hidden"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `${position.width}px`,
                maxHeight: '300px',
                transform: 'translateY(4px)'
            }}
        >
            <div className="py-1 overflow-y-auto" style={{ maxHeight: '300px' }}>
                {filteredOptions?.length > 0 ? (
                    filteredOptions.map((option) => (
                        <div
                            key={option.value}
                            className={cn(
                                "relative flex cursor-pointer select-none items-center px-3 py-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150",
                                isSelected(option.value) && "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium",
                                option.disabled && "pointer-events-none opacity-50"
                            )}
                            onClick={() => !option.disabled && handleOptionSelect(option)}
                        >
                            <span className="flex-1">{option.label}</span>
                            {isSelected(option.value) && (
                                <Check className="h-4 w-4 flex-shrink-0" />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                        No options available
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className={cn("relative w-full", className)} ref={selectRef}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block",
                        error ? "text-destructive" : "text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <button
                    ref={ref}
                    id={selectId}
                    type="button"
                    className={cn(
                        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-destructive focus:ring-destructive",
                        !hasValue && "text-muted-foreground"
                    )}
                    onClick={handleToggle}
                    disabled={disabled}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    {...props}
                >
                    <span className="truncate">{getSelectedDisplay()}</span>

                    <div className="flex items-center gap-1">
                        {loading && (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}

                        {clearable && hasValue && !loading && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4"
                                onClick={handleClear}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}

                        {isOpen ? (
                            <ChevronUp className="h-4 w-4 opacity-70" />
                        ) : (
                            <ChevronDown className="h-4 w-4 opacity-70" />
                        )}
                    </div>
                </button>

                {/* Hidden native select for form submission */}
                <select
                    name={name}
                    className="sr-only"
                    aria-hidden="true"
                    tabIndex={-1}
                    value={value}
                    onChange={() => {}}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Dropdown Portal */}
                {typeof document !== 'undefined' && createPortal(dropdownContent, document.body)}
            </div>
            
            {description && !error && (
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            )}
            {error && (
                <p className="text-sm text-destructive mt-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Select.displayName = "Select";

export default Select;