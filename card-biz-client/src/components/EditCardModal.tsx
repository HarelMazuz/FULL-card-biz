import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getCardById } from "../services/CardService";
import EditCard from "./EditCard";
import { ModalId } from "./MyCards";

interface EditCardModalProps {
  show: boolean;
}

const EditCardModal: FunctionComponent<EditCardModalProps> = ({ show }) => {
  let { setEditModalShow, modalId } = useContext(ModalId);
  let [cardName, setCardName] = useState<string>("");

  useEffect(() => {
    if (modalId !== 0) {
      getCardById(modalId)
        .then((res) => setCardName(res.data.name))
        .catch((err) => console.log(err));
    }
  }, [modalId]);
  return (
    <Modal
      show={show}
      onHide={() => setEditModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ backgroundColor: "#bf2051" }} closeButton>
        <h1 className="text-center text-light fs-4 mb-0">
          {" "}
          <i className="fa-solid fa-pen me-2"></i>
          {cardName} Card - Edit
        </h1>
      </Modal.Header>
      <Modal.Body>
        <EditCard />
      </Modal.Body>
    </Modal>
  );
};

export default EditCardModal;
