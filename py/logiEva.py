import streamlit as st
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# Function to load data for Logistic Regression
def load_data_lr():
    data = pd.read_csv('train_test_data.csv')  # Replace 'your_data.csv' with your actual data file path
    return data

# Function for preprocessing for Logistic Regression
def preprocess_data_lr(data):
    # Perform preprocessing if needed
    processed_data = data.copy()  # Example: No preprocessing in this case
    return processed_data

# Function to train the Logistic Regression model
def train_model_lr(data):
    X = data.drop(columns=['target_column'])  # Replace 'target_column' with your target column name
    y = data['target_column']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    model = LogisticRegression()
    model.fit(X_train, y_train)
    return model, X_test, y_test

# Function to evaluate the Logistic Regression model
def evaluate_model_lr(model, X_test, y_test):
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    confusion_mat = confusion_matrix(y_test, y_pred)
    classification_rep = classification_report(y_test, y_pred)
    return accuracy, confusion_mat, classification_rep

# Streamlit UI
st.title("Logistic Regression Model Evaluation")
data_lr = load_data_lr()
processed_data_lr = preprocess_data_lr(data_lr)
model_lr, X_test_lr, y_test_lr = train_model_lr(processed_data_lr)

if st.button("Evaluate Model"):
    accuracy_lr, confusion_mat_lr, classification_rep_lr = evaluate_model_lr(model_lr, X_test_lr, y_test_lr)
    
    st.write(f"Accuracy (LR): {accuracy_lr:.2f}")
    st.write("Confusion Matrix (LR):")
    st.write(confusion_mat_lr)
    st.write("Classification Report (LR):")
    st.write(classification_rep_lr)
