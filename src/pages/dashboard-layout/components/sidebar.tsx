/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { LogoApp } from "../../../assets/images";
import { useCompany } from "@services/company";
import { useRef } from "react";
import {
  FaCashRegister,
  FaCogs,
  FaHome,
  FaRegAddressCard,
  FaUsers,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps): React.ReactElement => {
  const { data } = useCompany();
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split("/")[1];

  const trigger = useRef(null);
  const sidebar = useRef(null);

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-gray-800 p-4 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink exact to="/" className="flex gap-4">
            {data && data.image ? (
              <img
                src={data.image}
                alt={data.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <LogoApp />
            )}

            <h1 className="text-secondary text-xl font-semibold">
              {data && data.name ? data.name : "Gymnasium"}
            </h1>
          </NavLink>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            Menú
          </h3>
          <ul className="mt-3">
            {/* Dashboard */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === "" && "bg-gray-900"
              }`}
            >
              <NavLink
                exact
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  <FaHome
                    className={`h-6 w-6 fill-current text-gray-600 mr-3 ${
                      page === "" && "text-indigo-500"
                    }`}
                  />
                  <span className="text-sm font-medium">Inicio</span>
                </div>
              </NavLink>
            </li>
            {/* Customers */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === "customers" && "bg-gray-900"
              }`}
            >
              <NavLink
                exact
                to="/customers"
                className="block text-gray-200 hover:text-white transition duration-150"
                activeClassName="hover:text-gray-200"
              >
                <div className="flex flex-grow">
                  <FaUsers
                    className={`h-6 w-6 fill-current text-gray-600 mr-3 ${
                      page === "customers" && "text-indigo-500"
                    }`}
                  />
                  <span className="text-sm font-medium">Clientes</span>
                </div>
              </NavLink>
            </li>
            {/* Memberships */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === "memberships" && "bg-gray-900"
              }`}
            >
              <NavLink
                exact
                to="/memberships"
                className="block text-gray-200 hover:text-white transition duration-150"
                activeClassName="hover:text-gray-200"
              >
                <div className="flex flex-grow">
                  <FaRegAddressCard
                    className={`h-6 w-6 fill-current text-gray-600 mr-3 ${
                      page === "memberships" && "text-indigo-500"
                    }`}
                  />
                  <span className="text-sm font-medium">Membresias</span>
                </div>
              </NavLink>
            </li>
            {/* Accounting */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === "accounting" && "bg-gray-900"
              }`}
            >
              <NavLink
                exact
                to="/accounting"
                className="block text-gray-200 hover:text-white transition duration-150"
                activeClassName="hover:text-gray-200"
              >
                <div className="flex flex-grow">
                  <FaCashRegister
                    className={`h-6 w-6 fill-current text-gray-600 mr-3 ${
                      page === "accounting" && "text-indigo-500"
                    }`}
                  />
                  <span className="text-sm font-medium">Caja</span>
                </div>
              </NavLink>
            </li>

            {/* Settings */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === "company" && "bg-gray-900"
              }`}
            >
              <NavLink
                exact
                to="/company"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "company" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  <FaCogs
                    className={`h-6 w-6 fill-current text-gray-600 mr-3 ${
                      page === "company" && "text-indigo-500"
                    }`}
                  />
                  <span className="text-sm font-medium">Configuración</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
