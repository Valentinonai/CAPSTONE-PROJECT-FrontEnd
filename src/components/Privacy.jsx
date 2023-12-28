import { Modal } from "react-bootstrap";

const Privacy = ({ lgShow, setLgShow }) => {
  return (
    <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          <p className="">Privacy Policy per Sito Web a Scopo Didattico e Dimostrativo</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Gentile Utente,</p>

        <p>
          Benvenuto su <strong>BuildMyPc</strong>, un sito web creato esclusivamente a scopo didattico e dimostrativo.
          Questo sito rappresenta l'esame finale di un corso di studi ed è stato pubblicato al solo scopo di illustrare
          le funzionalità sviluppate durante il corso.
        </p>

        <p>
          Prima di procedere con l'utilizzo del sito, ti invitiamo a leggere attentamente la seguente informativa sulla
          privacy. Utilizzando il sito, accetti le disposizioni descritte di seguito.
        </p>

        <h4>1. Raccolta di Informazioni</h4>

        <p>
          Per testare le funzionalità del sito, agli utenti è richiesto di inserire i seguenti dati a scopo
          dimostrativo:
        </p>

        <ul>
          <li>Nome</li>
          <li>Cognome</li>
          <li>Indirizzo email</li>
          <li>Password</li>
          <li>Immagini</li>
          <li>Indirizzo di spedizione</li>
          <li>Dati della carta di credito</li>
        </ul>

        <p style={{ fontWeight: "bold", fontSize: "20px" }}>
          Si sottolinea che i dati inseriti NON devono essere veritieri o corretti. L'inserimento di dati personali
          sensibili è a scopo dimostrativo e l'utente è invitato a fornire dati NON veritieri. <br /> Si declina ogni
          responsabilità sui dati inseriti.
        </p>

        <h4>2. Utilizzo dei Dati</h4>

        <p>
          I dati inseriti saranno utilizzati e conservati esclusivamente per testare le funzionalità del sito e non
          saranno conservati, elaborati o utilizzati per altri scopi.{" "}
          <span style={{ fontWeight: "bold" }}>Si declina ogni responsabilità sui dati inseriti</span>.
        </p>

        <h4>3. Responsabilità e Limitazioni</h4>

        <p>
          Il presente sito è creato esclusivamente a scopo didattico e dimostrativo. L'utente è consapevole che
          l'inserimento di dati personali, sensibili o finanziari reali{" "}
          <span style={{ fontWeight: "bold" }}>è FORTEMENTE SCONSIGLIATO e NON è necessario</span> per la navigazione o
          la comprensione delle funzionalità del sito.
        </p>

        <p>
          <strong>BuildMyPc</strong> declina ogni responsabilità per:
        </p>

        <ul>
          <li>Dati inseriti</li>
          <li>Utilizzo improprio dei dati inseriti dagli utenti.</li>
          <li>Eventuali danni o perdite dei dati inseriti a scopo dimostrativo.</li>
        </ul>

        <h4>4. Modifiche alla Privacy Policy</h4>

        <p>
          Il <strong>BuildMyPc</strong> si riserva il diritto di apportare modifiche a questa Privacy Policy in
          qualsiasi momento. Gli utenti saranno informati delle modifiche attraverso la pubblicazione della versione
          aggiornata sul sito.
        </p>

        <p>Grazie per la tua comprensione e collaborazione.</p>

        <p>Cordiali saluti,</p>

        <p>
          Il Team di <strong>BuildMyPc</strong>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default Privacy;
