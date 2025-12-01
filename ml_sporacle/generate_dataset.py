import pandas as pd
import numpy as np
import csv
from io import StringIO
from sklearn.preprocessing import LabelEncoder

# Robustly load dataset: some files wrap each line in quotes making pandas treat
# the whole line as a single field. Detect and unwrap those lines first.
path = 'mushroom_dataset.csv'
with open(path, 'r', encoding='utf-8') as f:
    sample_lines = [next(f) for _ in range(5)]

needs_unwrap = False
if sample_lines:
    # if the header line starts with a quote and contains commas, it's likely
    # that the whole line is quoted (so pandas will read a single column)
    first = sample_lines[0].strip()
    if first.startswith('"') and first.endswith('"') and ',' in first:
        needs_unwrap = True

if needs_unwrap:
    with open(path, 'r', encoding='utf-8') as f:
        cleaned = '\n'.join(line.strip().strip('"') for line in f)
    df = pd.read_csv(StringIO(cleaned))
else:
    df = pd.read_csv(path)

# Normalize column names
df.columns = df.columns.str.strip()
print("Columns:", df.columns.tolist())
print(df.head())

# Encode categorical 'Mushroom Variety' (if present)
if 'Mushroom Variety' in df.columns:
    le = LabelEncoder()
    df['Mushroom_Variety_encoded'] = le.fit_transform(df['Mushroom Variety'])

# Determine numeric columns dynamically for noise injection
numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()

def add_noise(row, noise_factor=0.05):
    for col in numeric_cols:
        try:
            if pd.notna(row[col]):
                row[col] = row[col] + np.random.normal(0, noise_factor * abs(row[col]))
        except Exception:
            # Skip columns we can't perturb (safety)
            continue
    return row

# Bootstrap sample and augment to 2000 rows
np.random.seed(42)
synthetic_rows = []
n_original = len(df)
print(f"Original dataset shape: {df.shape}")

for i in range(2000):
    # Sample a row with replacement
    sample_idx = np.random.randint(0, n_original)
    sample = df.iloc[sample_idx].copy()

    # Occasionally swap variety for diversity (10% chance)
    if 'Mushroom Variety' in df.columns and np.random.rand() < 0.1:
        sample['Mushroom Variety'] = np.random.choice(df['Mushroom Variety'])

    # Perturb numerics
    sample = add_noise(sample)

    synthetic_rows.append(sample)

syn_df = pd.DataFrame(synthetic_rows)
syn_df.to_csv('synthetic_mushroom_dataset_2000.csv', index=False)
print(f"Synthetic dataset shape: {syn_df.shape}")
print(syn_df.head())
if 'Mushroom Variety' in syn_df.columns:
    print(syn_df['Mushroom Variety'].value_counts())
