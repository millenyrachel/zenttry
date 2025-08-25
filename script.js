// Sistema de Controle de Acesso para LABs
class AccessControlSystem {
    constructor() {
        this.currentUser = null;
        this.people = JSON.parse(localStorage.getItem('people')) || [];
        this.labs = JSON.parse(localStorage.getItem('labs')) || [];
        this.accessLogs = JSON.parse(localStorage.getItem('accessLogs')) || [];
        this.accessPermissions = JSON.parse(localStorage.getItem('accessPermissions')) || {};
        
        this.init();
    }

    init() {
        console.log('Initializing AccessControlSystem...');
        this.setupEventListeners();
        this.checkAuth();
        if (this.currentUser) {
            this.loadDashboard();
        }
        console.log('Initialization complete');
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close') || e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.querySelector('.sidebar-toggle');
            
            if (sidebar && sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                this.closeSidebar();
            }
        });
    }

    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === 'admin123') {
            this.currentUser = { username, role: 'admin' };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.closeSidebar();
            this.showDashboard();
        } else {
            alert('Usuário ou senha incorretos!');
        }
    }

    checkAuth() {
        const savedUser = localStorage.getItem('currentUser');
        console.log('Checking auth, savedUser:', savedUser);
        
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.closeSidebar();
            this.showDashboard();
        } else {
            console.log('No user logged in, showing login screen');
            document.querySelector('.dashboard').style.display = 'none';
            document.querySelector('.container').style.display = 'flex';
        }
    }

    showDashboard() {
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.dashboard').style.display = 'block';
        this.loadDashboard();
        this.updateActiveSidebarItem(document.querySelector('.sidebar-item[onclick*="showDashboard"]'));
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        document.querySelector('.dashboard').style.display = 'none';
        document.querySelector('.container').style.display = 'flex';
        document.getElementById('loginForm').reset();
        this.closeSidebar();
    }

    loadDashboard() {
        const dashboard = document.querySelector('.dashboard');
        if (!dashboard) return;

        dashboard.innerHTML = `
            <div class="dashboard-header">
                <div class="logo-container">
                    <div class="logo-placeholder" style="width: 60px; height: 60px; font-size: 1.5rem; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-family: 'Playfair Display', serif; font-weight: 700;">
                        Z
                    </div>
                    <div class="logo-text" style="font-size: 1.2rem; font-family: 'Playfair Display', serif; font-weight: 600; color: #22c55e;">Zenttry</div>
                </div>
                <h1>Sistema de Controle de Acesso</h1>
                <p>Bem-vindo, ${this.currentUser?.username || 'Usuário'}!</p>
            </div>

            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-content">
                        <h3>${this.people.length}</h3>
                        <p>Pessoas Cadastradas</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏢</div>
                    <div class="stat-content">
                        <h3>${this.labs.length}</h3>
                        <p>LABs Ativos</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-content">
                        <h3>${this.accessLogs.length}</h3>
                        <p>Total de Acessos</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-content">
                        <h3>${this.accessLogs.filter(log => log.status === 'authorized').length}</h3>
                        <p>Acessos Autorizados</p>
                    </div>
                </div>
            </div>

            <div class="dashboard-chart">
                <h3>📈 Gráfico de Acessos - Últimos 7 Dias</h3>
                <div id="accessChart"></div>
            </div>

            <div class="dashboard-actions">
                <div class="action-grid">
                    <div class="action-card">
                        <h3>👥 Gerenciar Pessoas</h3>
                        <p>Cadastre, edite e gerencie pessoas que terão acesso aos LABs</p>
                        <button class="btn btn-primary" onclick="system.showPeopleManagement()">
                            Gerenciar Pessoas
                        </button>
                    </div>

                    <div class="action-card">
                        <h3>🏢 Gerenciar LABs</h3>
                        <p>Crie e configure LABs com suas respectivas portas e fechaduras</p>
                        <button class="btn btn-primary" onclick="system.showLabManagement()">
                            Gerenciar LABs
                        </button>
                    </div>

                    <div class="action-card">
                        <h3>📊 Logs de Acesso</h3>
                        <p>Visualize todos os registros de acesso aos LABs</p>
                        <button class="btn btn-primary" onclick="system.showAccessLogs()">
                            Ver Logs
                        </button>
                    </div>

                    <div class="action-card">
                        <h3>🔑 Controle de Acesso</h3>
                        <p>Teste o sistema de controle de acesso em tempo real</p>
                        <button class="btn btn-primary" onclick="system.showAccessControl()">
                            Controle de Acesso
                        </button>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => this.renderChart(), 100);
    }
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open');
    }

    updateActiveSidebarItem(activeItem) {
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    generateChartData() {
        const last7Days = [];
        const authorizedData = [];
        const deniedData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            last7Days.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
            
            const dayStart = new Date(date);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(date);
            dayEnd.setHours(23, 59, 59, 999);
            
            const dayLogs = this.accessLogs.filter(log => {
                const logDate = new Date(log.timestamp);
                return logDate >= dayStart && logDate <= dayEnd;
            });
            
            const authorized = dayLogs.filter(log => log.status === 'authorized').length;
            const denied = dayLogs.filter(log => log.status === 'denied').length;
            
            authorizedData.push(authorized);
            deniedData.push(denied);
        }
        
        return { last7Days, authorizedData, deniedData };
    }

    renderChart() {
        const chartData = this.generateChartData();
        const chartContainer = document.getElementById('accessChart');
        
        if (!chartContainer) return;
        
        const maxValue = Math.max(...chartData.authorizedData, ...chartData.deniedData);
        const chartHeight = 200;
        
        let chartHTML = '<div class="chart-container">';
        chartHTML += '<div class="chart-bars">';
        
        chartData.last7Days.forEach((day, index) => {
            const authorizedHeight = maxValue > 0 ? (chartData.authorizedData[index] / maxValue) * chartHeight : 0;
            const deniedHeight = maxValue > 0 ? (chartData.deniedData[index] / maxValue) * chartHeight : 0;
            
            chartHTML += `
                <div class="chart-column">
                    <div class="chart-bar-group">
                        <div class="chart-bar authorized" style="height: ${authorizedHeight}px" title="${chartData.authorizedData[index]} autorizados"></div>
                        <div class="chart-bar denied" style="height: ${deniedHeight}px" title="${chartData.deniedData[index]} negados"></div>
                    </div>
                    <div class="chart-label">${day}</div>
                </div>
            `;
        });
        
        chartHTML += '</div>';
        chartHTML += '<div class="chart-legend">';
        chartHTML += '<div class="legend-item"><span class="legend-color authorized"></span> Autorizados</div>';
        chartHTML += '<div class="legend-item"><span class="legend-color denied"></span> Negados</div>';
        chartHTML += '</div>';
        chartHTML += '</div>';
        
        chartContainer.innerHTML = chartHTML;
    }
    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <span class="close">&times;</span>
                </div>
                ${content}
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }
    showPeopleManagement() {
        this.updateActiveSidebarItem(document.querySelector('.sidebar-item[onclick*="showPeopleManagement"]'));
        
        const content = `
            <div class="table-header">
                <h3>👥 Gerenciamento de Pessoas</h3>
                <div class="table-actions">
                    <button class="btn btn-success" onclick="system.showPersonForm()">
                        ➕ Adicionar Pessoa
                    </button>
                </div>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Documento</th>
                            <th>Senha/PIN</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.people.map(person => `
                            <tr>
                                <td>${person.name}</td>
                                <td>${person.document}</td>
                                <td>${person.password}</td>
                                <td class="action-buttons">
                                    <button class="btn btn-warning btn-sm" onclick="system.editPerson('${person.id}')">
                                        ✏️ Editar
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="system.managePersonAccess('${person.id}')">
                                        🔑 Acessos
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="system.deletePerson('${person.id}')">
                                        🗑️ Excluir
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        this.showModal('Gerenciamento de Pessoas', content);
    }

    showPersonForm(personId = null) {
        const person = personId ? this.people.find(p => p.id === personId) : null;
        const isEdit = !!person;
        
        const content = `
            <form id="personForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="personName">Nome Completo</label>
                        <input type="text" id="personName" value="${person?.name || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="personDocument">Documento/ID</label>
                        <input type="text" id="personDocument" value="${person?.document || ''}" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="personPassword">Senha/PIN</label>
                    <input type="password" id="personPassword" value="${person?.password || ''}" required>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="system.closeModal()">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-success">
                        ${isEdit ? 'Atualizar' : 'Cadastrar'}
                    </button>
                </div>
            </form>
        `;
        
        this.showModal(isEdit ? 'Editar Pessoa' : 'Nova Pessoa', content);
        
        document.getElementById('personForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePerson(personId);
        });
    }

    savePerson(personId = null) {
        const name = document.getElementById('personName').value;
        const document = document.getElementById('personDocument').value;
        const password = document.getElementById('personPassword').value;

        if (personId) {
            const index = this.people.findIndex(p => p.id === personId);
            if (index !== -1) {
                this.people[index] = { ...this.people[index], name, document, password };
            }
        } else {
            const newPerson = {
                id: Date.now().toString(),
                name,
                document,
                password
            };
            this.people.push(newPerson);
        }

        this.saveData();
        this.closeModal();
        this.showPeopleManagement();
    }

    editPerson(personId) {
        this.showPersonForm(personId);
    }

    deletePerson(personId) {
        if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
            this.people = this.people.filter(p => p.id !== personId);
            this.saveData();
            this.showPeopleManagement();
        }
    }

    managePersonAccess(personId) {
        const person = this.people.find(p => p.id === personId);
        if (!person) return;

        const content = `
            <h3>Gerenciar Acessos: ${person.name}</h3>
            <p>Configure quais LABs esta pessoa pode acessar:</p>
            
            <div class="access-grid">
                ${this.labs.map(lab => {
                    const hasAccess = this.accessPermissions[personId]?.[lab.id] || false;
                    return `
                        <div class="access-item">
                            <h4>🏢 ${lab.name}</h4>
                            <p>Porta: ${lab.door}</p>
                            <div class="access-toggle">
                                <label class="switch">
                                    <input type="checkbox" ${hasAccess ? 'checked' : ''} 
                                           onchange="system.toggleAccess('${personId}', '${lab.id}', this.checked)">
                                    <span class="slider"></span>
                                </label>
                                <span>${hasAccess ? 'Acesso Permitido' : 'Acesso Negado'}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="form-actions">
                <button class="btn btn-secondary" onclick="system.closeModal()">
                    Fechar
                </button>
            </div>
        `;
        
        this.showModal(`Gerenciar Acessos - ${person.name}`, content);
    }

    toggleAccess(personId, labId, hasAccess) {
        if (!this.accessPermissions[personId]) {
            this.accessPermissions[personId] = {};
        }
        this.accessPermissions[personId][labId] = hasAccess;
        this.saveData();
    }
    showLabManagement() {
        this.updateActiveSidebarItem(document.querySelector('.sidebar-item[onclick*="showLabManagement"]'));
        
        const content = `
            <div class="table-actions">
                <button class="btn btn-success" onclick="system.showLabForm()">
                    ➕ Adicionar LAB
                </button>
            </div>
            
            <div class="table-container">
                <div class="table-header">
                    <h3>LABs Cadastrados</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nome do LAB</th>
                            <th>Porta/Fechadura</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.labs.map(lab => `
                            <tr>
                                <td>${lab.name}</td>
                                <td>${lab.door}</td>
                                <td class="action-buttons">
                                    <button class="btn btn-warning btn-sm" onclick="system.editLab('${lab.id}')">
                                        ✏️ Editar
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="system.showLabLogs('${lab.id}')">
                                        📊 Logs
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="system.deleteLab('${lab.id}')">
                                        🗑️ Excluir
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        this.showModal('Gerenciamento de LABs', content);
    }

    showLabForm(labId = null) {
        const lab = labId ? this.labs.find(l => l.id === labId) : null;
        const isEdit = !!lab;
        
        const content = `
            <form id="labForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="labName">Nome do LAB</label>
                        <input type="text" id="labName" value="${lab?.name || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="labDoor">Porta/Fechadura</label>
                        <input type="text" id="labDoor" value="${lab?.door || ''}" required>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="system.closeModal()">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-success">
                        ${isEdit ? 'Atualizar' : 'Cadastrar'}
                    </button>
                </div>
            </form>
        `;
        
        this.showModal(isEdit ? 'Editar LAB' : 'Novo LAB', content);
        
        document.getElementById('labForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveLab(labId);
        });
    }

    saveLab(labId = null) {
        const name = document.getElementById('labName').value;
        const door = document.getElementById('labDoor').value;

        if (labId) {
            const index = this.labs.findIndex(l => l.id === labId);
            if (index !== -1) {
                this.labs[index] = { ...this.labs[index], name, door };
            }
        } else {
            const newLab = {
                id: Date.now().toString(),
                name,
                door
            };
            this.labs.push(newLab);
        }

        this.saveData();
        this.closeModal();
        this.showLabManagement();
    }

    editLab(labId) {
        this.showLabForm(labId);
    }

    deleteLab(labId) {
        if (confirm('Tem certeza que deseja excluir este LAB?')) {
            this.labs = this.labs.filter(l => l.id !== labId);
            this.saveData();
            this.showLabManagement();
        }
    }

    showLabLogs(labId) {
        const lab = this.labs.find(l => l.id === labId);
        const labLogs = this.accessLogs.filter(log => log.labId === labId);
        
        const content = `
            <h3>Logs de Acesso: ${lab.name}</h3>
            <p>Porta: ${lab.door}</p>
            
            <div class="log-filters">
                <select id="personFilter" onchange="system.filterLogs()">
                    <option value="">Todas as pessoas</option>
                    ${this.people.map(person => `
                        <option value="${person.id}">${person.name}</option>
                    `).join('')}
                </select>
                
                <select id="statusFilter" onchange="system.filterLogs()">
                    <option value="">Todos os status</option>
                    <option value="authorized">Autorizado</option>
                    <option value="denied">Negado</option>
                </select>
                
                <input type="date" id="dateFilter" onchange="system.filterLogs()">
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Pessoa</th>
                            <th>Data/Hora</th>
                            <th>Status</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody id="logsTableBody">
                        ${this.renderLogsTable(labLogs)}
                    </tbody>
                </table>
            </div>
        `;
        
        this.showModal(`Logs de Acesso - ${lab.name}`, content);
    }

    filterLogs() {
        const personFilter = document.getElementById('personFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const dateFilter = document.getElementById('dateFilter').value;
        
        let filteredLogs = this.accessLogs;
        
        if (personFilter) {
            filteredLogs = filteredLogs.filter(log => log.personId === personFilter);
        }
        
        if (statusFilter) {
            filteredLogs = filteredLogs.filter(log => log.status === statusFilter);
        }
        
        if (dateFilter) {
            const filterDate = new Date(dateFilter);
            filteredLogs = filteredLogs.filter(log => {
                const logDate = new Date(log.timestamp);
                return logDate.toDateString() === filterDate.toDateString();
            });
        }
        
        document.getElementById('logsTableBody').innerHTML = this.renderLogsTable(filteredLogs);
    }

    renderLogsTable(logs) {
        return logs.map(log => {
            const person = this.people.find(p => p.id === log.personId);
            const lab = this.labs.find(l => l.id === log.labId);
            const statusClass = log.status === 'authorized' ? 'status-authorized' : 'status-denied';
            const statusText = log.status === 'authorized' ? '✅ Autorizado' : '❌ Negado';
            
            return `
                <tr>
                    <td>${person?.name || 'N/A'}</td>
                    <td>${new Date(log.timestamp).toLocaleString('pt-BR')}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td>${log.details || ''}</td>
                </tr>
            `;
        }).join('') || '<tr><td colspan="4">Nenhum log encontrado</td></tr>';
    }

    // Access Control
    showAccessControl() {
        this.updateActiveSidebarItem(document.querySelector('.sidebar-item[onclick*="showAccessControl"]'));
        
        const content = `
            <h3>🔑 Controle de Acesso em Tempo Real</h3>
            <p>Teste o sistema de controle de acesso:</p>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="accessPerson">Pessoa</label>
                    <select id="accessPerson" required>
                        <option value="">Selecione uma pessoa</option>
                        ${this.people.map(person => `
                            <option value="${person.id}">${person.name} (${person.document})</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="accessLab">LAB</label>
                    <select id="accessLab" required>
                        <option value="">Selecione um LAB</option>
                        ${this.labs.map(lab => `
                            <option value="${lab.id}">${lab.name} (${lab.door})</option>
                        `).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="accessPassword">Senha/PIN</label>
                <input type="password" id="accessPassword" placeholder="Digite a senha da pessoa" required>
            </div>
            
            <div class="form-actions">
                <button class="btn btn-secondary" onclick="system.closeModal()">
                    Cancelar
                </button>
                <button class="btn btn-primary" onclick="system.processAccess()">
                    🔓 Tentar Acesso
                </button>
            </div>
            
            <div id="accessResult" style="margin-top: 20px; padding: 15px; border-radius: 10px; display: none;"></div>
        `;
        
        this.showModal('Controle de Acesso', content);
    }

    processAccess() {
        const personId = document.getElementById('accessPerson').value;
        const labId = document.getElementById('accessLab').value;
        const password = document.getElementById('accessPassword').value;
        
        if (!personId || !labId || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        const person = this.people.find(p => p.id === personId);
        const lab = this.labs.find(l => l.id === labId);
        
        if (!person || !lab) {
            alert('Pessoa ou LAB não encontrado!');
            return;
        }
        
        // Verificar senha
        if (person.password !== password) {
            this.recordAccess(personId, labId, 'denied', 'Senha incorreta');
            this.showAccessResult('❌ Acesso Negado - Senha incorreta', 'error');
            return;
        }
        
        // Verificar permissão
        const hasPermission = this.accessPermissions[personId]?.[labId];
        if (!hasPermission) {
            this.recordAccess(personId, labId, 'denied', 'Sem permissão para este LAB');
            this.showAccessResult('❌ Acesso Negado - Sem permissão para este LAB', 'error');
            return;
        }
        
        // Acesso autorizado
        this.recordAccess(personId, labId, 'authorized', 'Acesso permitido');
        this.showAccessResult('✅ Acesso Autorizado - Bem-vindo ao LAB!', 'success');
    }

    showAccessResult(message, type) {
        const resultDiv = document.getElementById('accessResult');
        resultDiv.style.display = 'block';
        resultDiv.style.background = type === 'success' ? '#d4edda' : '#f8d7da';
        resultDiv.style.color = type === 'success' ? '#155724' : '#721c24';
        resultDiv.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`;
        resultDiv.innerHTML = `<strong>${message}</strong>`;
    }

    recordAccess(personId, labId, status, details) {
        const log = {
            id: Date.now().toString(),
            personId,
            labId,
            status,
            details,
            timestamp: new Date().toISOString()
        };
        
        this.accessLogs.push(log);
        this.saveData();
    }

    // Show Access Logs (Dashboard function)
    showAccessLogs() {
        this.updateActiveSidebarItem(document.querySelector('.sidebar-item[onclick*="showAccessLogs"]'));
        
        const content = `
            <h3>📊 Logs de Acesso - Sistema Completo</h3>
            <p>Visualize todos os registros de acesso com filtros avançados:</p>
            
            <div class="log-filters">
                <select id="personFilter" onchange="system.filterAllLogs()">
                    <option value="">Todas as pessoas</option>
                    ${this.people.map(person => `
                        <option value="${person.id}">${person.name}</option>
                    `).join('')}
                </select>
                
                <select id="statusFilter" onchange="system.filterAllLogs()">
                    <option value="">Todos os status</option>
                    <option value="authorized">Autorizado</option>
                    <option value="denied">Negado</option>
                </select>
                
                <input type="date" id="dateFilter" onchange="system.filterAllLogs()">
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Pessoa</th>
                            <th>LAB</th>
                            <th>Data/Hora</th>
                            <th>Status</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody id="allLogsTableBody">
                        ${this.renderAllLogsTable(this.accessLogs)}
                    </tbody>
                </table>
            </div>
        `;
        
        this.showModal('Logs de Acesso - Sistema Completo', content);
    }

    filterAllLogs() {
        const personFilter = document.getElementById('personFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const dateFilter = document.getElementById('dateFilter').value;
        
        let filteredLogs = this.accessLogs;
        
        if (personFilter) {
            filteredLogs = filteredLogs.filter(log => log.personId === personFilter);
        }
        
        if (statusFilter) {
            filteredLogs = filteredLogs.filter(log => log.status === statusFilter);
        }
        
        if (dateFilter) {
            const filterDate = new Date(dateFilter);
            filteredLogs = filteredLogs.filter(log => {
                const logDate = new Date(log.timestamp);
                return logDate.toDateString() === filterDate.toDateString();
            });
        }
        
        document.getElementById('allLogsTableBody').innerHTML = this.renderAllLogsTable(filteredLogs);
    }

    renderAllLogsTable(logs) {
        return logs.map(log => {
            const person = this.people.find(p => p.id === log.personId);
            const lab = this.labs.find(l => l.id === log.labId);
            const statusClass = log.status === 'authorized' ? 'status-authorized' : 'status-denied';
            const statusText = log.status === 'authorized' ? '✅ Autorizado' : '❌ Negado';
            
            return `
                <tr>
                    <td>${person?.name || 'N/A'}</td>
                    <td>${lab?.name || 'N/A'}</td>
                    <td>${new Date(log.timestamp).toLocaleString('pt-BR')}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td>${log.details || ''}</td>
                </tr>
            `;
        }).join('') || '<tr><td colspan="5">Nenhum log encontrado</td></tr>';
    }

    // Data Management
    saveData() {
        localStorage.setItem('people', JSON.stringify(this.people));
        localStorage.setItem('labs', JSON.stringify(this.labs));
        localStorage.setItem('accessLogs', JSON.stringify(this.accessLogs));
        localStorage.setItem('accessPermissions', JSON.stringify(this.accessPermissions));
    }

    // Initialize with sample data if empty
    initializeSampleData() {
        if (this.people.length === 0) {
            this.people = [
                { id: '1', name: 'João Silva', document: '123.456.789-00', password: '1234' },
                { id: '2', name: 'Maria Santos', document: '987.654.321-00', password: '5678' },
                { id: '3', name: 'Pedro Costa', document: '456.789.123-00', password: '9012' }
            ];
        }
        
        if (this.labs.length === 0) {
            this.labs = [
                { id: '1', name: 'LAB de Informática', door: 'Porta A-101' },
                { id: '2', name: 'LAB de Eletrônica', door: 'Porta B-205' },
                { id: '3', name: 'LAB de Mecatrônica', door: 'Porta C-310' }
            ];
        }
        
        if (Object.keys(this.accessPermissions).length === 0) {
            this.accessPermissions = {
                '1': { '1': true, '2': true, '3': false },
                '2': { '1': true, '2': false, '3': true },
                '3': { '1': false, '2': true, '3': true }
            };
        }
        
        this.saveData();
    }
}

// Initialize system after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing system...');
    
    // Clear any existing user session for testing
    localStorage.removeItem('currentUser');
    
    window.system = new AccessControlSystem();
    system.initializeSampleData();
});
