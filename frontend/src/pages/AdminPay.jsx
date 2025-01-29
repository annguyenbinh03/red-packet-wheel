import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";

import useAuth from "../hooks/useAuth";

import { getPaymentInfo, setReceived } from "../services/user";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminPay = () => {
  const [showCopyLink, setShowCopyLink] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const handleCloseCopyLink = () => setShowCopyLink(false);
  const handleShowCopyLink = (user) =>{
    setShowCopyLink(true);
    setSelectedUser(user);
  } 

  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPaymentInfo = async () => {
    try {
      const response = await getPaymentInfo(auth.storagedToken);
      console.log(response);
      setUsers(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

  const navigate = useNavigate();

  const handleToOverview = () => {
    navigate("/admin");
  };

  const handleReload = () => {
    fetchPaymentInfo();
  };

  const handleReceived = async (username) => {
    console.log(username);
    try {
      const response = await setReceived(auth.storagedToken, username);
      if (response.code === 1000) {
        toast("đánh dấu thành công", {
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
      } else {
        toast.error("đánh dấu thất bại", {
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
      }
    } catch (e) {
      console.log(e);
    }
  };

    const filteredUser = useMemo(() => {
      if (!searchTerm) return users; // Nếu không có searchTerm, trả về toàn bộ danh sách
      return users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [searchTerm, users]);

  return (
    <>
      <div className="container px-3">
        <div className="row px-3 mt-3">
          <div>
            <button
              type="button"
              className="btn btn-danger mx-2"
              onClick={handleToOverview}
            >
              To overview
            </button>
            <button
              type="button"
              className="btn btn-warning mx-2"
              onClick={handleReload}
            >
              Reload
            </button>
            <div>
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md w-full my-3"
            />
          </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">fullName</th>
                <th scope="col">isSubmit</th>
                <th scope="col">isReceived</th>
                <th scope="col">open link</th>
                <th scope="col">received</th>
              </tr>
            </thead>
            <tbody>
              {filteredUser?.length > 0 &&
                filteredUser.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.fullName}</td>
                      <td>{item.isSubmit ? "true" : ""}</td>
                      <td>{item.isReceived ? "true" : ""}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleShowCopyLink(item)}
                        >
                          Open
                        </button>
                      </td>
                      <td>
                        {!item.isReceived && (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleReceived(item.username)}
                          >
                            Received
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={showCopyLink}
        onHide={handleCloseCopyLink}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center fs-6">
            <div className="div-md-6">
              <div className="my-2">
                <span className="pe-5">Payment method:</span>
              </div>
              <div className="my-2">
                <span className="pe-5">bank:</span>
              </div>
              <div className="my-2">
                <span className="pe-5">Account number:</span>
              </div>
              <div className="my-2">
                <span className="pe-5">Amount:</span>
              </div>
            </div>
            <div className="div-md-6">
              <div className="my-2">
                {selectedUser?.paymentMethod ? selectedUser?.paymentMethod : ""}
              </div>
              <div className="my-2">
                {selectedUser?.bank ? selectedUser?.bank : "-"}
              </div>
              <div className="my-2">
                {selectedUser?.accountNumber ? selectedUser?.accountNumber : ""}
              </div>
              <div className="my-2">
                {selectedUser?.totalAmount ? selectedUser?.totalAmount : ""}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCopyLink}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminPay;
