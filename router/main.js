module.exports = (app, fs) => {
  app.get("/", (req, res) => {
    res.redirect('/createBillBook')
  });
};
