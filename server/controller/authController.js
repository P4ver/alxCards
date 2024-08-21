const jwt = require('jsonwebtoken')
const pool = require('../db');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password during Registration:', hashedPassword); // Log the hashed password

        pool.getConnection((err, connection) => {
            if (err) throw err;

            const checkUserQuery = 'SELECT * FROM user WHERE login_User = ?';
            connection.query(checkUserQuery, [name], (err, result) => {
                if (err) {
                    connection.release();
                    return res.status(500).json({ message: 'Server Error' });
                }

                if (result.length > 0) {
                    connection.release();
                    return res.status(409).json({ message: 'Username already exists' });
                }

                const insertUserQuery = 'INSERT INTO user (login_User, password_User) VALUES (?, ?)';
                connection.query(insertUserQuery, [name, hashedPassword], (err, result) => {
                    connection.release();

                    if (err) {
                        return res.status(500).json({ message: 'Server Error' });
                    }

                    res.status(201).json({ message: 'User registered successfully' });
                });
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const login = (req, res) => {
    const { name, password } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `SELECT * FROM user WHERE login_User = ?`;
        connection.query(query, [name], async (err, result) => {
            connection.release();

            if (err) {
                return res.status(500).json({ message: 'Server Error' });
            }

            if (result.length === 0) {
                return res.status(401).json({ message: 'Identity incorrect' });
            }

            const { login_User, password_User } = result[0];

            console.log("result login : ", result);
            console.log("Password entered by user : ", password);
            console.log("Hashed password from database : ", password_User);

            // Compare the plain text password with the hashed password
            const isPasswordValid = await bcrypt.compare(password, password_User);
            console.log("Password valid : ", isPasswordValid);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Identity incorrect' });
            }

            const token = jwt.sign({ login_User }, 'my_secret', { expiresIn: '1d' });
            res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000, secure: false });
            res.json({ message: 'Logged in successfully' });
        });
    });
}


const logout = (req, res) => {
    // Clear the cookie that holds the JWT
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully' });
};


module.exports = {login, logout, register};



// const login = (req, res)=>{
//     const { name, password } = req.body;

//     pool.getConnection((err, connection)=>{
//         if(err) throw err;
//         const query = `SELECT * FROM user WHERE login_User =? AND password_User =?`;
//         connection.query(query, [name, password],async (err, result)=>{
//             connection.release();
             
//             if (err) {
//                 return res.status(500).json({ message: 'Server Error \'Login\'' });
//             }

//             if (result.length === 0) {
//                 return res.status(401).json({message:"indentity incorrect"})
//             }

//             const {login_User, password_User} = result[0]
            
//             console.log("result login : ",result)
//             // console.log('login_User and password', login_User, password_User)

//             const token = jwt.sign({login_User, password_User}, 'my_secret')
//             res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 }) 
//             res.json({message: 'Logged in successfully'})
//         })
//     })
// }

// ===============================================================
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const pool = require('../db');

// const login = (req, res) => {
//     const { name, password } = req.body;

//     pool.getConnection((err, connection) => {
//         if (err) throw err;
//         const query = `SELECT * FROM user WHERE login_User = ?`;
//         connection.query(query, [name], async (err, result) => {
//             connection.release();

//             if (err) {
//                 return res.status(500).json({ message: 'Server Error' });
//             }

//             if (result.length === 0) {
//                 return res.status(401).json({ message: 'Identity incorrect' });
//             }

//             const { login_User, password_User } = result[0];

//             console.log("result login : ", result);
//             console.log("result password : ", password);
//             console.log("result password_User : ", password_User);

//             // Compare the plain text password with the hashed password
//             const isPasswordValid = await bcrypt.compare(password, password_User);
//             console.log("isPasswordValid : ", isPasswordValid);
//             if (!isPasswordValid) {
//                 return res.status(401).json({ message: 'Identity incorrect' });
//             }

//             // Generate a JWT
//             const token = jwt.sign({ login_User }, 'my_secret', { expiresIn: '1d' });
//             res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });
//             res.json({ message: 'Logged in successfully' });
//         });
//     });
// }

// module.exports = login;
