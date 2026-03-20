import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHero from "../components/DashboardHero";

export default function Dashboard() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("INCOME");
  const [description, setDescription] = useState("");

  const handleLogout = () => {
    navigate("/login");
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/transactions");
      if (!response.ok) throw new Error("Nepavyko gauti duomenų");
      const { data } = await response.json();
      setTransactions(data || []);
    } catch (error) {
      console.error("Klaida gaunant operacijas iš serverio:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount: parseFloat(amount),
          type,
          description: description.trim() || null,
          accountId: 1, // Mock account id for now
        }),
      });

      if (response.ok) {
        setTitle("");
        setAmount("");
        setType("INCOME");
        setDescription("");
        setIsAddOpen(false);
        fetchTransactions();
      } else {
        const errorData = await response.json();
        alert("Klaida: " + (errorData.error || "Nepavyko išsaugoti."));
      }
    } catch (error) {
      console.error("Ryšio klaida:", error);
      alert("Nepavyko susisiekti su serveriu.");
    }
  };

  const transactionsToRender = showAll 
    ? [...transactions].reverse() 
    : [...transactions].reverse().slice(0, 5);

  return (
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
            <DashboardHero />

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-orange-100 text-primary p-2 rounded-lg">
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
                        {transactions.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="py-12 text-center text-base-content/60">
                              <div className="flex flex-col items-center justify-center">
                                <span className="material-symbols-outlined text-5xl mb-3 opacity-50">receipt_long</span>
                                <p className="text-lg font-bold text-base-content/80">Nėra naujų operacijų</p>
                                <p className="text-sm mt-1">
                                  Pradėkite paspaudę <button className="btn btn-link btn-sm px-1 text-primary" onClick={() => setIsAddOpen(true)}>Pridėti operaciją</button>
                                </p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          transactionsToRender.map((transaction, idx) => {
                            const isIncome = transaction.type === "INCOME";
                            const amountFormatted = parseFloat(transaction.amount).toFixed(2);
                            const dateFormatted = new Date(transaction.createdAt).toLocaleDateString("lt-LT", { month: 'long', day: '2-digit' }).replace(' m.', '');
                            return (
                              <tr key={transaction.id || idx} className="hover group">
                                <td>
                                  <div className="flex items-center gap-3">
                                    <div className="avatar placeholder">
                                      <div className={`${isIncome ? 'bg-orange-100 text-primary' : 'bg-error/10 text-error'} rounded w-10`}>
                                        <span className="material-symbols-outlined text-xl">{isIncome ? 'work' : 'shopping_bag'}</span>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="font-bold">{transaction.title}</div>
                                      <div className="text-[10px] opacity-50 font-bold uppercase">{isIncome ? 'Pajamos' : 'Išlaidos'}</div>
                                    </div>
                                  </div>
                                </td>
                                <td><div className="badge badge-outline border-base-300 text-[10px] font-bold">{transaction.description ? 'Išsami' : 'Bendra'}</div></td>
                                <td className="text-base-content/60 font-medium text-sm">{dateFormatted}</td>
                                <td className={`text-right font-black ${isIncome ? 'text-emerald-600' : 'text-error'}`}>
                                  {isIncome ? '+' : '-'}€{amountFormatted}
                                </td>
                                <td className="text-center">
                                  <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="btn btn-ghost btn-xs btn-square" title="Redaguoti"><span className="material-symbols-outlined text-sm">edit</span></button>
                                    <button className="btn btn-ghost btn-xs btn-square text-error" title="Ištrinti"><span className="material-symbols-outlined text-sm">delete</span></button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  {transactions.length > 5 && (
                    <div className="p-4 border-t border-base-200 text-center">
                      <button 
                        className="btn btn-ghost btn-sm text-primary font-bold"
                        onClick={() => setShowAll(!showAll)}
                      >
                        {showAll ? "Rodyti mažiau" : `Žiūrėti visą sąrašą (${transactions.length})`}
                      </button>
                    </div>
                  )}
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
                          <button className="btn btn-ghost btn-xs btn-square text-error"><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-xl group">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm font-bold">Investicijos</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="btn btn-ghost btn-xs btn-square"><span className="material-symbols-outlined text-sm">edit</span></button>
                          <button className="btn btn-ghost btn-xs btn-square text-error"><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-base-200/50 rounded-xl group">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          <span className="text-sm font-bold">Pramogos</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="btn btn-ghost btn-xs btn-square"><span className="material-symbols-outlined text-sm">edit</span></button>
                          <button className="btn btn-ghost btn-xs btn-square text-error"><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insight Card */}
                <div className="card bg-orange-50 border border-orange-200">
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
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all sidebar-active">
                <span className="material-symbols-outlined">dashboard</span>
                Apžvalga
              </a>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all">
                <span className="material-symbols-outlined">payments</span>
                Pajamos
              </a>
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold hover:bg-base-200 transition-all">
                <span className="material-symbols-outlined">shopping_cart</span>
                Išlaidos
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
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isAddOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box rounded-2xl">
            <h3 className="font-black text-xl mb-6">Pridėti operaciją</h3>
            <form onSubmit={handleAddSubmit}>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Tipas</span></label>
                  <select 
                    className="select select-bordered w-full rounded-xl" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="INCOME">Pajamos</option>
                    <option value="EXPENSE">Išlaidos</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Pavadinimas</span></label>
                  <input
                    className="input input-bordered w-full rounded-xl"
                    type="text"
                    placeholder="Pvz., Atlyginimas"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Suma</span></label>
                  <div className="join">
                    <span className="join-item btn btn-disabled">€</span>
                    <input
                      className="input input-bordered join-item w-full rounded-r-xl"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Aprašymas</span></label>
                  <textarea
                    className="textarea textarea-bordered w-full rounded-xl"
                    placeholder="Papildoma informacija (nebūtina)"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-action mt-6">
                <button type="button" className="btn btn-ghost font-bold" onClick={() => setIsAddOpen(false)}>Atšaukti</button>
                <button type="submit" className="btn btn-primary px-8 font-bold">Pridėti</button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsAddOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
