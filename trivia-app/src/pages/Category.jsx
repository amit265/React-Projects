import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/api";
import Game from "./Game";
import Header from "../components/Header";

const Category = ({ user }) => {
  const [category, setCategory] = useState([]);
  const [gameCategory, setGameCategory] = useState("");

  useEffect(() => {
    const loadCategory = async () => {
      const fetchedCategory = await fetchQuestions();
      const question_category = fetchedCategory.map(
        (question) => question.category
      );
      setCategory([...new Set(question_category)]);
    };
    loadCategory();
  }, []);

  const handleCategory = (cat) => {
    setGameCategory(cat);
  };

  //   console.log(category);
  if (category.length === 0) return <div>Loading...</div>;
  return (
    <div>
      <Header user={user} />

      <div>
        {gameCategory ? (
          <Game category={gameCategory} setCategory={setGameCategory}/>
        ) : (
          <div className="flex flex-col justify-between items-center p-4">
            <h1 className="">Choose a Category</h1>
            <div className="grid grid-cols-3 ">
              {category.map((cat) => (
                <div
                  key={cat}
                  className="p-4 m-4 bg-green-300 text-center cursor-pointer"
                >
                  <div className="" onClick={() => handleCategory(cat)}>
                    <h1>{cat}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
