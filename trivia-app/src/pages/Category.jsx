import { useState } from "react";
import Game from "./Game";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setSelectedCategory } from "../store/categorySlice";
import { setQuestions } from "../store/quizSlice";
import { shuffleArray } from "../services/shuffleArray";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [gameCategory, setGameCategory] = useState("");
  const allQuestions = useSelector((store) => store.category.allQuestions);
  const question_category = allQuestions.map((question) => question?.category);
  const uniqueCategory = [...new Set(question_category)];
  dispatch(setCategories(uniqueCategory));

  const handleCategory = (cat) => {
    const filteredQuestions = allQuestions.filter(
      (question) => question.category === cat
    );
    dispatch(setSelectedCategory(cat));
    dispatch(setQuestions(shuffleArray(filteredQuestions).slice(0,9)));
    // setGameCategory(cat);
    navigate(BASE_URL + "/quiz")

  };

  //   console.log(category);
  if (uniqueCategory?.length === 0) return;
  <div className="flex justify-center items-center">
    {" "}
    <ReactLoading
      type={"spin"}
      color={"blue"}
      height={"100px"}
      width={"100px"}
    />
  </div>;

  return (
    <div>
      <div>
        {/* {gameCategory ? (
          <Game
            category={gameCategory}
            setCategory={setGameCategory}
            allQuestions={questions}
          />
        ) : ( */}
          <div className="flex flex-col justify-between items-center p-4">
            <h1 className="sm:text-xl text-base font-semibold text-red-800 w-full text-center mx-auto">
              Choose a Category
            </h1>
            <div className="grid sm:grid-cols-3 grid-cols-2 items-center">
              {uniqueCategory.map((cat) => (
                <div
                  key={cat}
                  className="p-4 m-4 bg-red-400 rounded-lg text-center cursor-pointer"
                  onClick={() => handleCategory(cat)}
                >
                  <h1>{cat}</h1>
                </div>
              ))}
            </div>
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Category;
