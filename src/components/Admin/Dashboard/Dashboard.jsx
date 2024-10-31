import { useNavigate } from "react-router-dom";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import cx from "./Dashboard.module.scss";
import { Card, Row, Col } from "react-bootstrap";
import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";


export default function Dashboard() {

  const navigate = useNavigate();


  window.addEventListener(
    "popstate",
    () => {
      if (!window.location.pathname.includes("admin")) {
        navigate("/admin/");
      }
    },
    false
  );

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={4} md={6}>
                  <div className={`${cx.contentBox} ${cx.countCardBox1}`}>
                    <p>
                      <HiOutlineUserGroup
                        style={{
                          fontSize: "20px",
                          color: "#496089",
                          margin: "0 5px 5px ",
                        }}
                      />
                      Total Users
                    </p>
                    <h2>
                      20
                    </h2>
                  </div>
                </Col>
                <Col lg={4} md={6}>
                  <div className={`${cx.contentBox} ${cx.countCardBox2}`}>
                    <p>
                      <AiOutlineShop
                        style={{
                          fontSize: "20px",
                          margin: "0 5px 5px ",
                          color: "#738801",
                        }}
                      />
                      Total Businesses
                    </p>
                    <h2> 30</h2>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
