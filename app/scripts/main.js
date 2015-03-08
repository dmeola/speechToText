/* jshint devel:true */
var speech = {history:''};


speech.record = function(words){
	$(document).trigger('recording', function(){
		console.log('recording now');
	});
	speech.history += words;
	$('textarea').html(speech.history);
}

speech.play = function(){
	return speech.history;
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


// new instance of speech recognition
var recognition = new webkitSpeechRecognition();
// set params
recognition.continuous = true;
recognition.interimResults = false;
recognition.start();

speech.recognition = recognition.onresult = function(event){
  // delve into words detected results & get the latest
  // total results detected
  var resultsLength = event.results.length -1 ;
  // get length of latest results
  var ArrayLength = event.results[resultsLength].length -1;
  // get last word detected
  var saidWord = event.results[resultsLength][ArrayLength].transcript;

  speech.record(saidWord);
}

speech.init = function(){
	//speech.speak();
	//speech.recognition();
	$('.clear').on('click', function(){$('textarea').html('')});
	$(document).on('recording', speech.speak(speech.play()));
}

$(document).ready(function(){
	speech.init();
})