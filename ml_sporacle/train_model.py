import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib

# 1. Load Data
df = pd.read_csv("final_mushroom_training_data.csv")

# 2. Define Features (X) and Target (y)
# We use Variety_ID (numbers), NOT the string name
features = ['Variety_ID', 'Temperature (°C)', 'Humidity %', 'Airflow Speed (m/s)', 
            'Light Intensity (lux)', 'Substrate Moisture Level %', 'Water Quality Index']
target = 'Harvest Count per Cycle'

X = df[features]
y = df[target]

# 3. Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Train Model (Random Forest)
print("Training Random Forest...")
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. Evaluate
predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
print(f"Model Accuracy Check - Average Error: +/- {mae:.2f} kg")

# 6. Save the Model
joblib.dump(model, 'mushroom_yield_model.pkl')
print("Model saved as 'mushroom_yield_model.pkl'")