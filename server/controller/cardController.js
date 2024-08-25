const pool = require("../db");
const jwt = require('jsonwebtoken');


const getCards = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        connection.query('SELECT * from flashcards', (err, rows)=>{
            connection.release();
            if(err) throw err;
            res.send(rows);
        })
    })
}

const getCardsById = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        connection.query('SELECT * from flashcards WHERE id=?', [req.params.id], (err, rows)=>{
            connection.release();
            if(err) throw err;
            res.send(rows);
        })
    })
}

const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const defaultImagePath = 'uploads/alx.png'; 

const addCards = (req, res) => {
    const { text1, text2, description } = req.body;
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    jwt.verify(token, 'my_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token, cannot add card' });
        }

        const userLogin = decoded.login_User;
        let imagePath = defaultImagePath;

        if (req.file) {
            imagePath = path.join('uploads', req.file.filename).replace(/\\/g, '/');
            // console.log("imagePath",imagePath.replace(/\\/g, '/'))
        }    
            pool.getConnection((err, connection) => {
                if (err) throw err;

                connection.query(
                    'INSERT INTO flashcards (text1, text2, description, image, login_User) VALUES (?, ?, ?, ?, ?)',
                    [text1, text2, description, imagePath, userLogin],
                    (err, rows) => {
                        connection.release();

                        if (err) throw err;
                        res.send(rows);
                    }
                );
            });
        
        // if (req.file) {
        //     const imagePath = path.join('uploads', req.file.filename).replace(/\\/g, '/');
        //     // console.log("imagePath",imagePath.replace(/\\/g, '/'))
        //     pool.getConnection((err, connection) => {
        //         if (err) throw err;

        //         connection.query(
        //             'INSERT INTO flashcards (text1, text2, description, image, login_User) VALUES (?, ?, ?, ?, ?)',
        //             [text1, text2, description, imagePath, userLogin],
        //             (err, rows) => {
        //                 connection.release();

        //                 if (err) throw err;
        //                 res.send(rows);
        //             }
        //         );
        //     });
        // } else {
        //     return res.status(400).json({ message: 'Image is required' });
        // }
    });
};
// const addCards = (req, res)=>{

//     const {text1, text2, description} = req.body
//     const token = req.cookies.jwt;
    
//     if (!token) {
//         return res.status(401).json({ message: 'No token provided, authorization denied' });
//     }

//     jwt.verify(token, 'my_secret', (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid token cant add card' });
//         }
//         console.log("decoded login_User:",decoded.login_User)
//         const userLogin = decoded.login_User;
//         pool.getConnection((err, connection)=>{
//             if(err) throw err;
//             // connection.query('INSERT INTO flashcards SET?', [req.body],(err, rows)=>{
//             connection.query('INSERT INTO flashcards (text1, text2, description, login_User) VALUES (?, ?, ?, ?)', [text1, text2, description, userLogin],(err, rows)=>{
//                 connection.release();
    
//                 if(err) throw err;
//                 res.send(rows);
//             })
//         })
    
//     })

// }
const updateCards = (req, res)=>{
    const {text1, text2, description} = req.body
        pool.getConnection((err, connection)=>{
            if(err) throw err;
            // connection.query('INSERT INTO flashcards SET?', [req.body],(err, rows)=>{
            connection.query('UPDATE flashcards SET text1=?, text2=?, description=? WHERE id=?', [text1, text2, description, req.params.id],(err, rows)=>{
                connection.release();
    
                if(err) throw err;
                res.send(rows);
            })
        })
}

const deleteCards = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        connection.query('DELETE FROM flashcards WHERE id=?', [req.params.id], (err, rows) => {
            connection.release();

            if (err) throw err;

            if (rows.affectedRows === 0) {
                return res.status(404).json({ message: 'Card not found' });
            }

            res.json({ message: 'Card deleted successfully' });
        });
    });
};


module.exports = {getCards, addCards, getCardsById, updateCards, deleteCards};