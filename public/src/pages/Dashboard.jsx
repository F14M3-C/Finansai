import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

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
                  <ul className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-2 border border-base-200" tabIndex={0}>
                    <li><a><span className="material-symbols-outlined text-emerald-600">trending_up</span> Pridėti pajamas</a></li>
                    <li><a><span className="material-symbols-outlined text-error">trending_down</span> Pridėti išlaidas</a></li>
                  </ul>
                </div>
              </div>
            </div>

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
                        <tr className="hover group">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar placeholder">
                                <div className="bg-orange-100 text-primary rounded w-10">
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
                              <button className="btn btn-ghost btn-xs btn-square" title="Redaguoti"><span className="material-symbols-outlined text-sm">edit</span></button>
                              <button className="btn btn-ghost btn-xs btn-square text-error" title="Ištrinti"><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover group">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar placeholder">
                                <div className="bg-error/10 text-error rounded w-10">
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
                              <button className="btn btn-ghost btn-xs btn-square" title="Redaguoti"><span className="material-symbols-outlined text-sm">edit</span></button>
                              <button className="btn btn-ghost btn-xs btn-square text-error" title="Ištrinti"><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover group">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar placeholder">
                                <div className="bg-orange-100 text-primary rounded w-10">
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
                              <button className="btn btn-ghost btn-xs btn-square" title="Redaguoti"><span className="material-symbols-outlined text-sm">edit</span></button>
                              <button className="btn btn-ghost btn-xs btn-square text-error" title="Ištrinti"><span className="material-symbols-outlined text-sm">delete</span></button>
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
              <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all bg-orange-100 text-primary border-r-4 border-primary">
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
  );
}
