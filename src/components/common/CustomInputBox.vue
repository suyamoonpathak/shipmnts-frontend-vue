<template>
  <div class="input-container">
    <label :for="inputId" class="input-label">{{ label }}</label
    ><br />
    <input
      :placeholder="placeholder"
      :type="type"
      :value="value"
      class="input-field"
      :id="inputId"
      :class="{ error: hasError }"
      accept="image/*"
      step="any" 
      @input="$emit('update:value', $event.target.value)"
      @blur="validateInput"
    />
    <div v-if="hasError" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
    label: {
      type: String,
    },
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
      required: false,
    },
    inputId: {
      type: String,
    },
    
    required: {
      type: Boolean,
    },
    pattern: {
      type: String, 
     } 
  },
  data() {
    return {
      hasError: false, 
      errorMessage: "", 
    };
  },
  methods: {
    validateInput() {
      if (this.required && this.value === "") {
        this.hasError = true;
        this.errorMessage = "This field is required.";
      } else if (this.pattern && !new RegExp(this.pattern).test(this.value)) {
        this.hasError = true;
        if(this.label=="Email"){
          this.errorMessage = "Invalid email.";
        } else if(this.label=="Password"){ 
          this.errorMessage = "Password should be at least 5 characters long with at least a special alphabet, an uppercase letter and a digit.";
        } else if(this.label=="Username"){ 
          this.errorMessage = "Username should be at least 5 characters long.";
        } else if(this.label=="Rating"){
          this.errorMessage = "Rating can only be between 0 and 5";
        }
      } else {
        this.hasError = false;
        this.errorMessage = "";
      }
    },
  },
};
</script>
<style>
.input-container {
  width: 80%;
  margin: 0 auto;
  text-align: left;
  position: relative;
}

.input-label {
  margin-bottom: 10px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  text-align: left;
}

.input-field {
  height: 45px;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #23334f;
  background: transparent;
  color: #dbe2fb;
  width: 100%;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin-bottom: 15px;
  padding: 0px;
  outline: none;
  box-sizing: border-box;
}

.input-field:focus {
  box-sizing: border-box;
}

.input-field.error {
  border-color: #ff5252;
}

.error-message {
  color: #ff5252;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
}

.input-field::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
