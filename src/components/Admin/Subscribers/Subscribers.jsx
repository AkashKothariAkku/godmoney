import { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Card } from "react-bootstrap";
import UserDataGrid from "./DataGrid";
import table from "../../../assets/stylesheet/datatable.module.scss";

export default function Subscribers() {
  const [loader, setLoader] = useState(true);
  const [contactData] = useState([]);
  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>People Subscribers</h5>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <UserDataGrid contactData={contactData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
