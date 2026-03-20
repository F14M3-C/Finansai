import InsightCard from "./InsightCard";

function RightSidebar(){
    return(
        <>
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
                <InsightCard />

              </div>
        </>
    )
}

export default RightSidebar;