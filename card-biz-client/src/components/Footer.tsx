import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <div className="footer">
        <p className="footer-title mb-1">CARD-BIZ</p>
        <p className="copyright">&copy; Harel Mazuz 2023</p>
      </div>
    </>
  );
};

export default Footer;
