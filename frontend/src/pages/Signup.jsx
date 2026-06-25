import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from 'react'
import { BottomWarning } from '../components/BottomWarning'

export const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return (
    <div className="h-screen bg-slate-300 flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox label={"First Name"} placeholder={"Jon"} onChange={(e) => setFirstName(e.target.value)} />
                <InputBox label={"Last Name"} placeholder={"Snow"} onChange={(e) => setLastName(e.target.value)} />
                <InputBox label={"Username"} placeholder={"jon1snow"} onChange={(e) => setUsername(e.target.value)} />
                <InputBox label={"Password"} placeholder={"******"} type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button label={"Sign up"} onClick={ async () => {
                    try {
                        const response = await axios.post(
                            "http://localhost:3000/api/v1/user/signup",
                            {
                                username,
                                password,
                                firstName,
                                lastName
                            }
                        );

                        localStorage.setItem("token", response.data.token);

                        navigate("/dashboard");
                    } catch (err) {
                        alert("Signup failed");
                    }      
                }} />
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
    )
}