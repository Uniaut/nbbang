module.exports = (app, fs) => {
  app.post("/addBillBook", (req, res) => {
    const dataBuffer = fs.readFileSync("./data/billbook.json");
    const dataJSON = dataBuffer.toString();
    const currentBillBookJson = JSON.parse(dataJSON);

    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const stringLength = 6;
    let randomCode = "";

    do {
      randomCode = "";

      for (let i = 0; i < stringLength; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomCode += chars.substring(rnum, rnum + 1);
      }
    } while (currentBillBookJson.billbooks.includes(randomCode) == true);

    const dataType = {};
    dataType[randomCode] = {
      billBookName: req.body.billBookName,
      billBookDetail: req.body.billBookDetail,
      bills: [],
      members: [],
    };
    currentBillBookJson.billbooks.push(dataType);
    fs.writeFileSync(
      "./data/billbook.json",
      JSON.stringify(currentBillBookJson)
    );

    res.send({ router: "/addBillBook", success: true });
  });
};
