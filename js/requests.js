const mainUrl = 'https://sf-pyw.mosyag.in/sse/vote/';
const animal_array= ['cats', 'dogs', 'parrots'];

const header = new Headers({
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*'
});

const statUrl = new URL(mainUrl + 'stats');

function runEventSource() {
  const ES = new EventSource(statUrl, header);

  ES.onmessage = message => {
    getRequestHandler(message.data);
  }

  ES.onerror = error => {
    ES.readyState ? $('.message').text("Ошибка сервера...") : null;
  }
}

function getRequestHandler(msgdata){
  let vote_data = JSON.parse(msgdata);

  let total_voices = 0;
  for (key in vote_data)
    total_voices +=  vote_data[key];

  for (key in vote_data)
  {
    let key_percent = (vote_data[key] * 100 / total_voices).toFixed();
    $('#progressbar-' + key).val(key_percent);
    let keyrus = "";
    if (key === animal_array[0])
      keyrus = "Кошки";
    else if (key === animal_array[1])
      keyrus = "Собаки";
    else if (key === animal_array[2])
      keyrus = "Попугаи";
    let voices = getRussian(vote_data[key]);
    $('.progress-' + key).text(keyrus + " : " + voices + " : " + key_percent + " %");
  }
}

function getRussian(number){
  let last_digit = number % 10;
  let last_two = number % 100;
  let ending = "";
  if ((last_digit == 1) && (last_two != 11))
    ending = "голос";
  else if (([2, 3, 4].indexOf(last_digit) !== -1) &&
        ([12, 13, 14].indexOf(last_two) === -1))
    ending = "голоса";
  else
    ending = "голосов";
  return String(number) + " " + ending;
}

function postRequest(value){
  const xhr = new XMLHttpRequest();
  let animarUrl = new URL(mainUrl + animal_array[value]);
  xhr.open("POST", animarUrl, true);
  xhr.send();
}

function getRequest(){
  const xhr = new XMLHttpRequest();
  xhr.open("GET", statUrl, false);
  xhr.send();
  if (xhr.status != 200)
    $('.message').text('Ошибка ' + xhr.status + ': ' + xhr.statusText);
  else
    getRequestHandler('{' + xhr.responseText.split('{')[1]);
}

const prgBar1 = '<progress id="progressbar-';
const prgBar2 = '" value="0" max="100"></progress>';
const prgBar3 = '<div class="progress-';
const prgBar4 = ' "></div>';

function showVotingResults(value){
  $('.title').html("Результаты голосования");
  let html_text = '';
  for (item in animal_array)
    html_text += prgBar1 + animal_array[item] +
    prgBar2 + prgBar3 + animal_array[item] + prgBar4;
  $('.wrapper').html(html_text);
  $('#progressbar-' + animal_array[value]).class('progressbar');
  getRequest();
  runEventSource();
}

function clearMessage(){
  $('.message').text("");
}

function clickHandler(value){
  postRequest(value);
  setTimeout(showVotingResults, 1000, value)
}

$('#button-cats').click(() => {
  clickHandler(0);
});

$('#button-dogs').click(() => {
  clickHandler(1);
});

$('#button-parrots').click(() => {
  clickHandler(2);
});