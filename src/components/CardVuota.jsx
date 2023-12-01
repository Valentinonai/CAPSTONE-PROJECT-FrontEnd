import { Card, Placeholder } from "react-bootstrap";

const CardVuota = () => {
  return (
    <Card className="shadow">
      <Card.Img
        variant="top"
        src="https://res.cloudinary.com/dzr77mvcs/image/upload/v1699804334/uzqt1xnviwyjlcxqnqka.webp"
      />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
          <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={6} />
      </Card.Body>
    </Card>
  );
};

export default CardVuota;
