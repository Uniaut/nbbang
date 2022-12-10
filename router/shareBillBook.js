module.exports = (app) => {
    app.get("/([0-9A-Za-z*]){6}/shareBillBook", (req, res) => {
        const billbookCode = req.url.toString().substr(1,6);
        const base_url = "localhost:8080/";
        res.render("BillBookShare.ejs", {url : 'http://' + base_url + billbookCode});
    });
};
