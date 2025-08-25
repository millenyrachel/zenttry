// Zenttry - Sistema de Controle de Acesso
// Versão 2.0 - JavaScript Moderno ES6+

class ZenttrySystem {
    constructor() {
        this.currentUser = null;
        this.people = [];
        this.labs = [];
        this.accessLogs = [];
        this.accessPermissions = {};
        
        this.init();
    }

    async init() {
        console.log('🚀 Iniciando Zenttry System...');
        
        try {
            await this.loadData();
            this.setupEventListeners();
            this.checkAuthentication();
            this.setupSidebar();
            
            console.log('✅ Sistema inicializado com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao inicializar sistema:', error);
            this.showError('Erro ao inicializar o sistema');
        }
    }

    async loadData() {
        // Carregar dados do localStorage
        this.people = JSON.parse(localStorage.getItem('zenttry_people')) || [];
        this.labs = JSON.parse(localStorage.getItem('zenttry_labs')) || [];
        this.accessLogs = JSON.parse(localStorage.getItem('zenttry_accessLogs')) || [];
        this.accessPermissions = JSON.parse(localStorage.getItem('zenttry_accessPermissions')) || {};
        
        // Dados padrão se não existirem
        if (this.people.length === 0) {
            this.people = this.getDefaultPeople();
            this.saveData('people');
        }
        
        if (this.labs.length === 0) {
            this.labs = this.getDefaultLabs();
            this.saveData('labs');
        }
    }

    getDefaultPeople() {
        return [
            {
                id: 1,
                name: 'João Silva',
                email: 'joao.silva@empresa.com',
                department: 'TI',
                role: 'Desenvolvedor',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Maria Santos',
                email: 'maria.santos@empresa.com',
                department: 'RH',
                role: 'Analista',
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
    }

    getDefaultLabs() {
        return [
            {
                id: 1,
                name: 'LAB de Desenvolvimento',
                location: 'Andar 3 - Sala 301',
                capacity: 20,
                equipment: ['Computadores', 'Projetor', 'Quadro'],
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: 'LAB de Testes',
                location: 'Andar 2 - Sala 205',
                capacity: 15,
                equipment: ['Servidores', 'Switches', 'Câmeras'],
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Sidebar toggle
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close') || e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Click outside sidebar
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.querySelector('.sidebar-toggle');
            
            if (sidebar && sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                this.closeSidebar();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.showQuickSearch();
            }
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeSidebar();
            }
        });
    }

    setupSidebar() {
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const action = item.getAttribute('data-action');
                if (action) {
                    this.executeAction(action);
                }
            });
        });
    }

    executeAction(action) {
        switch (action) {
            case 'inicio':
                this.showDashboard();
                break;
            case 'people':
                this.showPeopleManagement();
                break;
            case 'labs':
                this.showLabManagement();
                break;
            case 'logs':
                this.showAccessLogs();
                break;
            case 'access':
                this.showAccessControl();
                break;
            case 'logout':
                this.logout();
                break;
            default:
                console.warn('Ação não reconhecida:', action);
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Entrando...';
            
            // Simular delay de autenticação
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (username === 'admin' && password === 'admin123') {
                this.currentUser = { 
                    username, 
                    role: 'admin',
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('zenttry_currentUser', JSON.stringify(this.currentUser));
                this.showSuccess('Login realizado com sucesso!');
                this.showDashboard();
            } else {
                throw new Error('Usuário ou senha incorretos!');
            }
        } catch (error) {
            this.showError(error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Entrar';
        }
    }

    checkAuthentication() {
        const savedUser = localStorage.getItem('zenttry_currentUser');
        
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.showDashboard();
            } catch (error) {
                console.error('Erro ao carregar usuário:', error);
                localStorage.removeItem('zenttry_currentUser');
                this.showLogin();
            }
        } else {
            this.showLogin();
        }
    }

    showLogin() {
        document.querySelector('.dashboard').style.display = 'none';
        document.querySelector('.container').style.display = 'flex';
        this.closeSidebar();
    }

    showDashboard() {
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.dashboard').style.display = 'block';
        
        this.renderDashboard();
        this.updateActiveSidebarItem('inicio');
    }

    renderDashboard() {
        const dashboard = document.querySelector('.dashboard');
        if (!dashboard) return;

        const stats = this.calculateStats();
        
        dashboard.innerHTML = `
                    <div class="dashboard-header">
            <div class="logo-container">
                <div class="logo-placeholder">Z</div>
                <div class="logo-text">Zenttry</div>
            </div>
            <h1>Início</h1>
            <p>Bem-vindo, ${this.currentUser.username}!</p>
            <button class="btn btn-danger logout-btn" onclick="zenttry.logout()">Sair</button>
        </div>

            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-content">
                        <h3>${stats.totalPeople}</h3>
                        <p>Pessoas Cadastradas</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏢</div>
                    <div class="stat-content">
                        <h3>${stats.totalLabs}</h3>
                        <p>LABs Disponíveis</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🔑</div>
                    <div class="stat-content">
                        <h3>${stats.totalPermissions}</h3>
                        <p>Permissões Ativas</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-content">
                        <h3>${stats.totalLogs}</h3>
                        <p>Logs de Acesso</p>
                    </div>
                </div>
            </div>

            <div class="dashboard-chart">
                <h3>Acesso por LAB - Últimos 7 dias</h3>
                <div class="chart-container">
                    ${this.renderAccessChart()}
                </div>
            </div>

            <div class="dashboard-actions">
                <div class="action-grid">
                    <div class="action-card">
                        <h3>👥 Gerenciar Pessoas</h3>
                        <p>Adicione, edite ou remova pessoas do sistema</p>
                        <button class="btn btn-primary" onclick="zenttry.showPeopleManagement()">
                            Gerenciar Pessoas
                        </button>
                    </div>
                    <div class="action-card">
                        <h3>🏢 Gerenciar LABs</h3>
                        <p>Configure e gerencie os laboratórios disponíveis</p>
                        <button class="btn btn-primary" onclick="zenttry.showLabManagement()">
                            Gerenciar LABs
                        </button>
                    </div>
                    <div class="action-card">
                        <h3>🔑 Controle de Acesso</h3>
                        <p>Configure permissões e controle de acesso</p>
                        <button class="btn btn-primary" onclick="zenttry.showAccessControl()">
                            Controle de Acesso
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    calculateStats() {
        return {
            totalPeople: this.people.length,
            totalLabs: this.labs.length,
            totalPermissions: Object.keys(this.accessPermissions).length,
            totalLogs: this.accessLogs.length
        };
    }

    renderAccessChart() {
        // Simular dados de acesso dos últimos 7 dias
        const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
        const authorized = [12, 19, 15, 22, 18, 8, 5];
        const denied = [2, 1, 3, 1, 2, 1, 0];
        
        let chartHTML = '<div class="chart-bars">';
        
        days.forEach((day, index) => {
            const authHeight = (authorized[index] / Math.max(...authorized)) * 200;
            const deniedHeight = (denied[index] / Math.max(...denied)) * 200;
            
            chartHTML += `
                <div class="chart-column">
                    <div class="chart-bar-group">
                        <div class="chart-bar authorized" style="height: ${authHeight}px;" title="Autorizado: ${authorized[index]}"></div>
                        <div class="chart-bar denied" style="height: ${deniedHeight}px;" title="Negado: ${denied[index]}"></div>
                    </div>
                    <div class="chart-label">${day}</div>
                </div>
            `;
        });
        
        chartHTML += '</div>';
        chartHTML += `
            <div class="chart-legend">
                <div class="legend-item">
                    <div class="legend-color authorized"></div>
                    <span>Autorizado</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color denied"></div>
                    <span>Negado</span>
                </div>
            </div>
        `;
        
        return chartHTML;
    }

    showPeopleManagement() {
        this.renderPeopleManagement();
        this.updateActiveSidebarItem('people');
    }

    renderPeopleManagement() {
        const dashboard = document.querySelector('.dashboard');
        if (!dashboard) return;

        dashboard.innerHTML = `
                    <div class="dashboard-header">
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 20px;">
                <h1 style="margin: 0;">👥 Gerenciar Pessoas</h1>
                <button class="close-btn" onclick="zenttry.showDashboard()">✕</button>
            </div>
            <p>Gerencie as pessoas cadastradas no sistema</p>
            <button class="btn btn-primary" onclick="zenttry.showAddPersonModal()">
                + Adicionar Pessoa
            </button>
        </div>

            <div class="table-container">
                <div class="table-header">
                    <h3>Lista de Pessoas</h3>
                    <div class="table-actions">
                        <input type="text" placeholder="Buscar pessoas..." onkeyup="zenttry.filterPeople(this.value)">
                        <button class="btn btn-secondary" onclick="zenttry.exportPeople()">Exportar</button>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Departamento</th>
                            <th>Cargo</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="peopleTableBody">
                        ${this.renderPeopleTable()}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderPeopleTable() {
        return this.people.map(person => `
            <tr>
                <td>${person.name}</td>
                <td>${person.email}</td>
                <td>${person.department}</td>
                <td>${person.role}</td>
                <td>
                    <span class="status-${person.status}">${person.status}</span>
                </td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-warning" onclick="zenttry.editPerson(${person.id})">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="zenttry.deletePerson(${person.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    showLabManagement() {
        this.renderLabManagement();
        this.updateActiveSidebarItem('labs');
    }

    renderLabManagement() {
        const dashboard = document.querySelector('.dashboard');
        if (!dashboard) return;

        dashboard.innerHTML = `
                    <div class="dashboard-header">
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 20px;">
                <h1 style="margin: 0;">🏢 Gerenciar LABs</h1>
                <button class="close-btn" onclick="zenttry.showDashboard()">✕</button>
            </div>
            <p>Gerencie os laboratórios disponíveis no sistema</p>
            <button class="btn btn-primary" onclick="zenttry.showAddLabModal()">
                + Adicionar LAB
            </button>
        </div>

            <div class="dashboard-grid">
                ${this.labs.map(lab => `
                    <div class="dashboard-card">
                        <h3>${lab.name}</h3>
                        <p><strong>Localização:</strong> ${lab.location}</p>
                        <p><strong>Capacidade:</strong> ${lab.capacity} pessoas</p>
                        <p><strong>Equipamentos:</strong> ${lab.equipment.join(', ')}</p>
                        <p><strong>Status:</strong> 
                            <span class="status-${lab.status}">${lab.status}</span>
                        </p>
                        <div class="dashboard-card">
                            <button class="btn btn-warning" onclick="zenttry.editLab(${lab.id})">
                                Editar
                            </button>
                            <button class="btn btn-danger" onclick="zenttry.deleteLab(${lab.id})">
                                Excluir
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showAccessLogs() {
        this.renderAccessLogs();
        this.updateActiveSidebarItem('logs');
    }

    renderAccessLogs() {
        const dashboard = document.querySelector('.dashboard');
        if (!dashboard) return;

        dashboard.innerHTML = `
                    <div class="dashboard-header">
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 20px;">
                <h1 style="margin: 0;">📋 Logs de Acesso</h1>
                <button class="close-btn" onclick="zenttry.showDashboard()">✕</button>
            </div>
            <p>Visualize o histórico de acessos ao sistema</p>
        </div>

            <div class="table-container">
                <div class="log-filters">
                    <select onchange="zenttry.filterLogsByStatus(this.value)">
                        <option value="">Todos os status</option>
                        <option value="authorized">Autorizado</option>
                        <option value="denied">Negado</option>
                    </select>
                    <input type="date" onchange="zenttry.filterLogsByDate(this.value)">
                    <input type="text" placeholder="Buscar por pessoa..." onkeyup="zenttry.filterLogsByPerson(this.value)">
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Data/Hora</th>
                            <th>Pessoa</th>
                            <th>LAB</th>
                            <th>Status</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.renderLogsTable()}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderLogsTable() {
        return this.accessLogs.slice(-20).map(log => `
            <tr>
                <td>${new Date(log.timestamp).toLocaleString('pt-BR')}</td>
                <td>${log.personName}</td>
                <td>${log.labName}</td>
                <td>
                    <span class="status-${log.status}">${log.status}</span>
                </td>
                <td>${log.details}</td>
            </tr>
        `).join('');
    }

    showAccessControl() {
        this.renderAccessControl();
        this.updateActiveSidebarItem('access');
    }

    renderAccessControl() {
        const dashboard = document.querySelector('.dashboard');
        if (!dashboard) return;

        dashboard.innerHTML = `
                    <div class="dashboard-header">
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 20px;">
                <h1 style="margin: 0;">🔑 Controle de Acesso</h1>
                <button class="close-btn" onclick="zenttry.showDashboard()">✕</button>
            </div>
            <p>Configure permissões de acesso aos laboratórios</p>
        </div>

            <div class="access-grid">
                ${this.people.map(person => `
                    <div class="access-item">
                        <h4>👤 ${person.name}</h4>
                        <p><strong>Departamento:</strong> ${person.department}</p>
                        <p><strong>Cargo:</strong> ${person.role}</p>
                        
                        <div class="access-toggle">
                            <span>Permitir acesso:</span>
                            <label class="switch">
                                <input type="checkbox" 
                                       ${this.hasAccess(person.id) ? 'checked' : ''}
                                       onchange="zenttry.toggleAccess(${person.id}, this.checked)">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    hasAccess(personId) {
        return this.accessPermissions[personId] === true;
    }

    toggleAccess(personId, hasAccess) {
        this.accessPermissions[personId] = hasAccess;
        this.saveData('accessPermissions');
        
        const status = hasAccess ? 'permitido' : 'negado';
        this.showSuccess(`Acesso ${status} para ${this.getPersonById(personId)?.name}`);
    }

    getPersonById(id) {
        return this.people.find(p => p.id === id);
    }

    updateActiveSidebarItem(activeAction) {
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[data-action="${activeAction}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('zenttry_currentUser');
        this.showSuccess('Logout realizado com sucesso!');
        this.showLogin();
    }

    saveData(type) {
        try {
            switch (type) {
                case 'people':
                    localStorage.setItem('zenttry_people', JSON.stringify(this.people));
                    break;
                case 'labs':
                    localStorage.setItem('zenttry_labs', JSON.stringify(this.labs));
                    break;
                case 'accessLogs':
                    localStorage.setItem('zenttry_accessLogs', JSON.stringify(this.accessLogs));
                    break;
                case 'accessPermissions':
                    localStorage.setItem('zenttry_accessPermissions', JSON.stringify(this.accessPermissions));
                    break;
            }
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            this.showError('Erro ao salvar dados');
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showQuickSearch() {
        // Implementar busca rápida
        console.log('Busca rápida ativada');
    }

    // Funções para modais (placeholder)
    showAddPersonModal() {
        this.showError('Funcionalidade em desenvolvimento');
    }

    showAddLabModal() {
        this.showError('Funcionalidade em desenvolvimento');
    }

    editPerson(id) {
        this.showError('Funcionalidade em desenvolvimento');
    }

    deletePerson(id) {
        if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
            this.people = this.people.filter(p => p.id !== id);
            this.saveData('people');
            this.showSuccess('Pessoa excluída com sucesso!');
            this.showPeopleManagement();
        }
    }

    editLab(id) {
        this.showError('Funcionalidade em desenvolvimento');
    }

    deleteLab(id) {
        if (confirm('Tem certeza que deseja excluir este LAB?')) {
            this.labs = this.labs.filter(l => l.id !== id);
            this.saveData('labs');
            this.showSuccess('LAB excluído com sucesso!');
            this.showLabManagement();
        }
    }

    // Métodos auxiliares para filtros
    filterPeople(searchTerm) {
        const tbody = document.getElementById('peopleTableBody');
        if (!tbody) return;
        
        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const match = text.includes(searchTerm.toLowerCase());
            row.style.display = match ? '' : 'none';
        });
    }

    filterLogsByStatus(status) {
        // Implementar filtro por status
        console.log('Filtrando logs por status:', status);
    }

    filterLogsByDate(date) {
        // Implementar filtro por data
        console.log('Filtrando logs por data:', date);
    }

    filterLogsByPerson(searchTerm) {
        // Implementar filtro por pessoa
        console.log('Filtrando logs por pessoa:', searchTerm);
    }

    // Métodos para exportação
    exportPeople() {
        const csv = this.convertToCSV(this.people);
        this.downloadCSV(csv, 'pessoas_zenttry.csv');
    }

    convertToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                return typeof value === 'string' ? `"${value}"` : value;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }

    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Inicializar o sistema quando o DOM estiver carregado
let zenttry;

document.addEventListener('DOMContentLoaded', () => {
    zenttry = new ZenttrySystem();
    
    // Adicionar atributos data-action aos itens do sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach((item, index) => {
        const actions = ['inicio', 'people', 'labs', 'logs', 'access', 'logout'];
        if (actions[index]) {
            item.setAttribute('data-action', actions[index]);
        }
    });
});

// Adicionar estilos para notificações
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: #22c58f;
    }
    
    .notification-error {
        background: #dc3545;
    }
    
    .notification-info {
        background: #17a2b8;
    }
`;

// Injetar estilos das notificações
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
