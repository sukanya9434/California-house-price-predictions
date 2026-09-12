# 🏠 California House Price Prediction API

A machine learning project that predicts California house prices using a **Random Forest Regressor** and exposes the trained model through a **FastAPI REST API**.

## 🚀 Features

- California Housing dataset from Scikit-learn
- Random Forest Regression model
- Train/test split for model evaluation
- Mean Absolute Error (MAE) and R² score evaluation
- Saved trained model using Joblib
- FastAPI backend for predictions
- Pydantic input validation
- Interactive API documentation with Swagger UI
- Health-check endpoint for monitoring the API

## 🛠️ Technologies Used

- Python
- Pandas
- Scikit-learn
- FastAPI
- Pydantic
- Uvicorn
- Joblib

## 📂 Project Structure

```text
Houseprediction-model/
│
├── .vscode/                 # VS Code project settings
├── venv/                    # Virtual environment (not committed)
├── .gitignore               # Git ignored files
│
├── housing.csv              # Housing dataset
├── house_model.joblib       # Trained Random Forest model
├── house_features.joblib    # Model feature names
│
├── train.py                 # Model training and evaluation
├── main.py                  # FastAPI application
