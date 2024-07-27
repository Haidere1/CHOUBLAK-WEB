
import '../../CSS/ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-form">
        <h1>CONTACT US</h1>
        <p>DROP US A LINE AND WE'LL GET BACK TO YOU</p>
        <form>
          <div className="form-group">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email *" />
            <input type="text" placeholder="Subject" />
          </div>
          <textarea placeholder="Leave us a message..."></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="contact-info">
        <h1>WE'RE OPEN</h1>
        <p>Monday-Friday : 11am-10pm</p>
        <p>Saturday-Sunday: 11am-12am</p>
        <address>
          500 Terry Francois Street,<br />
          San Francisco, CA 94158
        </address>
        <p>Tel: 123-456-7890</p>
        <p>Email: info@mysite.com</p>
        <div className="social-media">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
