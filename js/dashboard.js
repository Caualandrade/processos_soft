document.addEventListener('DOMContentLoaded', () => {
    // Acessa os dados simulados que são expostos globalmente pelo main.js
    const medicines = window.mockMedicines;

    // --- Visão Geral do Estoque ---
    const totalMedicinesEl = document.getElementById('total-medicines');
    const lowStockCountEl = document.getElementById('low-stock-count');
    const expiringCountEl = document.getElementById('expiring-count');

    function updateOverview() {
        totalMedicinesEl.textContent = medicines.length;

        const lowStock = medicines.filter(med => med.quantity < 5).length;
        lowStockCountEl.textContent = lowStock;

        const today = new Date();
        const thirtyDaysLater = new Date();
        thirtyDaysLater.setDate(today.getDate() + 30);

        const expiringSoon = medicines.filter(med => {
            const validityDate = new Date(med.validity);
            return validityDate > today && validityDate <= thirtyDaysLater;
        }).length;
        expiringCountEl.textContent = expiringSoon;
    }

    // --- Lista de Medicamentos ---
    const medicationTableBody = document.getElementById('medication-table-body');
    const searchMedicationInput = document.getElementById('search-medication');
    const filterValiditySelect = document.getElementById('filter-validity');
    const filterQuantitySelect = document.getElementById('filter-quantity');

    function renderMedicationTable(filteredMedicines = medicines) {
        medicationTableBody.innerHTML = ''; // Limpa a tabela

        if (filteredMedicines.length === 0) {
            medicationTableBody.innerHTML = '<tr><td colspan="6">Nenhum medicamento encontrado.</td></tr>';
            return;
        }

        filteredMedicines.forEach(med => {
            const row = document.createElement('tr');
            const validityDate = new Date(med.validity);
            const today = new Date();
            const thirtyDaysLater = new Date();
            thirtyDaysLater.setDate(today.getDate() + 30);

            let validityClass = '';
            if (validityDate < today) {
                validityClass = 'text-danger'; // Vencido
            } else if (validityDate > today && validityDate <= thirtyDaysLater) {
                validityClass = 'text-warning'; // Vencendo em breve
            }

            let quantityClass = '';
            if (med.quantity < 5) {
                quantityClass = 'text-danger';
            } else if (med.quantity < 50) { // Exemplo de 'médio'
                quantityClass = 'text-warning';
            }

            row.innerHTML = `
                <td>${med.name}</td>
                <td>${med.dosage}</td>
                <td class="${quantityClass}">${med.quantity}</td>
                <td class="${validityClass}">${med.validity}</td>
                <td>${med.location}</td>
                <td>
                    <button class="btn-action btn-edit" title="Editar" data-id="${med.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-remove" title="Remover" data-id="${med.id}"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            medicationTableBody.appendChild(row);
        });

        // Adicionar listeners para botões de edição e remoção
        medicationTableBody.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                alert(`Editar medicamento com ID: ${id}`);
                // Implementar lógica de edição (abrir modal/formulário pré-preenchido)
            });
        });

        medicationTableBody.querySelectorAll('.btn-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                if (confirm(`Tem certeza que deseja remover o medicamento com ID: ${id}?`)) {
                    // Lógica para remover do array medicines e re-renderizar
                    const index = medicines.findIndex(med => med.id === id);
                    if (index !== -1) {
                        medicines.splice(index, 1);
                        renderMedicationTable();
                        updateOverview(); // Atualiza a visão geral após remoção
                    }
                }
            });
        });
    }

    // --- Filtros e Busca ---
    function applyFiltersAndSearch() {
        const searchTerm = searchMedicationInput.value.toLowerCase();
        const filterValidity = filterValiditySelect.value;
        const filterQuantity = filterQuantitySelect.value;

        let filtered = medicines.filter(med => {
            const matchesSearch = med.name.toLowerCase().includes(searchTerm) ||
                                  med.dosage.toLowerCase().includes(searchTerm) ||
                                  med.location.toLowerCase().includes(searchTerm);

            let matchesValidity = true;
            const validityDate = new Date(med.validity);
            const today = new Date();
            const thirtyDaysLater = new Date();
            thirtyDaysLater.setDate(today.getDate() + 30);

            if (filterValidity === 'expiring-soon') {
                matchesValidity = (validityDate > today && validityDate <= thirtyDaysLater);
            } else if (filterValidity === 'valid') {
                matchesValidity = (validityDate > thirtyDaysLater); // Considera válido se não vencer em 30 dias
            } else if (filterValidity === 'expired') {
                matchesValidity = (validityDate < today);
            }

            let matchesQuantity = true;
            if (filterQuantity === 'low') {
                matchesQuantity = (med.quantity < 5);
            } else if (filterQuantity === 'medium') {
                matchesQuantity = (med.quantity >= 5 && med.quantity <= 50);
            } else if (filterQuantity === 'high') {
                matchesQuantity = (med.quantity > 50);
            }

            return matchesSearch && matchesValidity && matchesQuantity;
        });

        renderMedicationTable(filtered);
    }

    searchMedicationInput.addEventListener('input', applyFiltersAndSearch);
    filterValiditySelect.addEventListener('change', applyFiltersAndSearch);
    filterQuantitySelect.addEventListener('change', applyFiltersAndSearch);

    // --- Adicionar Novo Remédio ---
    const addMedicationForm = document.getElementById('add-medication-form');

    addMedicationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newMed = {
            id: medicines.length > 0 ? Math.max(...medicines.map(m => m.id)) + 1 : 1,
            name: document.getElementById('med-name').value,
            dosage: document.getElementById('med-dosage').value,
            quantity: parseInt(document.getElementById('med-quantity').value),
            validity: document.getElementById('med-validity').value,
            manufacturer: document.getElementById('med-manufacturer').value,
            location: document.getElementById('med-location').value,
            notes: document.getElementById('med-notes').value,
        };

        medicines.push(newMed);
        alert('Remédio adicionado com sucesso!');
        addMedicationForm.reset(); // Limpa o formulário
        renderMedicationTable(); // Atualiza a lista
        updateOverview(); // Atualiza a visão geral
    });

    // --- Relatórios ---
    const exportPdfBtn = document.getElementById('export-pdf');
    const exportExcelBtn = document.getElementById('export-excel');
    const reportTypeSelect = document.getElementById('report-type');

    exportPdfBtn.addEventListener('click', () => {
        const reportType = reportTypeSelect.value;
        alert(`Exportando relatório de ${reportType} como PDF (funcionalidade a ser implementada no backend).`);
        // Aqui você enviaria a requisição para o backend para gerar o PDF
    });

    exportExcelBtn.addEventListener('click', () => {
        const reportType = reportTypeSelect.value;
        alert(`Exportando relatório de ${reportType} como Excel (funcionalidade a ser implementada no backend).`);
        // Aqui você enviaria a requisição para o backend para gerar o Excel
    });


    // Inicializar o dashboard
    updateOverview();
    renderMedicationTable();
});