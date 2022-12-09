module.exports = (app, fs) => {
    app.post("/([0-9A-Za-z*]){6}/deleteBill", (req, res) => {
        const billbookCode = req.url.toString().substr(1,6);
        var billbookIndex = 0;
        const dataBuffer = fs.readFileSync('./data/billbook.json');
        const dataJSON = dataBuffer.toString();
        const billbookJson = JSON.parse(dataJSON);

        for(var i = 0; i < billbookJson.billbooks.length; ++i) {
            if(billbookCode == Object.keys(billbookJson.billbooks[i])[0]) {
                billbookIndex = i;
                break;
            }
            billbookIndex = -1;
        }

        var currentBillBook = billbookJson.billbooks[billbookIndex][billbookCode];

        currentBillBook["bills"].splice(req.body.index, 1);

        fs.writeFileSync(
            "./data/billbook.json",
            JSON.stringify(billbookJson)
        );

        res.send({ router: "/deleteBill", success: true, desc: "delete bill success" });
    });

    app.post("/([0-9A-Za-z*]){6}/deleteMember", (req, res) => {
        const billbookCode = req.url.toString().substr(1,6);
        var billbookIndex = 0;
        const dataBuffer = fs.readFileSync('./data/billbook.json');
        const dataJSON = dataBuffer.toString();
        const billbookJson = JSON.parse(dataJSON);

        for(var i = 0; i < billbookJson.billbooks.length; ++i) {
            if(billbookCode == Object.keys(billbookJson.billbooks[i])[0]) {
                billbookIndex = i;
                break;
            }
            billbookIndex = -1;
        }

        var currentBillBook = billbookJson.billbooks[billbookIndex][billbookCode];

        currentBillBook["members"].splice(req.body.index, 1);

        fs.writeFileSync(
            "./data/billbook.json",
            JSON.stringify(billbookJson)
        );

        res.send({ router: "/deleteMember", success: true, desc: "delete member success" });
    });
};
