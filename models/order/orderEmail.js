'use server'

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_EMAIL_HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER, 
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(receiver, products) {
  
  let body = `
  <h1>Orden de productos recibida</h1>
  <p>Gracias por habernos elegido</p>
  <h2>Productos</h2>

  `;
  products.forEach((product) => {
    body += `
    <li>
      <h3>${product.name}</h3>
      <p>Precio unitario: $${product.price}</p>
      <p>Cantidad: ${product.quantity}</p>
    </li>
    `;
    
  });
  body += `
  <h2>Gracias por su compra</h2>  
  `;

 const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, 
    to: receiver, 
    subject: "Orden de productos Recibida - Fabricks3D", // Subject line
    //text: "Email de prueba", // plain text body
    html: body, 
  });
}

// Function to send email indicating the order has been processed
export async function sendOrderProcessedEmail(receiver, products) {
  let body = `
  <h1>Orden de productos procesada</h1>
  <p>Su orden ha sido procesada y el propietario se pondrá en contacto con usted pronto.</p>
  <h2>Productos</h2>
  <ul>
  `;

  products.forEach((product) => {
    body += `
    <li>
      <h3>${product.name}</h3>
      <p>Precio unitario: $${product.price}</p>
      <p>Cantidad: ${product.quantity}</p>
    </li>
    `;
  });

  body += `
  </ul>
  <h2>Gracias por su compra</h2>  
  `;

  const info = await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_EMAIL_USER, 
    to: receiver, 
    subject: "Orden de productos procesada - Fabricks3D", // Subject line
    html: body, 
  });

  console.log("Message sent: %s", info.messageId);
}

// Function to send email indicating the order has been rejected due to inventory reasons
export async function sendOrderRejectedEmail(receiver, products) {
  let body = `
  <h1>Orden de productos rechazada</h1>
  <p>Lo sentimos, su orden ha sido rechazada debido a razones de inventario.</p>
  <h2>Productos</h2>
  <ul>
  `;

  products.forEach((product) => {
    body += `
    <li>
      <h3>${product.name}</h3>
      <p>Precio unitario: $${product.price}</p>
      <p>Cantidad: ${product.quantity}</p>
    </li>
    `;
  });

  body += `
  </ul>
  <h2>Por favor, intente nuevamente más tarde</h2>  
  `;

  const info = await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_EMAIL_USER, 
    to: receiver, 
    subject: "Orden de productos rechazada - Fabricks3D", // Subject line
    html: body, 
  });

  console.log("Message sent: %s", info.messageId);
}
