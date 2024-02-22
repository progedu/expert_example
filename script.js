'use strict';
const nameInput = document.getElementById('name');
const dateInput = document.getElementById('date');
const submitButton = document.getElementById('submit');
const resultDivision = document.getElementById('result-area');

// 数で重みづけ
const fortuneList = ["大吉","大吉","大吉", "大吉", "大吉", "吉", "吉", "吉","中吉","中吉","小吉","小吉","凶"];

submitButton.addEventListener(
  'click',
  () => {
    const name = nameInput.value;
    if (name.length === 0) {

      alert("名前を入れてください");
      return;
    }
    const date = dateInput.value;
    if (date.length === 0) {
      alert("誕生日を入れてください");
      return;
    }

    // 診断結果表示エリアの作成
    resultDivision.innerText = '';
    
    // headerDivision の作成
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-light');
    headerDivision.innerText = '結果';

    // bodyDivision の作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');

    const result = readFortune(name, date);

    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);
  }

);

nameInput.addEventListener(
  'keydown',
  event => {
    if(event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)


function readFortune(name, date) {
  const year = new Date().getFullYear()
  const birth_year = (year - new Date(date).getFullYear()) / 100;
  const birth_month = new Date(date).getMonth() / 12;
  const birth_date = new Date(date).getDate() / 31;
  const digits = (birth_year + birth_month + birth_date) * 10**17;
  const number = sumOfDigits(digits);
  const fortune = fortuneList[parseInt(number%fortuneList.length)];
  const result = name + "の今年の運勢は「" +  fortune + "」です！";
  return result;
}

function sumOfDigits(number) {

  var digits = number.toString().split('');
  
  var sum = 0;
  for (var i = 0; i < digits.length; i++) {

      sum += parseInt(digits[i]);
  }
  return sum;
}