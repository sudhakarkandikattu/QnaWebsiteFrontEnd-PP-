import React from "react";
import "./answer.css";
const answer = ({ answer, user }) => {
  return (
    <div>
      <div className="answer">
        <p>{answer}</p>
        <p className="user">{user}</p>
      </div>
      <hr />
    </div>
  );
};

export default answer;
