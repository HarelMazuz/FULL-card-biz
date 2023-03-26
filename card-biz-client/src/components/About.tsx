import { FunctionComponent } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <h1 className="text-center my-4">ABOUT US</h1>
      <div className="container mx-auto div-mobile mb-5">
        <img
          src="https://newapi.axiomprint.com/uploads/1672866924803.jpg"
          className="img about-img rounded ms-md-4 order-2"
          alt="bussiness cards"
        />

        <p className="about-text order-1">
          Welcome to CARD-BIZ, your reliable source for custom business card
          design and creation. Our team of professional designers and branding
          experts are here to help you create a business card that truly
          represents your brand and leaves a lasting impression on your clients
          and customers.{" "}
        </p>
        <p className="about-text order-1">
          {" "}
          We understand that your business card is often the first point of
          contact with your clients, which is why we take the design process
          seriously. Our team works closely with you to understand your brand's
          vision and goals, and use that information to create a custom design
          that sets you apart from the competition.
        </p>

        <p className="about-text order-3">
          {" "}
          At CARD-BIZ, we use the latest design tools and techniques to ensure
          that your business card is not only eye-catching but also functional.
          Whether you're looking for a modern, minimalist design or something
          more traditional, our team has the skills and expertise to bring your
          vision to life.
        </p>

        <p className="about-text order-3">
          In addition to design, we also offer a comprehensive business card
          production service, ensuring that your cards are printed to the
          highest standards using high-quality materials. We work with a network
          of trusted printing partners to ensure that your cards are delivered
          on time, every time. We pride ourselves on delivering exceptional
          customer service and support, and are always here to answer any
          questions you may have. Let us help you create a business card that
          truly represents your brand and leaves a lasting impression on your
          clients. Contact us today to get started!
        </p>
      </div>
    </>
  );
};

export default About;
