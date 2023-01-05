const express = require("express");

const authRouter = express.Router();

authRouter.get("/login",(req,res)=>{
    if(req.session.username){
        res.redirect("/productos");
    }else{
        res.render("login");
    };
});

authRouter.post("/login",(req,res)=>{
    const {name} = req.body;
    req.session.username = name;
    res.redirect("/productos");
})

authRouter.get("/logout",(req,res)=>{
    const name = req.session.username
    req.session.destroy(err => {
        if(err) return res.redirect("/productos");
        res.render("logout",{name:name});
    });
})

module.exports = authRouter;