import { Router } from 'express'
import User from '../models/user.js'
import json2csv from 'json2csv'

const router = Router()

router.get('/', (req,res)=>{
    res.redirect('/admin/page/1')
})

router.get('/page/:page', async (req,res)=>{

    var perPage = 9
    var page = req.params.page || 1
    const userCount = await User.find().count()
    const users = await User.find({},{_id:0,name:1,email:1,phone:1,status:1}).skip((perPage * page) - perPage).limit(perPage)

    res.render('admin',{users,current: page,pages: Math.ceil(userCount / perPage) })
})

router.get("/csvDownload", async (req, res) => {

    const users = await User.find({})

    const csv = await json2csv.parse(users,{fields: ['name','email','phone','gender','createdAt']})
        res.setHeader('Content-disposition', 'attachment; filename=users.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
})

router.get('/search', async (req,res)=>{
    const {name} = req.query
    const users = await User.find({name: {$regex: name}})
    res.render('search',{users})
})


export default router