// function sendOTP() {
// var userType = document.getElementById("userTypeSelect").value;
// var email = document.getElementById("email").value;
// 
//     // TODO: Implement logic to send OTP to the email address.
// 
//     // For now, let's assume the OTP is sent successfully.
//     document.getElementById("emailInput").style.display = "none";
//     document.getElementById("otpInput").style.display = "block";
// }

// function verifyOTP() {
//     var otp = document.getElementById("otp").value;
// 
//     // TODO: Implement logic to verify the OTP.
// 
//     // For now, let's assume the OTP is verified successfully.
//     alert("OTP Verified Successfully!");
// 
//     // You can redirect the user to the respective page based on user type.
//     var userType = document.getElementById("userTypeSelect").value;
//     if (userType === "A") {
//         window.location.href = "userA.html";
//     } else if (userType === "B") {
//         window.location.href = "userB.html";
//     }
// }

function sendOTP() {
    var userType = document.getElementById("userTypeSelect").value;
    var email = document.getElementById("email").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/send_otp", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Set up the callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Assuming the server responds with success
            var response = JSON.parse(xhr.responseText);
            
            // Check if the response indicates success
            if (response.success) {
                document.getElementById("emailInput").style.display = "none";
                document.getElementById("otpInput").style.display = "block";
            } else {
                // Handle error scenario, e.g., display an error message
                alert("Failed to send OTP. Please try again.");
            }
        }
    };

    // Send the request with user type and email parameters
    var params = "userType=" + encodeURIComponent(userType) + "&email=" + encodeURIComponent(email);
    xhr.send(params);
}

function verifyOTP() {
    var otp = document.getElementById("otp").value;
    var userType = document.getElementById("userTypeSelect").value;

    // Use AJAX to send a request to the server to verify OTP
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/verify_otp", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Set up the callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Assuming the server responds with success
            var response = JSON.parse(xhr.responseText);
            console.log(response)
            // Check if the response indicates success
            if (response.success) {
                // Redirect the user to the respective page based on user type
                if (userType === "A") {
                    window.location.href = "userA.html";
                } else if (userType === "B") {
                    window.location.href = "userB.html";
                }
            } else {
                // Handle error scenario, e.g., display an error message
                alert("Failed to verify OTP. Please try again.");
            }
        }
    };

    // Send the request with OTP, user type, and email parameters
    var params = "otp=" + encodeURIComponent(otp) + "&userType=" + encodeURIComponent(userType);
    xhr.send(params);
}
