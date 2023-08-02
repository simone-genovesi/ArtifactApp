import logo from "./logo.svg";
import "./styles.css";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const lastScrollTop = useRef(0);

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        const { scrollY } = window;
        if (scrollY > lastScrollTop.current) {
          // downward scroll
          setIsNavbarVisible(false);
        } else if (scrollY < lastScrollTop.current) {
          // upward scroll
          setIsNavbarVisible(true);
        } // else was horizontal scroll
        lastScrollTop.current = scrollY <= 0 ? 0 : scrollY;
      },
      { passive: true }
    );
  }, []);

  return (
    <>
      <nav className={`${isNavbarVisible ? "visible" : ""}`}>
      <img src={logo} />
        <div className="nav-items">
          <a href="#">Portfolio</a>
          <a href="#">Skills</a>
          <a href="#">About</a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;