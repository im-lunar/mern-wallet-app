export function InputBox({ label, placeholder, onChange, type }) {
    return (
        <div>
            <div className="text-sm text-left font-semibold py-2">
                {label}
            </div>
            <input 
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-2 py-1 border rounder border-slate-200"
            />
        </div>
    )
}