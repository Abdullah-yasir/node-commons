const globalErrorHandler = (err, req, res) => {
    // set locals, only providing error in development

    console.log(err)
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(req.statusCode || 500)
    res.json({ error: (err.field ? err.field + ' ' : '') + err.message })
}

module.exports = globalErrorHandler
