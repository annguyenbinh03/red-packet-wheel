import React, { useState, useEffect } from "react";

// import react-router-dom

import { useLocation, Link, useNavigate } from "react-router-dom";
// import bg image

import bgImage from "../assets/image/bg.webp";

// import motion

import { motion } from "framer-motion";

// import component thanks
import Thanks from "../components/Thanks";

// import axios
import axios from "axios";

import { getFullName, saveBankInfo } from "../services/user";
import {getLeaderboards} from "../services/leaderboard"
import useAuth from "../hooks/useAuth";
import { Bounce, toast } from "react-toastify";

// setting motion container and child
const boxForm = {
  hide: {
    x: "-100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};

const boxWinner = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 2,
    },
  },
};

export default function Infomation() {
  // using state and navigate
  const navigate = useNavigate();

  // state component

  const [dataPrize, setDataPrize] = useState([]);
  const [showThanks, setShowThanks] = useState(false);
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [error, setError] = useState("");

  const { auth } = useAuth();

  useEffect(() => {
    fetchFullName();
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    try {
      const response = await getLeaderboards(auth.storagedToken);
      setDataPrize(response.result);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFullName = async () => {
    try {
      const response = await getFullName(auth.storagedToken);
      setName(response.result);
    } catch (e) {
      console.log(e);
    }
  };

  // handle submit form

  const submit = async () => {
    if(accountNumber === ""){
      toast.error('Số tài khoản nhận thưởng không được để trống', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        return;
    }

    if(paymentMethod === null || paymentMethod === ""){
      toast.error('Phương thức thanh toán không được để trống', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        return;
    }

    if(paymentMethod === "banking" && bank === "" ){
      toast.error('Tên ngân hàng không được bỏ trống', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        return;
    }

    try {
      const response = await saveBankInfo(auth.storagedToken, paymentMethod, bank, accountNumber);
      setName(response.result);
      setShowThanks(true);
    } catch (e) {
      console.log(e);
    }
  };

  // func close thanks component
  const closeThanks = (value) => {
    setShowThanks(value);
  };

  // func navigate winner page

  const seePrize = () => {
    navigate("/winner");
  };

  const handleChangeAccountNumber = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleChangeBank = (e) => {
    setBank(e.target.value);
  };

  return (
    // information container
    <div className="infomation">
      <img src={bgImage} className="infomation_image" />
      {/* content */}

      <div className="infomation_content">
        {/* form  */}
        <motion.div
          className="infomation_form"
          variants={boxForm}
          initial="hide"
          animate="visible"
        >
          {/* component show winner when width small. default display none */}
          <div className="infomation_form_winner">
            <h2>Danh sách người chiến thắng</h2>
            <button onClick={seePrize}>Xem</button>
          </div>

          {/* form content */}

          <h1>Thông tin nhận thưởng</h1>

          {/* form ground Name */}

          <div className="infomation_form_group">
            <label>Tên của bạn</label>
            <input style={{background:"#c8c8c8", color:"white"}} placeholder="ex: Tuấn" name="name" value={name} disabled />
          </div>
          {/* form ground sex */}

          <div className="infomation_form_group_sex">
            <label>Nhận thưởng qua</label>
            <select
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
              name="sex"
            >
              <option value="momo">Momo</option>
              <option value="banking">Ngân hàng</option>
            </select>
          </div>

          {/* form ground number momo */}

          {paymentMethod === "momo" ? (
            <div className="infomation_form_group">
              <label>Số tài khoản Momo của bạn</label>
              <input
                placeholder="123483924"
                type="tel"
                name="sotaikhoan"
                onChange={handleChangeAccountNumber}
                value={accountNumber}
              />
            </div>
          ) : (
            <div>
              <div
                className="infomation_form_group"
                style={{ marginBottom: "10px" }}
              >
                <label>Tên ngân hàng</label>
                <input
                  placeholder="ex: Agribank"
                  name="bank"
                  onChange={handleChangeBank}
                  value={bank}
                />
              </div>
              <div className="infomation_form_group">
                <label>Số tài khoản ngân hàng của bạn</label>
                <input
                  placeholder="123483924"
                  type="tel"
                  name="sotaikhoan"
                  onChange={handleChangeAccountNumber}
                  value={accountNumber}
                />
              </div>
            </div>
          )}

          {/* error */}

          <span>{error}</span>

          {/* button submmit */}

          <button onClick={submit} className="infomation_form_submit">
            Nhận thưởng
          </button>
        </motion.div>

        {/* component winner  in width medium. default display false*/}

        {/* container winner  component*/}
        <motion.div
          className="infomation_winner_sm"
          variants={boxWinner}
          initial="hide"
          animate="visible"
        >
          {/* context */}

          <h1>Danh sách trúng thưởng</h1>
          <button onClick={seePrize}>Xem</button>
        </motion.div>

        {/* component winner  in width large. default display true*/}

        <motion.div
          className="infomation_winner"
          variants={boxWinner}
          initial="hide"
          animate="visible"
        >
          {/* content */}

          <h1>Winner</h1>

          {/* tags */}

          <div className="infomation_winner_tags">
            <p>No.</p>
            <p>Tên</p>
            <p>Phần thưởng</p>
          </div>

          {/* render data with length 5 */}

          {dataPrize
            .filter((item, index) => index < 5)
            .map((item, index) => (
              <div className="infomation_winner_user" key={item.id}>
                <p>{index + 1}</p>
                <p>
                  <img src={item.image} width={"50px"} style={{marginRight:"5px", borderRadius:"50%"}}/>
                  {item.fullName}
                  </p>
                {/* <p>{item.fullName}</p> */}
                <p>{item.totalAmount}</p>
              </div>
            ))}
          <Link className="infomation_winner_all" to="/winner">
            Xem tất cả
          </Link>
        </motion.div>
      </div>

      {/* when submit form => shown thanks component */}

      {showThanks && <Thanks close={closeThanks} />}
    </div>
  );
}
