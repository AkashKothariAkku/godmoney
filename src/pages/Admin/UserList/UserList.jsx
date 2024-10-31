import { useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { Card } from "react-bootstrap";
import DataGrid from "./DataGrid";
import { AddCustomer } from "../../../components/Admin/Modals";

export default function UserList() {
  const [loader] = useState(true);
  const [userData] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [rejectedData, setRejectedData] = useState(false);
 
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>User List</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  setRejectedData(!rejectedData);
                }}
              >
                {rejectedData ? "Activated Accounts " : " Deactivated Accounts"}
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <DataGrid userData={userData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <AddCustomer show={show} handleClose={handleClose} />
    </>
  );
}
