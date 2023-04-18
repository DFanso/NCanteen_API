const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: "computingproject43@gmail.com",
    pass: "t6d35jWgXJfCyTcw",
  },
});

const QRCode = require("qrcode");

async function generateQRCode(data) {
  try {
    const qrCode = await QRCode.toDataURL(data);
    return qrCode;
  } catch (err) {
    console.error(err);
  }
}

async function sendOrderEmail(userEmail, orderDetails, qrCode) {
  try {
    const mailOptions = {
      from: "computingproject43@gmail.com",
      to: userEmail,
      subject: "Order Confirmation",
      html: `
          <h1>Order Details</h1>
          <h2>Order ID: ${orderDetails._id}</h2>
          <p>Items:</p>
          <ul>
            ${orderDetails.items
              .map(
                (item) =>
                  `<li>${item.name} x${item.quantity} - Rs.${item.price.toFixed(
                    2
                  )}</li>`
              )
              .join("")}
          </ul>
          <p>Total: Rs.${orderDetails.price.toFixed(2)}</p>
          <p>Scan the QR code to view your order details:</p>
          <img src="${qrCode}" alt="QR Code" />
        `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  transporter,
  generateQRCode,
  sendOrderEmail,
};
