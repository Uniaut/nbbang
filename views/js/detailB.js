const addPriceMemberButton = document.querySelector(".addMember");
const deletePriceMemberButton = document.querySelector(".deleteMember");
const editModeButton = document.querySelector(".editModeButton");
const viewModeButtonList = document.querySelectorAll(".viewModeButton");

function deletePriceMember(event){
    const oneMemberTarget = event.target.parentElement;

    oneMemberTarget.remove()
}

function addPriceMember(event){
    const priceMember = event.target.parentElement;
    const oneMember = document.createElement("div");
    const memberText = document.createElement("textarea");
    const priceText = document.createElement("textarea");
    const deleteButton = document.createElement("button");

    oneMember.classList.add("oneMember");
    memberText.classList.add("oneMemberText", "memberText");
    memberText.innerText = "멤버이름";
    priceText.classList.add("oneMemberText", "priceText");
    priceText.innerText = "가격";
    deleteButton.classList.add("button_image", "deleteMember", "switchMode");
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", deletePriceMember);

    oneMember.appendChild(memberText);
    oneMember.appendChild(priceText);
    oneMember.appendChild(deleteButton);
    priceMember.appendChild(oneMember);
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

editModeButton.addEventListener("click", switchHidden);
for (var i = 0; i < viewModeButtonList.length; i++) {
    viewModeButtonList[i].addEventListener("click", switchHidden);
}

deletePriceMemberButton.addEventListener("click", deletePriceMember);
addPriceMemberButton.addEventListener("click", addPriceMember);