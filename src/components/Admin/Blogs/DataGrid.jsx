import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import tb from "../../../assets/stylesheet/datatable.module.scss";
import { NavLink } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { DeletePopup } from "../../../components/Admin/Modals";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmationPopupBlog from "../../../components/Admin/Modals/ConfirmationPopupBlog";

const BlogStatus = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div>
      <button
        onClick={() => handleShow()}
        style={{
          borderRadius: "5px",
          color: "green",
          width: "100px",
          fontWeight: "500",
          fontSize: "14px",
          border: "1px solid green",
          fontFamily: "Plus Jakarta Sans",
          backgroundColor: "white",
        }}
      >
        {"Published"}
      </button>
      <ConfirmationPopupBlog
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};
const StatusButton = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <ul className={`${tb.actionTable}`}>
          <li>
            <NavLink
              className={`btn ${tb.edit}`}
              title="Edit"
              to={`/admin/edit-blog/10`}
            >
              <MdEdit />
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className={`btn ${tb.delete}`}
              title="Delete"
              onClick={handleShow}
            >
              <AiFillDelete />
            </button>
          </li>
          {/* <li>
            <Status />
          </li> */}
        </ul>
      </div>

      <DeletePopup
        show={show}
        handleClose={handleClose}
        id="id"
      />
    </>
  );
};

const columns = [
  { field: "id", headerName: "Sr No", flex: 1, maxWidth: 80 },
  { field: "title", headerName: "Blog Title", flex: 1, maxWidth: 150 },
  {
    field: "publishDate",
    headerName: "Published Date",
    flex: 1,
    minWidth: 120,
  },
  { field: "authorName", headerName: "Author", flex: 1, minWidth: 120 },
  {
    field: "authorDescription",
    headerName: "Description",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    renderCell: (row) => <BlogStatus status={row?.row} />,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    renderCell: (row) => <StatusButton params={row?.row} />,
  },
];

export default function UserDataGrid(props) {
  function NoRowsOverlay() {
    return (
      <p
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {true ? (
          "No data available"
        ) : (
          <CircularProgress />
        )}
      </p>
    );
  }
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={props?.blogData}
        autoHeight
        rowsPerPageOptions={[5, 10, 15]}
        pageSize={10}
        rowHeight={48}
        headerHeight={48}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar, NoRowsOverlay }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
}