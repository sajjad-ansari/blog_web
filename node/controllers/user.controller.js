import db from '../db.js';

// CREATE operations
export const createUser = (req, res) => {
    // console.log(req.body);
    const { f_name, l_name, address, email, password, phone, gender, dob } = req.body;
    const created_at = new Date();

    const sql = "SELECT * FROM user WHERE email = ?";
    
    db.query(sql, [email], (err, result) => { // Correctly passing email as an array
        if (err) {
            return res.send(err);
        }

        if (result.length > 0) {
            return res.send({
                statusCode: 300,
                message: "Email Already Exists!!"
            });
        } else {
            const sql = "SELECT * FROM user WHERE phone = ?";
            
            db.query(sql, [phone], (err, data) => { // Correctly passing phone as an array
                if (err) {
                    return res.send(err);
                }

                if (data.length > 0) {
                    return res.send({
                        statusCode: 300,
                        message: "Phone Number Already Exists!!"
                    });
                } else {
                    const sql = "INSERT INTO user(f_name, l_name, address, email, password, phone, gender, dob, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    const values = [f_name, l_name, address, email, password, phone, gender, dob, created_at];

                    db.query(sql, values, (err, result) => {
                        if (err) {
                            return res.send(err);
                        }

                        res.send({
                            statusCode: 200,
                            message: "User Added Successfully!!"
                        });
                    });
                }
            });
        }
    });
};




//READ operation
export const getUser = (req, res)=>{
    const sql = "SELECT * FROM user";

    db.query(sql, (err, result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
};


//Get user by it's id....
export const getUserById = (req, res)=>{
    const id = parseInt(req.params.user_id);
    const sql = "SELECT * FROM user WHERE user_id=?";

    db.query(sql, [id], (err, result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.status(200).send(result);
        }
    });
};




//UPDATE operation.....
export const updateUser = (req, res)=>{
    const id = parseInt(req.params.user_id);
    // console.log(id);
    const { f_name, l_name, address, email, password, phone, gender, dob } = req.body;
    const updated_at = new Date();

    const sql = "UPDATE user SET f_name=?, l_name=?, address=?, email=?, password=?, phone=?, gender=?, dob=?, updated_at=? WHERE user_id=?";
    const values = [f_name, l_name, address, email, password, phone, gender, dob, updated_at, id];

    // console.log(id);
    
    db.query(sql, values, (err, result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.status(200).send("User Updated Successfully!!");
        }
    });
};



//DELETE operation......
export const deleteUser = (req, res)=>{
    // console.log("DELETE request received for user_id:", req.params.user_id);
    const id = parseInt(req.params.user_id);
    const sql = "DELETE FROM user WHERE user_id=?";

    db.query(sql, [id], (err, result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.status(200).send(`User Deleted of ID ${id} Successfully!!`);
        }
    });
};






//Controller to handle PROFILE PICTURE UPLOAD......
export const uploadProfile = (req, res)=>{
    const id = req.body.user_id;
    const file = req.file;

    if(!file){
        return res.status(400).send("No file Uploaded...");
    }

    if(!id){
        return res.status(400).send("User ID is Required!!");
    }

    //Update the user's profile picture url in the database.
    const profilePicturePath =`/uploads/${file.filename}`; // Path to the uploaded file.

    // const id = req.body.user_id;
    const sql = "UPDATE user SET profile=? WHERE user_id=?";
    const values = [profilePicturePath, id];

    db.query(sql, values, (err, result)=>{
        if(err){
            res.send(err)
        }
        else{
            return res.status(200).send("Profile picture uploaded to database Successfully!!");
        }
    });
};