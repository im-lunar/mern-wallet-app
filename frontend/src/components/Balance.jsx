
export function Balance({ value }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <div className="text-slate-500 text-sm">
                Available Balance
            </div>

            <div className="text-3xl font-bold mt-2">
                ₹ {value.toFixed(2)}
            </div>
        </div>
    )
}