import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import AuthContext from "./AuthContext";

export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {setIsAuth, setAuthUser, isAuth, authUser } = useContext(AuthContext);

	const handleLogin = async (e) => {
		e.preventDefault();
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
        "credentials":  "include",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: email, password }),
		});

		if (!response.ok) {
			console.log("Neteisingas El.paštas arba Slaptažodis");
		}

		const data = await response.json();

		console.log(data);
		setAuthUser(data.user);
    	setIsAuth(true);
	};



    useEffect(() => {
      if(isAuth) navigate("/dashboard")
    },[isAuth])

	return (
		<div className="bg-base-200 text-base-content min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center bg-primary text-primary-content p-3 rounded-xl mb-4">
						<span className="material-symbols-outlined text-3xl">
							account_balance_wallet
						</span>
					</div>
					<h1 className="text-2xl font-black text-base-content">
						Pajamų valdymas
					</h1>
					<p className="text-sm text-base-content/60 mt-1">
						Prisijunkite prie savo paskyros
					</p>
				</div>

				{/* Card */}
				<div className="card bg-base-100 shadow-xl border border-base-300">
					<div className="card-body p-8">
						<form className="space-y-5" onSubmit={handleLogin}>
							<fieldset className="fieldset">
								<legend className="fieldset-legend text-sm font-semibold">
									El. paštas
								</legend>
								<input
									type="email"
									placeholder="email@example.com"
									className="input input-bordered w-full"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</fieldset>
							<fieldset className="fieldset">
								<legend className="fieldset-legend text-sm font-semibold">
									Slaptažodis
								</legend>
								<input
									type="password"
									placeholder="Įveskite slaptažodį"
									className="input input-bordered w-full"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</fieldset>

							<div className="flex items-center justify-between">
								<label className="flex items-center gap-2 cursor-pointer">
									<input
										type="checkbox"
										className="checkbox checkbox-primary checkbox-sm"
									/>
									<span className="text-sm">Prisiminti mane</span>
								</label>
								<a href="#" className="link link-primary text-sm">
									Pamiršote slaptažodį?
								</a>
							</div>
							<button
								type="submit"
								className="btn btn-primary w-full mt-2 font-bold shadow-lg shadow-primary/20"
							>
								<span className="material-symbols-outlined text-sm">login</span>
								Prisijungti
							</button>
						</form>
						<div className="divider my-4 text-base-content/40">arba</div>
						<p className="text-sm text-center">
							Neturite paskyros?{" "}
							<Link to="/register" className="link link-primary font-semibold">
								Registruotis
							</Link>
						</p>
					</div>
				</div>
				<div></div>
				<div className="flex flex-col items-center gap-4 mt-5">
					<button
						className="btn btn-primary"
						onClick={() => {
							setEmail("petras@pertaitis.com");
							setPassword("password!");
						}}
					>
						Petras Petraitis
					</button>
					<button
						className="btn btn-primary"
						onClick={() => {
							setEmail("jonas@jonaitis.com");
							setPassword("password!");
						}}
					>
						Jonais Jonaitis
					</button>
				</div>
			</div>
		</div>
	);
}
