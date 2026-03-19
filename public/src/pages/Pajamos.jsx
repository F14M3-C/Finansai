import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Pajamos() {
  const navigate = useNavigate();
  const location = useLocation();
  const [incomeForm, setIncomeForm] = useState({ title: "", amount: "", category: "", date: "", note: "" });
  const [editForm, setEditForm] = useState({ title: "", amount: "", category: "", date: "", type: "income" });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openEdit = (item) => {
    setEditForm(item);
    document.getElementById("edit_modal").showModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    document.getElementById("edit_modal").close();
    setEditForm({ title: "", amount: "", category: "", date: "", type: "income" });
  };

  const confirmDelete = (name) => {
    setDeleteTarget(name);
    document.getElementById("delete_modal").showModal();
  };

  const handleDelete = () => {
    document.getElementById("delete_modal").close();
    setDeleteTarget(null);
  };

  const handleLogout = () => navigate("/login");
  const openModal = (id) => document.getElementById(id).showModal();

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    document.getElementById("income_modal").close();
    setIncomeForm({ title: "", amount: "", category: "", date: "", note: "" });
  };

  const isActive = (path) => location.pathname === path;
  const navLinkClass = (path) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${isActive(path) ? "bg-primary/10 text-primary border-r-4 border-primary" : "hover:bg-base-200"}`;

  const incomeData = [
    { title: "Atlyginimas (UAB Tech)", category: "Darbas", date: "Spalio 05", amount: "2,500.00", icon: "work" },
    { title: "Freelance Project X", category: "Papildoma", date: "Spalio 12", amount: "800.00", icon: "computer" },
    { title: "Dividendai", category: "Investicijos", date: "Spalio 15", amount: "150.00", icon: "trending_up" },
    { title: "Nuomos pajamos", category: "Nuoma", date: "Spalio 01", amount: "450.00", icon: "home" },
    { title: "Premija", category: "Darbas", date: "Spalio 20", amount: "300.00", icon: "star" },
    { title: "Grąžinimas", category: "Kita", date: "Spalio 22", amount: "45.00", icon: "undo" },
  ];

  return (
    <>
    <div className="bg-base-200 text-base-content min-h-screen">
      <div className="drawer lg:drawer-open">
        <input className="drawer-toggle" id="my-drawer-2" type="checkbox" />

        <div className="drawer-content flex flex-col">
          {/* Mobile Navbar */}
          <div className="navbar bg-base-100 border-b border-base-300 lg:hidden">
            <div className="flex-none">
              <label className="btn btn-square btn-ghost" htmlFor="my-drawer-2">
                <span className="material-symbols-outlined">menu</span>
              </label>
            </div>
            <div className="flex-1">
              <span className="btn btn-ghost text-xl font-bold">Pajamų valdymas</span>
            </div>
          </div>

          {/* Top Header */}
          <header className="navbar bg-base-100 border-b border-base-300 px-6 py-2 sticky top-0 z-20">
            <div className="navbar-start">
              <div className="hidden lg:flex items-center gap-2 px-2">
                <span className="text-sm font-semibold opacity-60">Sveiki sugrįžę,</span>
                <span className="text-sm font-bold text-primary">Jonas Kazlauskas</span>
              </div>
            </div>
            <div className="navbar-center hidden lg:flex">
              <div className="form-control">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">search</span>
                  <input className="input input-sm input-bordered pl-10 w-64 rounded-lg bg-base-200/50 border-none focus:bg-base-100" placeholder="Ieškoti operacijų..." type="text" />
                </div>
              </div>
            </div>
            <div className="navbar-end gap-2">
              <div className="dropdown dropdown-end">
                <button className="btn btn-ghost btn-circle bg-base-200">
                  <div className="indicator">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
              </div>
              <div className="dropdown dropdown-end">
                <div className="btn btn-ghost btn-circle avatar border-2 border-primary" role="button" tabIndex={0}>
                  <div className="w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">person</span>
                  </div>
                </div>
                <ul className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200" tabIndex={0}>
                  <li className="menu-title px-4 py-2 opacity-50">Naudotojo paskyra</li>
                  <li><a><span className="material-symbols-outlined text-sm">person</span> Profilis</a></li>
                  <li><a><span className="material-symbols-outlined text-sm">settings</span> Nustatymai</a></li>
                  <div className="divider my-0"></div>
                  <li><a className="text-error" onClick={handleLogout}><span className="material-symbols-outlined text-sm">logout</span> Atsijungti</a></li>
                </ul>
              </div>
            </div>
          </header>

          <main className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black mb-1">Pajamos</h1>
                <p className="text-base-content/60 font-medium">Visų pajamų sąrašas ir statistika</p>
              </div>
              <button className="btn btn-primary px-6 rounded-xl font-bold shadow-lg shadow-primary/20" onClick={() => openModal('income_modal')}>
                <span className="material-symbols-outlined">add</span>
                Pridėti pajamas
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-emerald-500/10 text-emerald-600 p-2 rounded-lg">
                      <span className="material-symbols-outlined">trending_up</span>
                    </div>
                    <span className="badge badge-ghost text-xs font-bold">Šį mėnesį</span>
                  </div>
                  <div className="text-2xl font-black">€4,245.00</div>
                  <div className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">arrow_upward</span> +8.3% nuo praėjusio mėn.
                  </div>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                      <span className="material-symbols-outlined">account_balance</span>
                    </div>
                    <span className="badge badge-ghost text-xs font-bold">Vidurkis</span>
                  </div>
                  <div className="text-2xl font-black">€3,920.00</div>
                  <div className="text-xs font-bold text-base-content/50 mt-1">Per paskutinius 6 mėn.</div>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-blue-500/10 text-blue-500 p-2 rounded-lg">
                      <span className="material-symbols-outlined">receipt_long</span>
                    </div>
                    <span className="badge badge-ghost text-xs font-bold">Įrašai</span>
                  </div>
                  <div className="text-2xl font-black">6</div>
                  <div className="text-xs font-bold text-base-content/50 mt-1">Šio mėnesio operacijos</div>
                </div>
              </div>
            </div>

            {/* Income Table */}
            <div className="card bg-base-100 shadow-sm border border-base-300">
              <div className="card-body p-0">
                <div className="flex items-center justify-between p-6 pb-0">
                  <h3 className="text-lg font-black">Pajamų sąrašas</h3>
                  <div className="flex gap-2">
                    <select className="select select-bordered select-sm text-xs font-bold">
                      <option>Visos kategorijos</option>
                      <option>Darbas</option>
                      <option>Papildoma veikla</option>
                      <option>Investicijos</option>
                      <option>Nuoma</option>
                      <option>Kita</option>
                    </select>
                    <select className="select select-bordered select-sm text-xs font-bold">
                      <option>Naujausios pirma</option>
                      <option>Seniausios pirma</option>
                      <option>Didžiausia suma</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-lg">
                    <thead>
                      <tr className="border-b border-base-200">
                        <th className="text-xs font-bold uppercase text-base-content/50">Operacija</th>
                        <th className="text-xs font-bold uppercase text-base-content/50">Kategorija</th>
                        <th className="text-xs font-bold uppercase text-base-content/50">Data</th>
                        <th className="text-xs font-bold uppercase text-base-content/50 text-right">Suma</th>
                        <th className="text-xs font-bold uppercase text-base-content/50 text-center">Veiksmai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomeData.map((item, i) => (
                        <tr key={i} className="hover group">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar placeholder">
                                <div className="bg-primary/10 text-primary rounded w-10 h-10 flex items-center justify-center">
                                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item.title}</div>
                                <div className="text-[10px] opacity-50 font-bold uppercase">Pajamos</div>
                              </div>
                            </div>
                          </td>
                          <td><div className="badge badge-outline border-base-300 text-sm font-bold">{item.category}</div></td>
                          <td className="text-base-content/60 font-medium text-sm">{item.date}</td>
                          <td className="text-right font-black text-emerald-600">+€{item.amount}</td>
                          <td className="text-center">
                            <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="btn btn-ghost btn-xs btn-square" title="Redaguoti" onClick={() => openEdit({ title: item.title, amount: item.amount.replace(',', ''), category: item.category.toLowerCase(), date: '2025-10-05', type: 'income' })}><span className="material-symbols-outlined text-sm">edit</span></button>
                              <button className="btn btn-ghost btn-xs btn-square text-error" title="Ištrinti" onClick={() => confirmDelete(item.title)}><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Income by Category Bar */}
            <div className="card bg-base-100 shadow-sm border border-base-300">
              <div className="card-body p-6">
                <h3 className="text-lg font-black mb-4">Pajamos pagal kategorijas</h3>
                <div className="w-full h-6 rounded-full overflow-hidden flex bg-base-200">
                  <div className="bg-primary h-full" style={{ width: '58.9%' }} title="Darbas €2,800"></div>
                  <div className="bg-blue-500 h-full" style={{ width: '18.8%' }} title="Papildoma €800"></div>
                  <div className="bg-amber-500 h-full" style={{ width: '10.6%' }} title="Nuoma €450"></div>
                  <div className="bg-emerald-500 h-full" style={{ width: '3.5%' }} title="Investicijos €150"></div>
                  <div className="bg-rose-500 h-full" style={{ width: '1.1%' }} title="Kita €45"></div>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary inline-block"></span><span className="text-xs font-bold">Darbas</span><span className="text-xs text-base-content/50">€2,800</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span><span className="text-xs font-bold">Papildoma</span><span className="text-xs text-base-content/50">€800</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span><span className="text-xs font-bold">Nuoma</span><span className="text-xs text-base-content/50">€450</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span><span className="text-xs font-bold">Investicijos</span><span className="text-xs text-base-content/50">€150</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span><span className="text-xs font-bold">Kita</span><span className="text-xs text-base-content/50">€45</span></div>
                </div>
              </div>
            </div>
          </main>

          <footer className="footer items-center p-6 lg:px-10 bg-base-100 border-t border-base-300 text-base-content/60 mt-auto">
            <aside className="items-center grid-flow-col">
              <span className="material-symbols-outlined text-lg">shield</span>
              <p className="text-xs font-semibold">Bankinio lygio saugumas užtikrintas</p>
            </aside>
            <nav className="grid-flow-col gap-6 md:place-self-center md:justify-self-end">
              <a className="link link-hover text-xs font-medium">Pagalba</a>
              <a className="link link-hover text-xs font-medium">Privatumo politika</a>
              <a className="link link-hover text-xs font-medium">Sąlygos</a>
            </nav>
          </footer>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-30">
          <label aria-label="close sidebar" className="drawer-overlay" htmlFor="my-drawer-2"></label>
          <div className="menu p-4 w-80 min-h-full bg-base-100 border-r border-base-300">
            <div className="flex items-center gap-3 px-4 py-8 mb-4">
              <div className="bg-primary text-primary-content p-2 rounded-xl">
                <span className="material-symbols-outlined block">account_balance_wallet</span>
              </div>
              <span className="text-xl font-black tracking-tight">Pajamų valdymas</span>
            </div>
            <div className="space-y-1">
              <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-base-content/40">Pagrindinis</p>
              <Link to="/" className={navLinkClass("/")}><span className="material-symbols-outlined">dashboard</span>Apžvalga</Link>
              <Link to="/pajamos" className={navLinkClass("/pajamos")}><span className="material-symbols-outlined">payments</span>Pajamos</Link>
              <Link to="/islaidos" className={navLinkClass("/islaidos")}><span className="material-symbols-outlined">shopping_cart</span>Išlaidos</Link>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all"><span className="material-symbols-outlined">category</span>Kategorijos</a>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all"><span className="material-symbols-outlined">bar_chart</span>Analitika</a>
            </div>
            <div className="divider"></div>
            <div className="space-y-1">
              <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-base-content/40">Admin Valdymas</p>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all"><span className="material-symbols-outlined">group</span>Naudotojų valdymas</a>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all"><span className="material-symbols-outlined">history_edu</span>Įvykių žurnalas</a>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all"><span className="material-symbols-outlined">security</span>Saugumo nustatymai</a>
            </div>
            <div className="mt-auto p-4 bg-base-200/50 rounded-2xl flex items-center gap-4">
              <div className="avatar online">
                <div className="w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">person</span>
                </div>
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="text-sm font-black truncate">Jonas Kazlauskas</div>
                <div className="text-[10px] font-bold opacity-50 truncate">jonas@uabtech.lt</div>
              </div>
              <button className="btn btn-ghost btn-xs btn-circle"><span className="material-symbols-outlined text-sm">settings</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Add Income Modal */}
    <dialog id="income_modal" className="modal">
      <div className="modal-box rounded-2xl max-w-lg">
        <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button></form>
        <h3 className="text-xl font-black mb-1">Pridėti pajamas</h3>
        <p className="text-sm text-base-content/60 mb-6">Užregistruokite naują pajamų įrašą</p>
        <form className="space-y-4" onSubmit={handleIncomeSubmit}>
          <fieldset className="fieldset"><legend className="fieldset-legend text-sm font-semibold">Pavadinimas</legend><input type="text" placeholder="pvz. Atlyginimas" className="input input-bordered w-full" value={incomeForm.title} onChange={(e) => setIncomeForm({ ...incomeForm, title: e.target.value })} required /></fieldset>
          <fieldset className="fieldset"><legend className="fieldset-legend text-sm font-semibold">Suma (€)</legend><input type="number" step="0.01" min="0.01" placeholder="0.00" className="input input-bordered w-full" value={incomeForm.amount} onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })} required /></fieldset>
          <fieldset className="fieldset"><legend className="fieldset-legend text-sm font-semibold">Kategorija</legend>
            <select className="select select-bordered w-full" value={incomeForm.category} onChange={(e) => setIncomeForm({ ...incomeForm, category: e.target.value })} required>
              <option value="" disabled>Pasirinkite kategoriją</option>
              <option value="darbas">Darbas</option>
              <option value="papildoma">Papildoma veikla</option>
              <option value="investicijos">Investicijos</option>
              <option value="nuoma">Nuoma</option>
              <option value="kita">Kita</option>
            </select>
          </fieldset>
          <fieldset className="fieldset"><legend className="fieldset-legend text-sm font-semibold">Data</legend><input type="date" className="input input-bordered w-full" value={incomeForm.date} onChange={(e) => setIncomeForm({ ...incomeForm, date: e.target.value })} required /></fieldset>
          <fieldset className="fieldset"><legend className="fieldset-legend text-sm font-semibold">Pastaba (neprivaloma)</legend><textarea className="textarea textarea-bordered w-full" placeholder="Papildoma informacija..." rows={2} value={incomeForm.note} onChange={(e) => setIncomeForm({ ...incomeForm, note: e.target.value })} /></fieldset>
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('income_modal').close()}>Atšaukti</button>
            <button type="submit" className="btn btn-primary font-bold shadow-lg shadow-primary/20"><span className="material-symbols-outlined text-sm">trending_up</span>Pridėti pajamas</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop"><button>close</button></form>
    </dialog>

    {/* Delete Modal */}
    <dialog id="delete_modal" className="modal">
      <div className="modal-box rounded-2xl max-w-sm text-center">
        <div className="flex justify-center mb-4"><div className="bg-error/10 text-error p-4 rounded-full"><span className="material-symbols-outlined text-4xl">warning</span></div></div>
        <h3 className="text-xl font-black mb-2">Ištrinti įrašą?</h3>
        <p className="text-sm text-base-content/60 mb-4">Ar tikrai norite ištrinti <strong>{deleteTarget}</strong>?</p>
        <div className="flex gap-3 justify-center">
          <button className="btn btn-ghost" onClick={() => document.getElementById('delete_modal').close()}>Atšaukti</button>
          <button className="btn btn-error text-white font-bold" onClick={handleDelete}><span className="material-symbols-outlined text-sm">delete</span>Ištrinti</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop"><button>close</button></form>
    </dialog>

    {/* Edit Modal */}
    <dialog id="edit_modal" className="modal">
      <div className="modal-box rounded-2xl max-w-lg">
        <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button></form>
        <h3 className="text-xl font-black mb-1">Redaguoti operaciją</h3>
        <p className="text-sm text-base-content/60 mb-6">Pakeiskite operacijos duomenis</p>
        <form className="space-y-4" onSubmit={handleEditSubmit}>
          <fieldset className="fieldset"><legend className="fieldset-legend text-sm font-semibold">Pavadinimas</legend><input type="text" className="input input-bordered w-full" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} required /></fieldset>
          <fieldset className="fieldset"><legend className="fieldset-legend text-sm font-semibold">Suma (€)</legend><input type="number" step="0.01" min="0.01" className="input input-bordered w-full" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} required /></fieldset>
          <fieldset className="fieldset"><legend className="fieldset-legend text-sm font-semibold">Kategorija</legend>
            <select className="select select-bordered w-full" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} required>
              <option value="" disabled>Pasirinkite kategoriją</option>
              <option value="darbas">Darbas</option>
              <option value="papildoma">Papildoma veikla</option>
              <option value="investicijos">Investicijos</option>
              <option value="nuoma">Nuoma</option>
              <option value="kita">Kita</option>
            </select>
          </fieldset>
          <fieldset className="fieldset"><legend className="fieldset-legend text-sm font-semibold">Data</legend><input type="date" className="input input-bordered w-full" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} required /></fieldset>
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('edit_modal').close()}>Atšaukti</button>
            <button type="submit" className="btn btn-primary font-bold shadow-lg shadow-primary/20"><span className="material-symbols-outlined text-sm">save</span>Išsaugoti</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop"><button>close</button></form>
    </dialog>
    </>
  );
}
