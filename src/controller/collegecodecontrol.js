const collegeschema = require('../module/collegemodel')
const { uploadFile } = require('../aws/uploadaws')

const success = (res, status, msg) => {
    return res.status(status).send({ status: true, data: msg })
}
const unsuccess = (res, status, msg) => {
    return res.status(status).send({ status: false, msg: msg })
}
//=================================================[API:FOR CREATING COLLGE]=======================================================
const createcollege = async (req, res) => {
    try {
        let data = req.body

        let { name, fullName, isDeleted } = data
        let files = req.files
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "enter college details" })
        if (!name) return unsuccess(res, 400, "name is required")
        if (!name.match(/^[#.a-zA-Z\s,-]+$/)) return unsuccess(res, 400, "name is Invalid")
        if (!fullName) return unsuccess(res, 400, "fullName is required")
        if (!fullName.match(/^[#.0-9a-zA-Z\s,-]+$/)) return unsuccess(res, 400, "fullName is invalid")
        // if (!logoLink) return unsuccess(res, 400, "logoLink is required")
        // if (!logoLink.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) return unsuccess(res, 400, "logoLink is invalid")
        if (isDeleted) {
            if (typeof isDeleted !== 'boolean') return unsuccess(res, 400, "isDeleted is true or false type only")
        }
        let search = await collegeschema.findOne({ name: name })
        if (search) return unsuccess(res, 400, "name already exists")
        if (!files && files.length == 0) return res.status(400).send({ status: false, message: "upload logo image" })
        let uploadedFileURL = await uploadFile(files[0])
        let obj = {
            name: name,
            fullName: fullName,
            logoLink: uploadedFileURL,
            isDeleted: isDeleted,

        }
        let result = await collegeschema.create(obj)
        return success(res, 201, result)
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err })
    }
}
module.exports.createcollege = createcollege