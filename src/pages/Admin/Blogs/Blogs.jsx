import { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Card } from "react-bootstrap";
import UserDataGrid from "./DataGrid";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { ToastContainer } from "react-toastify";
import axios from "axios";

export default function Blogs() {
  const [loader, setLoader] = useState(true);
  const [contestData, setContestData] = useState([]);

  useEffect(() => {
    setLoader(false);
  }, []);
  const getContestData = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/request-amount-list`)
      .then(function (response) {
        let data = [];
        let count = 0
        
        response?.data?.data?.map(e => {
          data.push({...e, id: ++count})
        })
        setContestData(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getContestData ()
  }, [])
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <ToastContainer autoClose={3000} limit={1} />
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Requested Amount List</h5>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <UserDataGrid blogData={contestData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
