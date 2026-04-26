import streamlit as st
import ollama
import fitz
import os

def extract_text_from_pdf(uploaded_file):
    doc = fitz.open(uploaded_file)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def save_uploaded_file(uploaded_file):
    save_path = os.getcwd()
    file_path = os.path.join(save_path, uploaded_file.name)
    with open(file_path, "wb") as f:
        f.write(uploaded_file.getbuffer())
    st.success(f"Archivo '{uploaded_file.name}' se guardó correctamente ✅")
    return file_path

def ask_question_about_pdf(pdf_text, prompt):
    combined_prompt = f"{pdf_text}\n\nQuestion: {prompt}"
    response = ollama.generate(model="llama3.1", prompt=combined_prompt)
    return response["response"]

# --- Interfaz Streamlit ---
st.title("Chat about PDF 📄🤖")

uploaded_file = st.file_uploader("Sube un archivo PDF", type=["pdf"])

if uploaded_file is not None:
    file_path = save_uploaded_file(uploaded_file)
    pdf_text = extract_text_from_pdf(uploaded_file)

    st.subheader("Texto extraído del PDF:")
    st.write(pdf_text)

    prompt = st.text_input("Haz una pregunta sobre el PDF:")
    if st.button("Preguntar"):
        if prompt:
            answer = ask_question_about_pdf(pdf_text, prompt)
            st.subheader("Respuesta del modelo:")
            st.markdown(answer)