import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Divider, Space, Tag } from 'antd';
import swal from "sweetalert2"

const { TabPane } = Tabs;
const Profilescreen = () => {
    const user= JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
      
        if(!user){
            window.location.href='/login'
        }
    }, [])
    

  return (
    <div className='mx-3 mt-3'>
<Tabs defaultActiveKey="1">
    <TabPane tab="Profile" key="1">
      <h4 style={{fontSize : '30px'}}>My Profile</h4>
      <br/>
      <div className='row'>
        <div className='col-md-6 bs'>
      <h1>Name : {user.name}</h1>
      <h1>Email : {user.email}</h1>
      <h1>IsAdmin : {user.isAdmin ? 'Yes' : 'No'}</h1>  

        </div>
      </div>
    </TabPane>
    <TabPane tab="Booking" key="2">
     <MyBookings/>
    </TabPane>
  </Tabs>
    </div>
  )
}

export default Profilescreen



export function MyBookings() {
    const user= JSON.parse(localStorage.getItem('currentUser'))
  const [bookings , setBookings]=useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
    useEffect(() => {
      const fetchData = async () => {
       try {
        setLoading(true)
        const data =await (await axios.post('/api/bookings/getbookingbyuserid' , {userid : user._id})).data
        console.log(data)
        setBookings(data)
        setLoading(false)
       } catch (error) {
        console.log(error)
        setLoading(false)
        setError(error)
       }
      }
      fetchData()
    }, [])

    async function cancelBooking(bookingid , roomid){

      try {
        setLoading(true)
        const result = await (await axios.post('/api/bookings/cancelBooking' , {bookingid , roomid})).data
        console.log(result)
        setLoading(false)
        swal.fire('Congrats' , 'Your Booking Has Been Cancelled' , 'Success').then(result=>{
          window.location.reload()
        })
      } catch (error) {
        console.log(error)
        setLoading(false)
        swal.fire('Oops','Someting Went Wrong','error')
      }
    }
    
  return (
    <div>
          
      <div className='row'>
        <div className='col-md-6'>
            {loading && <Loader/>}
            {bookings && (bookings.map(booking=>{

              return <div className='bs'>
                <h1>{booking.room}</h1>
                <p><b>BookingId : </b>{booking._id}</p>
                <p><b>CheckIn : </b>{booking.fromdate}</p>
                <p><b>Check Out : </b>{booking.todate}</p>
                <p><b>Amount : </b>{booking.totalAmount}</p>
                <p><b>Status : </b>{booking.status == "cancelled" ? ( <Tag color="red">CANCELLED</Tag>) : ( <Tag color="green">CONFIRMED</Tag>)}</p>
               {booking.status !== 'cancelled' && ( <div className='text-right'>
                 
                 <button className='btn btn-primary' onClick={() => cancelBooking(booking._id, booking.roomid)}>CANCEL BOOKING</button>
 
                 </div>)}
              </div>
            }))}
        </div>
      </div>
    </div>
  )
  }
