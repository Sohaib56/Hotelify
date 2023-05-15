import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import Loader from '../components/Loader'
import Error from '../components/Error'
import swal from "sweetalert2"

const Addroom = () => {
    const [name , setName]=useState('')
    const [rentperday , setRentperday]=useState()
    const [maxcount , setMaxcount]=useState()
    const [description , setDescription]=useState()
    const [phonenumber , setPhonenumber]=useState()
    const [type , setType]=useState()
    const [imageurl1 , setImageurl1]=useState()
    const [imageurl2 , setImageurl2]=useState()
    const [imageurl3 , setImageurl3]=useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    async function addRoom(){

        const newroom={
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls:[imageurl1 , imageurl2 , imageurl3]
        }
        try {
            setLoading(true)
            const result = await(await axios.post('/api/rooms/addroom' , newroom)).data
            console.log(result)
            setLoading(false)
            swal.fire('Congrats' , 'Room Added Successfully' , 'Success').then(result=>{
                window.location.href='/home'
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
            swal.fire('Oops','Someting Went Wrong','error')
            
        }
    }
  return (
    <div>
      <div className='row'>
        {loading && <Loader/>}
            <div className='col-md-6'>
                <input type='text' className='form-control' placeholder='name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <input type='text' className='form-control' placeholder='rentperday' value={rentperday} onChange={(e)=>{setRentperday(e.target.value)}}/>
                <input type='text' className='form-control' placeholder='maxcount' value={maxcount} onChange={(e)=>{setMaxcount(e.target.value)}}/>
                <input type='text' className='form-control' placeholder='description' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                <input type='text' className='form-control' placeholder='phonenumber' value={phonenumber} onChange={(e)=>{setPhonenumber(e.target.value)}}/>
            </div>
            <div className='col-md-6'>
            <input type='text' className='form-control' placeholder='type' value={type} onChange={(e)=>{setType(e.target.value)}}/>
            <input type='text' className='form-control' placeholder='image url1' value={imageurl1} onChange={(e)=>{setImageurl1(e.target.value)}}/>
            <input type='text' className='form-control' placeholder='image url2' value={imageurl2} onChange={(e)=>{setImageurl2(e.target.value)}}/>
            <input type='text' className='form-control' placeholder='image url3' value={imageurl3} onChange={(e)=>{setImageurl3(e.target.value)}}/>
           
            <div className='mt-2' style={{float : 'right'}}>

            <button className='btn btn-primary' onClick={addRoom}>Add Room</button>
            </div>
            </div>
      </div>
    </div>
  )
}

export default Addroom
