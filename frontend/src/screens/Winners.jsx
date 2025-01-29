import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import motion
import { motion, AnimatePresence } from "framer-motion";

// import bg image
import bgImage from "../assets/image/bg.webp";

// import componnets
import useAuth from "../hooks/useAuth";

import { getLeaderboards } from "../services/leaderboard";

import formatVND from "../utils/formatVND"

// set motion

const container = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      when: "beforeChildren",
    },
  },
};

const child = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

export default function Winners() {
  // state component
  const [dataUser, setDataUser] = useState([]);

  // call api get all prize

  const { auth } = useAuth();

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  // button more

  const fetchLeaderboards = async () => {
    try {
      const response = await getLeaderboards(auth.storagedToken);
      setDataUser(response.result);
    } catch (error) {
      console.log(error);
    }
  };
  // func close funny modal

  return (
    <AnimatePresence>
      {/* container component */}
      <motion.div
        className="winner"
        variants={container}
        initial="hide"
        animate="visible"
        exit="hide"
      >
        <img src={bgImage} className="winner_img" />
        {/* content */}

        <div className="container py-4 mt-5 rounded">
          <div className="winner_context">
            <h1
              className="fs-1"
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Danh sách trúng thưởng
            </h1>
            <table class="table mt-5 text-white">
              <thead className="text-center table-dark">
                <tr>
                  <th className="py-3 " scope="col">
                    #
                  </th>
                  <th className="py-3 " scope="col">
                    Tên
                  </th>
                  <th className="py-3 " scope="col">
                    Giải thưởng
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataUser?.map((item, index) => {
                  return (
                    <tr className="m-0">
                      <th
                        scope="row"
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        {index + 1}
                      </th>
                      <td>
                        <img
                          src={item.image}
                          width={"40px"}
                          style={{ marginRight: "10px", borderRadius: "50%" }}
                        />
                        {item.fullName}
                      </td>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        { formatVND(item.totalAmount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
