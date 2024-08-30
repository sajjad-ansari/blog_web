import mysql from 'mysql2';

const db = mysql.createConnection({
    //We use this technique using .env file to connect database. We look this later it's not completed.
    // host: process.env.host,
    // user: process.env.user,
    // password: process.env.password,
    // database: process.env.database


    host : "localhost",
    user : "root",
    password : "12345",
    database : "blog_fourth_training_project",

});


db.connect((err)=>{
    if(err) console.log(err);
    else console.log("Database Connected Successfully!!");
});


export default db;