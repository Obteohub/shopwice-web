import { ChangeEvent } from 'react';

interface ICheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A reusable checkbox component with a label
 * @function Checkbox
 * @param {string} id - Unique identifier for the checkbox
 * @param {string} label - Label text to display next to the checkbox
 * @param {boolean} checked - Whether the checkbox is checked
 * @param {function} onChange - Handler for when the checkbox state changes
 * @returns {JSX.Element} - Rendered component
 */
const Checkbox = ({ id, label, checked, onChange }: ICheckboxProps) => {
  return (
    <label htmlFor={id} className="flex items-center py-1 cursor-pointer group">
      <input
        id={id}
        type="checkbox"
        className="form-checkbox h-4 w-4 cursor-pointer text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-colors"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-3 text-[15px] text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
    </label>
  );
};

export default Checkbox;
