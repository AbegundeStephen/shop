import "./userList.css";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import {  useEffect, useState } from "react";
import {DataGrid} from "@mui/x-data-grid"
import { userRequest } from "../../requestMethods";
import {MuiDataGrid} from 'mui-data-grid'
import Topbar from "../../components/topbar/Topbar";

export default function UserList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllUsers = async() => {
      try {
        const res = await userRequest.get("/users")
        setData(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getAllUsers()
  },[])
 
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    {field:"fullname",headerName:"FULLNAME",width:100},
    {field:"username",headerName:"USERNAME", width:100},
    {
      field: "email",
      headerName: "EMAIL",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
            {params.row.email}
          </div>
        );
      },
    },
    {
      field: "isAdmin",
      headerName: "ADMIN",
      width: 80,
    },
    {
      field: "transaction",
      headerName: "Txn Volume",
      width:80,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  
console.log(data)
  return (
    <><Topbar/>
    <div className="userList">
      <MuiDataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection={true}
       
      />
    </div>
    </>
  );
}
