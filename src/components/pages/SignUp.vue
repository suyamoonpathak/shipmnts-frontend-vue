<template>
  <div class="signup-page">
    <div class="box">
      <img src="./../../assets/logo.png" class="logo" />
      <CustomHeading1>Sign Up</CustomHeading1>
      <CustomInputBox
        label="Username"
        type="text"
        placeholder="Enter your username"
        :value="username"
        required="true"
        @update:value="username = $event"
      />
      <CustomInputBox
        label="Email"
        type="email"
        placeholder="Enter your email"
        :value="email"
        required="true"
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        @update:value="email = $event"
      />
      <CustomInputBox
        label="Password"
        type="password"
        placeholder="Choose a password"
        :value="password"
        required="true"
        pattern="^^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$"
        @update:value="password = $event"
      />
      <CustomInputBox
        label="Confirm Password"
        type="password"
        placeholder="Repeat your password"
        :value="confirmPassword"
        required="true"
        pattern="^^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$"
        @update:value="confirmPassword = $event"
      />
      <CustomCheckbox v-model="terms" @input="terms = $event">
        I accept the terms and conditions
      </CustomCheckbox>
      <div v-if="hasError" class="error-message">{{ errorMessage }}</div>
      <CustomAppButton class="primary" @click="submit">Sign Up</CustomAppButton>
      <div>
        <CustomParagraph
          >Already have an account? <CustomLink to="SignIn">Sign In</CustomLink>
        </CustomParagraph>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CustomInputBox from "../common/CustomInputBox.vue";
import CustomAppButton from "../common/CustomAppButton.vue";
import CustomHeading1 from "../common/CustomHeading1.vue";
import CustomParagraph from "../common/CustomParagraph.vue";
import CustomLink from "../common/CustomLink.vue";
import CustomCheckbox from "../common/CustomCheckbox.vue";
import { decodeJwtToken } from "../../../utils/jwtUtils";

export default {
  name: "SignUp",
  components: {
    CustomInputBox,
    CustomAppButton,
    CustomLink,
    CustomHeading1,
    CustomParagraph,
    CustomCheckbox,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      hasError: false,
      errorMessage: "",
    };
  },
  methods: {
    submit() {
      if (!this.username || !this.email || !this.password) {
        this.hasError = true;
        this.errorMessage = "Please enter all the fields";
      } else if (this.password != this.confirmPassword) {
        this.hasError = true;
        this.errorMessage = "Your passwords don't match";
      } else if (!this.terms) {
        this.hasError = true;
        this.errorMessage = "Please accept the terms first";
      } else{
        const userData = {
          username: this.username,
          email: this.email,
          password: this.password,
          terms: this.terms,
        };

        // Make an API call to the backend to register the user
        axios
          .post("shipmnts-practice-test.eu-north-1.elasticbeanstalk.com/api/signup", userData)
          .then((response) => {
            // Handle the response (e.g., show success message, redirect to login)
            localStorage.setItem("access_token", response.data.access_token);
            const accessToken = localStorage.getItem("access_token");
            const jwtPayload = decodeJwtToken(accessToken);
            const role = jwtPayload.role;

            if (role === "admin") {
              // this.$router.push("/AdminHome");
              console.log("Admin signup!");
            } else {
              // this.$router.push("/ClientHome");
              console.log("Client signup!");
            }
          })
          .catch((error) => {
            // Handle error (e.g., show error message)
            console.error("User signup failed:", error.response.data);
            this.hasError = true;
            this.errorMessage = error.response.data.message;
          });
      }
    },
  },
};
</script>
<style scoped>
.box {
  display: block;
  text-align: center;
  width: 100%;
  height: auto;
  max-width: 540px;
  padding: 60px 45px;
  margin: auto;
  box-shadow: 0px 0px 29.4px 0.6px rgba(0, 0, 0, 0.5);
  background: #001232;
}

.signup-page {
  display: flex;
  height: 100vh;
  background-image: url("../../assets/bg.jpg");
  background-size: cover;
  background-position: center;
}

.primary {
  margin: 5% auto;
}

.logo {
  width: 50%;
}

.error-message {
  margin-top: 3%;
  margin-bottom: -2%;
}

@media (max-width: 768px) {
  .logo {
    width: 70%;
  }
}
</style>
