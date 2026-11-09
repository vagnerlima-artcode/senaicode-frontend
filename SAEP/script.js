// Estado da Aplicação em Memória
const state = {
  currentUser: null,
  records: [
    {
      id: 1,
      title: "Inspeção Preventiva da Correia Transportadora",
      operator: "Carlos Eduardo",
      avatar: "https://i.pravatar.cc/150?img=11",
      type: "inspeção",
      distanceKm: 2.5,
      timeHours: 1.0,
      efficiency: "98%",
      datetime: "08:30 - 09/11/26",
      likesCount: 3,
      likedBy: [],
      comments: ["Tudo dentro dos conformes."]
    },
    {
      id: 2,
      title: "Manutenção Corretiva na Válvula B-12",
      operator: "Ana Paula",
      avatar: "https://i.pravatar.cc/150?img=5",
      type: "manutenção",
      distanceKm: 1.2,
      timeHours: 2.5,
      efficiency: "92%",
      datetime: "10:15 - 09/11/26",
      likesCount: 5,
      likedBy: [],
      comments: []
    },
    {
      id: 3,
      title: "Ajuste de Parâmetros da Prensa Térmica",
      operator: "Roberto Alves",
      avatar: "https://i.pravatar.cc/150?img=12",
      type: "operação",
      distanceKm: 0.8,
      timeHours: 0.75,
      efficiency: "100%",
      datetime: "11:00 - 09/11/26",
      likesCount: 2,
      likedBy: [],
      comments: ["Calibração perfeita."]
    },
    {
      id: 4,
      title: "Lubrificação de Engrenagens Principais",
      operator: "Mariana Silva",
      avatar: "https://i.pravatar.cc/150?img=9",
      type: "manutenção",
      distanceKm: 3.0,
      timeHours: 1.5,
      efficiency: "95%",
      datetime: "13:45 - 09/11/26",
      likesCount: 1,
      likedBy: [],
      comments: []
    },
    {
      id: 5,
      title: "Ronda Geral de Segurança Operacional",
      operator: "Carlos Eduardo",
      avatar: "https://i.pravatar.cc/150?img=11",
      type: "inspeção",
      distanceKm: 4.2,
      timeHours: 2.0,
      efficiency: "99%",
      datetime: "15:20 - 09/11/26",
      likesCount: 4,
      likedBy: [],
      comments: []
    }
  ],
  activeCategory: "todas",
  currentPage: 1,
  itemsPerPage: 4,
  activeView: "feed" // 'feed' ou 'form'
};

// Credenciais Validadas
const VALID_USER = {
  email: "operador@empresa.com",
  password: "123456",
  name: "Vagner Lima",
  avatar: "https://i.pravatar.cc/150?img=7"
};

// Seletores DOM
const elements = {
  btnAuthAction: document.getElementById('btn-auth-action'),
  btnNavRegistros: document.getElementById('btn-nav-registros'),
  loginModal: document.getElementById('login-modal'),
  loginForm: document.getElementById('login-form'),
  loginEmail: document.getElementById('login-email'),
  loginPassword: document.getElementById('login-password'),
  loginEmailError: document.getElementById('login-email-error'),
  loginPasswordError: document.getElementById('login-password-error'),
  btnCloseModal: document.getElementById('btn-close-modal'),
  btnCancelLogin: document.getElementById('btn-cancel-login'),
  userProfileSection: document.getElementById('user-profile-section'),
  userAvatar: document.getElementById('user-avatar'),
  userName: document.getElementById('user-name'),
  feedView: document.getElementById('feed-view'),
  formView: document.getElementById('form-view'),
  cardsContainer: document.getElementById('cards-container'),
  recordForm: document.getElementById('record-form'),
  recordType: document.getElementById('record-type'),
  recordDistance: document.getElementById('record-distance'),
  recordTime: document.getElementById('record-time'),
  totalApontamentos: document.getElementById('total-apontamentos'),
  totalHoras: document.getElementById('total-horas'),
  btnFirstPage: document.getElementById('btn-first-page'),
  btnPrevPage: document.getElementById('btn-prev-page'),
  btnNextPage: document.getElementById('btn-next-page'),
  btnLastPage: document.getElementById('btn-last-page'),
  pageNumbersContainer: document.getElementById('page-numbers')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  render();
});

function setupEventListeners() {
  elements.btnAuthAction.addEventListener('click', () => {
    if (state.currentUser) {
      logout();
    } else {
      openModal();
    }
  });

  elements.btnCloseModal.addEventListener('click', closeModal);
  elements.btnCancelLogin.addEventListener('click', closeModal);
  elements.loginForm.addEventListener('submit', handleLoginSubmit);

  elements.btnNavRegistros.addEventListener('click', () => {
    if (!state.currentUser) {
      openModal();
      return;
    }
    state.activeView = state.activeView === 'form' ? 'feed' : 'form';
    render();
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!state.currentUser) {
        openModal();
        return;
      }
      state.activeCategory = e.target.dataset.category;
      state.currentPage = 1;
      render();
    });
  });

  elements.recordForm.addEventListener('submit', handleRecordSubmit);

  elements.btnFirstPage.addEventListener('click', () => changePage(1));
  elements.btnPrevPage.addEventListener('click', () => changePage(state.currentPage - 1));
  elements.btnNextPage.addEventListener('click', () => changePage(state.currentPage + 1));
  elements.btnLastPage.addEventListener('click', () => {
    const filtered = getFilteredRecords();
    const totalPages = Math.ceil(filtered.length / state.itemsPerPage) || 1;
    changePage(totalPages);
  });
}

function changePage(page) {
  if (!state.currentUser) {
    openModal();
    return;
  }
  state.currentPage = page;
  render();
}

function openModal() {
  clearLoginErrors();
  elements.loginModal.classList.remove('hidden');
}

function closeModal() {
  elements.loginModal.classList.add('hidden');
}

function clearLoginErrors() {
  elements.loginEmail.classList.remove('invalid');
  elements.loginPassword.classList.remove('invalid');
  elements.loginEmailError.textContent = '';
  elements.loginPasswordError.textContent = '';
}

function handleLoginSubmit(e) {
  e.preventDefault();
  clearLoginErrors();

  const email = elements.loginEmail.value.trim();
  const password = elements.loginPassword.value.trim();
  let isValid = true;

  if (!email || !password) {
    if (!email) {
      elements.loginEmail.classList.add('invalid');
      elements.loginEmailError.textContent = "email ou senha obrigatório";
    }
    if (!password) {
      elements.loginPassword.classList.add('invalid');
      elements.loginPasswordError.textContent = "email ou senha obrigatório";
    }
    return;
  }

  if (email !== VALID_USER.email || password !== VALID_USER.password) {
    elements.loginEmail.classList.add('invalid');
    elements.loginPassword.classList.add('invalid');
    elements.loginEmailError.textContent = "email ou senha incorreta";
    return;
  }

  state.currentUser = VALID_USER;
  closeModal();
  render();
}

function logout() {
  state.currentUser = null;
  state.activeView = 'feed';
  render();
}

function getFilteredRecords() {
  if (state.activeCategory === 'todas') return state.records;
  return state.records.filter(r => r.type === state.activeCategory);
}

function handleRecordSubmit(e) {
  e.preventDefault();
  const typeVal = elements.recordType.value;
  const distVal = elements.recordDistance.value.trim();
  const timeVal = elements.recordTime.value.trim();
  let isValid = true;

  document.querySelectorAll('#record-form .error-message').forEach(el => el.textContent = '');
  document.querySelectorAll('#record-form .invalid').forEach(el => el.classList.remove('invalid'));

  if (!typeVal) {
    elements.recordType.classList.add('invalid');
    document.getElementById('type-error').textContent = "Campo obrigatório";
    isValid = false;
  }
  if (!distVal) {
    elements.recordDistance.classList.add('invalid');
    document.getElementById('distance-error').textContent = "Campo obrigatório";
    isValid = false;
  }
  if (!timeVal) {
    elements.recordTime.classList.add('invalid');
    document.getElementById('time-error').textContent = "Campo obrigatório";
    isValid = false;
  }

  if (!isValid) return;

  // Conversão de unidades exigida no JavaScript
  const distanceKm = parseFloat(distVal) / 1000;
  const timeHours = parseFloat(timeVal) / 60;

  const now = new Date();
  const formattedDate = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} - ${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getFullYear()).slice(-2)}`;

  const newRecord = {
    id: Date.now(),
    title: `Apontamento de ${typeVal.charAt(0).toUpperCase() + typeVal.slice(1)}`,
    operator: state.currentUser.name,
    avatar: state.currentUser.avatar,
    type: typeVal,
    distanceKm: distanceKm,
    timeHours: timeHours,
    efficiency: "100%",
    datetime: formattedDate,
    likesCount: 0,
    likedBy: [],
    comments: []
  };

  // Inserção no topo da página 1
  state.records.unshift(newRecord);
  state.currentPage = 1;
  state.activeView = 'feed';
  elements.recordForm.reset();
  render();
}

function toggleLike(recordId) {
  if (!state.currentUser) {
    openModal();
    return;
  }
  const record = state.records.find(r => r.id === recordId);
  if (!record) return;

  const userIndex = record.likedBy.indexOf(state.currentUser.email);
  if (userIndex >= 0) {
    record.likedBy.splice(userIndex, 1);
    record.likesCount--;
  } else {
    record.likedBy.push(state.currentUser.email);
    record.likesCount++;
  }
  render();
}

function addComment(recordId, textInput) {
  if (!state.currentUser) {
    openModal();
    return;
  }
  const val = textInput.value.trim();
  const errorSpan = textInput.parentElement.nextElementSibling;

  if (val.length <= 2) {
    errorSpan.textContent = "não é possível enviar um comentário vazio";
    return;
  }
  errorSpan.textContent = '';
  const record = state.records.find(r => r.id === recordId);
  if (record) {
    record.comments.push(val);
    render();
  }
}

function render() {
  // Atualizar Estado de Autenticação na Top Bar
  if (state.currentUser) {
    elements.btnAuthAction.textContent = "Logout";
    elements.btnAuthAction.className = "btn-logout-top";
    elements.btnNavRegistros.removeAttribute('disabled');
    elements.userProfileSection.classList.remove('hidden');
    elements.userAvatar.src = state.currentUser.avatar;
    elements.userName.textContent = state.currentUser.name;
  } else {
    elements.btnAuthAction.textContent = "Login";
    elements.btnAuthAction.className = "btn-login-top";
    elements.btnNavRegistros.setAttribute('disabled', 'true');
    elements.userProfileSection.classList.add('hidden');
  }

  // Botão Registros Ativo
  if (state.activeView === 'form') {
    elements.btnNavRegistros.classList.add('active');
    elements.feedView.classList.add('hidden');
    elements.formView.classList.remove('hidden');
  } else {
    elements.btnNavRegistros.classList.remove('active');
    elements.feedView.classList.remove('hidden');
    elements.formView.classList.add('hidden');
  }

  // Atualizar Contadores da Planta
  elements.totalApontamentos.textContent = state.records.length;
  const sumHours = state.records.reduce((acc, r) => acc + r.timeHours, 0);
  elements.totalHoras.textContent = `${sumHours.toFixed(1)}h`;

  // Renderizar Feed e Paginação
  const filtered = getFilteredRecords();
  const totalPages = Math.ceil(filtered.length / state.itemsPerPage) || 1;
  if (state.currentPage > totalPages) state.currentPage = totalPages;

  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const paginatedRecords = filtered.slice(startIndex, startIndex + state.itemsPerPage);

  elements.cardsContainer.innerHTML = '';
  paginatedRecords.forEach(record => {
    const isLiked = state.currentUser && record.likedBy.includes(state.currentUser.email);
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.innerHTML = `
      <h3 class="card-title">${record.title}</h3>
      <div class="card-operator">
        <img src="${record.avatar}" alt="Foto do Operador" class="avatar-sm">
        <span>${record.operator}</span>
      </div>
      <div class="card-details">
        <p><strong>Deslocamento:</strong> ${record.distanceKm.toFixed(1)} km</p>
        <p><strong>Tempo:</strong> ${record.timeHours.toFixed(1)} h</p>
        <p><strong>Eficiência:</strong> ${record.efficiency}</p>
        <p><strong>Data/Hora:</strong> ${record.datetime}</p>
      </div>
      <div class="card-footer">
        <button class="interaction-btn btn-like-action">
          <img src="assets/like.svg" alt="Ícone Apoio" class="icon-like ${isLiked ? 'active' : ''}">
          <span>${record.likesCount}</span>
        </button>
        <button class="interaction-btn btn-chat-action">
          <img src="assets/chat.svg" alt="Ícone Comentário">
          <span>${record.comments.length}</span>
        </button>
      </div>
      <div class="comments-section hidden">
        <div class="comments-list">
          ${record.comments.map(c => `<div class="comment-item">&bull; ${c}</div>`).join('')}
        </div>
        <div class="comment-form">
          <input type="text" placeholder="Escrever um comentário...">
          <button class="btn-send-comment"><img src="assets/send.svg" alt="Enviar Comentário"></button>
        </div>
        <span class="error-message"></span>
      </div>
    `;

    // Bind Card Events
    const btnLike = cardEl.querySelector('.btn-like-action');
    btnLike.addEventListener('click', () => toggleLike(record.id));

    const btnChat = cardEl.querySelector('.btn-chat-action');
    const commentsSec = cardEl.querySelector('.comments-section');
    btnChat.addEventListener('click', () => {
      if (!state.currentUser) {
        openModal();
        return;
      }
      commentsSec.classList.toggle('hidden');
    });

    const btnSend = cardEl.querySelector('.btn-send-comment');
    const commentInput = cardEl.querySelector('.comment-form input');
    btnSend.addEventListener('click', () => addComment(record.id, commentInput));

    elements.cardsContainer.appendChild(cardEl);
  });

  // Atualizar Filtros Visuais
  document.querySelectorAll('.filter-btn').forEach(btn => {
    if (btn.dataset.category === state.activeCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Atualizar Paginação
  elements.btnFirstPage.disabled = state.currentPage === 1;
  elements.btnPrevPage.disabled = state.currentPage === 1;
  elements.btnNextPage.disabled = state.currentPage === totalPages;
  elements.btnLastPage.disabled = state.currentPage === totalPages;

  elements.pageNumbersContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pBtn = document.createElement('button');
    pBtn.className = `page-number-btn ${i === state.currentPage ? 'active' : ''}`;
    pBtn.textContent = i;
    pBtn.addEventListener('click', () => changePage(i));
    elements.pageNumbersContainer.appendChild(pBtn);
  }
}