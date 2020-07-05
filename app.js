const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/user-mongoose",{
    useNewUrlParser:true,
    useCreateIndex:true
})
const express=require('express')
const app=express()
const bcryptjs=require('bcryptjs')
app.use(express.json())
const user_schema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    
    password:{
          type:String,
          required:true,
          minlength:4,
          
          trim:true,
    },

  
})
const state_schema = new mongoose.Schema({
    state:{
        type:String,
        required:true,
        trim:true
    }
})
const district_schema=new mongoose.Schema({
    state:{
        type:String,
        required:true,
        trim:true
    },
    district:{
        type:String,
        required:true,
        trim:true
    }
})
const child_schema= new mongoose.Schema({
     name:{
        type:String,
        required:true,
        trim:true
     },
     sex:{
        type:String,
        required:true,
        trim:true
     },
     dateofbirth:{
        type:String,
        required:true,
        trim:true
     },
     fathername:{
        type:String,
        required:true,
        trim:true
     },
     mothername:{
        type:String,
        required:true,
        trim:true
     },
     state:{
        type:String,
        required:true,
        trim:true
     },
     district:{
        type:String,
        required:true,
        trim:true
     }
})
user_schema.statics.findBylogin=async (username,password)=>{
    const user_l=await user.findOne({username:username})
    if(!user_l)
    {
        throw new Error('Unable to login')
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match)
    {
        throw new Error('Unable to login')
    }
    return user_l
}

user_schema.pre('save',async function(next){
  
    const user=this
    if(user.isModified('password'))
    {
    user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

const user=mongoose.model('user',user_schema)
const state=mongoose.model('state',state_schema)
const district=mongoose.model('district',district_schema)
const child=mongoose.model('child',child_schema)
app.post('/user',async (req,res)=>{
    
    try{
    const new_user=new user(req.body)
    await new_user.save()
   
    res.send(new_user)
    }
    catch(error){
          res.status(400).send()
    }
})
app.post('/user/login',async (req,res)=>{
    try{

    
    const user_log=await user.findBylogin(req.body.username,req.body.password)
  

    res.send(user_log)
    }
    catch(error)
    {
          res.status(400).send()
    }
    
    
})
app.get('/user',async (req,res)=>{
    try{
    const user_find=await user.find({})
    res.send(user_find)
    }
    catch(error){
        res.status(400).send()
    }
    
})
app.post('/state',async(req,res)=>{
    try{
    const state_new=new state(req.body)
    await state_new.save()
    res.send(state_new)
    }
    catch(error){
         res.status(400).send()
    }


})
app.get('/state',async(req,res)=>{
    try{
        const state_find=await state.find({})
        res.send(state_find)
    }
    catch(error){
          res.status(400).send()
    }
})
app.post('/district',async(req,res)=>{
    try{
        const district_new=new district(req.body)
        await district_new.save()
        res.send(district_new)
    }
    catch(error){
          res.status(400).send()
    }
})
app.get('/district',async(req,res)=>{
    try{
        const district_find=await district.find({})
        res.send(district_find)
    }
    catch{
        res.status(400).send()
    }
})
app.post('/child',async(req,res)=>{
    try{
        const child_new=new child(req.body)
        await child_new.save()
        res.send(child_new)
    }
    catch{
        res.status(400).send()
    }
})
app.get('/child',async(req,res)=>{
    try
    {
    const child_find=await child.find({})
    res.send(child_find)
    }
    catch{
        res.status(400).send()
    }
})
app.listen(3000,()=>{
    console.log('server is set on 3000')
})
