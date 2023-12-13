import { Col, Form } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { uploadUserImg } from "../redux/action/UserAction";
import { CloudUpload } from "react-bootstrap-icons";

const InserimentoGenerico = ({
  nome,
  setNome,
  marca,
  setMarca,
  prezzo,
  setPrezzo,
  data_rilascio,
  setData_rilascio,
  descrizione,
  setDescrizione,
  image,
  setImage,
}) => {
  const cambiaImg = (file) => {
    setImage(file);
  };
  return (
    <>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome"
            defaultValue={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Marca"
            defaultValue={marca}
            onChange={(e) => {
              setMarca(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Prezzo</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Prezzo"
            defaultValue={prezzo}
            onChange={(e) => {
              setPrezzo(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Data di rilascio</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="data"
            defaultValue={data_rilascio}
            onChange={(e) => {
              setData_rilascio(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            required
            as="textarea"
            type="text"
            placeholder="descrizione"
            defaultValue={descrizione}
            onChange={(e) => {
              setDescrizione(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="d-flex justify-content-center align-items-start">
          <div className="dropZoneModale2">
            <Dropzone>
              {({ getRootProps, getInputProps, acceptedFiles }) => (
                <>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} id="dropZoneModale" />
                    <p className="pDropZone">
                      {acceptedFiles[0] ? acceptedFiles[0].path : <CloudUpload className="fs-1" />}
                    </p>
                    <p className="pDropZone">{acceptedFiles[0] ? "" : "Trascina un'immagine qui"}</p>
                    {setImage(acceptedFiles[0])}
                  </div>
                </>
              )}
            </Dropzone>
          </div>
        </Form.Group>
      </Col>
    </>
  );
};

export default InserimentoGenerico;
