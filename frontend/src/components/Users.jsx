import { useEffect, useState } from "react"
import axios from "axios"
import { User } from "./User";

export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            .then(response => {
                setUsers(response.data.users);
            });
    }, [filter]);

    return (
        <div>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>

            <div className="my-2">
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-2 py-1 border rounded border-slate-200 bg-white"
                    onChange={(e) => {setFilter(e.target.value)}}
                />
            </div>

            <div className="">
                {users.map(user => (<User key={user._id} user={user} />) )}
            </div>
        </div>
    )
}