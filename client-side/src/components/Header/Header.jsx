import React, { useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import {
  AiFillPhone,
  AiOutlineLogin,
  AiOutlineUser,
  AiFillCar,
  AiOutlineFieldTime,
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineLogout,
} from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import Carslogo from "../../assets/images/sport-car.png";
import Carlogo from "../../assets/images/car.png";
import "../../styles/header.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tutors",
    display: "Find Tutors",
  },
  {
    path: "/cars",
    display: "Rent Cars",
  },
  {
    path: "/blogs",
    display: "Our Blog",
  },
  {
    path: "/pricing",
    display: "Pricing Plans",
  },
  {
    path: "/about",
    display: "About Us",
  },
  {
    path: "/earn-with-us",
    display: "Earn with Us",
  },
  {
    path: "/join-us",
    display: "Join Our Team",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Header = ({ signed, id }) => {
  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const handleClick = (path) => {
    window.location.pathname = path;
  };

  return (
    <header className="header">
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="header__top__left">
                <span>Need Help ?</span>
                <span className="header__top__help">
                  <AiFillPhone size={20} />
                  <a href="tel:+201003980916">+91 93854 21977</a>
                </span>
                <span className="header__top__help">
                  <HiOutlineLocationMarker size={20} />
                  <a
                    href="https://www.google.com/maps/@11.034646,76.972345,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map
                  </a>
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              {!signed ? (
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                  <Link
                    onClick={() => handleClick("signin")}
                    className="d-flex align-items-center gap-1"
                  >
                    <AiOutlineLogin color="white" size={21} />
                    <span>Login</span>
                  </Link>
                  <Link
                    onClick={() => handleClick("/signup")}
                    className="d-flex align-items-center gap-1"
                  >
                    <AiOutlineUser color="white" size={21} />
                    <span>Register</span>
                  </Link>
                </div>
              ) : (
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                  <Link
                    onClick={() => handleClick(`profile/${id}`)}
                    className="d-flex align-items-center gap-1"
                  >
                    <AiOutlineUser color="white" size={21} />
                    <span>Profile</span>
                  </Link>
                  <Link
                    onClick={() => handleClick("signin")}
                    className="d-flex align-items-center gap-1"
                  >
                    <AiOutlineLogout color="white" size={21} />
                    <span>Logout</span>
                  </Link>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="mobile-logo">
        <img src={Carlogo} alt="logo" width={50} /> VeloRent
      </div>

      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-2">
                    <img src={Carlogo} width={50} alt="carlogo" />
                    <span>VeloRent</span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <HiOutlineLocationMarker size={35} color="#000d6b" />
                <div className="header__location__content">
                  <h4 className="fw-bold">Explore India</h4>
                  <h6 className="text-muted">Tamil Nadu, Salem</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <AiOutlineFieldTime size={35} color="#000d6b" />
                <div className="header__location__content">
                  <h4 className="fw-bold">Working Hours</h4>
                  <h6 className="text-muted">Monday to Sunday, 4am - 10pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <AiFillPhone size={18} />
                  <a href="tel:+201003980916">Request a call</a>
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <AiOutlineMenu
              size={25}
              color="#ffff"
              className="mobile__menu"
              onClick={toggleMenu}
            />

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              {id ? (
                <div className="menu">
                  {navLinks.map((link, index) => (
                    <NavLink
                      to={`${link.path}/${id}`}
                      key={index}
                      className={(navClass) =>
                        navClass.isActive
                          ? "nav__active nav__item"
                          : "nav__item"
                      }
                    >
                      {link.display}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <div className="menu">
                  {navLinks.map((link, index) => (
                    <NavLink
                      to={link.path}
                      key={index}
                      className={(navClass) =>
                        navClass.isActive
                          ? "nav__active nav__item"
                          : "nav__item"
                      }
                    >
                      {link.display}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <AiOutlineSearch size={25} className="search__icon" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
