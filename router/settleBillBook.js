module.exports = (app, fs) => {
        app.get("/([0-9A-Za-z*]){6}/settleBillBook", (req, res) => {
            res.render("ResultBill.ejs");
        });
  };
  