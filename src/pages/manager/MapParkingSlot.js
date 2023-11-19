import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchParkingslotAllArea,
  fetchParkingslotByArea,
} from 'store/parkingslot/parkingslotSlice';
import "assets/css/diagramParkingSlot.css";
import icons from 'ultils/icons';

const MapParkingSlot = () => {
  const { KeyboardDoubleArrowLeftIcon, KeyboardDoubleArrowRightIcon } = icons
  const dispatch = useDispatch();
  const { listArea, listPSbyArea } = useSelector((state) => state.parkingslot);

  const handleScrollLeft = () => {
    const container = document.querySelector(".containerArea");
    const scrollAmount = 350;
    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    const container = document.querySelector(".containerArea");
    const scrollAmount = 350;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(fetchParkingslotAllArea());
  }, [dispatch]);

  useEffect(() => {
    if (listArea.length > 0) {
      dispatch(fetchParkingslotByArea(listArea[0]));
    }
  }, [listArea, dispatch]);

  const handleAreaClick = (selectedArea) => {
    dispatch(fetchParkingslotByArea(selectedArea));
  };

  const data = listPSbyArea.map((item, index) => ({ ...item, id: index + 1 })).sort((a, b) => a.name - b.name);
  const dataLeft = data.filter((item) => item.id % 2 !== 0);
  const dataRight = data.filter((item) => item.id % 2 === 0);

  const SlotParking = ({ item }) => {
    return (
      <div className='viewParking'>
        {item.parking_Slot_Status === 'BUSY' ? (
          <div className='imageAuto'>
            <img
              src={require("../../assets/images/carup.png")}
              style={{ width: 84, height: 40 }}
              alt={item.name}
            />
            <div className='imageOverlay'>
              <span className='imageText'>{item.name}</span>
            </div>
          </div>
        ) : (
          <button
            className='viewName'
            style={{
              backgroundColor: 'white',
            }}
          >
            <span
              className='slotName'
              style={{
                color: '#000',
              }}
            >
              {item.name}
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className='wrapperParking'>
        <div className='main-scroll-div'>
          <button className='buttonScroll' onClick={handleScrollLeft}>
            <KeyboardDoubleArrowLeftIcon className='buttonScrollIcons' />
          </button>
          <div className='containerArea'>
            {listArea.map((area, index) => (
              <div
                className="AreaName"
                key={index}
                onClick={() => handleAreaClick(area)}
              >
                <span className="TextAreaName">{area}</span>
              </div>
            ))}
          </div>
          <button className='buttonScroll' onClick={handleScrollRight}>
            <KeyboardDoubleArrowRightIcon className='buttonScrollIcons' />
          </button>
        </div>
        <div className='containerViewAll'>
          <div className='viewAll'>
            <div className='viewLeft'>
              {dataLeft.map((e, index) => (
                <SlotParking
                  key={e.id}
                  item={e}
                />
              ))}
            </div>
            <div className='viewCenter'>
              <div className='viewDirect'>
                <img
                  src={require("../../assets/images/road1.png")}
                  style={{ height: '101%', width: 86 }}
                  alt="road"
                />
              </div>
            </div>
            <div className='viewRight'>
              {dataRight.map((e, index) => (
                <SlotParking
                  key={e.id}
                  item={e}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapParkingSlot;