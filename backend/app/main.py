import os
import logging

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .schemas import ContactCreate, ContactResponse
from .email_service import send_contact_email, EmailSendError

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("msk-tech-api")

app = FastAPI(
    title="MSK TECH API",
    description="API du site vitrine MSK TECH — endpoint du formulaire de contact.",
    version="1.0.0",
)

# Origines autorisées à appeler l'API (le frontend en local + en production).
# ALLOWED_ORIGINS dans .env, séparées par des virgules.
raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
)
allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "msk-tech-api"}


@app.post("/contact", response_model=ContactResponse, status_code=status.HTTP_200_OK)
def submit_contact(contact: ContactCreate):
    """
    Reçoit un message du formulaire de contact et l'envoie par email
    à MSK TECH, avec Reply-To réglé sur l'adresse de l'expéditeur.
    """
    try:
        send_contact_email(contact)
    except EmailSendError as e:
        logger.error(f"Échec envoi email de contact : {e}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Impossible d'envoyer le message pour le moment. Réessaie plus tard.",
        )

    logger.info(f"Message de contact envoyé — de : {contact.email}")
    return ContactResponse(success=True, detail="Message envoyé avec succès.")
