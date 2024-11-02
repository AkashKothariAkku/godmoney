import { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Card } from "react-bootstrap";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import ViewContestGrid from "./ViewContestGrid";

export default function ViewContest() {
  const [loader, setLoader] = useState(true);
  const [contestData, setContestData] = useState([]);
  const params = useParams()
  console.log(params)
  const getContestViewData = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/view-contest/${params?.id}`,{
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
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
    getContestViewData ()
  }, [])

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <ToastContainer autoClose={3000} limit={1} />
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Participation List</h5>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <ViewContestGrid contestData={contestData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
