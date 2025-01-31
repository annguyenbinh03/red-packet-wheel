import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import useAuth from "../hooks/useAuth";
import { saveHistory } from "../services/history";
import { getSpinCount } from "../services/user";
import formatVND from "../utils/formatVND"
// import WheelComponent from "react-wheel-of-prizes";

// import "react-wheel-of-prizes/dist/index.css";
import { Wheel } from "react-custom-roulette";

// import audio
import audioxoso from "../assets/audio/xoso.mp3";
import Prize from "../components/Prize";
import Loading from "../components/Loading";

const buttonMotion = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgba(255,255,255)",
    boxShadow: "0px 0px 8px rgba(255,255,255)",
    transition: {
      yoyo: Infinity,
      duration: 0.3,
    },
  },
};

const containerMotion = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      when: "beforeChildren",
    },
  },
};

export default function Game() {
  // hex color for lucky wheel game

  // [#62c050,#699ee5,#fb8e42,#e83d45]

  // using ref react
  const ref = useRef();

  // data game lucky wheel

  const data = [
    {
      option: "10.000",
      style: {
        backgroundColor: "#62c050",
        textColor: "white",
      },
    },
    {
      option: "5.000",
      style: { backgroundColor: "#699ee5", textColor: "white" }, //1
    },
    {
      option: "1.000",
      style: { backgroundColor: "#fb8e42", textColor: "white" }, //2
    },
    {
      option: "20.000",
      style: { backgroundColor: "#e83d45", textColor: "white" }, //3
    },
    {
      option: "2.000",
      style: { backgroundColor: "#62c050", textColor: "white" }, //4
    },
    {
      option: "Jack",
      style: { backgroundColor: "#699ee5", textColor: "white" }, //5
    },
    {
      option: "15.000",
      style: { backgroundColor: "#fb8e42", textColor: "white" }, //6
    },
    {
      option: "Còn cái nịt",
      style: { backgroundColor: "#e83d45", textColor: "white" }, //7
    },
  ];

  const { auth, loading } = useAuth();
  // state component
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [audio, setAudio] = useState();
  const [showPrize, setShowPrize] = useState("");
  const [modalPrize, setModalPrize] = useState(false);

  const [spinCount, setSpinCount] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);
  const [isSubmit, setIsSubmit] = useState(true);
  // logic
  /**
     
    when click spin button
      1. random audio 
      2. update audio 
      3. when scroll wheel end => audio is stopped and display modal prize 
     */

  // func random audio

  useEffect(() => {
    fetchSpinCount();
  }, []);

  const fetchSpinCount = async () => {
    try {
      const response = await getSpinCount(auth.storagedToken);
      setSpinCount(response.result.spin);
      setTotalPrize(response.result.money);
      setIsSubmit(response.result.submitted);
    } catch (e) {
      console.log(e);
    }
  };

  const saveHistoryInfo = async (currentSpinCount, amount) => {
    try {
      await saveHistory(auth.storagedToken, currentSpinCount, amount);
    } catch (e) {
      console.log(e);
    }
  };

  const randomAudio = () => {
    const arrAudio = audioxoso;
    return arrAudio;
  };

  // function update audio

  const updateAudio = (source) => {
    setAudio(source);
    if (ref.current) {
      ref.current.pause();
      ref.current.load();
    }
  };

  const handleAddAmount = (currentSpinCount) => {
    if (prizeNumber === 0) {
      // 10000
      setTotalPrize(totalPrize + 10000);
      saveHistoryInfo(currentSpinCount, 10000);
    } else if (prizeNumber === 1) {
      // 5 000
      setTotalPrize(totalPrize + 5000);
      saveHistoryInfo(currentSpinCount, 5000);
    } else if (prizeNumber === 2) {
      // 1 000
      //updateAudio()
      setTotalPrize(totalPrize + 1000);
      saveHistoryInfo(currentSpinCount, 1000);
    } else if (prizeNumber === 3) {
      //20 000
      //updateAudio()
      setTotalPrize(totalPrize + 20000);
      saveHistoryInfo(currentSpinCount, 20000);
    } else if (prizeNumber === 4) {
      // 2 000
      //updateAudio()
      setTotalPrize(totalPrize + 2000);
      saveHistoryInfo(currentSpinCount, 2000);
    } else if (prizeNumber === 5) {
      // 3500
      //updateAudio()
      setTotalPrize(totalPrize + 3500);
      saveHistoryInfo(currentSpinCount, 3500);
    } else if (prizeNumber === 6) {
      // 15 000
      //updateAudio()
      setTotalPrize(totalPrize + 15000);
      saveHistoryInfo(currentSpinCount, 15000);
    } else if (prizeNumber === 7) {
      // 0
      //updateAudio()
      saveHistoryInfo(currentSpinCount, 0);
    }
  };

  // handle click spin button

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    updateAudio(randomAudio());
    ref.current.play();
    ref.current.volume = 0.5;
  };

  // handle spin stop

  const handleSpinStop = () => {
    setMustSpin(false);
    ref.current.pause();
    setModalPrize(true);

    setSpinCount((prevSpinCount) => {
      handleAddAmount(prevSpinCount); 
      return prevSpinCount - 1; 
    });

    setShowPrize(data[prizeNumber].option);
  };

  // func back when modal prize show
  const back = (value) => {
    setModalPrize(value);
  };

  const navigate = useNavigate();

  const goToInfomation = () => {
    navigate("/infomation");
  };

  const goToLeaderboard = () => {
    navigate("/winner");
  };

  if(loading){
    return <Loading/>
  }

  return (
    // container game page
    <motion.div
      className="game"
      variants={containerMotion}
      initial="hide"
      animate="visible"
    >
      <img
        src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/12/hinh-nen-powerpoint-tet-14-3.png"
        className="game_img"
      />{" "}
      {/*src={bgImage} */}
      {/* game audio */}
      <audio className="game_audio" ref={ref}>
        <source src={audio} type="audio/mp3" />
      </audio>
      {/* game content */}
      <div className="game_content">
        {/* lucky wheel */}

        {spinCount < 4 ? (
          <div
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <div className="game_spin_count">Số lượt quay: {spinCount}</div>
            <div className="game_total_prize">{formatVND(totalPrize)}</div>

            {spinCount > 0 ? (
              <>
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={data}
                  onStopSpinning={handleSpinStop}
                  outerBorderColor="black"
                  outerBorderWidth={4}
                  innerBorderColor="#4E5452"
                  innerBorderWidth={5}
                  radiusLineColor="#4E5452"
                  radiusLineWidth={1}
                />

                {/* lucky wheel spin */}
                <motion.button
                  variants={buttonMotion}
                  whileHover="hover"
                  className="game_content_spin"
                  onClick={handleSpinClick}
                >
                  Quay thưởng
                </motion.button>
              </>
            ) : (
                !isSubmit ? (
                  <div>
                  <motion.button
                    variants={buttonMotion}
                    whileHover="hover"
                    className="game_content_spin"
                    onClick={goToInfomation}
                  >
                    Nhận thưởng
                  </motion.button>
                </div>
                ) : (
                  <div>
                  <motion.button
                    variants={buttonMotion}
                    whileHover="hover"
                    className="game_content_spin"
                    onClick={goToLeaderboard}
                    style={{background:"yellow", color:"black"}}
                  >
                    Xem danh sách trúng thưởng
                  </motion.button>
                </div>
                )         
           
            )}
          </div>
        ) : (
          <div>Loading ....</div>
        )}
      </div>
      {/* when spin stop => show prize component */}
      {modalPrize && <Prize back={back} prize={showPrize} />}
    </motion.div>
  );
}
