import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import { DatePicker, Space } from 'antd'
const { RangePicker } = DatePicker
const Homescreen = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [fromdate, setFromdate] = useState()
  const [todate, setTodate] = useState()
  const [duplicaterooms , setDuplicaterooms] = useState([])
  const [searckey , setSearchkey] = useState('')
  const [type , setType] = useState('all')

  useEffect(() => {
    if(!localStorage.getItem('currentUser')){
      window.location.href='/login'
    }
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = (await axios.get('/api/rooms/getallrooms')).data

        setRooms(data)
        setDuplicaterooms(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        console.log(error)
        setError(false)
      }
    }

    fetchData()
  }, [])


  function filterbydate(dates) {
    setFromdate(moment(dates[0].$d).format('DD-MM-YYYY'))
    setTodate(moment(dates[1].$d).format('DD-MM-YYYY'))

    var temprooms=[]
    for(const room of duplicaterooms){
      var availability = false;
      if(room.currentbookings.length > 0){
        for(const booking of room.currentbookings){
          if(!moment(moment(dates[0].$d).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate) &&
          !moment(moment(dates[0].$d).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate)
          )
          {
            if(
              moment(dates[0].$d).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[0].$d).format('DD-MM-YYYY') !== booking.todate &&
              moment(dates[1].$d).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[1].$d).format('DD-MM-YYYY') !== booking.todate
            ){
              availability=true
            }
          }
        }
      }
      if(availability==true|| room.currentbookings.length==0){
        temprooms.push(room)
      }
      setRooms(temprooms)

    }
  }
  function filterbyvalue(){
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searckey.toLowerCase()))
    setRooms(temprooms)
  }
  function filterbytype(e){
    setType(e)
    if(e!=='all'){
      const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
    setRooms(temprooms)
    }
    else{
      setRooms(duplicaterooms)
    }
  }
  return (
    <>
      <div className='container'>
        <div className='row mt-5 bs'>
          <div className='col-md-4'>
            <RangePicker format='YYYY/MM/DD' onChange={filterbydate} />
          </div>
          <div className='col-md-4'>
            <input type='text' className='form-control' placeholder='search...' value={searckey} onChange={(e)=>{setSearchkey(e.target.value)}} onKeyUp={filterbyvalue}/>
          </div>
          <div className='col-md-4'>
          <select value={type} onChange={(e)=>{filterbytype(e.target.value)}}>
            <option value='all'>All</option>
            <option value='delux'>Delux</option>
            <option value='non-delux'>Non-Delux</option>
          </select>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row justify-content-center mt-5'>
          {loading ? (<h1><Loader /></h1>) :(rooms.map(room => {
            return <div className='col-md-9 mt-2'>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          }))}
        </div>
      </div>
    </>
  )
}

export default Homescreen
