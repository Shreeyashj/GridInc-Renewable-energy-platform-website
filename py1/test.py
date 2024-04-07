import streamlit as st
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns

# Function to load and preprocess data
@st.cache_resource
def load_data(file_path):
    data = pd.read_csv(file_path)
    data['DateTime'] = pd.to_datetime(data['DateTime'])
    data['stability'] = (data['stability'] == 'stable').astype(int)
    return data

# Function to create the logistic regression model
def create_model(X_train, y_train):
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)

    model = LogisticRegression()
    model.fit(X_train_scaled, y_train)

    return model, scaler

# Function to make predictions
def predict_stability(model, scaler, X):
    X_scaled = scaler.transform(X)
    return model.predict_proba(X_scaled)[:, 1]

# Function to calculate evaluation metrics
def calculate_metrics(model, scaler, X, y_true):
    y_pred = model.predict(scaler.transform(X))
    accuracy = accuracy_score(y_true, y_pred)
    precision = precision_score(y_true, y_pred)
    recall = recall_score(y_true, y_pred)
    f1 = f1_score(y_true, y_pred)
    return accuracy, precision, recall, f1

# Function to visualize the comparison
def visualize_comparison(date_time, actual, predicted):
    plt.figure(figsize=(6, 4))
    sns.barplot(x=['Actual Stability', 'Predicted Stability'], y=[actual, predicted])
    plt.title(f'Stability on {date_time}')
    plt.ylim(0, 1)
    st.pyplot(plt)

# Load your datasets
train_test_data_path = 'train_test_data.csv' 
validation_data_path = 'validation data.csv'  

train_test_data = load_data(train_test_data_path)
validation_data = load_data(validation_data_path)

# Create the model
features = ['p1', 'p2', 'p3', 'c1', 'c2', 'c3']
X_train = train_test_data[features]
y_train = train_test_data['stability']
model, scaler = create_model(X_train, y_train)

# Calculate evaluation metrics using validation data
X_val = validation_data[features]
y_val = validation_data['stability']
accuracy, precision, recall, f1 = calculate_metrics(model, scaler, X_val, y_val)

# Streamlit UI
st.title("Grid Stability Prediction")

# Displaying the model evaluation metrics
st.write("### Model Evaluation Metrics")
st.write(f"Accuracy: {accuracy:.2%}")
st.write(f"Precision: {precision:.2%}")
st.write(f"Recall: {recall:.2%}")
st.write(f"F1 Score: {f1:.2%}")

# User inputs for date and time
date = st.date_input("Select a date")
time = st.time_input("Select a time")
date_time = datetime.combine(date, time)

if st.button("Predict Stability"):
    # Filter record for selected date and time
    record = validation_data[validation_data['DateTime'] == date_time]
    
    if record.empty:
        st.write("No data available for the selected date and time.")
    else:
        X = record[features]
        predicted_prob = predict_stability(model, scaler, X)[0]
        actual_stability = record.iloc[0]['stability']

        # Display prediction and actual value
        st.write(f"On {date_time}, the grid is {predicted_prob:.2%} likely to be stable.")
        st.write(f"Actual stability: {'Stable' if actual_stability == 1 else 'Unstable'}")

        # Visualization
        visualize_comparison(date_time, actual_stability, predicted_prob)
