import { useEffect, useState } from "react";
import Logo from "../OW-Logo.svg";
import "./unsubscribeform.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const SITE_KEY = "6LepYnkoAAAAAFCTztSJTtV2TFhRT6IzGkgqP8DE";

function Unsubscribeform() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      "recaptcha-key",
      `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`,
      function () {
        console.log("Script loaded!");
      }
    );
  }, []);

  const isValidEmail = (email) => {
    // Regular expression for a valid email address
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    let alertMessage = "";

    // Check if email is provided and it's a valid email address
    if (!email || !isValidEmail(email)) {
      alertMessage += "Please provide a valid email address.\n";
    }

    // Check if at least one type is selected
    if (selectedTypes.length === 0) {
      alertMessage += "Please select at least one Type.\n";
    }

    // Check if at least one reason is selected
    if (selectedReasons.length === 0) {
      alertMessage += "Please select at least one Reason.";
    }

    if (alertMessage) {
      alert(alertMessage);
    } else {
      setLoading(true);
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action: "submit" })
          .then((token) => {
            submitData(token);
          });
      });
    }
  };

  const submitData = (token) => {
    // call a backend API to verify reCAPTCHA response
    axios
      .post("https://ow-unsubscribe-backend.vercel.app/verify", {
        email: email,
        selectedTypes: selectedTypes,
        selectedReasons: selectedReasons,
        "g-recaptcha-response": token,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          console.log("CAPTCHA Verification Successful:", res.data);
          navigate("/success");
        } else {
          console.error("CAPTCHA Verification Failed:", res.data);
        }
        setResponse(res.data);
      })
      .catch((error) => {
        console.error("CAPTCHA Verification Error:", error);
      });
  };

  // Function to handle type checkbox selection
  const handleTypeCheckboxChange = (e) => {
    const selectedType = e.target.value;
    if (e.target.checked) {
      setSelectedTypes([...selectedTypes, selectedType]);
    } else {
      setSelectedTypes(selectedTypes.filter((type) => type !== selectedType));
    }
  };

  // Function to handle reason checkbox selection
  const handleReasonCheckboxChange = (e) => {
    const selectedReason = e.target.value;
    if (e.target.checked) {
      setSelectedReasons([...selectedReasons, selectedReason]);
    } else {
      setSelectedReasons(
        selectedReasons.filter((reason) => reason !== selectedReason)
      );
    }
  };

  return (
    <div className="container">
      <img src={Logo} alt="Oscar Wylee" />
      <div className="title">Notification Unsubscribe</div>
      <div className="form-container">
        <form>
          <div>
            <label>Email: </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="checkbox-group-type">
            <p>
              I would like to unsubscribe from:{" "}
              <span style={{ color: "red" }}>*</span>
            </p>

            <label>
              <input
                type="checkbox"
                value="Email"
                onChange={handleTypeCheckboxChange}
              />{" "}
              Email
            </label>

            <label>
              <input
                type="checkbox"
                value="SMS"
                onChange={handleTypeCheckboxChange}
              />{" "}
              SMS
            </label>

            <label>
              <input
                type="checkbox"
                value="Direct Mail"
                onChange={handleTypeCheckboxChange}
              />{" "}
              Direct Mail
            </label>
          </div>

          <div className="checkbox-group-reason">
            <p>
              Select one or more reasons for unsubscribing:{" "}
              <span style={{ color: "red" }}>*</span>
            </p>
            <label>
              <input
                type="checkbox"
                name="unsubscribeReason"
                value="notInterested"
                onChange={handleReasonCheckboxChange}
              />{" "}
              No longer interested
            </label>
            <label>
              <input
                type="checkbox"
                name="unsubscribeReason"
                value="tooManyEmails"
                onChange={handleReasonCheckboxChange}
              />{" "}
              Too many emails
            </label>
            <label>
              <input
                type="checkbox"
                name="unsubscribeReason"
                value="notRelevant"
                onChange={handleReasonCheckboxChange}
              />{" "}
              Content not relevant
            </label>
          </div>

          <div className="btn-container">
            {" "}
            <button
              onClick={handleOnClick}
              disabled={loading}
              className="btn-container"
            >
              {loading ? "Unsubscribing..." : "Unsubscribe"}
            </button>
          </div>
        </form>
      </div>
      <p className="return">
        <a href="https://oscarwylee.com.au/">Return to oscarwylee.com.au</a>
      </p>
    </div>
  );
}

export default Unsubscribeform;
