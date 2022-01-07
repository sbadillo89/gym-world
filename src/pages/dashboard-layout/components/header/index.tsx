import { ItemNavbarProfile } from "./item-navbar-profile";
import { useCompany } from "@services/company";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({
  sidebarOpen,
  setSidebarOpen,
}: HeaderProps): React.ReactElement => {
  const { data: company } = useCompany();

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

            <div className="flex gap-x-4 ml-6">
              {company && company.facebookSite && (
                <a target="_blank" href={company.facebookSite} rel="noreferrer">
                  <FaFacebookSquare className="text-gray-900 h-6 w-6 cursor-pointer" />
                </a>
              )}
              {company && company.instagramSite && (
                <a
                  target="_blank"
                  href={company.instagramSite}
                  rel="noreferrer"
                >
                  <FaInstagramSquare className="text-gray-900 h-6 w-6 cursor-pointer" />
                </a>
              )}
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            {/*  Divider */}
            <hr className="w-px h-6 bg-gray-200 mx-3" />
            <ItemNavbarProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
