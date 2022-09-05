const express =require('express')
require('dotenv').config()
const connectDb=require('./config/connectMongose')
const Contact =require("./models/contacts")
const server =express()

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
server.get("/contacts", async (req,res)=>{
    const contacts=await Contact.find({})

    try {

        res.status(200).json({contacts:contacts})
    }
    catch (e) {
        res.status(500).json({e})
    }
})

server.get("/contact/:id",async (req, res)=>{
    const _id= req.params.id

    try{
        const contact= await  Contact.findById({_id})

        res.status(200).json({contact})
    }catch (e) {
    console.log(e)
    }
})

server.put("/contact/:id",async (req, res)=>{

    const _id= req.params.id
    console.log(_id,"[put]")
    const {job, fullname, mobile, photo,email} = req.body
    




    try{

        const contact= await Contact.findByIdAndUpdate({_id},
            {job, fullname, mobile, photo,email})

        const valus_= { _id: contact._id.toString(), job, fullname, mobile, photo,email}

        console.log(valus_)
        res.status(200).json({updatedContact: valus_})

    }catch (e) {
        console.log(e)
        res.status(200).json({e})
    }
})

server.delete("/contact/:id",async (req, res)=>{

    const _id= req.params.id


    try{
        const response = await Contact.remove({_id})

        res.status(200).json({message:"removed"})
        console.log(response)

    }catch (e) {
        console.log(e)
        res.status(200).json({e})
    }
})


server.post("/contacts",async (req, res)=>{

    const {job, fullname, mobile, photo, email} = req.body

    try{
        await  Contact.create({ job, fullname, mobile, photo, email})
        res.status(201).json({contact:{job, fullname:fullname,photo,email,mobile}})
    }catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
})

server.listen(9363,function () {
    connectDb('mongodb://localhost:27017/contactsdb')

    console.log('server and databaee is running')
})