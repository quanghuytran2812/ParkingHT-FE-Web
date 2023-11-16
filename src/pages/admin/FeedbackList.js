import { DataGrid } from '@mui/x-data-grid';
import { Loader } from 'components';
import _ from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchFeedback } from 'store/feedback/feedbackSlice';

const FeedbackList = () => {
    const dispatch = useDispatch();
    const listFeedback = useSelector((state) => state.feedback.list);
    const { loading, error } = useSelector((state) => state.report);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFeedback, setFilteredFeedback] = useState([]);
  
    const fetchData = useCallback(() => {
      try {
        dispatch(fetchFeedback());
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    }, [dispatch]);
  
    useEffect(() => {
      fetchData();
      if (error) {
        toast.error(`${error}`);
      }
    }, [fetchData, error]);
  
    const handleSearch = _.debounce((term) => {
      if (term) {
        const filtered = listFeedback.filter((item) =>
          item.feedBackId.toLowerCase().includes(term.toLowerCase()) ||
          item.content.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredFeedback(filtered);
      } else {
        setFilteredFeedback(listFeedback);
      }
    }, 500);
  
    const handleInputChange = (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      handleSearch(term);
    };
    const columns = [
        { field: 'id', headerName: '#', width: 20 },
        { field: 'content', headerName: 'CONTENT', width: 200, renderCell: (params) => {
          return (
            <span>
              {
                params.row.content !== null ? params.row.content : 'No idea'
              }
            </span>
          )
        }},
        { field: 'rankStar', headerName: 'RANK START', width: 150 },
        {
          field: 'createDate', headerName: 'CREATEDATE', width: 150, renderCell: (params) => {
            return (
              <span>
                {
                  moment(params.row.createDate).format("DD/MM/YYYY")
                }
              </span>
            )
          }
        },
        {
          field: 'processingStatus', headerName: 'STATUS', width: 150, renderCell: (params) => {
            return (
              <>
                {params.row.processingStatus === 1 ? (
                  <span className="tableStatusText">completed</span>
                ) : <span className="tableStatusText TextSecond">processing</span>}
              </>
            );
          }
        },
        {
          field: 'processingDate', headerName: 'PROCESS DATE', width: 220, renderCell: (params) => {
            return (
              <span>
                {params.row.processingDate !== null ?
                  moment(params.row.processingDate).format("DD/MM/YYYY, h:mm:ss A")
                  : 'Not yet processed'
                }
              </span>
            )
          }
        }
      ];
      const data = searchTerm ? filteredFeedback : listFeedback;
  return (
    <>
      {loading && <Loader />}
      <div className="tableList">
        <h2 className="tableListTitle">Feedback List</h2>
        <div className="tableListBoxContainer">
          <div className="tableListinput-container">
            <input type="text"
              className="input"
              value={searchTerm}
              onChange={handleInputChange}
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
          rows={data.map((item, index) => ({ ...item, id: index + 1 }))}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            }
          }}
        />
      </div>
    </>
  )
}

export default FeedbackList
