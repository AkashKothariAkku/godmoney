import st from "../../../../assets/stylesheet/AdminStyle.module.scss";
import cx from "./AddBlog.module.scss";
import { Col } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AddBlog = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [blogFields, setBlogFields] = useState({
    authorImage: "",
    publishDate: "",
    title: "",
    description: "",
  });
  const [fieldError, setFieldError] = useState();
  const fillFields = useCallback(
    (key, value) => {
      setBlogFields((prev) => {
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
      if (window.location.pathname.includes("edit-blog")) {
       console.log('edit')
      } else {
        console.log('add')
      }
    } else {
      setFieldError(fieldErr);
    }
  };
  useEffect(() => {
    setBlogFields({
      authorImage: "",
      publishDate: "",
      title: "",
      description: "",
    });
    setStartDate(new Date());
  }, []);
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
              navigate("/admin/blogs");
            }}
          >
            Blogs
          </button>
          /
          <button type="button" className={cx.active}>
            {window.location.pathname.includes("edit-blog")
              ? "Edit-Blog"
              : "Add-Blog"}
          </button>
        </Col>

        <Col md={12} className={cx.addBlogContainer}>
          <div className={`d-flex align-items-center ${cx.userDetails}`}>
          <div className={`${cx.postTitle}`}>
              <h6>Blog Banner Image</h6>
            <div>
              <div
                className={`d-flex flex-column align-items-center ${cx.userProfile}`}
              >
                <img
                  src='images/FMFBlacklogo.svg'
                  alt="authorProfile"
                />
                <div className={cx.uploadBtnWrapper}>
                  <button className={cx.btn}>
                    <FaUpload
                      style={{ color: "#ffffff", fontSize: "14px" }}
                    />
                  </button>
                  <input
                    type="file"
                    name="myfile"
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    onChange={() => {
                      fillFields("authorImage", "");
                    }}
                  />
                </div>
              </div>
              {fieldError?.authorImage}
            </div>

            <div>
            </div>
          </div>
          </div>
          <div>
            <h6>Date</h6>
          <div className={`${cx.postTitle}`}>
          <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      const publishDate = new Date(date).toLocaleDateString();
                      fillFields("publishDate", publishDate);
                      setStartDate(date);
                    }}
                  />
          </div>
          </div>
                  {fieldError?.publishDate}
          <div>
            <h6>Blog Title</h6>
          <div className={`${cx.postTitle}`}>
            <textarea
              name=""
              id=""
              rows={1}
              placeholder="Blog Tilte"
              value={blogFields?.title}
              onChange={(e) => fillFields("title", e.target.value)}
            ></textarea>
          </div>
          </div>
          {fieldError?.title}
          {/* <div>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              placeholder="Description"
            ></textarea>
          </div> */}
          <div>
            <h6>Blog URL</h6>
            <div className={`${cx.postTitle}`}>
            <textarea
              name=""
              id=""
              rows={1}
              placeholder="Blog URL"
              value={blogFields?.description}
              onChange={(e) => fillFields("description", e.target.value)}
            ></textarea>
          </div>
          </div>
          {fieldError?.description}
          <section className={`d-flex justify-content-end   `}>
            <button
              type="button"
              className="btn btn-success m-2"
              onClick={() => checkFields(blogFields)}
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
