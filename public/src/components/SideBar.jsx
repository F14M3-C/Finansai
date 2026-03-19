

function SideBar(){
    return(
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
    )
}

export default SideBar;