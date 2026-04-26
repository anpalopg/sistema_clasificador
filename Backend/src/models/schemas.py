from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


class ChatMessage(BaseModel):
	role: str = Field(..., examples=["user", "assistant"])
	content: str
	created_at: datetime = Field(default_factory=datetime.utcnow)


class TextCreate(BaseModel):
	name: str = Field(..., min_length=1)
	content: str = Field(..., min_length=1)


class TextUpdate(BaseModel):
	name: Optional[str] = None
	content: Optional[str] = None


class TextResponse(BaseModel):
	id: str
	name: str
	content: str
	summary: Optional[str] = None
	messages: list[ChatMessage] = Field(default_factory=list)
	created_at: datetime
	updated_at: datetime


class ChatRequest(BaseModel):
	question: str = Field(..., min_length=1)


class SummaryResponse(BaseModel):
	id: str
	summary: str


class ChatSessionCreate(BaseModel):
	name: str = Field(default="Nueva sesión de chat", min_length=1)


class ChatSessionMessageRequest(BaseModel):
	chat_session_id: str = Field(..., min_length=1)
	message: str = Field(..., min_length=1)
	domain: Optional[str] = None


class ChatSessionResponse(BaseModel):
	id: str = Field(alias="_id")
	name: str
	created_at: datetime
	updated_at: datetime
	messages: list[ChatMessage] = Field(default_factory=list)

	model_config = ConfigDict(populate_by_name=True)

