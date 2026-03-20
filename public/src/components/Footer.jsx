

function Footer(){
    return(
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
    )
}

export default Footer;