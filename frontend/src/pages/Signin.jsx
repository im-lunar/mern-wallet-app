import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                    <Heading label={"Login"} />
                    <SubHeading label={"Enter credentials to login"} />
                    <InputBox label={"Username"} placeholder={"user1"} onChange={(e) => setUsername(e.target.value)} />
                    <InputBox label={"Password"} placeholder={"**********"} type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button label={"Sign in"} onClick={
                        async () => {
                            try {
                                const response = await axios.post(
                                    "http://localhost:3000/api/v1/user/signin",
                                    {
                                        username,
                                        password
                                    }
                                );

                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard");

                            } catch (err) {
                                alert("Invalid credentials")
                            }
                        }
                    } />
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}