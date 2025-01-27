import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import useAuth from "../hooks/useAuth";

import { createUser, getUsers } from "../services/user";
import { Bounce, toast } from "react-toastify";

const Admin = () => {
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [spinCount, setSpinCount] = useState(3);
  const [image, setImage] = useState(
    "https://res.cloudinary.com/dkxnaypwm/image/upload/v1737970950/default_fe6vaf.jpg"
  );

  const { auth } = useAuth();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(auth.storagedToken);
      console.log(response);
      setUsers(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [showCopyLink, setShowCopyLink] = useState(false);
  const [clipBoardLink, setClipBoardLink] = useState("");
  const handleCloseCopyLink = () => setShowCopyLink(false);
  const handleShowCopyLink = () => setShowCopyLink(true);

  const handleCreateUser = async () => {
    try {
      const response = await createUser(auth.storagedToken, username, password, fullName,spinCount, image);
      if(response.code === 1000){
        toast('tạo thành công', {
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
      } else{
        toast.error('tạo thất bại', {
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
    } finally {
      setShow(false);
    }
  };

  const handleReload = () =>{
    fetchUsers();
  }

  const handleClickCopyClipBoard = (link) =>{
    setClipBoardLink(link);
    handleShowCopyLink()
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div>
            <button type="button" className="btn btn-primary" onClick={handleShow}>
              Create User
            </button>
            <button type="button" className="btn btn-warning" onClick={handleReload}>
              Reload
            </button>
          </div>
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">username</th>
                <th scope="col">fullName</th>
                <th scope="col">spinCount</th>
                <th scope="col">isSubmit</th>
                <th scope="col">isReceived</th>
                <th scope="col">isDeleted</th>
                <th scope="col">Get Link</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 &&
                users.map((item, index) => {
                    return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.username}</td>
                    <td>{item.fullName}</td>
                    <td>{item.spinCount}</td>
                    <td>{item.isSubmit ? "true" : ""}</td>
                    <td>{item.isReceived ? "true" : "" }</td>
                    <td>{item.isDeleted ? "true" : ""}</td>
                    <td><button type="button" className="btn btn-primary" onClick={
                        () => 
                        handleClickCopyClipBoard( "http://192.168.1.193/login?username="+ item.username + "&password=" + item.unPass)}>
                            Get Link
                            </button></td>
                  </tr>)
                })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Spin Count</Form.Label>
              <Form.Control
                onChange={(e) => setSpinCount(e.target.value)}
                value={spinCount}
                type="number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Image Link</Form.Label>
              <Form.Control
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showCopyLink}
        onHide={handleCloseCopyLink}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                {clipBoardLink}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCopyLink}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseCopyLink}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Admin;
