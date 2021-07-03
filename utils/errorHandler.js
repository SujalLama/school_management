module.exports = (err) => {
    let mes;
    if(err) {
        mes = err.errors.map(el => el.message)
    }

    return mes;
}