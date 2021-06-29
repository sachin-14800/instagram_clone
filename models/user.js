const mongoose=require('mongoose');
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://www.computerhope.com/jargon/g/guest-user.jpg"
    },
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'follow'
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'follow'
        }
    ],
    bio:{
        type:String
    }
},{
    timestamps:true
});

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        let paths=path.join(__dirname,'..',AVATAR_PATH,'/',req.user.name);
        
        if(!fs.existsSync(paths))
        { fs.mkdirSync(paths);}
        cb(null,paths);
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});

// static
// available as model_name.uploadedAvatar
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;
const User=mongoose.model('User',userSchema);

module.exports=User;