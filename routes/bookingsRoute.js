const express = require ('express')
const router = express.Router();
const moment = require ('moment')
const Booking = require ('../models/booking')
const Room = require('../models/room')

router.post('/bookroom', async(req, res) => {
 const {room,
      userid,
      fromdate,
      todate,
      totalAmount,
      totalDays} = req.body

      
    try {
        const newbooking = new Booking ({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalAmount,
            totalDays,
            transactionid: '12345' // add a default value for transactionid
        })
        const booking = await newbooking.save()
        const roomtemp = await Room.findOne({_id : room._id})
        roomtemp.currentbookings.push({bookingid:booking._id , fromdate:fromdate , todate:todate , userid:userid , status:booking.status})
        await roomtemp.save()
        res.send('Data Added successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
    
})    

router.post('/getbookingbyuserid', async(req, res) => {
    const userid= req.body.userid

    try {
        const bookings = await Booking.find({userid : userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error})
    }

});

router.post('/cancelBooking' ,async(req,res) =>{
    const {bookingid , roomid}= req.body
    try {
        const bookingitem = await Booking.findOne({_id : bookingid})
        bookingitem.status = 'cancelled'
        await bookingitem.save()

        const room = await Room.findOne({_id : roomid})
        const bookings=room.currentbookings
        const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
        room.currentbookings=temp
        await room.save()
        res.send('Your Booking Cancelled Successfully')
    } catch (error) {
        return res.status(400).json({error})
        
    }
} )

router.get('/getallbookings' ,async (req,res)=>{
    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports=router