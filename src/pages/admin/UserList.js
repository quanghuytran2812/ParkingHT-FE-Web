import "assets/css/tablelist.css"
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import _, { debounce } from "lodash"
import icons from "ultils/icons";
import { apiDeleteUser, apiGetUser } from "apis";
import moment from "moment/moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ModalEditUser } from "components";

const UserList = () => {
  const { EditOutlinedIcon, DeleteOutlineIcon } = icons
  const [listUser, setlistUser] = useState([]);
  const [dataEditUser, setdataEditUser] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const getAllUsers = async () => {
    let res = (await apiGetUser()) ?? {};
    if (res.data && res.data.content) {
      const tableData = res.data.content.map((item, index) => ({ ...item, id: index + 1 }));
      setlistUser(tableData);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleEditUser = (user) => {
    setdataEditUser(user);
    setOpenModal(true);
  }

  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you ready inactive this user?",
      showCancelButton: true,
      confirmButtonColor: '#02aab0'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await apiDeleteUser(uid);
        if (res.statusCode === 200) {
          getAllUsers();
          toast.success(res.message);
        } else toast.error(res.message);
      }
    })

  }

  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let clonelistUser = _.cloneDeep(listUser);
      clonelistUser = clonelistUser.filter(item =>
        item.role.roleName.toLowerCase().includes(term.toLowerCase()) ||
        item.userId.toLowerCase().includes(term.toLowerCase()) ||
        item.fullName.toLowerCase().includes(term.toLowerCase())
      );
      setlistUser(clonelistUser);
    } else {
      getAllUsers();
    }
  }, 500)

  const columns = [
    { field: 'id', headerName: '#', width: 20 },
    { field: 'fullName', headerName: 'FULLNAME', width: 150 },
    {
      field: 'birthday', headerName: 'BIRTHDAY', width: 180, renderCell: (params) => {
        return (
          <span>{moment(params.row.birthday).format("LL")}</span>
        )
      }
    },
    { field: 'phoneNumber', headerName: 'PHONE', width: 120 },
    {
      field: 'role', headerName: 'ROLE', width: 150, renderCell: (params) => {
        return (
          <span>{params.row.role.roleName}</span>
        )
      }
    },
    {
      field: 'delFlag', headerName: 'STATUS', width: 150, renderCell: (params) => {
        return (
          <>
            {params.row.delFlag ? (
              <span className="tableStatusText TextSecond">inactive</span>
            ) : (
              <span className="tableStatusText">active</span>
            )}
          </>
        )
      }
    },
    {
      field: 'action', headerName: 'ACTION', width: 100, renderCell: (params) => {
        return (
          <>
            {params.row.role.roleName === 'ROLE_ADMIN' 
              || params.row.delFlag === true ? (<div></div>) : (
              <div>
                <span onClick={() => handleEditUser(params.row)}><EditOutlinedIcon className="tableListEdit" /></span>
                <span onClick={() => handleDeleteUser(params.row.userId)}><DeleteOutlineIcon className="tableListDelete" /></span>
              </div>
            )}
          </>
        )
      }
    }
  ];

  return (
    <>
      <div className="tableList">
        <h2 className="tableListTitle">User List</h2>
        <div className="tableListBoxContainer">
          <div className="tableListinput-container">
            <input type="text"
              className="input"
              onChange={(e) => handleSearch(e)}
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
      <ModalEditUser
        open={openModal}
        onClose={() => setOpenModal(false)}
        dataUserEdit={dataEditUser}
      />
    </>
  )
}

export default UserList
