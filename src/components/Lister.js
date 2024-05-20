
import React from "react";
import Card from "./Card.js";
import { Link } from "react-router-dom";
import "./Lister.css";

export default function Lister({
  Checked1,
  Checked2,
  Checked3,
  Checked4,
  Checked5,
  Checked6,
  Checked7,
  Checked8,
  Checked9,
  Checked10,
  Checked11,
  Checked12
}) {
  let count = 0;
  for (let no = 0; no <= 12; no++) {
    // eslint-disable-next-line
    let op = JSON.parse(localStorage.getItem("Checked" + `${no}`));
    if (op != null) {
      op = [...new Set(op)];

      for (let i = 0; i < op.length; i++) {
        if (
          (op[i] !== "," &&
            op[i] !== "/" &&
            op[i] !== '"' &&
            op[i] !== "[" &&
            op[i] !== "]" &&
            (op[i] < "a" || op[i] > "z") &&
            op[i] !== "\\" &&
            op[i] !== "+") ||
          op.length === 3
        ) {
          count++;
        }
      }
    }
  }

  const containerStyles = {
    height: 20,
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 50
  };

  const fillerStyles = {
    height: "100%",
    width: `${Math.round((count * 100) / 102)}%`,
    backgroundColor: "green",
    borderRadius: "inherit",
    textAlign: "right"
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold"
  };

  return (
    <div className="container">
      <h1 className="title">100 DSA PROBLEMS OF STRIVER</h1>
      <h3 className="subtitle">Crack Product based companies today</h3>

      <div className="progress-container" style={containerStyles}>
        <div className="filler" style={fillerStyles}>
          <span className="label" style={labelStyles}>
            {`${count}%`}
          </span>
        </div>
      </div>

      <div className="card-container">
        <Card
          qno={25}
          no={"12"}
          ans={Checked12}
          Checked={Checked12}
          name="Array and String"
          className="iconic-card"
        />

<Card qno={5} no={"1"} ans={Checked1}  Checked={Checked1} name="Greedy" />
<Card qno={13} no={"2"} ans={Checked2} Checked={Checked2} name="Dynamic Programming" />
<Card qno={7} no={"3"} ans={Checked3}  Checked={Checked3} name="Binary search" />
<Card qno={5} no={"4"} ans={Checked12} Checked={Checked4} name="Heaps" />
<Card qno={6} no={"5"} ans={Checked12} Checked={Checked5} name="Recursion" />
<Card qno={8} no={"6"} ans={Checked12} Checked={Checked6} name="Linked List" />
<Card qno={8} no={"7"} ans={Checked12} Checked={Checked7} name="Binary Tree" />
<Card qno={6} no={"8"} ans={Checked12} Checked={Checked8} name="Binary Search Tree" />
<Card qno={7} no={"9"}  ans={Checked12} Checked={Checked9} name="Stack and Queue" />
<Card qno={6} no={"10"} ans={Checked12}  Checked={Checked10} name="Backtracking" />
<Card qno={6} no={"11"} ans={Checked12}  Checked={Checked11} name="Graphs" />
      </div>

      <div className="footer">
        <p className="footer-text">Linkedin: &nbsp;</p>
        <Link
          target="_blank"
          className="link"
          to="https://www.linkedin.com/in/gokul-ramesh-564b3b249/"
        >
          GOKUL &nbsp;
        </Link>

        <img
          src="https://th.bing.com/th/id/R.1dde1bbff3a49d9a2d8e3ad315f9f137?rik=hx1P1nWyX7TYaw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fheart-symbol-transparent%2fheart-symbol-transparent-7.png&ehk=tnXY15k5brhD0QZZmipdAq6M64XmIA6XDvtWxc1EXZA%3d&risl=&pid=ImgRaw&r=0"
          className="heart-icon"
          alt="Heart"
        />
      </div>
    </div>
  );
}
