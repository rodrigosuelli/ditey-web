export default function speak(params) {
  const { voices, voice, speed, activeText, onChangeSpeakAction } = params;

  let myTimeout;

  function myTimer() {
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
    myTimeout = setTimeout(myTimer, 10000);
  }

  myTimeout = setTimeout(myTimer, 10000);

  const utt = new SpeechSynthesisUtterance(activeText);
  utt.volume = 1;
  utt.rate = speed;
  utt.lang = 'pt-BR';
  if (voice !== '') {
    utt.voice = voices.filter((item) => item.name === voice)[0];
  }

  utt.onend = () => {
    clearTimeout(myTimeout);
    window.speechSynthesis.cancel();
    onChangeSpeakAction('Falar');
  };

  utt.onpause = () => {
    clearTimeout(myTimeout);
  };

  utt.onresume = () => {
    myTimeout = setTimeout(myTimer, 10000);
  };

  window.speechSynthesis.speak(utt);
  onChangeSpeakAction('Pausar');
}
