import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cx from "./Sidebar.module.scss";
import { AiOutlineDashboard, AiOutlineShop } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import logo from '../FMFwhitelogo.svg'

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.endsWith("/admin")) {
      setActive(1);
    } else if (pathname.includes("/admin/users")) {
      setActive(2);
    } else if (pathname.includes("/admin/subscribers")) {
      setActive(4);
    } else if (pathname.includes("/admin/blogs")) {
      setActive(5);
    } else if (pathname.includes("/admin/contest")) {
      setActive(6);
    }
  }, [pathname]);

  return (
    <>
      <aside
        className={`${cx.sidebarBody}`}
      >
        <div
          className={`${cx.hideBg}`}
        ></div>
        <div className={`${cx.sidebarMain}`}>
          <div className={`${cx.logoBox}`}>
            <NavLink className={`${cx.navlogo}`} to="/admin">
              <img src={logo} className={`${cx.logoIcon}`} alt="logo" />
            </NavLink>
          </div>

          <div className={`${cx.menuList}`}>
            <ul className={`${cx.scroll}`}>
              <li>
                <NavLink
                  className={
                    active === 1
                      ? `${cx.active} ${cx.signleMenu}`
                      : cx.signleMenu
                  }
                  to="/admin"
                >
                  <div className={`${cx.menuIcon}`}>
                    <AiOutlineDashboard className={`${cx.Icon}`} />
                  </div>
                  <div className={`${cx.menuName}`}>Dashboard</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    active === 2
                      ? `${cx.active} ${cx.signleMenu}`
                      : cx.signleMenu
                  }
                  to="/admin/users"
                >
                  <div className={`${cx.menuIcon}`}>
                    <HiOutlineUserGroup className={`${cx.Icon}`} />
                  </div>
                  <div className={`${cx.menuName}`}>Users</div>
                </NavLink>
              </li>
              <li>
              <li>
                <NavLink
                  className={
                    active === 5
                      ? `${cx.active} ${cx.signleMenu}`
                      : cx.signleMenu
                  }
                  to="/admin/blogs"
                >
                  <div className={`${cx.menuIcon}`}>
                    <HiOutlineUserGroup className={`${cx.Icon}`} />
                  </div>
                  <div className={`${cx.menuName}`}>Requested Amount</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    active === 6
                      ? `${cx.active} ${cx.signleMenu}`
                      : cx.signleMenu
                  }
                  to="/admin/contest"
                >
                  <div className={`${cx.menuIcon}`}>
                    <HiOutlineUserGroup className={`${cx.Icon}`} />
                  </div>
                  <div className={`${cx.menuName}`}>Contest</div>
                </NavLink>
              </li>
                <NavLink
                  className={
                    active === 4
                      ? `${cx.active} ${cx.signleMenu}`
                      : cx.signleMenu
                  }
                  to="/admin/subscribers"
                >
                  <div className={`${cx.menuIcon}`}>
                    <AiOutlineShop className={`${cx.Icon}`} />
                  </div>
                  <div className={`${cx.menuName}`}>Subscribers</div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
