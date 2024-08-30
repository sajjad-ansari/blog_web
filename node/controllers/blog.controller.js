import db from "../db.js";

// CREATE operations
export const createBLog = (req, res) => {
  // console.log(req.body);
  const { title, description, blog_img, user_id, published_at} =
    req.body;
  const created_at = new Date();

  const sql =
    "INSERT INTO blog(title, description, blog_img, user_id, created_at, published_at) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [title, description, blog_img, user_id, created_at, published_at ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.send(err);
    }

    res.send({
      statusCode: 200,
      message: "Blog Added Successfully!!",
    });
  });
};

//READ operation
export const getBlog = (req, res) => {
  const sql = "SELECT * FROM  blog";

  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};



//Get user by it's id....
export const getBLogById = (req, res) => {
  const id = parseInt(req.params.blog_id);
  const sql = "SELECT * FROM blog WHERE blog_id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

//UPDATE operation.....
export const updateBLog = (req, res) => {
  const id = parseInt(req.params.blog_id);
  // console.log(id);
  const { title, description, blog_img, user_id, published_at } = req.body;
  const updated_at = new Date();

  const sql = "UPDATE blog SET title=?, description=?, blog_img=?, user_id=?, created_at=?, updated_at=?, published_at=? WHERE blog_id=?";
  const values = [title, description, blog_img, user_id, updated_at, published_at ,updated_at, id,];

  // console.log(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send("Blog Updated Successfully!!");
    }
  });
};

//DELETE operation......
export const deleteBlog = (req, res) => {
  // console.log("DELETE request received for user_id:", req.params.user_id);
  const id = parseInt(req.params.blog_id);
  const sql = "DELETE FROM blog WHERE blog_id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(`Blog Deleted of ID ${id} Successfully!!`);
    }
  });
};
