export const Verification_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Your Email</title>
<style>
body {
 font-family: Arial, sans-serif;
 margin: 0;
 padding: 0;
 background-color: #f4f4f4;
}
 .container {
 max-width: 600px;
 margin: 30px auto;
 background: #ffffff;
 border-radius: 8px;
 box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
 overflow: hidden;
 border: 1px solid #ddd;
 }
 .header {
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
 .content {
  padding: 30px;
  color: #333333;
  line-height: 1.6;
 }
 .content p {
  margin: 0 0 15px;
 }
 .verification-code {
 display: block;
 font-size: 32px;
 font-weight: bold;
 letter-spacing: 5px;
 color: #4CAF50;
 text-align: center;
 margin: 20px 0;
 }
 .footer {
 background-color: #f4f4f4;
 padding: 15px;
 text-align: center;
 color: #777777;
 font-size: 12px;
 border-top: 1px solid #ddd;
}
 </style>
</head>
<body>
<div class="container">
 <div class="header">Verify Your Email</div>
 <div class="content">
 <p>Hello,</p>
 <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>
<span class="verification-code">{verificationCode}</span>
<p>If you did not create an account, no further action is required. If you have any questions, feel free to reach out.</p>
 </div>
 <div class="footer">
  <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
 </div>
 </div>
</body>
</html>`



export const Welcome_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Welcome to Our Community</title>
 <style>
  body {
   font-family: Arial, sans-serif;
   margin: 0;
   padding: 0;
   background-color: #f4f4f4;
   color: #333;
  }
  .container {
 max-width: 600px;
 margin: 30px auto;
 background: #ffffff;
 border-radius: 8px;
 box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
 overflow: hidden;
 border: 1px solid #ddd;
 }
 .header {
 background-color: #4CAF50;
 color: white;
 padding: 20px;
 text-align: center;
 font-size: 24px;
 font-weight: bold;
 }
 .content {
  padding: 30px;
  color: #333333;
  line-height: 1.6;
 }


 .welcome-message {
  font-size: 18px;
  font-weight: bold;
 }
 .content p {
 margin: 0 0 15px;
 }
 .content ul {
  margin: 0 0 15px;
  padding-left: 20px;
 }
 .content li {
 margin-bottom: 8px;
 }
 .button {
display: inline-block;
background-color: #4CAF50;
color: white;
padding: 10px 20px;
text-decoration: none;
border-radius: 5px;
margin: 15px 0;
 }
 .footer {
 background-color: #f4f4f4;
 padding: 15px;
 text-align: center;
 color: #777777;
 font-size: 12px;
 border-top: 1px solid #ddd;
 }
 </style>
</head>

<body>
<div class="container">
<div class="header">Welcome to Our Community!</div>
<div class="content">
 <p class="welcome-message">Hello {name},</p>
 <p>We&rsquo;re thrilled to have you join us! Your registration was successful, and we&rsquo;re committed to providing you with the best experience.</p>
 <p>Here&rsquo;s how you can get started:</p>
 <ul>
 <li>Explore our features and customize your experience.</li>
 <li>Stay informed by checking out our blog for the latest updates and tips.</li>
 <li>Reach out to our support team if you have any questions or need assistance.</li>
 </ul>
 <a href="#" class="button">Get Started</a>
 <p>If you need any help, don&rsquo;t hesitate to contact us. We&rsquo;re here to support you every step of the way.</p>
 </div>
 <div class="footer">
  <p>&copy; \${new Date().getFullYear()} Your Company. All rights reserved.</p>
</div> </div>
</body>
</html>
`;