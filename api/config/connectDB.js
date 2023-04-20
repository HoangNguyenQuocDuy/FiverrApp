import mongoose from 'mongoose';

async function ConnectDB() {
    await mongoose.connect(process.env.MONGO)
    .then((data)=>{
        console.log("connectDB successful!")
    })
    .catch(err => {console.log(err)})
}

export default ConnectDB;