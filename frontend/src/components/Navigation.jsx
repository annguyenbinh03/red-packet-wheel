import React, { Suspense, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "./Loading";
import useAuth from "../hooks/useAuth";

import { getFullName } from "../services/user";

const navContainer = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      when: "beforeChildren",
    },
  },
};

const h1Motion = {
  hide: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      delay: 0.5,
    },
  },
};

const svgMotion = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const logoMotion = {
  hide: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
    },
  },
};

export default function Navigation() {
  const [name, setName] = useState("");

  const { auth } = useAuth();
  const fetchFullName = async () => {
    try {
      const response = await getFullName(auth.storagedToken);
      setName(response.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFullName();
  }, []);

  return (
    <div className="nav">
      <motion.div
        className="nav_container"
        variants={navContainer}
        initial="hide"
        animate="visible"
      >
        <div className="nav_container_logo">
          <Link to="/">Xin chào {name} </Link>
        </div>
      </motion.div>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
