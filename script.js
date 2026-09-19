// ===== ODIP contact form — sends enquiries to odip email via Formspree =====
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const org = document.getElementById('org')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const contact = document.getElementById('contact')?.value.trim() || '';
        const message = document.getElementById('message')?.value.trim() || '';

        if (!org || !email) {
            formNote.textContent = 'Please fill in your organisation name and email.';
            formNote.style.color = '#f2c6c6';
            return;
        }

        formNote.textContent = 'Sending...';
        formNote.style.color = '#eee3c5';

        // Replace YOUR_FORM_ID below with the ID Formspree gives you
        // after you create a form there tied to the odip email.
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(contactForm)
        })
            .then(response => {
                if (response.ok) {
                    formNote.textContent = `Thank you, ${org} — we've received your message and will be in touch shortly.`;
                    formNote.style.color = '#eee3c5';
                    contactForm.reset();
                } else {
                    formNote.textContent = 'Something went wrong — please try again or email us directly at odip.partners@gmail.com.';
                    formNote.style.color = '#f2c6c6';
                }
            })
            .catch(() => {
                formNote.textContent = 'Something went wrong — please try again or email us directly at odip.partners@gmail.com.';
                formNote.style.color = '#f2c6c6';
            });
    });
});