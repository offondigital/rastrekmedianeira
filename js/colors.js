const systemColors = {
  primary: "#FFBB1C",
  secondary: "#F6C449",
  dark: "#0D0D0D",
  darkAlt: "#110D0A",
  light: "#FFFFFF",
  textMain: "#2A2622",
  whatsappStart: "#25D366",
  whatsappEnd: "#128C7E"
};

(function applyColors() {
  const r = document.documentElement.style;
  r.setProperty('--primary-color', systemColors.primary);
  r.setProperty('--secondary-color', systemColors.secondary);
  r.setProperty('--dark-color', systemColors.dark);
  r.setProperty('--dark-alt', systemColors.darkAlt);
  r.setProperty('--light-color', systemColors.light);
  r.setProperty('--text-main', systemColors.textMain);
  r.setProperty('--wa-start', systemColors.whatsappStart);
  r.setProperty('--wa-end', systemColors.whatsappEnd);
})();
