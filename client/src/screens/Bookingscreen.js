import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from "sweetalert2"
import AOS from 'aos';
import moment, { localeData } from "moment"
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration : 1000
});

const Bookingscreen = () => {
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { roomid,fromdate,todate } = useParams();
  const [totalAmount,setTotalAmount]=useState()

  const fetchRoom = async () => {
    try {
      setLoading(true);
      const data = (await axios.post("/api/rooms/getroombyid", { roomid })).data;

      setRoom(data);
      setLoading(false);
      setTotalAmount(totalDays * data.rentperday)
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const fromDate =moment(fromdate , 'DD-MM-YYYY')//for total days count
  const toDate =moment(todate , 'DD-MM-YYYY')//for total days count
  const totalDays=moment.duration(toDate.diff(fromDate)).asDays()+1

  async function bookRoom(){
    const bookingDetails={
      room,
      userid:JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalAmount,
      totalDays
    }
    // console.log(bookingDetails)
    try {
      const result = await axios.post('/api/bookings/bookroom' , bookingDetails)
      setLoading(false)
      swal.fire('Congrats' , 'Room Added Successfully' , 'Success')
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(true)
      swal.fire('Oops','Someting Went Wrong','error')
    }
  }

  return (
    <div className="m-5" data-aos='flip-left'>
      {loading ? (
        <h1><Loader/></h1>
      ) : room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bigurl" />
          </div>
          <div className="col-md-6">
            <div style={{textAlign:'right'}}>
              <b>
              <h1>Booking Details</h1>
              <hr />
              <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name} </p>

                <p>From Date :{fromdate} </p>
                <p>To Date :{todate} </p>
                <p>Max Count : {room.maxcount}</p>
              </b>
            </div>
            <div style={{textAlign:'right'}}>
              <b>
              <h1>Amount</h1>
              <hr />
                <p>Total Days :{totalDays} </p>
                <p>Rent Per Day : {room.rentperday}</p>
                <p>Total Amount : {totalAmount}</p>
              </b>
            </div>
            <div style={{float:'right'}}>
              <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>
            </div>
          </div>
        </div>
      ): (<Error/>)}
     
    </div>
  );
};

export default Bookingscreen;
