import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [incomeForm, setIncomeForm] = useState({ title: "", amount: "", category: "", date: "", note: "" });
  const [expenseForm, setExpenseForm] = useState({ title: "", amount: "", category: "", date: "", note: "" });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", amount: "", category: "", date: "", type: "" });

  const openEdit = (item) => {
    setEditForm(item);
    document.getElementById("edit_modal").showModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Mockup — just close
    document.getElementById("edit_modal").close();
    setEditForm({ title: "", amount: "", category: "", date: "", type: "" });
  };

  const confirmDelete = (name) => {
    setDeleteTarget(name);
    document.getElementById("delete_modal").showModal();
  };

  const handleDelete = () => {
    // Mockup — just close
    document.getElementById("delete_modal").close();
    setDeleteTarget(null);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const openModal = (id) => document.getElementById(id).showModal();

  const isActive = (path) => location.pathname === path;
  const navLinkClass = (path) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${isActive(path) ? "bg-primary/10 text-primary border-r-4 border-primary" : "hover:bg-base-200"}`;

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    document.getElementById("income_modal").close();
    setIncomeForm({ title: "", amount: "", category: "", date: "", note: "" });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    document.getElementById("expense_modal").close();
    setExpenseForm({ title: "", amount: "", category: "", date: "", note: "" });
  };

  return (
    <>
    <div className="bg-base-200 text-base-content min-h-screen">
      <div className="drawer lg:drawer-open">
        <input className="drawer-toggle" id="my-drawer-2" type="checkbox" />

        {/* Main Content */}
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
                  <input
                    className="input input-sm input-bordered pl-10 w-64 rounded-lg bg-base-200/50 border-none focus:bg-base-100"
                    placeholder="Ieškoti operacijų..."
                    type="text"
                  />
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
                  <li>
                    <a className="text-error" onClick={handleLogout}>
                      <span className="material-symbols-outlined text-sm">logout</span> Atsijungti
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <main className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
            {/* Dashboard Hero */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black mb-1">Apžvalga</h1>
                <p className="text-base-content/60 font-medium">Realaus laiko jūsų finansų statistika</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="dropdown dropdown-end">
                  <button className="btn btn-primary px-6 rounded-xl font-bold shadow-lg shadow-primary/20" tabIndex={0}>
                    <span className="material-symbols-outlined">add</span>
                    Pridėti operaciją
                  </button>
                  <ul className="dropdown-content z-50 menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-2 border border-base-200" tabIndex={0}>
                    <li><a onClick={() => openModal('income_modal')}><span className="material-symbols-outlined text-emerald-600">trending_up</span> Pridėti pajamas</a></li>
                    <li><a onClick={() => openModal('expense_modal')}><span className="material-symbols-outlined text-error">trending_down</span> Pridėti išlaidas</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                      <span className="material-symbols-outlined">account_balance_wallet</span>
                    </div>
                    <span className="badge badge-ghost text-xs font-bold">Likutis</span>
                  </div>
                  <div className="stat-value text-2xl font-black">€12,450.00</div>
                  <div className="stat-desc font-bold text-emerald-600 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">arrow_upward</span> +2.1% šį mėn.
                  </div>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <span className="badge badge-ghost text-xs font-bold">Pajamos</span>
                  </div>
                  <div className="stat-value text-2xl font-black">€3,450.00</div>
                  <div className="stat-desc text-base-content/50 font-medium">Spalio mėnuo</div>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-error/10 text-error p-2 rounded-lg">
                      <span className="material-symbols-outlined">shopping_cart</span>
                    </div>
                    <span className="badge badge-ghost text-xs font-bold">Išlaidos</span>
                  </div>
                  <div className="stat-value text-2xl font-black">€2,329.50</div>
                  <div className="stat-desc text-base-content/50 font-medium">Spalio mėnuo</div>
                </div>
              </div>
              <div className="card bg-primary text-primary-content shadow-xl overflow-hidden relative">
                <div className="card-body p-5 relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <span className="material-symbols-outlined">savings</span>
                    </div>
                    <span className="badge bg-white/20 border-none text-white text-xs font-bold">Laisvos lėšos</span>
                  </div>
                  <div className="stat-value text-2xl font-black">€1,120.50</div>
                  <div className="stat-desc text-white/70 font-medium">Pasiekiama dabar</div>
                </div>
                <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-7xl opacity-10 rotate-12">verified_user</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Transactions List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden">
                  <div className="p-6 border-b border-base-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-black">Paskutinės operacijos</h3>
                      <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mt-1">Pajamos ir išlaidos</p>
                    </div>
                    <div className="join shadow-sm border border-base-200">
                      <button className="btn btn-sm join-item bg-base-100 border-none hover:bg-base-200">Visi</button>
                      <button className="btn btn-sm join-item bg-base-100 border-none hover:bg-base-200">Pajamos</button>
                      <button className="btn btn-sm join-item bg-base-100 border-none hover:bg-base-200">Išlaidos</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table table-lg">
                      <thead>
                        <tr className="bg-base-200/50">
                          <th className="text-xs font-bold uppercase text-base-content/50">Operacija</th>
                          <th className="text-xs font-bold uppercase text-base-content/50">Kategorija</th>
                          <th className="text-xs font-bold uppercase text-base-content/50">Data</th>
                          <th className="text-xs font-bold uppercase text-base-content/50 text-right">Suma</th>
                          <th className="text-xs font-bold uppercase text-base-content/50 text-center">Veiksmai</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover group">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar placeholder">
                                <div className="bg-primary/10 text-primary rounded w-10 h-10 flex items-center justify-center">
                                  <span className="material-symbols-outlined text-xl">work</span>
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">Atlyginimas (UAB Tech)</div>
                                <div className="text-[10px] opacity-50 font-bold uppercase">Pajamos</div>
                              </div>
                            </div>
                          </td>
                          <td><div className="badge badge-outline border-base-300 text-[10px] font-bold">Darbas</div></td>
                          <td className="text-base-content/60 font-medium text-sm">Spalio 05</td>
                          <td className="text-right font-black text-emerald-600">+€2,500.00</td>
                          <td className="text-center">
                            <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="btn btn-ghost btn-xs btn-square" title="Redaguoti" onClick={() => openEdit({ title: 'Atlyginimas (UAB Tech)', amount: '2500.00', category: 'darbas', date: '2025-10-05', type: 'income' })}><span className="material-symbols-outlined text-sm">edit</span></button>
                              <button className="btn btn-ghost btn-xs btn-square text-error" title="Ištrinti" onClick={() => confirmDelete('Atlyginimas (UAB Tech)')}><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover group">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar placeholder">
                                <div className="bg-error/10 text-error rounded w-10 h-10 flex items-center justify-center">
                                  <span className="material-symbols-outlined text-xl">shopping_bag</span>
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">Maxima XXX</div>
                                <div className="text-[10px] opacity-50 font-bold uppercase">Išlaidos</div>
                              </div>
                            </div>
                          </td>
                          <td><div className="badge badge-outline border-base-300 text-[10px] font-bold">Maistas</div></td>
                          <td className="text-base-content/60 font-medium text-sm">Spalio 06</td>
                          <td className="text-right font-black text-error">-€45.20</td>
                          <td className="text-center">
                            <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="btn btn-ghost btn-xs btn-square" title="Redaguoti" onClick={() => openEdit({ title: 'Maxima XXX', amount: '45.20', category: 'maistas', date: '2025-10-06', type: 'expense' })}><span className="material-symbols-outlined text-sm">edit</span></button>
                              <button className="btn btn-ghost btn-xs btn-square text-error" title="Ištrinti" onClick={() => confirmDelete('Maxima XXX')}><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover group">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar placeholder">
                                <div className="bg-primary/10 text-primary rounded w-10 h-10 flex items-center justify-center">
                                  <span className="material-symbols-outlined text-xl">computer</span>
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">Freelance Project X</div>
                                <div className="text-[10px] opacity-50 font-bold uppercase">Pajamos</div>
                              </div>
                            </div>
                          </td>
                          <td><div className="badge badge-outline border-base-300 text-[10px] font-bold">Papildoma</div></td>
                          <td className="text-base-content/60 font-medium text-sm">Spalio 12</td>
                          <td className="text-right font-black text-emerald-600">+€800.00</td>
                          <td className="text-center">
                            <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="btn btn-ghost btn-xs btn-square" title="Redaguoti" onClick={() => openEdit({ title: 'Freelance Project X', amount: '800.00', category: 'papildoma', date: '2025-10-12', type: 'income' })}><span className="material-symbols-outlined text-sm">edit</span></button>
                              <button className="btn btn-ghost btn-xs btn-square text-error" title="Ištrinti" onClick={() => confirmDelete('Freelance Project X')}><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-base-200 text-center">
                    <button className="btn btn-ghost btn-sm text-primary font-bold">Žiūrėti visą sąrašą</button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar: Categories & Insight */}
              <div className="space-y-6">
                <div className="card bg-base-100 shadow-sm border border-base-300">
                  <div className="card-body p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-black">Kategorijos</h3>
                      <button className="btn btn-xs btn-ghost text-primary font-bold">+ Nauja</button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-xl group">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span className="text-sm font-bold">Būtinosios</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="btn btn-ghost btn-xs btn-square"><span className="material-symbols-outlined text-sm">edit</span></button>
                          <button className="btn btn-ghost btn-xs btn-square text-error" onClick={() => confirmDelete('Būtinosios')}><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-xl group">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm font-bold">Investicijos</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="btn btn-ghost btn-xs btn-square"><span className="material-symbols-outlined text-sm">edit</span></button>
                          <button className="btn btn-ghost btn-xs btn-square text-error" onClick={() => confirmDelete('Investicijos')}><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-xl group">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          <span className="text-sm font-bold">Pramogos</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="btn btn-ghost btn-xs btn-square"><span className="material-symbols-outlined text-sm">edit</span></button>
                          <button className="btn btn-ghost btn-xs btn-square text-error" onClick={() => confirmDelete('Pramogos')}><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insight Card */}
                <div className="card bg-primary/5 border border-primary/20">
                  <div className="card-body p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-primary">lightbulb</span>
                      <h4 className="font-bold">Įžvalga</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-base-content/70">
                      Jūsų pajamos šį mėnesį yra <strong className="text-base-content">12% didesnės</strong> nei vidutiniškai. Rekomenduojame padidinti periodinę investicijų sumą bent <strong className="text-base-content">€100</strong>.
                    </p>
                  </div>
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

        {/* Navigation Drawer (Sidebar) */}
        <div className="drawer-side z-30">
          <label aria-label="close sidebar" className="drawer-overlay" htmlFor="my-drawer-2"></label>
          <div className="menu p-4 w-80 min-h-full bg-base-100 border-r border-base-300">
            {/* Branding */}
            <div className="flex items-center gap-3 px-4 py-8 mb-4">
              <div className="bg-primary text-primary-content p-2 rounded-xl">
                <span className="material-symbols-outlined block">account_balance_wallet</span>
              </div>
              <span className="text-xl font-black tracking-tight">Pajamų valdymas</span>
            </div>
            <div className="space-y-1">
              <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-base-content/40">Pagrindinis</p>
              <Link to="/" className={navLinkClass("/")}>
                <span className="material-symbols-outlined">dashboard</span>
                Apžvalga
              </Link>
              <Link to="/pajamos" className={navLinkClass("/pajamos")}>
                <span className="material-symbols-outlined">payments</span>
                Pajamos
              </Link>
              <Link to="/islaidos" className={navLinkClass("/islaidos")}>
                <span className="material-symbols-outlined">shopping_cart</span>
                Išlaidos
              </Link>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all">
                <span className="material-symbols-outlined">category</span>
                Kategorijos
              </a>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all">
                <span className="material-symbols-outlined">bar_chart</span>
                Analitika
              </a>
            </div>
            <div className="divider"></div>
            <div className="space-y-1">
              <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-base-content/40">Admin Valdymas</p>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all">
                <span className="material-symbols-outlined">group</span>
                Naudotojų valdymas
              </a>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all">
                <span className="material-symbols-outlined">history_edu</span>
                Įvykių žurnalas
              </a>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all">
                <span className="material-symbols-outlined">security</span>
                Saugumo nustatymai
              </a>
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
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
          </form>
          <h3 className="text-xl font-black mb-1">Pridėti pajamas</h3>
          <p className="text-sm text-base-content/60 mb-6">Užregistruokite naują pajamų įrašą</p>
          <form className="space-y-4" onSubmit={handleIncomeSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Pavadinimas</legend>
              <input type="text" placeholder="pvz. Atlyginimas" className="input input-bordered w-full" value={incomeForm.title} onChange={(e) => setIncomeForm({ ...incomeForm, title: e.target.value })} required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Suma (€)</legend>
              <input type="number" step="0.01" min="0.01" placeholder="0.00" className="input input-bordered w-full" value={incomeForm.amount} onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })} required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Kategorija</legend>
              <select className="select select-bordered w-full" value={incomeForm.category} onChange={(e) => setIncomeForm({ ...incomeForm, category: e.target.value })} required>
                <option value="" disabled>Pasirinkite kategoriją</option>
                <option value="darbas">Darbas</option>
                <option value="papildoma">Papildoma veikla</option>
                <option value="investicijos">Investicijos</option>
                <option value="kita">Kita</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Data</legend>
              <input type="date" className="input input-bordered w-full" value={incomeForm.date} onChange={(e) => setIncomeForm({ ...incomeForm, date: e.target.value })} required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Pastaba (neprivaloma)</legend>
              <textarea className="textarea textarea-bordered w-full" placeholder="Papildoma informacija..." rows={2} value={incomeForm.note} onChange={(e) => setIncomeForm({ ...incomeForm, note: e.target.value })} />
            </fieldset>
            <div className="modal-action">
              <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('income_modal').close()}>Atšaukti</button>
              <button type="submit" className="btn btn-primary font-bold shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                Pridėti pajamas
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>

      {/* Add Expense Modal */}
      <dialog id="expense_modal" className="modal">
        <div className="modal-box rounded-2xl max-w-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
          </form>
          <h3 className="text-xl font-black mb-1">Pridėti išlaidas</h3>
          <p className="text-sm text-base-content/60 mb-6">Užregistruokite naują išlaidų įrašą</p>
          <form className="space-y-4" onSubmit={handleExpenseSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Pavadinimas</legend>
              <input type="text" placeholder="pvz. Maxima" className="input input-bordered w-full" value={expenseForm.title} onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })} required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Suma (€)</legend>
              <input type="number" step="0.01" min="0.01" placeholder="0.00" className="input input-bordered w-full" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Kategorija</legend>
              <select className="select select-bordered w-full" value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} required>
                <option value="" disabled>Pasirinkite kategoriją</option>
                <option value="maistas">Maistas</option>
                <option value="transportas">Transportas</option>
                <option value="butine">Būtinoji</option>
                <option value="pramogos">Pramogos</option>
                <option value="sveikata">Sveikata</option>
                <option value="kita">Kita</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Data</legend>
              <input type="date" className="input input-bordered w-full" value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Pastaba (neprivaloma)</legend>
              <textarea className="textarea textarea-bordered w-full" placeholder="Papildoma informacija..." rows={2} value={expenseForm.note} onChange={(e) => setExpenseForm({ ...expenseForm, note: e.target.value })} />
            </fieldset>
            <div className="modal-action">
              <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('expense_modal').close()}>Atšaukti</button>
              <button type="submit" className="btn btn-error font-bold text-white shadow-lg shadow-error/20">
                <span className="material-symbols-outlined text-sm">trending_down</span>
                Pridėti išlaidas
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>

      {/* Delete Confirmation Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box rounded-2xl max-w-sm text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-error/10 text-error p-4 rounded-full">
              <span className="material-symbols-outlined text-4xl">warning</span>
            </div>
          </div>
          <h3 className="text-xl font-black mb-2">Ištrinti įrašą?</h3>
          <div className="flex gap-3 justify-center">
            <button className="btn btn-ghost" onClick={() => document.getElementById('delete_modal').close()}>Atšaukti</button>
            <button className="btn btn-error text-white font-bold" onClick={handleDelete}>
              <span className="material-symbols-outlined text-sm">delete</span>
              Ištrinti
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>

      {/* Edit Transaction Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box rounded-2xl max-w-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
          </form>
          <h3 className="text-xl font-black mb-1">Redaguoti operaciją</h3>
          <p className="text-sm text-base-content/60 mb-6">Pakeiskite operacijos duomenis</p>
          <form className="space-y-4" onSubmit={handleEditSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Pavadinimas</legend>
              <input type="text" placeholder="Pavadinimas" className="input input-bordered w-full" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Suma (€)</legend>
              <input type="number" step="0.01" min="0.01" placeholder="0.00" className="input input-bordered w-full" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} required />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Kategorija</legend>
              <select className="select select-bordered w-full" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} required>
                <option value="" disabled>Pasirinkite kategoriją</option>
                {editForm.type === 'income' ? (
                  <>
                    <option value="darbas">Darbas</option>
                    <option value="papildoma">Papildoma veikla</option>
                    <option value="investicijos">Investicijos</option>
                    <option value="kita">Kita</option>
                  </>
                ) : (
                  <>
                    <option value="maistas">Maistas</option>
                    <option value="transportas">Transportas</option>
                    <option value="butine">Būtinoji</option>
                    <option value="pramogos">Pramogos</option>
                    <option value="sveikata">Sveikata</option>
                    <option value="kita">Kita</option>
                  </>
                )}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-semibold">Data</legend>
              <input type="date" className="input input-bordered w-full" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} required />
            </fieldset>
            <div className="modal-action">
              <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('edit_modal').close()}>Atšaukti</button>
              <button type="submit" className="btn btn-primary font-bold shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-sm">save</span>
                Išsaugoti
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>
    </>
  );
}
