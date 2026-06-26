import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function SendMoney() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const id = searchParams.get("id");
    const name = searchParams.get("name");

    const [amount, setAmount] = useState("");

    return (
        <div className="h-screen bg-slate-300 flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 p-6 shadow-lg">

                    <h1 className="text-3xl font-bold text-center">
                        Send Money
                    </h1>

                    <div className="flex items-center mt-8">
                        <div className="rounded-full h-12 w-12 bg-green-500 flex justify-center">
                            <div className="flex flex-col justify-center h-full text-xl text-white">
                                {name[0].toUpperCase()}
                            </div>
                        </div>

                        <div className="ml-4 text-xl font-semibold">
                            {name}
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium mb-2">
                            Amount (in ₹)
                        </label>

                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="w-full px-3 py-2 border rounded border-slate-300"
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                        />
                    </div>

                    <button
                        className="w-full bg-green-500 text-white py-2 rounded-lg mt-6 hover:bg-green-600"
                        onClick={async () => {
                            await axios.post(
                                "http://localhost:3000/api/v1/account/transfer",
                                {
                                    to: id,
                                    amount: Number(amount)
                                },
                                {
                                    headers: {
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                }
                            );

                            alert("Transfer Successful!");
                            navigate("/dashboard");
                        }}
                    >
                        Initiate Transfer
                    </button>

                </div>
            </div>
        </div>
    );
}