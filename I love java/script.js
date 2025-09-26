document.addEventListener('DOMContentLoaded', function() {
  const calculateBtn = document.getElementById('calculate-btn');
  const foodList = document.getElementById('food-list');

  // Sample food database
  const foodDatabase = [
    { name: "Grilled Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, icon: "🍗", goals: ["lose", "maintain", "gain"] },
    { name: "Salmon", calories: 206, protein: 22, carbs: 0, fat: 13, icon: "🐟", goals: ["maintain", "gain"] },
    { name: "Brown Rice", calories: 112, protein: 2.6, carbs: 23, fat: 0.9, icon: "🍚", goals: ["maintain", "gain"] },
    { name: "Broccoli", calories: 55, protein: 3.7, carbs: 11, fat: 0.6, icon: "🥦", goals: ["lose", "maintain", "gain"] },
    { name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15, icon: "🥑", goals: ["maintain", "gain"] },
    { name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fat: 0.4, icon: "🥛", goals: ["lose", "maintain", "gain"] },
    { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, icon: "🍠", goals: ["maintain", "gain"] },
    { name: "Almonds", calories: 576, protein: 21, carbs: 22, fat: 49, icon: "🌰", goals: ["gain"] }
  ];

  // Calculate calories (Mifflin-St Jeor Formula)
  function calculateCalories() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;
    const isMale = document.getElementById('male').checked;

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr += isMale ? 5 : -161;

    let calories = bmr * activity;
    if (goal === 'lose') calories -= 500;
    else if (goal === 'gain') calories += 500;

    return Math.round(calories);
  }

  // Calculate macronutrients
  function calculateMacros(calories, goal) {
    let protein, carbs, fat;

    if (goal === 'lose') {
      protein = Math.round(calories * 0.4 / 4);
      carbs = Math.round(calories * 0.3 / 4);
      fat = Math.round(calories * 0.3 / 9);
    } else if (goal === 'gain') {
      protein = Math.round(calories * 0.3 / 4);
      carbs = Math.round(calories * 0.5 / 4);
      fat = Math.round(calories * 0.2 / 9);
    } else {
      protein = Math.round(calories * 0.3 / 4);
      carbs = Math.round(calories * 0.4 / 4);
      fat = Math.round(calories * 0.3 / 9);
    }

    return { protein, carbs, fat };
  }

  // Generate food recommendations
  function generateFoodRecommendations(goal) {
    const recommendedFoods = foodDatabase.filter(food => food.goals.includes(goal));
    foodList.innerHTML = '';
    recommendedFoods.slice(0, 6).forEach(food => {
      const foodItem = document.createElement('div');
      foodItem.className = 'food-item';
      foodItem.innerHTML = `
        <div class="food-icon">${food.icon}</div>
        <div class="food-info">
          <h4>${food.name}</h4>
          <p>${food.calories} cal | P: ${food.protein}g C: ${food.carbs}g F: ${food.fat}g</p>
        </div>
      `;
      foodList.appendChild(foodItem);
    });
  }

  // Update UI
  function updateResults() {
    const goal = document.getElementById('goal').value;
    const calories = calculateCalories();
    const macros = calculateMacros(calories, goal);

    document.getElementById('calorie-value').textContent = calories;

    let description = goal === 'lose' ? 'To lose weight gradually'
                     : goal === 'gain' ? 'To gain weight healthily'
                     : 'To maintain your current weight';
    document.getElementById('calorie-description').textContent = description;

    document.getElementById('protein-tag').textContent = `Protein: ${macros.protein}g`;
    document.getElementById('carbs-tag').textContent = `Carbs: ${macros.carbs}g`;
    document.getElementById('fat-tag').textContent = `Fat: ${macros.fat}g`;

    generateFoodRecommendations(goal);
  }

  calculateBtn.addEventListener('click', updateResults);
  updateResults();
});
