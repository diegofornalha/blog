const bszCaller = {
  // Faz uma chamada para uma URL especificada e chama uma função de retorno com os dados retornados
  fetch(url, callback) {
    const callbackName = `BusuanziCallback_${Math.floor(Math.random() * 1099511627776)}`;
    window[callbackName] = this.evalCall(callback);
    url = url.replace('=BusuanziCallback', `=${callbackName}`);

    const scriptTag = document.createElement('SCRIPT');
    scriptTag.type = 'text/javascript';
    scriptTag.defer = true;
    scriptTag.src = url;
    document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
  },
  // Retorna uma função que avalia o retorno da chamada de URL
  evalCall(callback) {
    return data => {
      ready(() => {
        try {
          callback(data);
          scriptTag.parentElement.removeChild(scriptTag);
        } catch (error) {
          bszTag.hides();
        }
      });
    };
  },
};

// Faz uma chamada para o URL especificado e atualiza o texto e a exibição dos elementos do bszTag
bszCaller.fetch(
  '//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback',
  data => {
    bszTag.texts(data);
    bszTag.shows();
  },
);

const bszTag = {
  bszs: ['site_pv', 'page_pv', 'site_uv'],
  // Atualiza o texto de cada elemento do bszTag com os dados fornecidos
  texts(data) {
    this.bszs.forEach(bsz => {
      const element = document.getElementById(`busuanzi_value_${bsz}`);
      if (element) {
        element.innerHTML = data[bsz];
      }
    });
  },
  // Oculta cada elemento do bszTag
  hides() {
    this.bszs.forEach(bsz => {
      const element = document.getElementById(`busuanzi_container_${bsz}`);
      if (element) {
        element.style.display = 'none';
      }
    });
  },
  // Exibe cada elemento do bszTag
  shows() {
    this.bszs.forEach(bsz => {
      const element = document.getElementById(`busuanzi_container_${bsz}`);
      if (element) {
        element.style.display = 'inline';
      }
    });
  },
};

// Executa uma função quando o documento estiver pronto

function ready(fn) {
  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    fn.call(document);
  } else {
    bszTag.push(() => fn.call(this));
  }
}

// Executa todas as funções armazenadas em bszTag e limpa o array
function d() {
  bszTag.forEach(fn => fn.apply(document));
  bszTag = [];
}

// Marcador de prontidão do documento e limpeza do intervalo
function e() {
  if (!a) {
    a = true;
    d.call(window);
    if (document.removeEventListener) {
      document.removeEventListener('DOMContentLoaded', e, false);
    } else {
      document.attachEvent &&
        document.detachEvent('onreadystatechange', e) &&
        (window == window.top && (clearInterval(c), (c = null)));
    }
  }
}

// Verifica se o documento está pronto e chama a função de marcador de prontidão do documento
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', e, false);
} else {
  document.attachEvent &&
    (document.attachEvent('onreadystatechange', function() {
      /loaded|complete/.test(document.readyState) && e();
    }),
    window == window.top &&
      (c = setInterval(function() {
        try {
          a || document.documentElement.doScroll('left');
        } catch (b) {
          return;
        }
        e();
      }, 5)));
}
