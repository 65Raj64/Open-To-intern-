const internmodel = require("../module/internmodel");
const collegemodel=require('../module/collegemodel')

const createintrn = async function (req, res) {
    try {
        let data = req.body
        const { name, email, mobile, collegeId, isDeleted } = data
        if (!name) return res.status(400).send({ status: false, msg: "name cannot be empty" })
        if (!name.match(/^[a-z]+$/i)) return res.status(400).send({ status: false, msg: "name is Invalid" })
        if (!email) return res.status(400).send({ status: false, msg: "email cannot be empty" })
        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return res.status(404).send({ status: false, data: "Invalid email" })
        }
        if (!mobile) return res.status(400).send({ status: false, msg: "mobile cannot be empty" })
        if (!mobile.match(/^\d{10}$/)) return res.status(400).send({ status: false, msg: "mobile no invalid" })
        if (!collegeId) return res.status(400).send({ status: false, msg: "collegeId cannot be empty" })
        if (isDeleted) {
            if (typeof isDeleted !== 'boolean')
                return res.status(400).send({ status: false, msg: "isDeleted is true or false type only" })
        }
        let emailverfiy = await internmodel.findOne({ email: email })
        if (emailverfiy) return res.status(400).send({ status: false, msg: "email already exists" })
        let mobileverify = await internmodel.findOne({ mobile: mobile })
        if (mobileverify) return res.status(400).send({ status: false, msg: "mobile-no already exists" })
        let internData = await collegemodel.findById(collegeId)
        if (!internData)
            return res.status(400).send({ status: false, msg: "Enter valid college ID" })

        const createdintrn = await internmodel.create(data)
        res.status(201).send({ status: true, msg: createdintrn })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
//============================================================[API:FOR GETTING LIST OF COLLEGE]=============================================
let getcollege=async (req,res)=>{
    try{
        let data=req.query.collegename
        if(Object.keys(data)===0) return res.status(400).send({ status: false, msg: "enter college name" })
        let search=await collegemodel.findOne({name:data})
        let clgid=search._id.toString()
        let intern=await internmodel.find({collegeId:clgid})
        res.status(201).send({ status: true, msg:intern })

    }
catch(err){
    res.status(500).send({status:false,msg:err.message})
}
}

module.exports.createintrn=createintrn
module.exports.getcollege=getcollege 