import CustomError from "../errors/customError.js"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const getUser = async ( req,res ) => {
    const { userId } = res.user
    const user = await User.findById(userId)
    if(!user) throw new CustomError(500, 'no user found!')
    res.status(200).json(user)
}

const createUser = async (req,res) => {
    // console.log({body:req.body,file:req.file})
    const { name,email,gender,password,phone,status } = req.body 
    const { path,originalname } = req.file
    const existUser = await User.findOne({email})
    if(existUser) throw new CustomError(404, 'user is not created, because user is already exist')
    const saltRound = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, saltRound)
    const user = await User.create( { name,email,gender,password:hash,phone,profile_pic:`images/${originalname}`,status } )
    if(!user) throw new CustomError(404, 'user is not created.')
    res.status(201).json({ message:'user is created.'})
}

const deleteUser = async (req,res) => {
    const { id } = req.body
    const user = await User.findByIdAndDelete(id)
    if(!user) throw new CustomError(404, 'user is not deleted!')
    res.status(200).json({data: user, message: 'user is deleted.'})
}

const loginUser = async (req,res) => {
    const { email,password } = req.body
    const user = await User.findOne({email})
    if(!user) throw new CustomError(400, 'User does not exist!')
    const comparePwd = await bcrypt.compare(password, user.password)
    if(comparePwd) {
        const token = jwt.sign({userId:user._id},process.env.JWT_SECERET,{expiresIn:'1d'})
        res.status(200).json({message:'successfully login.',token})
    }else{
        throw new CustomError(400, 'Wrong Password!')
    }
}

const changePassword = async (req,res) => {
    const {id,prevPassword,newPassword,cnfPassword} = req.body

    const user = await User.findById(id)
    if(!user) throw new CustomError(400, 'User does not exist!')

    const comparePwd = await bcrypt.compare(prevPassword, user.password)
    if(comparePwd) {
        if( newPassword === cnfPassword){
            const saltRound = await bcrypt.genSalt()
            const hash = await bcrypt.hash(newPassword,saltRound)
            const updateUser = await User.findByIdAndUpdate(user._id,{$set:{password:hash}},{new:true})
            res.status(200).json({message:'successfully Change Password.',data:updateUser})
        }else{
            throw new CustomError(400, 'new Password mismatch!')
        }
    }else{
        throw new CustomError(400, 'Wrong Password!')
    }
}

const editUser = async (req,res) => {
    const { id,name,email,gender,password,phone,status } = req.body 
    const { path,originalname } = req.file
    const user = await User.findById(id)
    if(!user) throw new CustomError(400, 'User does not exist!')
    const updateUser = await User.findByIdAndUpdate(user._id,{$set:{name,email,gender,phone,status,profile_pic:`images/${originalname}`}},{new:true})
    res.status(200).json({message:'successfully updated user.',data:updateUser})

}

export { createUser,deleteUser,loginUser,getUser,changePassword,editUser }