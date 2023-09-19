"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [ourText, setOutText] = useState("");
  const [supported, setSupported] = useState(false);
  const text = new SpeechSynthesisUtterance();

  const speechHandler = () => {
    if (supported) {
      text.text = ourText;
      window.speechSynthesis.speak(text);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  function populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
      return;
    }

    const voices = speechSynthesis.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      document.getElementById("voiceSelect")?.appendChild(option);
      console.log(voices[i].name);
    }
  }

  populateVoiceList();
  if (
    typeof speechSynthesis !== "undefined" &&
    speechSynthesis.onvoiceschanged !== undefined
  ) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  useEffect(() => {
    if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
      setSupported(true);
      text.text = ourText;
      // Adjust pitch and rate for a nicer voice (you can experiment with different values)
      text.pitch = 1.0; // Range from 0 to 2
      text.rate = 1.0; // Range from 0.1 to 10

      const handleVoicesChanged = () => {
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find((voice) => voice.lang === "en-US");
        const Samantha = voices.find((voice) => voice.name === "Samantha");
        if (Samantha) {
          text.voice = Samantha;
          window.speechSynthesis.speak(text);
        }
      };

      // Add event listener for voiceschanged event
      window.speechSynthesis.addEventListener(
        "voiceschanged",
        handleVoicesChanged
      );

      // Clean up the event listener when the component unmounts
      return () => {
        window.speechSynthesis.removeEventListener(
          "voiceschanged",
          handleVoicesChanged
        );
      };
    } else {
      setSupported(false);
    }
  }, []);

  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col gap-6">
        <textarea
          className="w-full p-4 border-x-0 border-t-0 border-gray-300 shadow px-4 rounded-md align-top sm:text-sm"
          rows={8}
          placeholder="Enter text..."
          value={ourText}
          onChange={(e) => setOutText(e.target.value)}
        ></textarea>
        <select id="voiceSelect"></select>
        <div className="flex items-center justify-end gap-2 py-3">
          <button
            onClick={speechHandler}
            disabled={!supported}
            className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Speak
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
