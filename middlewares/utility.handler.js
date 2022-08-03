const deleteAttributes = () => {
    return (req, res, next) => {
        delete req.body.btnEdit
        delete req.body.isNew
        next();
    }
}

module.exports = deleteAttributes;