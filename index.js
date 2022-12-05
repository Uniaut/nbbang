const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/frontend'));

app.get('/', (req, res) => {
    res.render(__dirname + '/frontend/BillMain.html', {"title": "빌 메인"});
})

app.listen(port, (err) => {
    if(err)
        return console.log(err);
    console.log('listening port 3000');
})