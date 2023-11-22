var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chintan.tops@gmail.com',
        pass: 'jdhw afvt pdzu ixuq'
    }
});

var mailOptions = {
    from: 'chintan.tops@gmail.com',
    to: 'chintan.tops@gmail.com',
    subject: 'Sending Email using Node.js',
    html: "<h1>Hello</h1>, hii, click on this link to verify <a href='https://www.fb.com'>Facebook</a>"
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});