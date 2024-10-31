import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";


const columns = [
  { field: "id", headerName: "Sr No", flex: 1, maxWidth: 80},
  { field: "time", headerName: "Time", flex: 1, minWidth: 120 },
  {
    field: "sentenceAccuracy",
    headerName: "Sentence Accuracy",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "user.email",
    headerName: "Email",
    flex: 1,
    minWidth: 120,
    renderCell: (row) => row?.row?.users?.email 
  },
  {
    field: "user.name",
    headerName: "Name",
    flex: 1,
    minWidth: 120,
    renderCell: (row) => row?.row?.users?.name 
  },
  {
    field: "createdAt",
    headerName: "Created Date",
    flex: 1,
    minWidth: 120,
    renderCell: (row) => new Date(row?.row?.createdAt)?.toLocaleDateString() 
  },
];

export default function ViewContestGrid(props) {
  console.log(props)
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
        {props?.contestData?.length === 0 ? (
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
        rows={props.contestData}
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
