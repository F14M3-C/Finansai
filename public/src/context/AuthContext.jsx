import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

function AuthProvider({ children }) {
	const [user, setUser] = useState();

	useEffect(() => {
		fetch("/api/auth", {
			method: "GET",
			headers: {
				credentials: "include",
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				setUser(data);
			});
	}, []);

	function setAuth(user) {
		setUser(user);
	}

	function setUserData(data) {
		setUser({ ...data });
	}

	return (
		<AuthContext.Provider value={{ user, setAuth, setUserData }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
