import { FaReact } from "react-icons/fa6";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSidebar } from "../features/dashboard/dashboardSlice";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { toggleDarkMode } from "../features/darkMode/darkModeSlice";
import { useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string; // Assuming user has a profile image field
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users");
  
        const data: { user: User } = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch current user", error);
      }
    };
  
    fetchCurrentUser();
  }, []);
  

  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.darkMode);

  return (
    <header className="dark:bg-blackPrimary bg-whiteSecondary relative">
      <div className="flex justify-between items-center px-9 py-5 max-xl:flex-col max-xl:gap-y-7 max-[400px]:px-4">
        <HiOutlineMenu
          className="text-2xl dark:text-whiteSecondary text-blackPrimary absolute bottom-7 left-5 xl:hidden max-sm:static max-sm:order-1 cursor-pointer"
          onClick={() => dispatch(setSidebar())}
        />
        <Link to="/">
          <FaReact className="text-4xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer" />
        </Link>
        <SearchInput />
        <div className="flex gap-4 items-center max-xl:justify-center">
          <span className="dark:text-whiteSecondary text-blackPrimary">EN</span>
          {darkMode ? (
            <HiOutlineSun
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl dark:text-whiteSecondary text-blackPrimary cursor-pointer"
            />
          ) : (
            <HiOutlineMoon
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl dark:text-whiteSecondary text-blackPrimary cursor-pointer"
            />
          )}
          <Link to="/notifications">
            <HiOutlineBell className="text-xl dark:text-whiteSecondary text-blackPrimary" />
          </Link>

          {/* Display all users */}
          {user && (
            <Link to={`/profiles/${user._id}`}>
              <div className="flex gap-2 items-center">
                {/* Optional profile image */}
                {user.profileImage && (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <p className="dark:text-whiteSecondary text-blackPrimary text-base max-xl:text-sm">
                    {user.name}
                  </p>
                  <p className="dark:text-whiteSecondary text-blackPrimary text-sm max-xl:text-xs">
                    {user.role}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
