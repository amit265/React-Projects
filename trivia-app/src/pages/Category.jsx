import { useState } from "react";
import Game from "./Game";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setSelectedCategory } from "../store/categorySlice";
import { setQuestions } from "../store/quizSlice";
import { shuffleArray } from "../services/shuffleArray";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import science_icon from "../assets/images/science.png";
import history_icon from "../assets/images/history.png";
import grography_icon from "../assets/images/geography.png";
import art_icon from "../assets/images/art.png";
import sports_icon from "../assets/images/sports.png";
const Category = () => {
  const dispatch = useDispatch();
  console.log("science category", science_icon);

  const navigate = useNavigate();
  const category = [
    { icon: science_icon, name: "Science" },
    { icon: history_icon, name: "History" },
    { icon: grography_icon, name: "Geography" },
    { icon: art_icon, name: "Art" },
    { icon: sports_icon, name: "Sports" },
  ];
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
    dispatch(setQuestions(shuffleArray(filteredQuestions).slice(0, 10)));
    // setGameCategory(cat);
    navigate(BASE_URL + "/quiz");
    console.log("handleCategory", cat, question_category, "filteredQuestions", filteredQuestions);
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
    <div className="flex flex-col justify-between items-center p-4 w-full overflow-y-auto">
      <h1 className="sm:text-xl text-base font-semibold text-white text-center mx-auto">
        Choose a Category
      </h1>
      <div className="grid sm:grid-cols-1 grid-cols-1 items-center w-full rounded-3xl">
        {category.map((cat) => (
          <div
            key={cat.name}
            className="p-4 m-4 bg-white rounded-full text-center cursor-pointer w-full mx-auto flex items-center"
            onClick={() => handleCategory(cat.name)}
          >
            {console.log(cat.name, cat.icon)}
            <div className="w-1/2">
              <img src={cat.icon} alt={cat.name} className="mx-auto" />
            </div>
            <h1 className="text-xl w-1/2 text-left">{cat.name} </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
