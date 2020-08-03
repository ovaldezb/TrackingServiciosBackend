'use strict'

const nodemailer = require('nodemailer');
/*let transport = nodemailer.createTransport({
    host:'mail.nuestrosite.com',
   port:'465',
   auth:{
       user:'reparaciones@tdm.mx',
       pass:'Marcio123'
   },
   tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  } 
});*/

//const SMTPConnection = require("nodemailer/lib/smtp-connection");
/*let options = {
    port:465,
    host:'mail.nuestrosite.com',
    secure: true
};
let auth  = {
    credentials:{
       user:'reparaciones@tdm.mx',
       pass:'Marcio123' 
    }
}
let connection = new SMTPConnection(options);*/

var controller = {
    sendEmail: (req,res) =>{
        /*let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 587,            
            auth: {
              user: "f70bd46706fc42",
              pass: "8b1d04f3511e83"
            }            
          });*/
          let transporter = nodemailer.createTransport({
            host: "smtp.mail.yahoo.com",
            port: 587,
            //secure: false,
            auth: {
              user: "vbomar@yahoo.com.mx",
              pass: "meaburreHSBC"
            }/*,
            tls: {
             // do not fail on invalid certs
             rejectUnauthorized: false
            }*/
        });

        transporter.verify(function(error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
              console.log(success);
            }
          });

          const message = {
            from: 'omar.valdez@protonmail.com',
            to: 'reparaciones@tdm.mx', // List of recipients
            subject: 'Design Your Model S | Tesla', // Subject line
            html: '<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p>'
        };
          transporter.sendMail(message)
            .then(info=>{
              console.log(info);
            })
            .catch(err=>{
                console.log(err);
            });

          transporter.close();

        /*
        transport.sendMail(message,(err,info)=>{
            if(err){
                console.log(err);
                return err;
            }else{
                console.log(info);
                return info;
            }
        });
        transport.close();*/
    }
}

module.exports = controller;
