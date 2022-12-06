module.exports = (app, fs) => {
    app.get("/([0-9A-Za-z*]){6}", (req, res) => {
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

        var reqBillBook = billbookJson.billbooks[billbookIndex][billbookCode];

        console.log(reqBillBook);

        res.send("getBillBook router");
    });

    app.get("/([0-9A-Za-z*]){6}/getBills", (req, res) => {
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

        var reqBills = billbookJson.billbooks[billbookIndex][billbookCode]["bills"];

        console.log(reqBills);

        res.send("getBills router");
    });

    app.get("/([0-9A-Za-z*]){6}/getMembers", (req, res) => {
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

        var reqMembers = billbookJson.billbooks[billbookIndex][billbookCode]["members"];

        console.log(reqMembers);

        res.send("getMembers router");
    });
  };
  