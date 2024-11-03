import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/favicon.ico`} alt="" />
      </Link>
      <header>
        <h2>Станислав Миронов</h2>
        <p>
          <a href="mailto:fazziclay@gmail.com">fazziclay@gmail.com</a>
        </p>
      </header>
    </section>

    {/* <section className="blurb"> */}
    {/*   <h2>Обо Мне</h2> */}
    {/*   <p> */}
    {/*     Привет, я Станислав{' '} */}
    {/*     <a href="https://github.com/FazziCLAY">Java-Developer</a>, весёлый человек, */}
    {/*     и{' '}игрок в Minecraft. */}
    {/*   </p> */}
    {/*   <ul className="actions"> */}
    {/*     <li> */}
    {/*       {!window.location.pathname.includes('/resume') ? ( */}
    {/*         <Link to="/resume" className="button"> */}
    {/*           Мои навыки */}
    {/*         </Link> */}
    {/*       ) : ( */}
    {/*         <Link to="/about" className="button"> */}
    {/*           Обо мне */}
    {/*         </Link> */}
    {/*       )} */}
    {/*     </li> */}
    {/*   </ul> */}
    {/* </section> */}

    <section id="footer">
      <ContactIcons />
    </section>
  </section>
);

export default SideBar;
