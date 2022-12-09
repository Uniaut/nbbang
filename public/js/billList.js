//메뉴버튼들을 저장
const menuButtonSections = document.querySelectorAll(".MenuButton");

//disabled된 whole영역을 hidden으로 바꾸고 아닌 영역에서 hidden class를 지운다.
function hideDisabledWhole(){
    const wholeSections = document.querySelectorAll(".whole");

    for(var i = 0; i < wholeSections.length; i++){
        if(wholeSections[i].classList.contains('hidden'))
            wholeSections[i].classList.remove('hidden');
        else
            wholeSections[i].classList.add('hidden');
    }
}

//disable상태의 버튼을 able상태로 바꾼다.
function setAble(target){
    target.disabled = false;
    target.classList.remove("disabled");
}

//able상태의 버튼을 disable상태로 바꾼다.
function setDisable(target){
    target.disabled = true;
    target.classList.add("disabled");
}

//메뉴 버튼이 클릭되었을 때 실행하는 함수이다.
function menuButtonClicked(event){
    const ableButton = event.target;
    const disableButton = document.querySelector(".disabled");

    setDisable(ableButton);
    setAble(disableButton);
    hideDisabledWhole();
}

//메뉴 버튼 모두에게 클릭 이벤트 때 실행할 함수 menuButtonClicked을 추가한다.
for (var i = 0; i < menuButtonSections.length; i++) {
    menuButtonSections[i].addEventListener("click", menuButtonClicked);
}

function addMember() {
    fetch(window.location + "/addMember", {method: "GET"})
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        window.location.reload();
    });
}

function addBill() {
    window.location.href = window.location.origin + window.location.pathname + "/addBill";
}

function updateBill(event) {
    parent = event.target.parentElement.parentElement;
    window.location.href = window.location.origin + window.location.pathname + "/updateBill?index=" + parent.id;
}

function updateMember(event) {
    parent = event.target.parentElement.parentElement;
    fetch(window.location.origin + window.location.pathname + "/updateMember", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          "memberName":document.getElementById("member_name").textContent,
          "memberBank":document.getElementById("member_bank").textContent,
          "memberBankNumber":document.getElementById("member_bank_number").textContent,
          "index":parent.id
        }),
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
}

function deleteMember(event) {
    parent = event.target.parentElement.parentElement;
    fetch(window.location.origin + window.location.pathname + "/deleteMember", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          "index":parent.id
        }),
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
}

function deleteBill(event) {
    parent = event.target.parentElement.parentElement;
    fetch(window.location.origin + window.location.pathname + "/deleteBill", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          "index":parent.id
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

function onClickName(event) {

        const parent = event.target;

        const input = document.createElement("input");
        input.type = "text";
        input.value = event.target.textContent;
        input.style = "resize: none;position: relative;margin-top:5px;margin-left:15px;padding: 10px 10px;display: inline-block;outline: solid #ffffff;";

        const update_btn = document.createElement("button");
        update_btn.innerText = "수정";
        update_btn.style = "display:inline;padding-top:12px;padding-bottom:13px;";
        update_btn.addEventListener("click", updateName);

        const cancel_btn = document.createElement("button");
        cancel_btn.innerText = "취소";
        cancel_btn.style = "display:inline;padding-top:12px;padding-bottom:13px;";
        cancel_btn.addEventListener("click", cancelUpdate);

        parent.appendChild(input);
        parent.appendChild(update_btn);
        parent.appendChild(cancel_btn);

}

function updateName(event) {
    const parent = event.target.parentElement;

    parent.innerText = event.target.previousSibling.value;

}

function onClickBank(event) {

        const parent = event.target;

        const input = document.createElement("input");
        input.type = "text";
        input.value = event.target.textContent;
        input.style = "resize: none;position: relative;margin-top:5px;margin-left:15px;padding: 10px 10px;display: inline-block;outline: solid #ffffff;";

        const update_btn = document.createElement("button");
        update_btn.innerText = "수정";
        update_btn.style = "display:inline;padding-top:12px;padding-bottom:13px;";
        update_btn.addEventListener("click", updateBank);

        const cancel_btn = document.createElement("button");
        cancel_btn.innerText = "취소";
        cancel_btn.style = "display:inline;padding-top:12px;padding-bottom:13px;";
        cancel_btn.addEventListener("click", cancelUpdate);

        parent.appendChild(input);
        parent.appendChild(update_btn);
        parent.appendChild(cancel_btn);

}

function updateBank(event) {
    const parent = event.target.parentElement;

    parent.innerText = event.target.previousSibling.value;

}

function onClickBankNumber(event) {

        const parent = event.target;

        const input = document.createElement("input");
        input.type = "text";
        input.value = event.target.textContent;
        input.style = "resize: none;position: relative;margin-top:5px;margin-left:15px;padding: 10px 10px;display: inline-block;outline: solid #ffffff;";

        const update_btn = document.createElement("button");
        update_btn.innerText = "수정";
        update_btn.style = "display:inline;padding-top:12px;padding-bottom:13px;";
        update_btn.addEventListener("click", updateBankNumber);

        const cancel_btn = document.createElement("button");
        cancel_btn.innerText = "취소";
        cancel_btn.style = "display:inline;padding-top:12px;padding-bottom:13px;";
        cancel_btn.addEventListener("click", cancelUpdate);

        parent.appendChild(input);
        parent.appendChild(update_btn);
        parent.appendChild(cancel_btn);

}

function updateBankNumber(event) {
    const parent = event.target.parentElement;

    parent.innerText = event.target.previousSibling.value;

}

function cancelUpdate(event) {
    event.target.previousSibling.previousSibling.remove();
    event.target.previousSibling.remove();
    event.target.remove();

    if(event.target.id == "member_name")
        toggleName = false;
    if(event.target.id == "member_bank")
        toggleBank = false;
    if(event.target.id == "member_bank_number")
        toggleBankNumber = false;
}