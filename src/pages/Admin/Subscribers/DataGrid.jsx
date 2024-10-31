import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";

const ShowDate = (props) => {
  let date = new Date(props?.params?.createdAt).toLocaleString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      <div>{date}</div>
    </>
  );
};

const columns = [
  { field: "id", headerName: "Sr No", flex: 1, maxWidth: 80 },
  {
    field: "name",
    headerName: "User Name",
    flex: 1,
    minWidth: 250,
  },

  { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  {
    field: "createdAt",
    headerName: "Date",
    flex: 1,
    minWidth: 150,
    renderCell: (row) => <ShowDate params={row?.row} />,
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
        rows={props?.contactData}
        autoHeight
        hideFooterPagination={false}
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
        pagination
        pageSize={5}
      />
    </div>
  );
}
