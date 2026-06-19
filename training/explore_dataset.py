import pandas as pd

df = pd.read_csv("datasets/medium_articles.csv")

print("Total Articles:", len(df))
print("\nColumns:")
print(df.columns)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nSample Article:")
print("=" * 50)
print("Title:", df.iloc[0]["title"])
print("\nTags:", df.iloc[0]["tags"])
print("\nText Preview:")
print(df.iloc[0]["text"][:500])