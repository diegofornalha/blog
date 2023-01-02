(function(e, t, a) {
  // Cria um elemento div único para ser usado em todas as formas de coração
  var heartElement = document.createElement("div");
  heartElement.className = "heart";

  // Um array para armazenar informações sobre cada forma de coração
  var hearts = [];

  // Uma função para animar as formas de coração
  function animateHearts() {
    // Loop pelo array de corações
    for (var i = 0; i < hearts.length; i++) {
      var heart = hearts[i];
      // Se o valor alpha do coração for 0, remove da página e do array
      if (heart.alpha <= 0) {
        t.body.removeChild(heart.el);
        hearts.splice(i, 1);
        // Caso contrário, atualiza as propriedades do coração e aplica as alterações no elemento
      } else {
        heart.y--;
        heart.scale += 0.004;
        heart.alpha -= 0.013;
        heart.el.style.cssText =
          "left:" +
          heart.x +
          "px;top:" +
          heart.y +
          "px;opacity:" +
          heart.alpha +
          ";transform:scale(" +
          heart.scale +
          "," +
          heart.scale +
          ") rotate(45deg);background:#0f0;z-index:99999";
      }
    }
    // Solicita o próximo quadro de animação
    requestAnimationFrame(animateHearts);
  }

  // Adiciona prefixos de fornecedor aos estilos CSS
  function addStyles(css) {
    var head = t.getElementsByTagName("head")[0];
    var style = t.createElement("style");
    style.type = "text/css";
    try {
      style.appendChild(t.createTextNode(css));
    } catch (e) {
      style.styleSheet.cssText = css;
    }
    head.appendChild(style);
  }
  addStyles(
    ".heart{width: 10px;height: 10px;position: fixed;background: #0f0;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
  );

  // Configura um ouvinte de evento de clique no objeto window
  e.addEventListener("click", function(e) {
    // Cria um novo objeto para armazenar informações sobre a nova forma de coração
    var heart = {
      el: heartElement.cloneNode(),
      x: e.clientX - 5,
      y: e.clientY - 5,
      scale: 1,
      alpha: 1,
      color: "#0f0"
    };
    // Adiciona o novo coração na página e no array
    t.body.appendChild(heart.el);
    hearts.push(heart);
  });

  // Inicia a animação das formas de coração
  animateHearts();
})(window, document);
