const path = require('path');
const express = require('express');
const app = express();
const db = require('./db/db')
const cors = require('cors')
global.Application = app;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const varifyToken = require('./verifyToken')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors())
db.openDb(app)
    .then((state) => {
        if (state) {
            console.log('data-base is connect');
        }
    })
    .catch((err) => {
        console.log(err);

    });

// app.use('/api/Users' , require('./routers/users/users'))
app.post('/api/Users', (req, res) => {

    const { firstName, lastName, userName, email, userPassword } = req.body;
    if (userPassword.length < 5) {
        res.json({ state: 'errorMsg', message: 'please enter a larger pass' })
    }
    else {
        const con = global.Application.get('CONNECTION');
        const sql = `INSERT INTO users 
        ( firstName, lastName ,userName, email, userPassword) 
        VALUES ('${firstName}','${lastName}','${userName}','${email}','${userPassword}')`;

        con.query(sql, (err, result, fields) => {

            if (err) {
                res.json(err)
            }
            else {
                if (err) {
                    console.log(err)
                } else {
                    console.log("result", result)
                    res.json({ state: 'success', message: 'user created' })
                }
                // res.json(result)
            }
        })
    }



})
// app.use('/api/Main' , require('./routers/main/main'))
app.get('/api/AdminPage', varifyToken, (req, res) => {

    if (req.body.admin) {
        console.log('reqBody', req.body.admin)
        res.json({ state: 'success', message: 'logged in- post was created',  admin: req.body.admin, user: req.body.userName })
    }
    else {
        res.json({ state: 'error' })
    }

    console.log('im am admin')
})


app.get('/api/Main', varifyToken, (req, res) => {
    if (!req.body.admin) {
        // console.log( "im in main server OK",req.body.admin)
        res.json({ state: 'success', message: 'logged in to main component- post was created', admin: req.body.admin, user: req.body.userName })
        console.log("im in main server")
    }

    else {
        console.log('im in error server')
        res.json({ state: 'error' })
    }
})



// app.post('/api/login', (req, res) => {
//     if (!req.body.userName || !req.body.userPassword) {
//         res.json({message:'enter values'})
//     }
//     else {
//         let { userName, userPassword } = req.body;
//         const con = app.get('CONNECTION')
//         const sql = `select * from users where userName = '${userName}'`
//         con.query(sql, (err, result, fields) => {
//             if (err) {
//                 res.json(err)
//             } else {
//                 if (userName !== result[0].userName || JSON.parse(userPassword) !== result[0].userPassword) {
//                     res.json({message:'user or password wrong'})
//                 }
//                 else {
//                     jwt.sign({
//                         userName:result[0].userName, email:result[0].email, admin:result[0].admin
//                     }, 'nofi', (err, token) => {
//                         res.json({token, admin:result[0].admin})
//                     })
//                 }
//             }

//         })
//     }
// })

// -------------------------------------------------------------------------------------------


app.post('/api/login', (req, res) => {
    if (!req.body.userName || !req.body.userPassword) {
        res.json({ message: 'enter values' })
        // res.json(err)
    }
    else {
        let { userName, userPassword } = req.body;
        const con = app.get('CONNECTION')
        const sql = `select * from users where userName = '${userName}'`
        con.query(sql, (err, result, fields) => {
            if (err) {
                res.json(err)
            } else {
                if (userName !== result[0].userName || JSON.parse(userPassword) !== result[0].userPassword) {
                    res.json({ message: 'user or password incorrect' })
                }
                else {
                    jwt.sign({
                        userName: result[0].userName, email: result[0].email, admin: result[0].admin
                    }, 'nofi', (err, token) => {
                        res.json({ token, admin: result[0].admin })
                    })
                }
            }

        })
    }
})


// ----------------------------------------------------------------------------------------



app.get('/api/Vacations', async (req, res) => {
    const con = app.get('CONNECTION')
    const sql = `SELECT * FROM follower f RIGHT JOIN vacations v ON v.VacationId = f.VacationId ORDER BY followID DESC`;
    // const sql = `SELECT * FROM vacations v LEFT JOIN follower f ON v.VacationId = f.VacationId`
    con.query(sql, async (err, result, fields) => {
        if (err) {
            res.json({ state: 'error', message: 'there was an error' })
        } else {
            await res.json({ state: 'success', message: result })
        }
    })
})


// app.get('/api/Vacations', async (req, res) => {
//     const con = app.get('CONNECTION')
//     const sql = `SELECT * FROM vacations`
//     con.query(sql, async (err, result, fields) => {
//         if (err) {
//          res.json({state: 'error' , message:'there was an error'})
//         } else {
//         await    res.json({state:'success' , message:result})
//         }
//     })
// })

app.post('/api/FollowersHandle', async (req, res) => {

    const { destinationProps, currentUserName } = req.body
    console.log(req.body.currentUserName)
    console.log('>>>>', destinationProps, currentUserName)
    const con = app.get('CONNECTION')
    //   await  console.log(destinationProps)
    const sql = `UPDATE users SET follow='${destinationProps}' WHERE userName ='${currentUserName}'`
    console.log('im in follow')
    console.log(sql)
    con.query(sql, async (err, result, fields) => {
        if (err) {
            res.json({ state: 'error', message: 'there was an error' })
        } else {
            await res.json({ state: 'success', message: result })
        }
    })
})



//>>>>>>>>>>>>>>>>>>>>>>>>>CardVacation<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// app.post('/api/CardVacation', async (req, res) => {
// console.log('in CardVacation')

// const {currentUserName,Destination, VacationId} =req.body

//     const con = app.get('CONNECTION')

//     const sql = `INSERT INTO follower(userName, Destination, VacationId) VALUES ('${currentUserName}','${Destination}',${VacationId}) `
//     console.log('im in follow')
//     console.log(sql)
//     con.query(sql, async (err, result, fields) => {
//         if (err) {
//          res.json({state: 'error' , message:'there was an error'})
//         } else {
//         await    res.json({state:'success' , message:result})
//         }
//     })
// })


app.post('/api/FollowVacation', async (req, res) => {
    console.log('in CardVacation')
    const { currentUserName, Destination, VacationId } = req.body
    const con = app.get('CONNECTION')
    const sql = `INSERT INTO follower(userName, Destination, VacationId) VALUES ('${currentUserName}','${Destination}',${VacationId}) `
    console.log('im in follow')
    console.log(sql)
    con.query(sql, async (err, result, fields) => {
        if (err) {
            res.json({ state: 'error', message: 'there was an error' })
        } else {
            await res.json({ state: 'success', message: result })
        }
    })
})

app.delete('/api/UnfollowVacation', async (req, res) => {
    console.log('in UnfollowVacation')

    const { currentUserName, Destination, VacationId } = req.body

    const con = app.get('CONNECTION')

    const sql = `DELETE FROM follower WHERE VacationId=${VacationId} `
    console.log('im in UnfollowVacation')
    console.log(sql)
    con.query(sql, async (err, result, fields) => {
        if (err) {
            res.json({ state: 'error', message: 'there was an error' })
        } else {
            await res.json({ state: 'success', message: result })
        }
    })
})



app.post('/api/AddVacation' , async (req,res)=>
{    
    const { vacationName, description, price, depart, Return } = req.body
    if(!vacationName || !description || !price|| !depart || !Return )
    {
        res.json({state: 'errorMsg' , message: 'please fill all fields'})
    }else{
    if(vacationName.length <= 2)
    {
        res.json({state:'errorMsg',  message: 'vacation name needs to be longer'})
    }else{
    const con = app.get('CONNECTION')



    const sql =`INSERT INTO vacations (Destination, Description, Price, Depart, Returnss) VALUES ('${vacationName}','${description}',${price},'${depart}','${Return}')`
    console.log(sql)
    con.query(sql, (err, result, fields) => {
        
        if (err) {
            res.json({ state: 'error', message: 'there was an error' ,err})
            console.log("not work")

        } else {
            res.json({ state: 'success', message: result })
            console.log("work")
        }
    })

}
}

})

app.listen(5080, () => {
    console.log('running on 5080');
});


function varifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization']
    jwt.verify(bearerHeader, 'nofi', (err, authData) => {
        if (err) {
            console.log('verify token not ok');
            console.log(authData, bearerHeader)
            res.status(403).json({ state: 'error', message: 'token was not found' });
        }
        else {
            console.log('token is ok')
            req.body.admin = authData.admin
            req.body.userName = authData.userName
            next()
        }
    })
}