import pandas as pd

df = pd.read_csv("datasets/medium_articles.csv")

df = df.dropna(subset=["title", "text", "tags"])

sample = df.sample(5000, random_state=42)

sample.to_csv(
    "training/medium_sample.csv",
    index=False
)

print("Saved", len(sample), "articles")