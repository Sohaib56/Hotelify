import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Addroom from '../components/Addroom';

const { TabPane } = Tabs;

const Adminscreen = () => {
    useEffect(() => {
      
    
        if(!JSON.parse(localStorage.getItem('currentUser')).isAdmin){
            window.location.href='/home'
        }
      
    }, [])
    


    return (
        <div className='bs mx-3 mt-3'>
            <h3 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h3>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms/>
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Addroom/>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen


export function Bookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const fetchdata = async () => {
        try {
            const data = await (await axios.get('/api/bookings/getallbookings')).data
            setBookings(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
      fetchdata()
    }, [])
    

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Bookings</h1>
                {loading && (<Loader />)}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr className='text-center'>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                {bookings.length && (bookings.map(booking=>{
                    return <tr className='text-center'>
                         <td>{booking._id}</td>
                         <td>{booking.userid}</td>
                         <td>{booking.room}</td>
                         <td>{booking.fromdate}</td>
                         <td>{booking.todate}</td>
                         <td>{booking.status}</td>
                    </tr>
                }))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export function Rooms() {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const fetchdata = async () => {
        try {
            const data = await (await axios.get('/api/rooms/getallrooms')).data
            setRooms(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
      fetchdata()
    }, [])
    

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Rooms</h1>
                {loading && (<Loader />)}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr className='text-center'>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Max Count</th>
                            <th>Phone No</th>
                        </tr>
                    </thead>
                    <tbody>
                {rooms.length && (rooms.map(room=>{
                    return <tr className='text-center'>
                         <td>{room._id}</td>
                         <td>{room.name}</td>
                         <td>{room.type}</td>
                         <td>{room.rentperday}</td>
                         <td>{room.maxcount}</td>
                         <td>{room.phonenumber}</td>
                    </tr>
                }))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const fetchdata = async () => {
        try {
            const data = await (await axios.get('/api/users/getallusers')).data
            setUsers(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
      fetchdata()
    }, [])
    

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && (<Loader />)}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr className='text-center'>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                {users.length && (users.map(user=>{
                    return <tr className='text-center'>
                         <td>{user._id}</td>
                         <td>{user.name}</td>
                         <td>{user.email}</td>
                         <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    </tr>
                }))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}