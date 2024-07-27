
import '../../CSS/nav2.css';


const Navbar=()=>
    {
        return(
            <div>
<header>
  <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
    <div className="container-fluid">
      <a className="navbar-brand" href="#!">CraftY</a>
      <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <i className="fas fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#!">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">Attractions</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">Opinions</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">Contact</a>
          </li>
        </ul>
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item me-3 me-lg-0">
            <a className="nav-link" href="#!">
              <i className="fas fa-shopping-cart"></i>
            </a>
          </li>
          <li className="nav-item me-3 me-lg-0">
            <a className="nav-link" href="#!">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li className="nav-item me-3 me-lg-0">
            <a className="nav-link" href="#!">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  

  
  <section>
    <div id="intro" className="bg-image" style={{
        backgroundImage:"https://mdbootstrap.com/img/Photos/new-templates/craftsman/img(1).jpg",height: '100vh'
    }}>
      <div className="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row align-items-center">
            <div className="col-12">
              <h1 className="mb-0 text-white display-1">Studio</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
 
</header>

 <main>
   <div className="container my-5 py-5"></div>
</main>
</div>
        );
    }
export default Navbar;