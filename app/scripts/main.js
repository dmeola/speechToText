/*	Speech recognition experiment
*	@author: Daniel Meola
*	@description: listens to and displays dictation via microphone
*/

var speech = {history:''};
// new instance of speech recognition
var recognition = new webkitSpeechRecognition();
// set params
recognition.continuous = true;
recognition.interimResults = false;
recognition.start();


speech.record = function(words){
	speech.history += words;
	$('textarea').html(speech.history);
	$(document).trigger('recording');
}

speech.play = function(){
	return speech.history;
}

speech.clear = function(){
	speech.history = '';
	$(document).trigger('cleared');
}

//receive acknowledgement
speech.acknowledge = function(){
	speech.ignore();
	speech.speak('Roger that');
	setTimeout(function(){speech.listen()}, 2000);
}

speech.speak = function speak(textToSpeak) {
   // Create a new instance of SpeechSynthesisUtterance
   var newUtterance = new SpeechSynthesisUtterance();

   // Set the text
   newUtterance.text = textToSpeak;
   //newUtterance.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google UK English Male'; })[0];

   // Add this text to the utterance queue
   window.speechSynthesis.speak(newUtterance);
}

speech.result = function(event){
  // delve into words detected results & get the latest
  // total results detected
  var resultsLength = event.results.length -1 ;
  // get length of latest results
  var ArrayLength = event.results[resultsLength].length -1;
  // get last word detected
  var saidWord = event.results[resultsLength][ArrayLength].transcript;

  speech.record(saidWord);
}

//call this to start listening
speech.listen = function(){
	recognition.onresult = speech.result;
}

//call this in order to halt listening
speech.ignore = function(){
	recognition.onresult = '';
}

speech.init = function(){
	$('.clear').on('click', function(){speech.clear()});
	$(document).on('recording', function(){speech.acknowledge()});
	$(document).on('cleared', function(){$('textarea').val('')});
	speech.listen();
}

$(document).ready(function(){
	speech.init();
})