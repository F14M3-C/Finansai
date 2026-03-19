

function TransactionsList(){

    return(
            <>
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

                        {/* <tr className="hover group">
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
                        </tr> */}

                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-base-200 text-center">
                    <button className="btn btn-ghost btn-sm text-primary font-bold">Žiūrėti visą sąrašą</button>
                  </div>
                </div>
              </div>
            </>
    )
}

export default TransactionsList;