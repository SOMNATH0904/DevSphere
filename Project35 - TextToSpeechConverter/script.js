let speech= new SpeechSynthesisUtterance();
let voices = [];
let voicesel = document.querySelector("#tyvoice");
  window.speechSynthesis.onvoiceschanged = () =>{
  voices = window.speechSynthesis.getVoices();
  voicesel.innerHTML = "";
  voices.forEach((voice,i) => {
      let option = document.createElement('option');
      option.value = i;
      option.textContent = `${voice.name}(${voice.lang})`;
      voicesel.appendChild(option);
  });
};
  document.querySelector("#voice").addEventListener("click",() => {
      speech.text = document.querySelector("#textarea").value;
      let selectedVoice = voices[voicesel.value];
      speech.voice = selectedVoice;
      window.speechSynthesis.speak(speech);
 });   