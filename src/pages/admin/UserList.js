import "../../assets/css/tablelist.css"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import _, { debounce } from "lodash"
import icons from "../../ultils/icons";
import { apiGetUser } from "../../apis";
// import { getCurrent } from "../../store/user/asyncActions";
// import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const {EditOutlinedIcon, DeleteOutlineIcon, AddIcon} = icons
  const [listUser, setlistUser] = useState([]);
  // const dispatch =  useDispatch();
  // const {isAuthenticated} = useSelector(state => state.auth)

  // const fetchCategories = async () => {
  //   const res = await apiGetUser();
  //   console.log("userList: ",res)
  //   if (res) {
  //     const categoryWithId = res.value?.map((item, index) => ({ ...item, id: index + 1 }));
  //     setlistUser(categoryWithId);
  //   }
  // }
  const getAllUsers = async () => {
    let res = await apiGetUser();
    console.log(res.data.content)
    if (res.data.content) {
      const tableData = res.data.content?.map((item, index) => ({ ...item, id: index + 1 }));
      setlistUser(tableData);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  // const handleSearch = debounce((e) => {
  //   let term = e.target.value;
  //   if (term) {
  //     let clonelistUser = _.cloneDeep(listUser);
  //     clonelistUser = clonelistUser.filter(item =>
  //       item.categoryName.toLowerCase().includes(term.toLowerCase())
  //     );
  //     setlistUser(clonelistUser);
  //   } else {
  //     fetchCategories();
  //   }
  // }, 500)

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'fullName', headerName: 'FULLNAME', width: 150 },
    { field: 'birthday', headerName: 'BIRTHDAY', width: 200 },
    { field: 'phoneNumber', headerName: 'PHONE', width: 150 },
    { field: 'role', headerName: 'ROLE', width: 150, renderCell: (params) => {
      return (
        <span>{params.row.role.roleName}</span>
      )
    }},
    { field: 'delFlag', headerName: 'STATUS', width: 150, renderCell: (params) =>{
        return (
          <>
            {params.row.delFlag === false ? (
              <span className="tableStatusText">Online</span>
            ): (
              <span className="tableStatusText TextSecond">Offline</span>
            )}          
          </>        
        )
    }},
    {
      field: 'action', headerName: 'ACTION', width: 100, renderCell: (params) => {
        return (
          <div>
            <Link to={"/dashboard/users/" + params.row.userId}>
              <EditOutlinedIcon className="tableListEdit" />
            </Link>
            <DeleteOutlineIcon className="tableListDelete" />
          </div>
        )
      }
    }
  ];

  return (
    <div className="tableList">
      <h2 className="tableListTitle">User List</h2>
      <div className="tableListBoxContainer">
        <div className="tableListinput-container">
          <input type="text"
            className="input"
            // onChange={(e) => handleSearch(e)}
            placeholder="search..." />
          <span className="icon">
            <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path opacity="1" d="M14 5H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path opacity="1" d="M14 8H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path opacity="1" d="M22 22L20 20" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
          </span>
        </div>
        {/* <Link to="/dashboard/newUser">
          <button><AddIcon className="tableCreateIcon" /><span>Create</span></button>
        </Link> */}
      </div>

      <DataGrid
        rows={listUser}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          }
        }}
      />
    </div>
  )
}

export default UserList
