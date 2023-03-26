import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteCard, getCardById } from "../services/CardService";
import { sucessMsg } from "../services/feedbacks";
import { ModalId } from "./MyCards";

interface DeleteCardModalProps {
  show: boolean;
}

const DeleteCardModal: FunctionComponent<DeleteCardModalProps> = ({ show }) => {
  let { modalId, setDeleteModalShow, handleRefresh } = useContext(ModalId);
  let [cardName, setCardName] = useState<string>("");
  //get the name of the card that the user wants to delete
  useEffect(() => {
    if (modalId != 0) {
      getCardById(modalId).then((res) => setCardName(res.data.name));
    }
  }, [modalId]);

  // function works by clicking delete button
  let handleDelete = () => {
    deleteCard(modalId)
      .then(() => {
        setDeleteModalShow(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal
      show={show}
      onHide={() => setDeleteModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{ backgroundColor: "#bf2051", color: "#fff" }}
        closeButton
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <i className="fa fa-trash me-2"></i>Delete Card
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fs-5">Are you sure you want to delete {cardName}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-danger"
          onClick={() => {
            handleDelete();
            handleRefresh();
            sucessMsg("Card have been deleted!");
          }}
        >
          Delete
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => setDeleteModalShow(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCardModal;
