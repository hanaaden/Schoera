import {Pool} from "pg"

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString : connectionString,
    ssl:{
        rejectUnauthorized : false
    }
})

const connectDb = async ()=>{
    try {
        const client = await pool.connect()
        console.log("connection of DB is successful ")
        client.release()

    } catch (error) {
        console.error("Error connecting to DB:", error)
    }
}

export {connectDb , pool}