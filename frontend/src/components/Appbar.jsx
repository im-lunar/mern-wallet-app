
export function Appbar() {
    return (
        <div className="shadow bg-blue-950 flex justify-between h-14 px-4">
            <div className="flex flex-col justify-center text-white font-bold">
                Payment App
            </div>

            <div className="flex">
                <div className="flex flex-col text-white justify-center mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center text-xl h-full">U</div>
                </div>
            </div>
        </div>
    )
}