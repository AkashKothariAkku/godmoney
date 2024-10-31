import { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Card } from "react-bootstrap";
import UserDataGrid from "./DataGrid";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Blogs() {
  const [loader, setLoader] = useState(true);
  const [blogData] = useState([]);

  const navigate = useNavigate();

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
              <h5>Blogs List</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  navigate("/admin/add-blog");
                }}
              >
                <AiOutlineFileAdd className={st.icon} />
                Add New Blog
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <UserDataGrid blogData={blogData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
