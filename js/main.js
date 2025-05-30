document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle'); // Seleciona o botão de toggle
    const menuToggleIcon = menuToggle.querySelector('i'); // Seleciona o ícone do botão

    // Adiciona evento de clique para o botão de toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        // Alterna o ícone entre barras e 'X'
        if (sidebar.classList.contains('open')) {
            menuToggleIcon.classList.remove('fa-bars');
            menuToggleIcon.classList.add('fa-times');
        } else {
            menuToggleIcon.classList.remove('fa-times');
            menuToggleIcon.classList.add('fa-bars');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove 'active' de todos os itens de navegação
            navItems.forEach(nav => nav.classList.remove('active'));

            // Adiciona 'active' ao item clicado
            e.currentTarget.classList.add('active');

            // Esconde todas as seções
            sections.forEach(section => section.classList.add('hidden'));

            // Mostra a seção correspondente
            const targetSectionId = e.currentTarget.dataset.section;
            document.getElementById(targetSectionId).classList.remove('hidden');

            // Se o menu estiver aberto em mobile, fecha-o após a seleção
            // Verifica a largura da tela para aplicar a lógica de mobile
            if (window.innerWidth <= 991) {
                sidebar.classList.remove('open');
                menuToggleIcon.classList.remove('fa-times');
                menuToggleIcon.classList.add('fa-bars');
            }
        });
    });

    // Função para simular dados (mockar)
    function getMockMedicines() {
        return [
            { id: 1, name: 'Paracetamol', dosage: '500mg', quantity: 120, validity: '2026-12-30', location: 'Prateleira A1', manufacturer: 'Generico Pharma', notes: '' },
            { id: 2, name: 'Dipirona', dosage: '300mg/ml', quantity: 3, validity: '2025-06-15', location: 'Armário C3', manufacturer: 'Farmalabs', notes: 'Frascos de 20ml' },
            { id: 3, name: 'Amoxicilina', dosage: '250mg', quantity: 8, validity: '2025-07-20', location: 'Prateleira A2', manufacturer: 'SaudeMais', notes: 'Comprimidos' },
            { id: 4, name: 'Losartana', dosage: '50mg', quantity: 45, validity: '2027-01-01', location: 'Gaveta B4', manufacturer: 'HiperMed', notes: '' },
            { id: 5, name: 'Insulina', dosage: '100 UI/ml', quantity: 1, validity: '2025-05-25', location: 'Refrigerador D1', manufacturer: 'DiabeticCare', notes: 'Manter refrigerado' },
            { id: 6, name: 'Omeprazol', dosage: '20mg', quantity: 60, validity: '2026-10-10', location: 'Prateleira A3', manufacturer: 'EstomagoForte', notes: '' },
            { id: 7, name: 'Vitamina C', dosage: '1g', quantity: 25, validity: '2025-06-05', location: 'Armário B2', manufacturer: 'BemEstar', notes: 'Comprimidos efervescentes' },
        ];
    }

    function getMockPatients() {
        return [
            { id: 'paciente1', name: 'Dona Maria Silva' },
            { id: 'paciente2', name: 'Sr. João Pereira' },
            { id: 'paciente3', name: 'Dona Josefa Santos' },
            { id: 'paciente4', name: 'Sr. Antônio Rodrigues' },
        ];
    }

    function getMockPatientMedications() {
        return [
            { id: 1, patientId: 'paciente1', medicationId: 1, dose: '1 comprimido', schedule: '08:00', administeredBy: 'Enf. Ana', status: 'Administrado' },
            { id: 2, patientId: 'paciente2', medicationId: 2, dose: '20 gotas', schedule: '14:30', administeredBy: '', status: 'Pendente' },
            { id: 3, patientId: 'paciente3', medicationId: 4, dose: '1 comprimido', schedule: '09:00', administeredBy: 'Enf. Ana', status: 'Administrado' },
            { id: 4, patientId: 'paciente1', medicationId: 6, dose: '1 cápsula', schedule: '19:00', administeredBy: '', status: 'Pendente' },
            { id: 5, patientId: 'paciente4', medicationId: 3, dose: '1 comprimido', schedule: '10:00', administeredBy: '', status: 'Pendente' },
        ];
    }

    // Exportar funções e dados simulados para outros módulos JS
    window.mockMedicines = getMockMedicines();
    window.mockPatients = getMockPatients();
    window.mockPatientMedications = getMockPatientMedications();
});