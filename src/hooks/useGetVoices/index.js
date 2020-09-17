import { useEffect, useState } from 'react';

export default function useGetVoices() {
  const [voices, setVoices] = useState([]);

  function getVoices() {
    return new Promise((resolve, reject) => {
      let voiceArr = speechSynthesis.getVoices();
      if (voiceArr.length) {
        resolve(voiceArr);
        return;
      }
      speechSynthesis.onvoiceschanged = () => {
        voiceArr = speechSynthesis.getVoices();
        resolve(voiceArr);
      };
    });
  }

  useEffect(() => {
    async function filterVoicesLang(lang) {
      setVoices(
        (await getVoices()).filter((item) => {
          return item.lang === lang;
        })
      );
    }

    filterVoicesLang('pt-BR');
  }, []);

  return voices;
}
