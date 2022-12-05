module.exports = (app, fs) => {
  app.get("/", (req, res) => {
    res.render("BillMain.html");
  });
};
