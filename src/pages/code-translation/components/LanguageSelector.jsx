import React from 'react';
import Select from '../../../components/ui/Select';

const LanguageSelector = ({ value, onChange, label, disabled = false }) => {
  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' }
  ];

  return (
    <Select
      label={label}
      options={languageOptions}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder="Select language"
      searchable
    />
  );
};

export default LanguageSelector;