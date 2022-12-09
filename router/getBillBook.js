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

        console.log("getBillBook router");

        //res.send({billbook : reqBillBook});
        res.render('BillMain.ejs', {billbookName : reqBillBook["billBookName"], bills : reqBillBook["bills"], members : reqBillBook["members"]});
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

        console.log("getBills router");

        res.send({bills : reqBills});
    });

    app.get("/([0-9A-Za-z*]){6}/getBill", (req, res) => {
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

        var reqBill = billbookJson.billbooks[billbookIndex][billbookCode]["bills"][req.query.index];

        console.log("getBill router");

        res.send({bill : reqBill});
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

        console.log("getMembers router");

        res.send({members : reqMembers});
    });
  };
  