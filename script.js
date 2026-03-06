particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#38bdf8" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#38bdf8",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3
    }
  }
});
var typed = new Typed("#typing", {
strings: [
"an Analytical Researcher",
"a Python Learner",
"a Future Software Developer",
"a Data Analyst"
],
typeSpeed: 60,
backSpeed: 40,
loop: true
});
