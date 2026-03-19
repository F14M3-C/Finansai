import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Vardas yra privalomas";
    else if (name.trim().length < 2) errs.name = "Vardas turi būti bent 2 simbolių";

    if (!email.trim()) errs.email = "El. paštas yra privalomas";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Neteisingas el. pašto adresas";

    if (!password) errs.password = "Slaptažodis yra privalomas";
    else if (password.length < 8) errs.password = "Slaptažodis turi būti bent 8 simbolių";
    else if (!/[A-Z]/.test(password)) errs.password = "Slaptažodyje turi būti bent viena didžioji raidė";
    else if (!/[0-9]/.test(password)) errs.password = "Slaptažodyje turi būti bent vienas skaičius";

    if (!confirmPassword) errs.confirmPassword = "Pakartokite slaptažodį";
    else if (password !== confirmPassword) errs.confirmPassword = "Slaptažodžiai nesutampa";

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    navigate("/login");
  };

  return (
    <div className="bg-base-200 text-base-content min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-primary text-primary-content p-3 rounded-xl mb-4">
            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
          </div>
          <h1 className="text-2xl font-black text-base-content">Pajamų valdymas</h1>
          <p className="text-sm text-base-content/60 mt-1">Sukurkite naują paskyrą</p>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold">Vardas</legend>
                <input
                  type="text"
                  placeholder="Jonas Kazlauskas"
                  className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-error text-xs mt-1 font-medium">{errors.name}</p>}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold">El. paštas</legend>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-error text-xs mt-1 font-medium">{errors.email}</p>}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold">Slaptažodis</legend>
                <input
                  type="password"
                  placeholder="Įveskite slaptažodį"
                  className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-error text-xs mt-1 font-medium">{errors.password}</p>}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold">Pakartokite slaptažodį</legend>
                <input
                  type="password"
                  placeholder="Pakartokite slaptažodį"
                  className={`input input-bordered w-full ${errors.confirmPassword ? "input-error" : ""}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="text-error text-xs mt-1 font-medium">{errors.confirmPassword}</p>}
              </fieldset>
              <button type="submit" className="btn btn-primary w-full mt-2 font-bold shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-sm">person_add</span>
                Registruotis
              </button>
            </form>
            <div className="divider my-4 text-base-content/40">arba</div>
            <p className="text-sm text-center">
              Jau turite paskyrą?{" "}
              <Link to="/login" className="link link-primary font-semibold">Prisijungti</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
