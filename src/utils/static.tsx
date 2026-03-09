export const authSliderData = [
  {
    image: "/assets/banner1.png",
    title: "Join 200+ Trusted  & Leading Global Partners",
    description:
      "Access exclusive opportunities and commission structures tailored to your agency's success.",
  },
  {
    image: "/assets/banner2.png",
    title: "Access a Wide Network of Top Universities",
    description:
      "Expand your portfolio with direct access to top universities in the UK, US, Canada, and more.",
  },
];
export const ErrorMessage = {
  REQUIRED: "This field is mandatory",
  INVALID_EMAIL: "Invalid email address",
  INVALID_PHONE: "Please enter a valid number",
  NO_SPECIAL_CHARACTERS: "Cannot have special characters",
  MAX_15_CHAR: "Please enter at most 15 characters",
  MIN_2_CHAR: "Please enter at least 2 characters",
};
export const Regex = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$|^$/,
  NAME: /^[a-zA-Z ]+$/,
  PHONE: /^[0-9]\d{9}$|^$/,
  AT_LEAST_EIGHT_CHAR: /^.{8,}$/,
  AT_LEAST_ONE_UPPER_CHAR: /.*[A-Z].*/,
  AT_LEAST_ONE_NUMBER: /^(?=.*\d)/,
  AT_LEAST_ONE_SPECIAL_CHAR: /^(?=.*[#?!@$%^&*-]).*$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
};
