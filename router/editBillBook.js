module.exports = (app, fs) => {
    app.get("/([0-9A-Za-z*]){6}/addBill", (req, res) => {
        res.render("detailBill.html");
        /*fs.readFile("./views/detailBill.html", (err, data) => {
            res.writeHead(200, { 'Content-Type' : 'text/html'});
            res.end(data);
        });*/
    });

    app.post("/([0-9A-Za-z*]){6}/addBill", (req, res) => {
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

        var today = new Date();

        const dataType = {
            "billTitle": {
                "date": today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월 ' + today.getDate() + '일',
                "time": today.getHours() + '시 ' + today.getMinutes() + '분',
                "title": req.body.billTitle
            },
            "summary": req.body.billSummary,
            "fullPrice": req.body.fullPrice,
            "memberPrice": []
        }

        for(var i = 0; i < req.body.members.length; ++i) {
            const memberPriceData = {
                "member": req.body.members[i],
                "price": req.body.prices[i]
            }

            dataType["memberPrice"].push(memberPriceData);
        }

        currentBillBook["bills"].push(dataType);
        fs.writeFileSync(
            "./data/billbook.json",
            JSON.stringify(billbookJson)
        );

        res.send({ router: "/addBill", success: true, desc: "addbill success" });
    });

    app.get("/([0-9A-Za-z*]){6}/addMember", (req, res) => {
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

        const dataType = {
            "name": "멤버이름",
            "account": {
                "bank": "멤버은행",
                "number": "멤버계좌번호"
            }
        }

        currentBillBook["members"].push(dataType);
        fs.writeFileSync(
            "./data/billbook.json",
            JSON.stringify(billbookJson)
        );

        res.send({ router: "/addMember", success: true, desc: "addmember success" });
    });

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

    app.get("/([0-9A-Za-z*]){6}/updateBill", (req, res) => {
        res.render("detailBill.html");
    });

    app.post("/([0-9A-Za-z*]){6}/updateBill", (req, res) => {
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

        const dataType = {
            "billTitle": {
                "date": currentBillBook["bills"][req.body.index]["billTitle"]["date"],
                "time": currentBillBook["bills"][req.body.index]["billTitle"]["time"],
                "title": req.body.billTitle
            },
            "summary": req.body.billSummary,
            "fullPrice": req.body.fullPrice,
            "memberPrice": []
        }

        for(var i = 0; i < req.body.members.length; ++i) {
            const memberPriceData = {
                "member": req.body.members[i],
                "price": req.body.prices[i]
            }

            dataType["memberPrice"].push(memberPriceData);
        }

        currentBillBook["bills"][req.body.index] = dataType;
        fs.writeFileSync(
            "./data/billbook.json",
            JSON.stringify(billbookJson)
        );

        res.send({ router: "/updateBill", success: true, desc: "update bill success" });
    });

    app.post("/([0-9A-Za-z*]){6}/updateMember", (req, res) => {
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

        const dataType = {
            "name": req.body.memberName,
            "account": {
                "bank": req.body.memberBank,
                "number": req.body.memberBankNumber
            }
        }

        currentBillBook["members"][req.body.index] = dataType;

        fs.writeFileSync(
            "./data/billbook.json",
            JSON.stringify(billbookJson)
        );

        res.send({ router: "/updateMember", success: true, desc: "update member success" });
    });
};
