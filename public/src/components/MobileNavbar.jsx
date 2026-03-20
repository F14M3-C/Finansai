

function MobileNavbar(){
    return(
        <>
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
        </>
    )
}

export default MobileNavbar;