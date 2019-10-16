exports.validParams = (req,res,next) => {
    const { dia } = req.query
    if (!dia || dia<0 || dia%1 != 0) res.status(400).json({message:'Parameters are invalid.'})
    else next()
}