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
    const item = menuButtonSections.item(i);
    item.addEventListener("click", menuButtonClicked);
}