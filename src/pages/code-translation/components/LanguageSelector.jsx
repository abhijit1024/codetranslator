import React from 'react';
import Select from '../../../components/ui/Select';

const LanguageSelector = ({ value, onChange, label, disabled = false }) => {
  const languageOptions = [
    { value: 'assembly', label: 'Assembly' },
    { value: 'bash', label: 'Bash' },
    { value: 'c', label: 'C' },
    { value: 'csharp', label: 'C#' },
    { value: 'clojure', label: 'Clojure' },
    { value: 'cpp', label: 'C++' },
    { value: 'dart', label: 'Dart' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'erlang', label: 'Erlang' },
    { value: 'go', label: 'Go' },
    { value: 'groovy', label: 'Groovy' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'julia', label: 'Julia' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'lua', label: 'Lua' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'objective-c', label: 'Objective-C' },
    { value: 'pascal', label: 'Pascal' },
    { value: 'perl', label: 'Perl' },
    { value: 'php', label: 'PHP' },
    { value: 'powershell', label: 'PowerShell' },
    { value: 'python', label: 'Python' },
    { value: 'r', label: 'R' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'rust', label: 'Rust' },
    { value: 'scala', label: 'Scala' },
    { value: 'sql', label: 'SQL' },
    { value: 'swift', label: 'Swift' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'vbnet', label: 'VB.NET' }
  ].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select
      label={label}
      options={languageOptions}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder="Select language"
      className="w-full"
    />
  );
};

export default LanguageSelector;