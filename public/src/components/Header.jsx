import { useNavigate } from "react-router"



  function Header(){

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

    return (
        <>
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
                <ul className="mt-3 z-1 p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200" tabIndex={0}>
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
        </>
    )
}

export default Header;