import os
import smtplib
from email.message import EmailMessage
from datetime import datetime
from dotenv import load_dotenv

from .schemas import ContactCreate

load_dotenv()
# Identifiants du compte Gmail qui ENVOIE l'email
# Configurés via variables d'environnement
GMAIL_ADDRESS = os.getenv("GMAIL_ADDRESS")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")

# Adresse qui REÇOIT les notifications de contact.
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL", "msk.tech2500@gmail.com")


class EmailSendError(Exception):
    """Levée quand l'envoi de l'email échoue."""
    pass


def build_contact_email(contact: ContactCreate) -> EmailMessage:
    """Construit l'email de notification à partir des données du formulaire."""
    msg = EmailMessage()

    subject_line = contact.subject or "Nouveau message de contact"
    msg["Subject"] = f"[MSK TECH — Contact] {subject_line}"
    msg["From"] = GMAIL_ADDRESS
    msg["To"] = NOTIFY_EMAIL

    # Le point clé : Reply-To pointe vers l'expéditeur du formulaire.
    # Quand tu cliques "Répondre" dans Gmail, ça répond directement
    # à la personne qui a écrit — pas à ta propre adresse.
    msg["Reply-To"] = contact.email

    timestamp = datetime.now().strftime("%d/%m/%Y à %H:%M")

    body = f"""Nouveau message reçu depuis le site MSK TECH ({timestamp})

Nom          : {contact.name}
Email        : {contact.email}
Téléphone    : {contact.phone or "Non renseigné"}
Sujet        : {contact.subject or "Non renseigné"}

Message :
{contact.message}

---
Pour répondre directement à {contact.name}, utilise le bouton "Répondre"
de ton client email : il enverra automatiquement à {contact.email}.
"""
    msg.set_content(body)
    return msg


def send_contact_email(contact: ContactCreate) -> None:
    """Envoie l'email de notification via SMTP Gmail. Lève EmailSendError si ça échoue."""
    if not GMAIL_ADDRESS or not GMAIL_APP_PASSWORD:
        raise EmailSendError(
            "Configuration email manquante : GMAIL_ADDRESS et GMAIL_APP_PASSWORD "
            "doivent être définis dans les variables d'environnement."
        )

    msg = build_contact_email(contact)

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
            server.send_message(msg)
    except smtplib.SMTPAuthenticationError as e:
        raise EmailSendError(
            "Authentification Gmail refusée. Vérifie que GMAIL_APP_PASSWORD est bien "
            "un 'App Password' Google (pas ton mot de passe habituel)."
        ) from e
    except Exception as e:
        raise EmailSendError(f"Échec de l'envoi de l'email : {e}") from e
