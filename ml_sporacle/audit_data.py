import pandas as pd

# Load the CLEANED file
df = pd.read_csv("final_mushroom_training_data.csv")

print("--- 1. DATA PREVIEW (First 5 rows) ---")
print(df.head()) 
# CHECK: Are decimals rounded? (e.g. 21.57, not 21.57093...)

print("\n--- 2. CATEGORY CHECK ---")
print(df['Mushroom Variety'].unique())
# CHECK: Do you see all your types? (Oyster, Button, Shiitake, etc.)

print("\n--- 3. YIELD SANITY CHECK (Button Mushrooms) ---")
button_stats = df[df['Mushroom Variety'] == 'Button']['Harvest Count per Cycle'].describe()
print(button_stats)
# CHECK: Look at 'min' and 'max'. 
# If 'max' is 0.0, the bug is NOT fixed. 
# If 'max' is ~25.0 and 'mean' is > 0, it IS fixed.

print("\n--- 4. ENCODING CHECK ---")
# Check if Variety_ID is consistent
for variety in df['Mushroom Variety'].unique():
    ids = df[df['Mushroom Variety'] == variety]['Variety_ID'].unique()
    print(f"{variety}: {ids}")
    # CHECK: Each variety should have exactly ONE ID number (e.g., 'Button': [0])