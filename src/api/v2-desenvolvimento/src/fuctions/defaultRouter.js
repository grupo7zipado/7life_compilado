const defaultRouter = (req, res)=>{
    return res.status(200).json({
        sucess: true,
        message: "Api funcionando normalmente"
    })
}

export default defaultRouter