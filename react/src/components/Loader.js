import React, { useEffect, useState } from "react";

const Loader = ({ text, isAnimated }) => {
  const [loadingText, setLoadingText] = useState(text || "Loading...");
  useEffect(() => {
    let loadingInterval;

    const textPipe = () => {
      if (loadingText && isAnimated) {
        let arrText = loadingText.split("");
        let count = -1;
        let newText = "";

        loadingInterval = setInterval(() => {
          count += 1;

          if (count >= arrText.length) {
            count = 0;
            newText = "";
          } else {
          }
          newText += arrText[count];
          setLoadingText(newText);
        }, 300);
      }
    };

    textPipe();
    return () => {
      if (loadingInterval) clearInterval(loadingInterval);
    };
  }, [loadingText, isAnimated]);

  return <div className="loading">{loadingText}</div>;
};

export default Loader;
