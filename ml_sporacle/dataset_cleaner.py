import pandas as pd
import numpy as np

# 1. Load Data
df = pd.read_csv("synthetic_mushroom_dataset_2000.csv")

# 2. FIX PRECISION: Round all floats to 2 decimals
cols_to_round = ['Temperature (°C)', 'Humidity %', 'Airflow Speed (m/s)', 
                 'Light Intensity (lux)', 'Substrate Moisture Level %', 
                 'Water Quality Index', 'Harvest Count per Cycle']

df[cols_to_round] = df[cols_to_round].round(2)

# 3. FIX ENCODING: Drop the broken column and redo it correctly
if 'Mushroom_Variety_encoded' in df.columns:
    df = df.drop(columns=['Mushroom_Variety_encoded'])

# Create a proper integer encoding (0, 1, 2...)
df['Variety_ID'] = df['Mushroom Variety'].astype('category').cat.codes

# 4. FIX "BUTTON" ZERO YIELD BUG
# Give Button mushrooms a fighting chance if they are close to ideal (18-21C)
# We regenerate yields just for Button where it looks like it should be healthy
mask = (df['Mushroom Variety'] == 'Button') & (df['Temperature (°C)'].between(17, 22)) & (df['Humidity %'].between(80, 95))
# Assign a random healthy yield (20-25kg) to these rows
df.loc[mask, 'Harvest Count per Cycle'] = np.random.uniform(20, 25, size=mask.sum()).round(2)

# 5. Save the "Clean" Dataset
df.to_csv("final_mushroom_training_data.csv", index=False)
print("Dataset polished and saved as 'final_mushroom_training_data.csv'")
print(df.head())