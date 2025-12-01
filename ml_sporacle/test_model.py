import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score, mean_squared_error
import numpy as np
import matplotlib.pyplot as plt

# 1. Load Data (Same as training)
df = pd.read_csv("final_mushroom_training_data.csv")

# 2. Define Features & Target (MUST match training exactly)
features = ['Variety_ID', 'Temperature (°C)', 'Humidity %', 'Airflow Speed (m/s)', 
            'Light Intensity (lux)', 'Substrate Moisture Level %', 'Water Quality Index']
target = 'Harvest Count per Cycle'

X = df[features]
y = df[target]

# 3. Split Data (Random State 42 ensures we test on the exact same "unseen" data as before)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Load the Saved Model
print("Loading model...")
model = joblib.load('mushroom_yield_model.pkl')

# 5. Make Predictions
print("Running predictions on test set...")
predictions = model.predict(X_test)

# 6. Calculate Metrics
mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)
rmse = np.sqrt(mean_squared_error(y_test, predictions))

# 7. Print the "Report Card" for Judges
print("-" * 30)
print("🎯 MODEL PERFORMANCE REPORT")
print("-" * 30)
print(f"1. R² Score (Accuracy): {r2:.4f} (Ideal: 1.0)")
print(f"2. Mean Absolute Error: {mae:.2f} kg")
print(f"3. Root Mean Sq Error:  {rmse:.2f} kg")
print("-" * 30)

# 8. Human-Readable Sanity Check
# Let's print the first 5 predictions vs actual values so you can see it working
print("\n👀 REALITY CHECK (First 5 predictions):")
results = pd.DataFrame({'Actual Yield': y_test, 'Predicted Yield': predictions})
results['Difference'] = results['Actual Yield'] - results['Predicted Yield']
print(results.head(5))


plt.figure(figsize=(10, 6))
plt.scatter(y_test, predictions, alpha=0.5)
plt.plot([y.min(), y.max()], [y.min(), y.max()], 'r--', lw=2) # The "Perfect Prediction" line
plt.xlabel('Actual Yield')
plt.ylabel('Predicted Yield')
plt.title('Sporacle Model Accuracy: Actual vs Predicted')
plt.show()