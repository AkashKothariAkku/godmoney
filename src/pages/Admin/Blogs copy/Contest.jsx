import { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Card } from "react-bootstrap";
import UserDataGrid from "./DataGrid";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

export default function Contest() {
  const [loader, setLoader] = useState(true);
  const [contestData, setContestData] = useState([]);

  const navigate = useNavigate();

  const getContestData = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/get-all-contest`,{
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
    getContestData ()
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
              <h5>Contest List</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  navigate("/admin/add-contest");
                }}
              >
                <AiOutlineFileAdd className={st.icon} />
                Add New Contest
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <UserDataGrid contestData={contestData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
