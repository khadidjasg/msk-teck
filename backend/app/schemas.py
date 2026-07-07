from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=30)
    subject: Optional[str] = Field(default=None, max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    success: bool
    detail: str
