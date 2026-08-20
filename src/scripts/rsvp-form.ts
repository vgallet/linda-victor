/**
 * RSVP form submission.
 *
 * The payload is sent as `text/plain` so the browser skips the CORS preflight
 * request, which a Google Apps Script Web App cannot answer. If the response
 * is still unreadable because of CORS, the request is replayed in `no-cors`
 * mode: the answer is recorded server-side, we simply cannot read the reply.
 */

interface RsvpPayload {
  fullName: string;
  email: string;
  phone: string;
  attending: string;
  guestCount: string;
  dietary: string;
  message: string;
  website: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const form = document.querySelector<HTMLFormElement>('[data-rsvp-form]');
const feedback = document.querySelector<HTMLElement>('[data-rsvp-feedback]');
const submitButton = form?.querySelector<HTMLButtonElement>('[data-rsvp-submit]');
const attendingDetails = form?.querySelector<HTMLElement>('[data-rsvp-attending-details]');

const SUBMIT_IDLE_LABEL = submitButton?.textContent?.trim() ?? 'Envoyer ma réponse';

function getField(name: keyof RsvpPayload): HTMLInputElement | HTMLTextAreaElement | null {
  return form?.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
}

function setFieldError(name: string, message: string | null): void {
  const errorElement = form?.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
  const control = form?.querySelector<HTMLElement>(`[name="${name}"]`);

  if (errorElement) {
    errorElement.textContent = message ?? '';
    errorElement.hidden = message === null;
  }

  control?.setAttribute('aria-invalid', message === null ? 'false' : 'true');
}

function readPayload(): RsvpPayload {
  const data = new FormData(form as HTMLFormElement);
  const read = (key: string) => String(data.get(key) ?? '').trim();

  return {
    fullName: read('fullName'),
    email: read('email'),
    phone: read('phone'),
    attending: read('attending'),
    guestCount: read('guestCount'),
    dietary: read('dietary'),
    message: read('message'),
    website: read('website'),
  };
}

function validate(payload: RsvpPayload): boolean {
  let isValid = true;

  setFieldError('fullName', null);
  setFieldError('email', null);
  setFieldError('attending', null);

  if (payload.fullName.length < 2) {
    setFieldError('fullName', 'Merci d’indiquer votre nom et prénom.');
    isValid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    setFieldError('email', 'Merci d’indiquer une adresse e-mail valide.');
    isValid = false;
  }

  if (payload.attending !== 'oui' && payload.attending !== 'non') {
    setFieldError('attending', 'Merci de nous dire si vous serez présent(e).');
    isValid = false;
  }

  return isValid;
}

function setStatus(status: FormStatus, message?: string): void {
  if (submitButton) {
    submitButton.disabled = status === 'loading' || status === 'success';
    submitButton.textContent = status === 'loading' ? 'Envoi en cours…' : SUBMIT_IDLE_LABEL;
  }

  if (!feedback) return;

  feedback.hidden = status === 'idle' || status === 'loading';
  feedback.textContent = message ?? '';
  feedback.classList.toggle('text-sage-dark', status === 'success');
  feedback.classList.toggle('text-[#b4544a]', status === 'error');
}

/** Toggles the fields that only make sense for guests who attend. */
function syncAttendingDetails(): void {
  if (!attendingDetails) return;
  const attending = form?.querySelector<HTMLInputElement>('[name="attending"]:checked')?.value;
  attendingDetails.hidden = attending !== 'oui';
}

async function submitPayload(endpoint: string, payload: RsvpPayload): Promise<boolean> {
  const body = JSON.stringify(payload);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      // `text/plain` keeps the request "simple" and avoids the CORS preflight.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
      redirect: 'follow',
    });

    if (!response.ok) return false;

    const result = (await response.json()) as { status?: string };
    return result.status === 'ok';
  } catch {
    // Most likely a CORS restriction on the reply: replay as an opaque request
    // so the answer still reaches the spreadsheet.
    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body,
      });
      return true;
    } catch {
      return false;
    }
  }
}

form?.addEventListener('change', syncAttendingDetails);
syncAttendingDetails();

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const endpoint = form.dataset.endpoint;
  const payload = readPayload();

  if (!validate(payload)) {
    const firstInvalid = form.querySelector<HTMLElement>('[aria-invalid="true"]');
    firstInvalid?.focus();
    return;
  }

  if (!endpoint) {
    setStatus('error', form.dataset.missingEndpointMessage ?? '');
    return;
  }

  setStatus('loading');
  const succeeded = await submitPayload(endpoint, payload);

  if (succeeded) {
    setStatus('success', form.dataset.successMessage ?? '');
    form.reset();
    syncAttendingDetails();
  } else {
    setStatus('error', form.dataset.errorMessage ?? '');
  }
});

export {};
