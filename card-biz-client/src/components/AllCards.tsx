import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getAllCards } from "../services/CardService";

interface AllCardsProps {}

const AllCards: FunctionComponent<AllCardsProps> = () => {
  let [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    getAllCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h1 className="text-center my-4">ALL CARDS</h1>
      {cards.length ? (
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center fs-4 fw-bold">No Cards Here :(</p>
      )}
    </>
  );
};

export default AllCards;
