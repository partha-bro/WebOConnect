const notFound = (req,res,next) => {
    res.status(404).json({error: 'Routes does not exist.'})
}

export default notFound