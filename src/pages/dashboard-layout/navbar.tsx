import { HiMenu } from "react-icons/hi";
import { ItemNavbarProfile } from "../components/item-navbar-profile";
import { useCompany } from "@services/company";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = (): React.ReactElement => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = useCompany();

  return (
    <div className="">
      <div className="flex">
        <div className="w-full px-2 pt-1">
          <nav className="relative flex flex-wrap items-center justify-between px-1 py-3 bg-primary-100 rounded">
            <div className="container px-2 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto px-2 lg:static lg:block lg:justify-start">
                <Link
                  className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                  to=""
                >
                  {data && data.name ? data.name : "Gymnasium"}
                </Link>
                <button
                  className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <HiMenu />
                </button>
              </div>
              <div
                className={
                  "lg:flex flex-grow items-center" +
                  (menuOpen ? " flex" : " hidden")
                }
                id="example-navbar-info"
              >
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                  <li className="nav-item">
                    <NavLink
                      className="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      activeClassName="text-secondary"
                      to="/company"
                    >
                      Configuración
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      activeClassName="text-secondary"
                      to="/customers"
                    >
                      Clientes
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      activeClassName="text-secondary"
                      to="membership"
                    >
                      Membresias
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="px-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      activeClassName="text-secondary"
                      to="accounting"
                    >
                      Caja
                    </NavLink>
                  </li>
                  <li className="nav-item ml-8">
                    <ItemNavbarProfile />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
