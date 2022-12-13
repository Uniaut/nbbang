module.exports = (app, fs) => {
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
            "paidMember": req.body.paidMember,
            "memberPrice": []
        }
        console.log(dataType["paidMember"]);

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
