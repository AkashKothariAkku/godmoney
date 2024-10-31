import { useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { Phonenumber } from "..";

const AddCustomer = (props) => {
  let { show, handleClose } = props;
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const [fields, setFields] = useState({
    name: "",
    email: "",
    mobileNumber: 0,
    dialCode: 0,
    countryCode: "",
  });
  const [fieldError, setFieldError] = useState();

  const fillFields = (key, value) => {
    setFields((prev) => {
      return { ...prev, [key]: value };
    });
    if (fieldError !== undefined && fieldError[key]) {
      fieldError[key] = "";
    }
  };
  function phoneInput(value, data) {
    fillFields("mobileNumber", +value);
    fillFields("dialCode", +data?.dialCode);
    fillFields("countryCode", data?.countryCode);
  }
  function checkFields(fields) {
    const fieldErr = {};
    Object.keys(fields).forEach((e) => {
      if (
        fields[e].trim() === "" &&
        e !== "mobileNumber" &&
        e !== "dialCode" &&
        e !== "countryCode"
      ) {
        fieldErr[e] = <p className={`${cm.error}`}> This field is required </p>;
      }
    });
    if (Object.keys(fieldErr).length === 0) {
      if (fields.email.match(regex)) {
        console.log(fields)
      } else {
        fieldErr.email = <p className={`${cm.error}`}> Invalid Email </p>;
        setFieldError(fieldErr);
      }
    } else {
      setFieldError(fieldErr);
    }
  }
  return (
    <>
      <Modal
        centered
        scrollable
        show={show}
        onHide={handleClose}
        className={`${m.modalCts}`}
      >
        <Modal.Header>
          <Modal.Title>Add Customer</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handleClose}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <label>Customer Name</label>
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => fillFields("name", e.target.value)}
                />
              </div>
              {fieldError?.name}
            </Col>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <label>Email</label>
                <Form.Control
                  type="email"
                  placeholder=""
                  onChange={(e) => fillFields("email", e.target.value)}
                />
                {fieldError?.email}
              </div>
            </Col>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <label>Phone Number</label>
                <Phonenumber phoneInput={phoneInput} />
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className={`${m.submit}`}
            onClick={() => {
              checkFields(fields);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCustomer;
