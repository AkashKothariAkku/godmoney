import m from "./Modal.module.scss";
import { NavLink } from "react-router-dom";
import { Modal } from "react-bootstrap";


const DeletePopup = (props) => {
  let { show, handleClose } = props;
  return (
    <>
      <Modal
        centered
        scrollable
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <div className={`${m.logoutPopup}`}>
          <h3>Are you Sure you want to Delete this item?</h3>
          <div className={`${m.btnsAlignments}`}>
            <button
              type="button"
              className={`btn ${m.actionBtn}`}
            >
              Delete
            </button>
            <NavLink
              className={`btn ${m.cancelBtn}`}
              to=""
              onClick={handleClose}
            >
              Cancel
            </NavLink>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeletePopup;
