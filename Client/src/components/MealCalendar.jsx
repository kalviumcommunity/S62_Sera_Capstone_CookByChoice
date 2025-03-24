import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const MealCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs());
  const [meals, setMeals] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: "", details: "", date: "" });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    currentWeek.startOf("week").add(i, "day")
  );

  useEffect(() => {
    const fetchMeals = async () => {
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:5000/api/meal-planner/weekly",
          {
            params: {
              startDate: weekDates[0].format("YYYY-MM-DD"),
              endDate: weekDates[6].format("YYYY-MM-DD"),
              token,
            },
          }
        );
        setMeals(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [currentWeek, token]);

  const changeWeek = (direction) => {
    setCurrentWeek(currentWeek.add(direction, "week"));
  };

  const handleMealClick = (mealId) => {
    // console.log(meal)
    navigate(`/recipe/${mealId}`);
  };
  const deleteMeal = async (date, mealId) => {
    try {
      await axios.delete(`http://localhost:5000/api/meal-planner/${mealId}`, {
        params: { token: token }, // ✅ Token in query parameter
      });
  
      // Update UI after deletion
      setMeals((prevMeals) => ({
        ...prevMeals,
        [date]: prevMeals[date].filter((meal) => meal._id !== mealId),
      }));
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E4D3] text-[#5D4037] p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeWeek(-1)}
          className="bg-[#6D4C41] text-[#FAF3E0] px-4 py-2 rounded-lg shadow-md hover:bg-[#5D4037] transition"
        >
          ◀ Previous Week
        </button>
        <h1 className="text-2xl font-bold">{currentWeek.format("MMMM YYYY")}</h1>
        <button
          onClick={() => changeWeek(1)}
          className="bg-[#6D4C41] text-[#FAF3E0] px-4 py-2 rounded-lg shadow-md hover:bg-[#5D4037] transition"
        >
          Next Week ▶
        </button>
      </div>
      <div className="grid grid-cols-7 gap-6">
        {weekDates.map((date) => (
          <div
            key={date.format("YYYY-MM-DD")}
            className="flex flex-col items-center border border-[#8D6E63] bg-[#FAF3E0] shadow-lg rounded-xl p-4 hover:scale-105 transition"
          >
            <h2 className="text-lg font-bold text-[#5D4037] mb-2 text-center">
              {date.format("ddd")}
              <br />
              <span className="text-sm text-[#8D6E63]">
                {date.format("MMM D")}
              </span>
            </h2>
            <div className="w-full">
              {meals[date.format("YYYY-MM-DD")]?.length > 0 ? (
                meals[date.format("YYYY-MM-DD")].map((meal) => (
                  <div
                    key={meal._id}
                    className="bg-[#8D6E63] text-[#FAF3E0] p-3 rounded-lg shadow-md mb-2 flex justify-between items-center cursor-pointer hover:bg-[#6D4C41] transition"
                    onClick={() => handleMealClick(meal.recipeId)}
                  >
                    <div>
                      <p className="font-bold">{meal.mealType}</p>
                      <p className="underline">{meal.name}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigating when deleting
                        deleteMeal(date.format("YYYY-MM-DD"), meal._id);
                      }}
                      className="bg-amber-300 text-white px-2 py-1 rounded-full text-sm shadow-md hover:bg-red-700 transition"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[#6D4C41] text-center italic">
                  No meals planned
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCalendar;
