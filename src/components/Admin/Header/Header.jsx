import cx from "./Header.module.scss";
import { NavLink } from "react-router-dom";

import { Col } from "react-bootstrap";
import { BiLogOutCircle } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";

const Header = () => {

  return (
    <>
      <header className={`${cx.mainHeader}`}>
        <Col className={` d-flex justify-content-end gap-4 ${cx.headerRight}`}>
          <NavLink to="edit-profile">
            <FaUserEdit style={{ marginRight: "5px" }} />
            Edit Profile
          </NavLink>
          <NavLink
            to="#"
            className={cx.logoutButton}
          >
            <BiLogOutCircle style={{ marginRight: "5px" }} />
            Logout
          </NavLink>
        </Col>
      </header>
    </>
  );
};

export default Header;
