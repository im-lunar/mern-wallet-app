import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-200">
            <Appbar />
            <div className="m-8">
                <Balance value={"29,10,350"} />
                <Users />
            </div>
        </div>
    )
}