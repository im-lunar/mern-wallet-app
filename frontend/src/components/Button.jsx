export function Button({ label, onClick }) {
    return (
        <button onClick={onClick} className="w-full rounder-md bg-black text-white py-2 mt-4">
            {label}
        </button>
    )
}