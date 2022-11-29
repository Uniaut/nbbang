const billContainer = document.getElementById("billContainer");
const makebillButton = document.getElementById("makeBillButton");

const BODER_Name = "billBorder";
const BILL_Name = "bill"

function makebillBoder(){
    const divbillBoder = document.createElement("div");
    const divbill = document.createElement("div");

    divbillBoder.classList.add(BODER_Name);
    divbill.classList.add(BILL_Name);
    divbillBoder.appendChild(divbill);

    billContainer.appendChild(divbillBoder);
}

makebillButton.addEventListener("click", makebillBoder);