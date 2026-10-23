// Vercel serverless endpoint. Requires RESEND_API_KEY and RESEND_FROM_EMAIL in Vercel settings.
const DESTINATION = 'eshaanshah24@gmail.com';
const ALLOWED_SERVICES = new Set(['General IT support', 'Cybersecurity', 'Cloud & infrastructure', 'AI & automation', 'Not sure yet']);

export async function POST(request) {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return Response.json({ error: 'Expected JSON submission.' }, { status: 415 });
    }
    const raw = await request.text();
    if (raw.length > 6000) return Response.json({ error: 'Request too large.' }, { status: 413 });
    const input = JSON.parse(raw);
    // Hidden field catches basic spam bots without emailing anything.
    if (input.website) return Response.json({ ok: true });
    const name = String(input.name || '').trim().slice(0, 100);
    const company = String(input.company || '').trim().slice(0, 120);
    const email = String(input.email || '').trim().slice(0, 150);
    const service = String(input.service || 'Not sure yet');
    const message = String(input.message || '').trim().slice(0, 1500);
    if (!name || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !ALLOWED_SERVICES.has(service)) {
      return Response.json({ error: 'Please complete all required fields correctly.' }, { status: 400 });
    }
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !from) {
      console.error('Email delivery is not configured.');
      return Response.json({ error: 'Consultation emails are not configured yet. Please try again later.' }, { status: 503 });
    }
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [DESTINATION],
        reply_to: email,
        subject: `New IT & AI consultation — ${company.replace(/[\r\n]/g, ' ')}`,
        text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nService: ${service}\n\nBusiness needs:\n${message || 'Not specified'}`
      })
    });
    if (!response.ok) {
      console.error('Email provider rejected consultation:', response.status, (await response.text()).slice(0, 500));
      return Response.json({ error: 'Could not deliver the request. Please try again later.' }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error('Consultation submission failed:', error);
    return Response.json({ error: 'Could not process request. Please try again later.' }, { status: 500 });
  }
}
