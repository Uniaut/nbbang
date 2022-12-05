module.exports = function(app, fs)
{
    app.get('/',function(req,res){
        res.render('MakeBillBook');
    });
}