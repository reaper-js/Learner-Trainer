from flask import Flask, render_template, request, redirect, url_for
from flask_mail import Mail, Message
import random

app = Flask(__name__, template_folder='frontend')

# Flask-Mail configuration
## app.config['MAIL_SERVER'] = 'smtp.gmail.com'
## app.config['MAIL_PORT'] = 578
## app.config['MAIL_USE_TLS'] = True
## app.config['MAIL_USE_SSL'] = False
## app.config['MAIL_USERNAME'] = 'creatingwebsitein1hr@gmail.com'
## app.config['MAIL_PASSWORD'] = 'Welcome@2024'

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'bbonzana@gmail.com'
app.config['MAIL_PASSWORD'] = 'eojchcxcrdozgnkb'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False 

mail = Mail(app)

otp_storage = {}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send_otp", methods=["POST"])
def send_otp():
    user_type = request.form.get("userType")
    email = request.form.get("email")
   # print("this seems ok")
    #print(email)
    # Generate a random 6-digit OTP
    otp = str(random.randint(100000, 999999))

    # Store the OTP
    otp_storage[email] = otp

   # print(otp_storage)
    # Compose and send the email
    msg = Message('Your OTP for Login', sender='bbonzana@gmail.com', recipients=[email])
    msg.body = f'Your OTP is: {otp}'
    print(msg)
    mail.send(msg)

    return render_template("otp.html")

@app.route("/verify_otp", methods=["POST"])
def verify_otp():
    user_type = request.form.get("userType")
    email = request.form.get("email")
    user_otp = request.form.get("otp")

    # Retrieve stored OTP
    stored_otp = otp_storage.get(email)

    if stored_otp and user_otp == stored_otp:
        # Successful OTP verification
        return redirect(url_for(f"{user_type.lower()}_dashboard"))
    else:
        # Incorrect OTP
        return render_template("otp.html", error="Invalid OTP")

@app.route("/user_a_dashboard")
def user_a_dashboard():
    return "Welcome Learner!"

@app.route("/user_b_dashboard")
def user_b_dashboard():
    return "Welcome Trainer!"

if __name__ == "__main__":
    app.run(debug=True)
