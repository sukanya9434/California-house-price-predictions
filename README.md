# 🏠 California House Price Predictor

A full-stack machine learning application that predicts the median house value of a California neighborhood using a **Random Forest Regression model**.

The project combines a **Scikit-learn machine learning model**, **FastAPI backend**, and **Next.js + TypeScript frontend** to provide an interactive house-price prediction experience.

---

## 🚀 Project Overview

The application takes eight characteristics of a California neighborhood as input and uses a trained Random Forest Regressor to estimate its median house value.

### Input Features

- Median Income (`MedInc`)
- House Age (`HouseAge`)
- Average Rooms (`AveRooms`)
- Average Bedrooms (`AveBedrms`)
- Population (`Population`)
- Average Occupancy (`AveOccup`)
- Latitude (`Latitude`)
- Longitude (`Longitude`)

The model returns:

- Predicted house price
- Estimated price range

---

## 🧠 Machine Learning

The project uses the **California Housing dataset** available through Scikit-learn.

### Model

**Random Forest Regressor**

```python
RandomForestRegressor(
    n_estimators=100,
    random_state=42
)


                    ┌─────────────────────┐
                    │      User           │
                    │  Enters House Data  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Next.js Frontend  │
                    │ TypeScript + Tailwind│
                    └──────────┬──────────┘
                               │
                            Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │   FastAPI Backend   │
                    │   Pydantic Validation│
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Random Forest     │
                    │     Regressor      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Prediction Response │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Next.js Result UI  │
                    │   Displays Price    │
                    └─────────────────────┘
