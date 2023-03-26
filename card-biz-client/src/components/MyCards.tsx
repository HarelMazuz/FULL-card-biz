import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../App";
import Card from "../interfaces/Card";
import { getCardsByUserId } from "../services/CardService";
import DeleteCardModal from "./DeleteCardModal";
import EditCardModal from "./EditCardModal";

interface MyCardsProps {}
export let ModalId = createContext<any>({});
const MyCards: FunctionComponent<MyCardsProps> = () => {
  let navigate = useNavigate();
  let [editModalShow, setEditModalShow] = useState<boolean>(false);
  let [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  ////////
  let [refresh, setRefresh] = useState<boolean>(false);
  let handleRefresh = () => {
    setRefresh(!refresh);
  };
  ///////
  let [modalId, setModalId] = useState<number>(0);
  let [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    getCardsByUserId()
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  return (
    <>
      <h1 className="text-center my-4">MY CARDS</h1>

      {cards.length ? (
        <>
          <div className="alert alert-info my-4 w-50 mx-auto " role="alert">
            Hello! you are the only one who have permission to see this page and
            edit your cards.
          </div>
          <div className="container mx-auto row">
            {cards.map((card: Card) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3"
                key={card._id}
              >
                <div className="card business-card">
                  <div className="card-header business-card-header">
                    <h5 className="card-title m-0 fs-4">{card.name}</h5>
                  </div>
                  <div className="img-container">
                    <img
                      src={card.image}
                      className="card-img-top img-fluid"
                      alt="Company Logo"
                    />
                  </div>
                  <hr className="mt-0" />
                  <div className="card-body pt-0">
                    <div className="description">
                      <p className="card-text">{card.description}</p>
                    </div>
                    {card.description.length > 35 ? (
                      <>
                        <p className="text-primary long-des">
                          Hover for full description...
                        </p>
                        <hr />
                        <p className="mb-2"></p>
                      </>
                    ) : (
                      <>
                        <p style={{ height: "1.5rem" }}></p>
                        <hr />
                      </>
                    )}

                    <p className="card-text">
                      <i className="fa fa-map-marker-alt"></i> {card.address}
                    </p>
                    <p className="card-text">
                      <i className="fa fa-phone"></i> {card.phone}
                    </p>
                  </div>
                  <div className="card-footer d-flex">
                    <button
                      className="btn business-card-primary-action"
                      onClick={() => {
                        setModalId(card.cardId as number);
                        setEditModalShow(true);
                      }}
                    >
                      <i className="fa fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn business-card-secondary-action ms-auto"
                      onClick={() => {
                        setModalId(card.cardId as number);
                        setDeleteModalShow(true);
                      }}
                    >
                      <i className="fa fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-center fw-bold">You dont have cards yet :(</p>
          <button
            className="btn fs-5 btn-biz pe-3 "
            onClick={() => navigate("/addcard")}
          >
            Click Here to create a new one
          </button>
        </div>
      )}
      <ModalId.Provider
        value={{ modalId, setEditModalShow, setDeleteModalShow, handleRefresh }}
      >
        <EditCardModal show={editModalShow} />
        <DeleteCardModal show={deleteModalShow} />
      </ModalId.Provider>
    </>
  );
};

export default MyCards;
