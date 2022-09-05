const mongoose =require('mongoose')


const connectDb =(url)=>{
    return mongoose.connect(url,err=>{console.log(err)})
}


module.exports=connectDb