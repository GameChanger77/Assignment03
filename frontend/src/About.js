import { useState, useEffect } from "react";

import "./About.css";

const About = () => {
  return (
    <div>
      <main id="body">
        <div className="info">
          <label>
            <b>Course Name:</b>
          </label>
          <span>
            Com S 319 - Construction of User Interfaces
            <br />
            Spring 2023
          </span>
        </div>

        <div className="info">
        <b>Developer Names:</b>
          <span>
            Jacob Schulmeister V<br/>
            Tim Kuehn<br/><br/>
          </span>
          <img src="http://127.0.0.1:4000/images/DeveloperPhoto.JPG" width="300" height="225" />
        </div>

        <div className="info">
          <label>
            <b>Student Emails:</b>
          </label>
          <span>
            jdschul5@iastate.edu
            <br />
          </span>
          <span>timkuehn@iastate.edu</span>
        </div>

        <div className="info">
          <label>
            <b>Name of the Professor:</b>
          </label>
          <span>
            Dr. Aldaco
          </span>
        </div>

        <div className="info">
          <label>
            <b>Date:</b>
          </label>
          <span>12/10/2023 </span>
          <p> 
            This is a react project that uses bootstrap to style and format the product pages. It is designed to work as a database manager that could be used to create and manage a storefront. Some big features include the ability to see all of the products and all of their information. The ability to see just one object, to add and edit items, and you can delete an object with a little pop up showing what you are deleting as confirmation! The backend was a mongoDB run locally on a host computer.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
