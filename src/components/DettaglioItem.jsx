import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isLoading } from "../redux/action/UserAction";
import { Button, Col, Image, Row, Spinner } from "react-bootstrap";
import Footer from "./Footer";

const DettaglioItem = () => {
  const param = useParams();
  const [item, setItem] = useState();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);
  const load = useSelector((state) => state.mainReducer.isLoading);

  const getSingleItem = async (id) => {
    try {
      dispatch(isLoading(true));
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items/${id}`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        setItem(data);
        dispatch(isLoading(false));
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSingleItem(param.item_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {load && (
        <div className="d-flex justify-content-center m-5">
          <Spinner animation="border" role="status" className="">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {item && (
        <div id="paginaDettaglio" className="mt-5 mx-3 mx-md-5 pt-5 px-3 px-md-5 pb-5">
          <p className="h1 mt-4">{item.nome}</p>
          <Row className="mt-5">
            <Col xs={12} md={5}>
              <div style={{ overflow: "hidden" }} className="rounded ">
                <Image src={item.immagineUrl} width={"100%"} />
              </div>
            </Col>
            <Col xs={12} md={7} className="mt-5 mt-md-0">
              <Row xs={1} sm={2} className="my-2 ">
                <Col>
                  <p> Nome:</p>
                </Col>
                <Col>
                  <p>{item.nome}</p>
                </Col>
              </Row>
              <Row xs={1} sm={2} className="my-2 ">
                <Col>
                  <p> Marca:</p>
                </Col>
                <Col>
                  <p>{item.marca}</p>
                </Col>
              </Row>
              <Row xs={1} sm={2} className="my-2 ">
                <Col>
                  <p> Descrizione:</p>
                </Col>
                <Col>
                  <p>{item.descrizione}</p>
                </Col>
              </Row>
              <Row xs={1} sm={2} className="my-2 ">
                <Col>
                  <p> Prezzo:</p>
                </Col>
                <Col>
                  <p>{item.prezzo}€</p>
                </Col>
              </Row>
              <Row xs={1} sm={2} className="my-2 ">
                <Col>
                  <p> Data di rilascio:</p>
                </Col>
                <Col>
                  <p>{item.data_di_rilascio}</p>
                </Col>
              </Row>
              <Row xs={1} sm={2} className="my-2 ">
                <Col>
                  <p> Stato:</p>
                </Col>
                <Col>{item.stato === "ATTIVO" ? <p>DISPONIBILE</p> : <p>FUORI PRODUZIONE</p>}</Col>
              </Row>
              <Row xs={1} sm={2} className="my-2 ">
                <Col>
                  <p> Categoria:</p>
                </Col>
                <Col>{item.categoria}</Col>
              </Row>
              {item.categoria !== "CASE" && item.categoria !== "ALIMENTATORE" && (
                <Row xs={1} sm={2} className="my-2 ">
                  <Col>
                    <p> Potenza di picco:</p>
                  </Col>
                  <Col>{item.potenza_di_picco}W</Col>
                </Row>
              )}
              {item.categoria === "SCHEDA_MADRE" && (
                <>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Formato:</p>
                    </Col>
                    <Col>{item.formato}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Chipset:</p>
                    </Col>
                    <Col>{item.chipset}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p>Sockeet:</p>
                    </Col>
                    <Col>{item.socket}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Tipo di memoria:</p>
                    </Col>
                    <Col>{item.tipo_di_memoria}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Memoria massima supportata:</p>
                    </Col>
                    <Col>{item.max_memory_size}Gb</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p>Wifi:</p>
                    </Col>
                    <Col>{item.has_wifi ? "true" : "false"}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Bluetooth:</p>
                    </Col>
                    <Col>{item.has_bluetooth ? "true" : "false"}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> numero porte USB:</p>
                    </Col>
                    <Col>{item.numero_porte_usb}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Numero PCIe:</p>
                    </Col>
                    <Col>{item.numero_pcie}</Col>
                  </Row>{" "}
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Supporto Nvme_M2:</p>
                    </Col>
                    <Col>{item.supporto_m2 ? "true" : "false"}</Col>
                  </Row>
                </>
              )}
              {item.categoria === "CPU" && (
                <>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Socket:</p>
                    </Col>
                    <Col>{item.socket}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Numero Core:</p>
                    </Col>
                    <Col>{item.numero_core}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Numero Threads:</p>
                    </Col>
                    <Col>{item.numero_threads}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Boost Clock:</p>
                    </Col>
                    <Col>{item.max_boost_clock}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Cache L2:</p>
                    </Col>
                    <Col>{item.cache_l2}Mb</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Cache L3:</p>
                    </Col>
                    <Col>{item.cache_l3}Mb</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Temperatura massima:</p>
                    </Col>
                    <Col>{item.max_temperatura}°</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Grafica integrata:</p>
                    </Col>
                    <Col>{item.grafica_integrata ? "true" : "false"}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Memoria di sistema:</p>
                    </Col>
                    <Col>{item.tipo_memoria_di_sistema}</Col>
                  </Row>
                </>
              )}
              {item.categoria === "RAM" && (
                <>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Tipo di memoria:</p>
                    </Col>
                    <Col>{item.tipo_di_memoria}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Velocità:</p>
                    </Col>
                    <Col>{item.velocità}MHz</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Dimensione:</p>
                    </Col>
                    <Col>{item.dimensione}Gb</Col>
                  </Row>
                </>
              )}
              {item.categoria === "CASE" && (
                <>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Formato:</p>
                    </Col>
                    <Col>{item.formato}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Numero ventole:</p>
                    </Col>
                    <Col>{item.num_ventole}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Dimensione ventole:</p>
                    </Col>
                    <Col>{item.dimensioneVentole}mm</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Larghezza:</p>
                    </Col>
                    <Col>{item.larghezza}mm</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Altezza:</p>
                    </Col>
                    <Col>{item.altezza}mm</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Lunghezza:</p>
                    </Col>
                    <Col>{item.profondità}mm</Col>
                  </Row>
                </>
              )}
              {item.categoria === "SCHEDA_GRAFICA" && (
                <>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Boost Clock:</p>
                    </Col>
                    <Col>{item.boost_clock}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Dimensione memoria:</p>
                    </Col>
                    <Col>{item.dimensione_memoria}Gb</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Larghezza:</p>
                    </Col>
                    <Col>{item.larghezza}mm</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Lunghezza:</p>
                    </Col>
                    <Col>{item.lunghezza}mm</Col>
                  </Row>
                </>
              )}
              {item.categoria === "ALIMENTATORE" && (
                <>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Potenza massima erogata:</p>
                    </Col>
                    <Col>{item.potenza_max_erogata}W</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Modulare:</p>
                    </Col>
                    <Col>{item.modulare ? "true" : "false"}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Peso:</p>
                    </Col>
                    <Col>{item.peso / 1000}Kg</Col>
                  </Row>
                </>
              )}
              {item.categoria === "HARD_DISK" && (
                <>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Nvme_M2:</p>
                    </Col>
                    <Col>{item.m2 ? "true" : "false"}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Capacità:</p>
                    </Col>
                    <Col>{item.capacità}</Col>
                  </Row>
                </>
              )}
              {item.categoria === "VENTOLE" && (
                <>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Velocità minima:</p>
                    </Col>
                    <Col>{item.rpm_min}RPM</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Velocità massima:</p>
                    </Col>
                    <Col>{item.rpm_max}RPM</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Pwm:</p>
                    </Col>
                    <Col>{item.pwm ? "true" : "false"}</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Dimensione:</p>
                    </Col>
                    <Col>{item.dimensione}mm</Col>
                  </Row>
                  <Row xs={1} sm={2} className="my-2 ">
                    <Col>
                      <p> Numero pezzi:</p>
                    </Col>
                    <Col>{item.pezzi_per_pacco}</Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="outline-secondary"
              onClick={() => {
                window.history.back();
              }}
            >
              Indietro
            </Button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default DettaglioItem;
