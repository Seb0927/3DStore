const { Resend } = require('resend');

const resend = new Resend('re_gqMDFe4u_8UanFABderf8GRZg8EqoxBrq');

// (async function () {
//   const { data, error } = await resend.emails.send({
//     from: 'Acme <onboarding@resend.dev>',
//     to: ['josemanuelpalmaoquendo75@gmail.com'],
//     subject: 'Hello World',
//     html: '<strong>It works!</strong>',
//   });

//   if (error) {
//     return console.error({ error });
//   }

//   console.log({ data });
// })();

export async function sendEmail(recipient) {
    if (!recipient) {
      console.error('Por favor, proporciona el destinatario y el asunto.');
      return;
    }
  
    try {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [recipient],
        subject: "Orden de producto realizada!",
        html: '<strong>Haz ordenado un producto  en nuestra tienda</strong>',
      });
  
      if (error) {
        return console.error({ error });
      }
  
      console.log({ data });
    } catch (err) {
      console.error('Error al enviar el correo:', err);
    }
  }
  
  
