import fitz
from langchain_ollama import ChatOllama
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage


class OllamaLLM:
    def __init__(self, model="llama3.1", temperature=0):
        self.llm = ChatOllama(model=model, temperature=temperature)

    def invoke(self, messages) -> AIMessage:
        return self.llm.invoke(messages)



def extract_text_from_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text



llm = OllamaLLM()

pdf_text = extract_text_from_pdf("ejemplo.pdf")

messages = [
    SystemMessage(content="Eres un asistente útil que responde en español sobre el contenido de un PDF."),
    HumanMessage(content=f"Este es el contenido del PDF:\n{pdf_text}\n\nPor favor, dime de qué trata en pocas palabras."),
]

ai_msg = llm.invoke(messages)
print(ai_msg.content)
