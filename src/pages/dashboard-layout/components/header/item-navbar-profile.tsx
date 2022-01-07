import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";
import { removeAuthInCache } from "@utils/auth-provider";
import { useAuth } from "@context/auth-context";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, useHistory } from "react-router-dom";

const ItemNavbarProfile = (): React.ReactElement => {
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = (): void => {
    removeAuthInCache();
    auth.setData(null);
    history.push("/login");
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div className="px-2">
        <img
          src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-4-470x470.png"
          alt="..."
          className="shadow-lg rounded-full h-8 w-8 align-middle border-none"
          width="32"
          height="32"
        />
      </div>

      <Menu as="div" className="relative">
        {({ open }) => (
          <Fragment>
            <div className="flex h-full items-center justify-center">
              <Menu.Button className="flex text-sm font-medium text-gray-600 hover:text-gray-800 rounded-md bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {auth.user && `${auth.user.firstName} ${auth.user.lastName}`}
                <HiChevronDown
                  className="w-5 h-5 ml-2 -mr-1 text-gray-600 hover:text-gray-800"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="bg-white pt-0.5 pb-2 px-3 mb-1 border border-gray-200 origin-bottom-left absolute text-sm text-gray-800 rounded-md shadow-lg ring-black focus:outline-none right-1 w-48"
              >
                <div className="py-1">
                  <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
                    <div className="font-medium text-gray-800">
                      {auth.user &&
                        `${auth.user.firstName} ${auth.user.lastName}`}
                    </div>
                    <div className="text-xs text-gray-500 italic">
                      {auth.user && auth.user.role.name}
                    </div>
                  </div>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        className={`font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3 ${
                          active ? "text-indigo-600" : ""
                        }`}
                        to="/account-settings"
                      >
                        Mi perfil
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className={`font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3 ${
                          active ? "text-indigo-600" : ""
                        }`}
                      >
                        Cerrar sesión
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Fragment>
        )}
      </Menu>
    </div>
  );
};

export { ItemNavbarProfile };
