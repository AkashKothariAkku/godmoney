import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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

const columns = [
  { field: "id", headerName: "Sr No", flex: 1, maxWidth: 80 },
  { field: "amount", headerName: "Amount", flex: 1, maxWidth: 150 },
  {
    field: "utrNumber",
    headerName: "UTR Number",
    flex: 1,
    minWidth: 120,
  },
  { field: "name", headerName: "Name", flex: 1, minWidth: 120, renderCell: (row) => row?.row?.users?.name },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 120,
    renderCell: (row) => row?.row?.users?.email
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    renderCell: (row) => <BlogStatus status={row?.row} />,
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
