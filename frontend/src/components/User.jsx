import { useNavigate } from 'react-router-dom'

export function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mr-3">
                    <div className="flex flex-col justify-center h-full">
                        {user.firstName[0].toUpperCase()}
                    </div>
                </div>

                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>

            <button
                className="bg-black text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => {
                    navigate(`/send?id=${user._id}&name=${user.firstName}`)
                }}
            >Send Money</button>
        </div>
    )
}