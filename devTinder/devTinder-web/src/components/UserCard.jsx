import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img className="w-full" src={photoUrl} alt="userPhoto" />
      </figure>
      <div className="card-body">
        <h2 className="cardTitle">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
