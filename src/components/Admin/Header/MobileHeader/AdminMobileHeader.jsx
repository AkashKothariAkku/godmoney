import cx from "./AdminMobileHeader.module.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { NavLink } from "react-router-dom";
import { MdOutlineLogout, MdOutlineSettings } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineDashboard, AiOutlineShop } from "react-icons/ai";

const HamburgerIcon = () => {
  return (
    <div className={cx.hamburger}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
const NavData = () => {
  return (
    <section className={cx.sidepanel}>
      <div className="d-flex flex-column">
        <h5 className=""> Menu</h5>

        <NavLink to="/admin">
          <AiOutlineDashboard />
          <span>Dashboard </span>
        </NavLink>
        <NavLink to="/admin/users">
          <HiOutlineUserGroup />
          <span>Users</span>
        </NavLink>
        <NavLink to="/admin/blogs">
          <HiOutlineUserGroup />
          <span>Blogs</span>
        </NavLink>
        <NavLink to="/admin/cafes">
          <AiOutlineShop />
          <span>Businesses</span>
        </NavLink>
        <NavLink to="/admin/subscribers">
          <AiOutlineShop />
          <span>Subscribers</span>
        </NavLink>
      </div>
      <div className="d-flex flex-column">
        <h5>Account</h5>

        <NavLink to="edit-profile">
          <MdOutlineSettings />
          <span>Edit</span>
        </NavLink>
        <button className=" btn ">
          <MdOutlineLogout />
          <span>Log Out</span>
        </button>
      </div>
    </section>
  );
};

const AdminMobileHeader = () => {
  return (
    <nav className={cx.navbar}>
      <div className={cx.adminheaderTitle}>
        <img src='images/FMFBlacklogo.svg' alt="Logo" />
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <Button variant="contained" {...bindTrigger(popupState)}>
                <HamburgerIcon />
              </Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  <NavData />
                </Typography>
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    </nav>
  );
};

export default AdminMobileHeader;
