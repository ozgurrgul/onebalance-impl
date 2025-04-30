interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Enter Ethereum address"
      className="flex-1 min-w-0  bg-white block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
