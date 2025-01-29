import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getToken } from "../services/authentication";
import { jwtDecode } from "jwt-decode";

const Login = () => {

  const [error, setError] = useState("");

  const getRoles = (scopes) => {
    let roles = [];
    scopes.forEach((item) => {
      if (item.startsWith("ROLE_")) roles.push(item);
    });
    return roles;
  };

  const getAuthorities = (scopes) => {
    let authorities = [];
    scopes.forEach((item) => {
      if (!item.startsWith("ROLE_")) authorities.push(item);
    });
    return authorities;
  };

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const username = searchParams.get("nvme");
  const password = searchParams.get("deepseek");

  const handleLogin = async () => {
    try {
      const response = await getToken(username, password);
      const token = response.result.token;
      const decoded = jwtDecode(token);
      console.log(decoded);
      localStorage.setItem("luckyWheelToken", token);
      const scopeArray = decoded.scope.split(" ");
      const roles = getRoles(scopeArray);
      const authorities = getAuthorities(scopeArray);
      setAuth({ username, roles, authorities, storagedToken: token });
      if (roles.includes("ROLE_ADMIN")) navigate("/admin", { replace: true });
      else navigate("/", { replace: true });
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    console.log("Username:", username);
    console.log("Password:", password);
    handleLogin();
  }, []);

  if(error !== ""){
    return (
      <div style={{color:"black"}}>Lỗi rồi {username}, Lỗi rồi {password} </div>
    )
  } else {
    return (
    <Loading />
  );
  }


};

export default Login;
