module.exports = (app, fs) => {
  app.get("/", (req, res) => {
    res.render("BillMain.html");
  });

  app.get("/addBillBook", (req, res) => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const stringLength = 6;
    let randomCode = "";
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomCode += chars.substring(rnum, rnum + 1);
    }

    const dataType = { };
    dataType[randomCode] = {
        "billBookName": "BillBook이름",
        "billBookDetail": "설명",
        
        "bills": [
            {
                "billTitle": {
                    "date": "날짜",
                    "time": "시간",
                    "title": "제목"
                },
                "summary": "요약글",
                "fullPrice": "총가격",
                "memberPrice": [
                    {
                        "member": "이름",
                        "price": "가격"
                    }
                ]
            }
        ],
        "members": [
            {
                "name": "사람이름",
                "account": {
                    "bank": "은행이름",
                    "number": "계좌번호"
                }
            }
        ]
    }

    const dataBuffer = fs.readFileSync('./data/billbook.json');
    const dataJSON = dataBuffer.toString();
    const currentBillBookJson = JSON.parse(dataJSON);
    currentBillBookJson.billbooks.push(dataType);
    fs.writeFileSync('./data/billbook.json', JSON.stringify(currentBillBookJson));
  });
};
