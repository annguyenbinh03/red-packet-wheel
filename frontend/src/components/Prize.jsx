import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import image20k from ".././assets/image/20k.webp";
import image10k from ".././assets/image/10k.webp";
import image5k from ".././assets/image/5k.webp";
import image2k from ".././assets/image/2k.webp";
import image1k from ".././assets/image/1k.webp";
import imageJack from ".././assets/image/jack.webp";
import imageCaiNit from ".././assets/image/caiNit.webp";

const overlay = {
  hide: {
    opacity: 0,
    backgroundColor: "unset",
  },
  visible: {
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    transition: {
      delay: 0.1,
      duration: 1,
      when: "beforeChildren",
    },
  },
};

const box = {
  hide: {
    y: "-100vh",
  },

  visible: {
    y: 0,
    transition: {
      delay: 0.1,
    },
  },
};

export default function Prize({
  back,
  prize,
  audioOf3,
  audiocainit,
  audiovit,
  audiovotay,
  audioJack,
  audiofail,
  audionhanhahanhphucdonxuanvuasang,
}) {

  useEffect(() => {
    let selectedAudio = null;

    switch (prize) {
      case "1.000":
        selectedAudio = audiofail;
        break;
      case "2.000":
        selectedAudio = audioOf3;
        break;
      case "5.000":
        selectedAudio = audiovit;
        break;
      case "10.000":
        selectedAudio = audiovotay;
        break;
      case "15.000":
        selectedAudio = audiovotay;
        break;
      case "20.000":
        selectedAudio = audionhanhahanhphucdonxuanvuasang;
        break;
      case "Jack":
        selectedAudio = audioJack;
        break;
      case "Còn cái nịt":
        selectedAudio = audiocainit;
        break;
      default:
        selectedAudio = null;
    }

    const prizeAudio = document.querySelector(".prize_audio");
    if (selectedAudio) {
      prizeAudio.src = selectedAudio;
      prizeAudio.play();
    }
    
  }, []);

  const goback = () => {
    back(false);
  };

  const showPrizeImage = (prize) => {
    if (prize === "10.000") {
      return (
        <div style={{ width: "100%" }}>
          <img style={{ width: "100%" }} src={image10k} />
        </div>
      );
    } else if (prize === "5.000") {
      return (
        <div style={{ width: "100%" }}>
          <img style={{ width: "100%" }} src={image5k} />
        </div>
      );
    } else if (prize === "1.000") {
      return (
        <div style={{ width: "100%" }}>
          <img style={{ width: "100%" }} src={image1k} />
        </div>
      );
    } else if (prize === "20.000") {
      return (
        <div style={{ width: "100%" }}>
          <img style={{ width: "100%" }} src={image20k} />
        </div>
      );
    } else if (prize === "2.000") {
      return (
        <div style={{ width: "100%" }}>
          <img style={{ width: "100%" }} src={image2k} />
        </div>
      );
    } else if (prize === "Jack") {
      return (
        <div style={{ width: "100%" }}>
          <img style={{ width: "100%" }} src={imageJack} />
        </div>
      );
    } else if (prize === "15.000") {
      return (
        <div style={{ width: "100%" }}>
          <img style={{ width: "100%" }} src={image10k} />
          <img style={{ width: "100%" }} src={image5k} />
        </div>
      );
    } else if (prize === "Còn cái nịt") {
      return (
        <div style={{ width: "100%" }}>
          <img style={{ width: "100%" }} src={imageCaiNit} />
        </div>
      );
    }
  };

  return (
    <>
      <audio className="prize_audio">
        {/* <source src={audio} /> */}
      </audio>
      <AnimatePresence>
        <motion.div
          className="prize"
          variants={overlay}
          initial="hide"
          animate="visible"
          exit="hide"
        >
          <motion.div className="prize_content" variants={box}>
            <div className="prize_content_image">
              <lord-icon
                src="https://cdn.lordicon.com/lupuorrc.json"
                trigger="loop"
                delay="2000"
                style={{ width: "100%", height: "100%" }}
              ></lord-icon>
            </div>
            <h2>Congratulations</h2>
            <p>Bạn nhận được một phần quà</p>
            {/* <p style={{ color: "red", fontWeight: "bold" }}>{prize}</p> */}
            {showPrizeImage(prize)}
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="prize_content_buttons"
            >
              <button style={{ maxWidth: "250px" }} onClick={goback}>
                Quay tiếp
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
