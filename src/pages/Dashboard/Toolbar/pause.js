export default function pause(onChangeSpeakAction) {
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    onChangeSpeakAction('Pausar');
  }
  window.speechSynthesis.pause();
  onChangeSpeakAction('Retomar');
}
