import os
import requests
from datetime import datetime

from .schemas import ContactCreate

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL", "msk.tech2500@gmail.com")

SENDER = "MSK TECH <onboarding@resend.dev>"

RESEND_URL = "https://api.resend.com/emails"


class EmailSendError(Exception):
    pass


def build_email_payload(contact: ContactCreate) -> dict:
    subject_line = contact.subject or "Nouveau message de contact"
    timestamp = datetime.now().strftime("%d/%m/%Y à %H:%M")

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto;">
      <h2 style="color:#E63312;">Nouveau message — MSK TECH</h2>
      <p style="color:#666; font-size:13px;">{timestamp}</p>
      <table style="width:100%; border-collapse: collapse; margin-top: 12px;">
        <tr><td style="padding:6px 0; font-weight:bold; width:110px;">Nom</td><td>{contact.name}</td></tr>
        <tr><td style="padding:6px 0; font-weight:bold;">Email</td><td>{contact.email}</td></tr>
        <tr><td style="padding:6px 0; font-weight:bold;">Téléphone</td><td>{contact.phone or "Non renseigné"}</td></tr>
        <tr><td style="padding:6px 0; font-weight:bold;">Sujet</td><td>{contact.subject or "Non renseigné"}</td></tr>
      </table>
      <div style="margin-top:16px; padding:14px; background:#F2F0EC; border-radius:8px; white-space:pre-wrap;">
        {contact.message}
      </div>
      <p style="margin-top:18px; font-size:12px; color:#999;">
        Clique sur "Répondre" pour répondre directement à {contact.name} ({contact.email}).
      </p>
    </div>
    """

    return {
        "from": SENDER,
        "to": [NOTIFY_EMAIL],
        "reply_to": contact.email,
        "subject": f"[MSK TECH — Contact] {subject_line}",
        "html": html_body,
    }


def send_contact_email(contact: ContactCreate) -> None:
    if not RESEND_API_KEY:
        raise EmailSendError(
            "Configuration manquante : RESEND_API_KEY doit être défini dans les variables d'environnement."
        )

    payload = build_email_payload(contact)

    try:
        response = requests.post(
            RESEND_URL,
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json=payload,
            timeout=10,
        )
    except requests.RequestException as e:
        raise EmailSendError(f"Impossible de joindre le service d'email : {e}") from e

    if response.status_code >= 400:
        raise EmailSendError(f"Resend a refusé l'envoi ({response.status_code}) : {response.text}")