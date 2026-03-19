

function CoreMetricsGrid(){
    return (
        <>
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
        </>
    )
}

export default CoreMetricsGrid;