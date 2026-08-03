// Chave de API do ambiente 
const apiKey = "";

// -------------------------------------------------------------
// 1. SISTEMA DE ACESSIBILIDADE E SÍNTESE DE VOZ
// -------------------------------------------------------------
function mudarTamanhoFonte(tamanho) {
  document.body.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
  document.body.classList.add('font-size-' + tamanho);
}

function falarTexto(texto) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Parar leituras anteriores

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-PT';
    utterance.rate = 0.9; // Velocidade ligeiramente mais lenta
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  } else {
    alert("O seu navegador não suporta a funcionalidade de leitura de voz.");
  }
}

// -------------------------------------------------------------
// 2. NAVEGAÇÃO ENTRE ABAS
// -------------------------------------------------------------
function mudarAba(nomeAba) {
  document.getElementById('sec-verificador').classList.add('hidden');
  document.getElementById('sec-guias').classList.add('hidden');
  document.getElementById('sec-quiz').classList.add('hidden');
  document.getElementById('sec-emergencia').classList.add('hidden');

  const abas = ['verificador', 'guias', 'quiz', 'emergencia'];
  abas.forEach(tab => {
    const btn = document.getElementById('tab-' + tab);
    btn.classList.remove('bg-blue-600', 'text-white');
    btn.classList.add('bg-slate-100', 'text-slate-800');
  });

  document.getElementById('sec-' + nomeAba).classList.remove('hidden');
  const btnAtivo = document.getElementById('tab-' + nomeAba);
  btnAtivo.classList.remove('bg-slate-100', 'text-slate-800');
  btnAtivo.classList.add('bg-blue-600', 'text-white');

  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

// -------------------------------------------------------------
// 3. EXEMPLOS RÁPIDOS
// -------------------------------------------------------------
function usarExemplo(tipo) {
  const campo = document.getElementById('texto-mensagem');
  if (tipo === 1) {
    campo.value = "Olá mãe, troquei de número. Preciso que me faças uma transferência urgente de 200 euros para pagar uma conta. Podes fazer já?";
  } else if (tipo === 2) {
    campo.value = "BANCO: Prezado cliente, a sua conta tem uma pendência com risco de bloqueio em 2 horas. Aceda ao link oficial para regularizar: http://banco-seguro.xyz/login";
  } else if (tipo === 3) {
    campo.value = "PARABÉNS! O seu número foi sorteado e ganhou um prémio de 5.000 Euros! Para receber, faça uma transferência de 20 euros de taxa administrativa.";
  }
}

function limparVerificador() {
  document.getElementById('texto-mensagem').value = '';
  document.getElementById('resultado-container').classList.add('hidden');
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

// -------------------------------------------------------------
// 4. VERIFICAÇÃO DE MENSAGENS E INTEGRAÇÃO IA
// -------------------------------------------------------------
async function chamarGeminiApi(promptTexto) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: promptTexto }] }],
    systemInstruction: {
      parts: [{
        text: "Você é o 'Guia Digital', um assistente especializado em proteger idosos contra burlas na internet. Responda em PORTUGUÊS DE PORTUGAL de forma muito simples, clara e sem termos técnicos complexos. Diga claramente se é BURLA, SUSPEITO ou SEGURO. Retorne uma resposta em formato JSON estrito: {\"perigo\": \"ALTO\"|\"MEDIO\"|\"BAIXO\", \"titulo\": \"string\", \"explicacao\": \"string\", \"recomendacao\": \"string\"}"
      }]
    },
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i < 5; i++) {
    /* Estilos Customizados de Acessibilidade e Leitura */
:root {
  --font-scale: 1.1;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: calc(1rem * var(--font-scale));
  line-height: 1.6;
  background-color: #f4f6f9;
  color: #1a202c;
}

/* Modos de Tamanho da Fonte */
.font-size-sm { --font-scale: 1.0; }
.font-size-md { --font-scale: 1.25; }
.font-size-lg { --font-scale: 1.45; }

/* Botões Grandes e Fáceis de Pressionar */
.btn-senior {
  min-height: 54px;
  padding: 12px 24px;
  font-weight: 700;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.15s ease, background-color 0.15s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-senior:active {
  transform: scale(0.97);
}

/* Cartões de Alto Contraste */
.card-senior {
  background-color: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* Destaque de Foco para Acessibilidade */
button:focus, input:focus, textarea:focus {
  outline: 4px solid #2563eb !important;
  outline-offset: 2px;
}try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return JSON.parse(rawText);
      }
    } catch (e) {
      // Tentar novamente em silêncio
    }
    await new Promise(r => setTimeout(r, delays[i]));
  }

  throw new Error("Erro ao ligar ao serviço.");
}

function analiseHeuristicaLocal(texto) {
  const t = texto.toLowerCase();
  if (t.includes('urgente') || t.includes('mudei de número') || t.includes('link') || t.includes('ganhou')) {
    return {
      perigo: "ALTO",
      titulo: "🚨 ATENÇÃO: PERIGO DE BURLA DETECTADO!",
      explicacao: "Esta mensagem apresenta fortes indícios de ser uma burla (pedido urgente de dinheiro, links falsos ou falsas promessas).",
      recomendacao: "NÃO envie dinheiro e NÃO clique em nenhum link. Confirme sempre por telefone com a pessoa por uma chamada normal."
    };
  }
  return {
    perigo: "MEDIO",
    titulo: "⚠️ MANTENHA A CAUTELA",
    explicacao: "Tenha atenção a mensagens de remetentes desconhecidos.",
    recomendacao: "Nunca partilhe códigos de validação nem senhas."
  };
}

async function analisarMensagem() {
  const texto = document.getElementById('texto-mensagem').value.trim();
  const resContainer = document.getElementById('resultado-container');
  const btnAnalisar = document.getElementById('btn-analisar');

  if (!texto) {
    alert("Por favor, digite ou cole uma mensagem para analisar.");
    return;
  }

  btnAnalisar.disabled = true;
  btnAnalisar.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> A analisar...`;
  resContainer.classList.remove('hidden');
  resContainer.innerHTML = `<div class="text-center py-6"><p class="font-bold text-slate-700">O assistente está a analisar a sua mensagem...</p></div>`;

  let resultado;
  try {
    resultado = await chamarGeminiApi(`Analise esta mensagem enviada a um idoso e verifique se é burla: "${texto}"`);
  } catch (err) {
    resultado = analiseHeuristicaLocal(texto);
  } finally {
    btnAnalisar.disabled = false;
    btnAnalisar.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Verificar se é Perigoso`;
  }

  const textoParaVoz = `${resultado.titulo}. ${resultado.explicacao}. Recomendação: ${resultado.recomendacao}`;

  resContainer.innerHTML = `
    <div class="border-l-8 border-red-500 bg-red-50 p-4 rounded-xl space-y-4">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-2xl font-black text-red-900">${resultado.titulo}</h3>
        <button onclick="falarTexto(\`${textoParaVoz.replace(/"/g, "'")}\`)" class="bg-white border p-2 rounded-xl">
          <i class="fa-solid fa-volume-high text-xl text-blue-600"></i>
        </button>
      </div>
      <p class="text-lg"><strong>Explicação:</strong> ${resultado.explicacao}</p>
      <p class="text-base font-bold text-blue-900">💡 O que fazer: ${resultado.recomendacao}</p>
    </div>
  `;

  falarTexto(textoParaVoz);
}

// -------------------------------------------------------------
// 5. QUIZ DE PREVENÇÃO
// -------------------------------------------------------------
const perguntasQuiz = [
  {
    pergunta: "Recebe uma mensagem no WhatsApp do seu 'filho' a pedir dinheiro urgente de um número novo. O que faz?",
    opcoes: [
      { texto: "A) Envio o dinheiro imediatamente.", correta: false },
      { texto: "B) Ligue para o número antigo do seu filho para confirmar.", correta: true }
    ],
    explicacao: "Correto! Confirme sempre por chamada telefónica para o número habitual antes de fazer qualquer transferência."
  }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;

function carregarPergunta() {
  const q = perguntasQuiz[indicePerguntaAtual];
  document.getElementById('quiz-pergunta').innerText = q.pergunta;
  const containerOpcoes = document.getElementById('quiz-opcoes');
  containerOpcoes.innerHTML = '';

  q.opcoes.forEach(opcao => {
    const btn = document.createElement('button');
    btn.className = "w-full text-left p-4 rounded-xl border-2 border-slate-300 hover:border-blue-600 font-semibold text-slate-800";
    btn.innerText = opcao.texto;
    btn.onclick = () => responderQuiz(opcao.correta, q.explicacao);
    containerOpcoes.appendChild(btn);
  });
}

function responderQuiz(isCorreta, explicacao) {
  const feedback = document.getElementById('quiz-feedback');
  feedback.classList.remove('hidden');
  if (isCorreta) {
    pontuacao += 10;
    document.getElementById('quiz-placar').innerText = `Pontos: ${pontuacao}`;
    feedback.innerHTML = `<strong>Resposta Correta!</strong> ${explicacao}`;
  } else {
    feedback.innerHTML = `<strong>Opção Perigosa!</strong> ${explicacao}`;
  }
}

window.onload = function() {
  carregarPergunta();
};