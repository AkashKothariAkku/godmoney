import st from "../../../../assets/stylesheet/AdminStyle.module.scss";
import cx from "./AddBlog.module.scss";
import { Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
const AddBlog = () => {
  const navigate = useNavigate();
  const [contestField, setContestField] = useState({
    winnerAmount: 1,
    maxAmount: 100,
    sentence: ""
  });
  const [fieldError, setFieldError] = useState();
  const fillFields = useCallback(
    (key, value) => {
      setContestField((prev) => {
        return { ...prev, [key]: value };
      });
      if (
        fieldError !== undefined &&
        fieldError[key] &&
        value !== "<p></p>" &&
        value !== ""
      ) {
        fieldError[key] = "";
      }
    },
    [fieldError]
  );
  const checkFields = (fields) => {
    const fieldErr = {};
    Object.keys(fields).forEach((e) => {
      if (fields[e] === "" || fields[e] === "<p></p>") {
        fieldErr[e] = (
          <p
            style={{
              color: "red",
              fontSize: "12px",
              margin: "0",
            }}
          >
            This field is required
          </p>
        );
      }
    });
    if (Object.keys(fieldErr).length === 0) {
      if (window.location.pathname.includes("edit-contest")) {
       console.log('edit')
      } else {
        handleSubmit(contestField)
      }
    } else {
      setFieldError(fieldErr);
    }
  };
  useEffect(() => {
    setContestField({
      winnerAmount: 1,
      maxAmount: 100,
      sentence: ""
    });
  }, []);
  const handleSubmit = (formData) => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/add-contest`, formData, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(function (response) {
      console.log(response);
      navigate("/admin/contest", formData);
    })
    .catch(function (error) {
      console.log(error);
      toast(error?.response?.data?.message)
    });
  };
  return (
    <section className={`${st.pageWrapper}`}>
      <ToastContainer autoClose={3000} limit={1} />
      <div className={`${st.pageWrapperInside}`}>
        <Col className={cx.buttonsContainer}>
          <button
            type="button"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Home
          </button>
          /
          <button
            type="button"
            onClick={() => {
              navigate("/admin/contest");
            }}
          >
            Contest
          </button>
          /
          <button type="button" className={cx.active}>
            {window.location.pathname.includes("edit-contest")
              ? "Edit-Contest"
              : "Add-Contest"}
          </button>
        </Col>

        <Col md={12} className={cx.addBlogContainer}>
     
       <div>
            <h6>Contest Winner Amount</h6>
          <div className={`${cx.postTitle}`}>
            <input
              type="number"
              name=""
              id=""
              rows={1}
              min={1}
              value={contestField?.winnerAmount}
              onChange={(e) => fillFields("winnerAmount", e.target.value)}
            />
          </div>
          </div>
          {fieldError?.winnerAmount}
       <div>
            <h6>Contest Max Amount</h6>
          <div className={`${cx.postTitle}`}>
            <input
              type="number"
              name=""
              id=""
              rows={1}
              min={10}
              value={contestField?.maxAmount}
              onChange={(e) => fillFields("maxAmount", e.target.value)}
            />
          </div>
          </div>
          {fieldError?.maxAmount}
       <div>
            <h6>Contest Sentence</h6>
          <div className={`${cx.postTitle}`}>
            <textarea
              type="text"
              name=""
              id=""
              rows={1}
              value={contestField?.sentence}
              onChange={(e) => fillFields("sentence", e.target.value)}
            />
          </div>
          </div>
          {fieldError?.sentence}
        
          <section className={`d-flex justify-content-end   `}>
            <button
              type="button"
              className="btn btn-success m-2"
              onClick={() => checkFields(contestField)}
            >
              Save
            </button>
            <button type="button" className="btn btn-secondary m-2">
              Cancel
            </button>
          </section>
        </Col>
      </div>
    </section>
  );
};

export default AddBlog;
