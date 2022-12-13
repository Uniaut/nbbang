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
  
      //res.send({ router: "/addBillBook", success: true });
      res.redirect("/" + randomCode);
    });

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
            "paidMember": req.body.paidMember,
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
};
