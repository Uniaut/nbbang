const deletePriceMemberButton = document.querySelector(".deleteMember");
const editModeButton = document.querySelector(".editModeButton");
const viewModeButtonList = document.querySelectorAll(".viewModeButton");
const title = document.querySelector(".switchh2input");

const billbookCode = /([0-9A-Za-z*]){6}/;
var index = -1;

if(billbookCode.test(window.location.pathname.substring(1,7))) {
    if(window.location.pathname.substring(8,15) == "addBill") {
        document.getElementById("save_btn").classList.remove('hidden');
        document.getElementById("update_btn").classList.add('hidden');
        title.innerHTML = "Bill 추가하기";
    }

    if(window.location.pathname.substring(8,18) == "updateBill") {
        document.getElementById("save_btn").classList.add('hidden');
        document.getElementById("update_btn").classList.remove('hidden');
        title.innerHTML = "Bill 수정하기";

        let params = (new URL(document.location)).searchParams;
        index = params.get("index");

        fetch(window.location.origin + window.location.pathname.substring(0, 7) + "/getBill?index=" + index, {method: "GET"})
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            document.getElementById("billTitle").value = data["bill"]["billTitle"]["title"];
            document.getElementById("billSummary").value = data["bill"]["summary"];
            document.getElementById("fullPrice").value = data["bill"]["fullPrice"];

            for(var i = 0; i < data["bill"]["memberPrice"].length; ++i) {
                const list = document.getElementById("price_list");
                const list_elem = document.createElement("li");
                const del_btn = document.createElement("button");
                const span_name = document.createElement("span");
                const span_price = document.createElement("span");
                const br = document.createElement("br");
                const space = document.createElement("span");
                const p = document.createElement("span");
                space.innerHTML = " ";
                p.innerHTML = "원";

                span_name.className += "member_name";
                span_name.addEventListener("click", updateName);

                span_price.className += "member_price";
                span_price.addEventListener("click", updatePrice);

                del_btn.className += "button_image";
                del_btn.style = "float:right;";
                del_btn.innerText = "X";
                del_btn.addEventListener("click", deletePriceMember);

                span_name.innerHTML = data["bill"]["memberPrice"][i]["member"];
                span_price.innerHTML = data["bill"]["memberPrice"][i]["price"];

                list_elem.appendChild(span_name);
                list_elem.appendChild(space);
                list_elem.appendChild(span_price);
                list_elem.appendChild(p);
                list_elem.appendChild(del_btn);
                list_elem.appendChild(br);

                list.appendChild(list_elem);
            }
        });
    }
}

function deletePriceMember(event){
    const oneMemberTarget = event.target.parentElement;

    oneMemberTarget.remove()
}

function switchHidden(){
    const switchModeList = document.querySelectorAll(".switchMode");

    for(var i = 0; i < switchModeList.length; i++){
        if(switchModeList[i].classList.contains('hidden'))
            switchModeList[i].classList.remove('hidden');
        else
            switchModeList[i].classList.add('hidden');
    }
}

function addMemberPrice() {
    const name = document.getElementById("member_name");
    const price = document.getElementById("member_price");

    if(!(name.value.length === 0) && !(price.value.length === 0)) {
        const list = document.getElementById("price_list");
        const list_elem = document.createElement("li");
        const del_btn = document.createElement("button");
        const span_name = document.createElement("span");
        const span_price = document.createElement("span");
        const br = document.createElement("br");
        const space = document.createElement("span");
        const p = document.createElement("span");
        space.innerHTML = " ";
        p.innerHTML = "원";

        span_name.className += "member_name";
        span_name.addEventListener("click", updateName);

        span_price.className += "member_price";
        span_price.addEventListener("click", updatePrice);

        del_btn.className += "button_image";
        del_btn.style = "float:right;";
        del_btn.innerText = "X";
        del_btn.addEventListener("click", deletePriceMember);

        span_name.innerHTML = name.value;
        span_price.innerHTML = price.value;

        list_elem.appendChild(span_name);
        list_elem.appendChild(space);
        list_elem.appendChild(span_price);
        list_elem.appendChild(p);
        list_elem.appendChild(del_btn);
        list_elem.appendChild(br);

        list.appendChild(list_elem);

        name.value = null;
        price.value = null;
    }
}

function updateName(event) {
    const parent = event.target.parentElement;

    const p = document.createElement("p");
    p.innerHTML = "<멤버이름 수정>";
    p.className += "updateName";
    p.style = "font-weight:bold;color:white;font-size:10px";

    const input = document.createElement("input");
    input.type = "text";
    input.value = event.target.textContent;
    input.style = "resize: none;position: relative;margin-top:5px;padding: 10px 10px;display: inline-block;outline: solid #ffffff;";

    const update_btn = document.createElement("button");
    update_btn.innerText = "수정";
    update_btn.style = "display:inline;padding-top:11px;padding-bottom:14px;";
    update_btn.addEventListener("click", updateMember);

    const cancel_btn = document.createElement("button");
    cancel_btn.innerText = "취소";
    cancel_btn.style = "display:inline;padding-top:11px;padding-bottom:14px;";
    cancel_btn.addEventListener("click", cancelUpdate);

    parent.appendChild(p);
    parent.appendChild(input);
    parent.appendChild(update_btn);
    parent.appendChild(cancel_btn);
}

function updatePrice(event) {
    const parent = event.target.parentElement;

    const p = document.createElement("p");
    p.innerHTML = "<멤버가격 수정>";
    p.className += "updatePrice";
    p.style = "font-weight:bold;color:white;font-size:10px";

    const input = document.createElement("input");
    input.type = "text";
    input.value = event.target.textContent;
    input.style = "resize: none;position: relative;margin-top:5px;padding: 10px 10px;display: inline-block;outline: solid #ffffff;";

    const update_btn = document.createElement("button");
    update_btn.innerText = "수정";
    update_btn.style = "display:inline;padding-top:11px;padding-bottom:14px;";
    update_btn.addEventListener("click", updateMember);

    const cancel_btn = document.createElement("button");
    cancel_btn.innerText = "취소";
    cancel_btn.style = "display:inline;padding-top:11px;padding-bottom:14px;";
    cancel_btn.addEventListener("click", cancelUpdate);

    parent.appendChild(p);
    parent.appendChild(input);
    parent.appendChild(update_btn);
    parent.appendChild(cancel_btn);
}

function cancelUpdate(event) {
    event.target.previousSibling.previousSibling.previousSibling.remove();
    event.target.previousSibling.previousSibling.remove();
    event.target.previousSibling.remove();
    event.target.remove();
}

function updateMember(event) {
    const parent = event.target.parentElement;

    if(event.target.previousSibling.previousSibling.className == "updateName") {
        parent.firstChild.innerText = event.target.previousSibling.value;
    }

    if(event.target.previousSibling.previousSibling.className == "updatePrice") {
        parent.firstChild.nextSibling.nextSibling.innerText = event.target.previousSibling.value;
    }

    event.target.previousSibling.previousSibling.remove();
    event.target.previousSibling.remove();
    event.target.nextSibling.remove();
    event.target.remove();
}

function addBill() {
    memberPrice = document.getElementsByTagName("li");

    const _members = [];
    const _prices = [];

    for(var i = 0; i < memberPrice.length; ++i) {
        _members.push(memberPrice[i].firstChild.textContent);
        _prices.push(memberPrice[i].firstChild.nextSibling.nextSibling.textContent);
    }

    fetch(window.location.origin + window.location.pathname.substring(0, 7) + "/addBill", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          "billTitle": document.getElementById("billTitle").value,
          "billSummary": document.getElementById("billSummary").value,
          "fullPrice": document.getElementById("fullPrice").value,
          "members": _members,
          "prices": _prices
        }),
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data);
        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname.substring(0, 7);
      });
}

function updateBill() {
    memberPrice = document.getElementsByTagName("li");

    const _members = [];
    const _prices = [];

    for(var i = 0; i < memberPrice.length; ++i) {
        _members.push(memberPrice[i].firstChild.textContent);
        _prices.push(memberPrice[i].firstChild.nextSibling.nextSibling.textContent);
    }

    fetch(window.location.origin + window.location.pathname.substring(0, 7) + "/updateBill", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          "billTitle": document.getElementById("billTitle").value,
          "billSummary": document.getElementById("billSummary").value,
          "fullPrice": document.getElementById("fullPrice").value,
          "members": _members,
          "prices": _prices,
          "index": index
        }),
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data);
        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname.substring(0, 7);
      });
}

function cancel() {
    window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname.substring(0, 7);
}