import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import image20k from ".././assets/image/20k.jpg";
import image10k from ".././assets/image/10k.jpg";
import image5k from ".././assets/image/5k.jpg";
import image2k from ".././assets/image/2k.jpg";
import image1k from ".././assets/image/1k.jpg";
import imageJack from ".././assets/image/jack.jpg";
import imageCaiNit from ".././assets/image/caiNit.png";

import audioOf3 from "../assets/audio/a3.mp3";
import audioxoso from "../assets/audio/xoso.mp3";
import audiocainit from "../assets/audio/cainit.mp3";
import audiovit from "../assets/audio/vit.mp3";
import audiovotay from "../assets/audio/votay.mp3";
import audioJack from "../assets/audio/jack.mp3";
import audioditmecuocdoi from "../assets/audio/ditmecuocdoi.mp3"
import audionhanhahanhphucdonxuanvuasang from "../assets/audio/nhanhahanhphucdonxuanvuasang.mp3"

const overlay = {
  hide: {
    opacity: 0,
    backgroundColor: "unset",
  },
  visible: {
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    transtion: {
      delay: 0.5,
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
    transtion: {
      delay: 1,
    },
  },
};

export default function Prize({ back, prize }) {
  const [audio, setAudio] = useState();

  let selectedAudio;
  useEffect(() => {
    switch (prize) {
      case "1.000":
        selectedAudio = audioditmecuocdoi;
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
        selectedAudio = null; // Không phát nhạc nếu không khớp prize nào
    }

    if (selectedAudio) {
      setAudio(selectedAudio); // Cập nhật audio state
      if (ref.current) {
        ref.current.load();
        ref.current.play();
      }
    }
  }, [prize]);


  const ref = useRef();

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
      <audio className="game_audio" ref={ref}>
        <source src={audio} type="audio/mp3" />
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
            <div style={{display:"flex", justifyContent:"center"}} className="prize_content_buttons">
              <button style={{maxWidth:"250px"}} onClick={goback}>Quay tiếp</button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
