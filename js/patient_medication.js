document.addEventListener('DOMContentLoaded', () => {
    // Acessa os dados simulados que são expostos globalmente pelo main.js
    const patients = window.mockPatients;
    const medicines = window.mockMedicines;
    let patientMedications = window.mockPatientMedications; // Usamos 'let' para poder modificá-lo

    const patientSelect = document.getElementById('patient-select');
    const medicationSelect = document.getElementById('medication-select');
    const doseQuantityInput = document.getElementById('dose-quantity');
    const medicationScheduleInput = document.getElementById('medication-schedule');
    const administrationNotesInput = document.getElementById('administration-notes');
    const addPatientMedicationBtn = document.getElementById('add-patient-medication');
    const patientMedicationTableBody = document.getElementById('patient-medication-table-body');

    // Popular os selects de pacientes e medicamentos
    function populateSelects() {
        patients.forEach(patient => {
            const option = document.createElement('option');
            option.value = patient.id;
            option.textContent = patient.name;
            patientSelect.appendChild(option);
        });

        medicines.forEach(med => {
            const option = document.createElement('option');
            option.value = med.id;
            option.textContent = `${med.name} (${med.dosage})`;
            medicationSelect.appendChild(option);
        });
    }

    // Renderizar a tabela de medicamentos por paciente
    function renderPatientMedicationTable() {
        patientMedicationTableBody.innerHTML = '';

        if (patientMedications.length === 0) {
            patientMedicationTableBody.innerHTML = '<tr><td colspan="7">Nenhum medicamento vinculado a paciente.</td></tr>';
            return;
        }

        patientMedications.forEach(pm => {
            const patient = patients.find(p => p.id === pm.patientId);
            const medication = medicines.find(m => m.id === pm.medicationId);

            if (!patient || !medication) return; // Caso algum dado esteja inconsistente

            const row = document.createElement('tr');
            const statusClass = pm.status === 'Administrado' ? 'text-success' : 'text-warning';

            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${medication.name}</td>
                <td>${pm.dose}</td>
                <td>${pm.schedule}</td>
                <td>${pm.administeredBy || '-'}</td>
                <td class="${statusClass}">${pm.status}</td>
                <td>
                    <button class="btn-action btn-confirm-admin" title="Confirmar Administração" ${pm.status === 'Administrado' ? 'disabled' : ''} data-id="${pm.id}"><i class="fas fa-check-circle"></i></button>
                    <button class="btn-action btn-edit" title="Editar" data-id="${pm.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-remove" title="Remover" data-id="${pm.id}"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            patientMedicationTableBody.appendChild(row);
        });

        // Adicionar listeners para botões de ação
        patientMedicationTableBody.querySelectorAll('.btn-confirm-admin').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                const item = patientMedications.find(pm => pm.id === id);
                if (item && item.status !== 'Administrado') {
                    item.status = 'Administrado';
                    item.administeredBy = 'Profissional X'; // Simular quem administrou
                    alert(`Medicamento para ${patients.find(p => p.id === item.patientId).name} foi marcado como Administrado.`);
                    renderPatientMedicationTable(); // Re-renderiza a tabela
                }
            });
        });

        patientMedicationTableBody.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                alert(`Editar vínculo de medicamento com ID: ${id}`);
                // Lógica para preencher o formulário com os dados para edição
            });
        });

        patientMedicationTableBody.querySelectorAll('.btn-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                if (confirm(`Tem certeza que deseja remover este vínculo de medicamento?`)) {
                    patientMedications = patientMedications.filter(pm => pm.id !== id);
                    renderPatientMedicationTable();
                }
            });
        });
    }

    // Adicionar novo vínculo
    addPatientMedicationBtn.addEventListener('click', () => {
        const patientId = patientSelect.value;
        const medicationId = parseInt(medicationSelect.value);
        const dose = doseQuantityInput.value;
        const schedule = medicationScheduleInput.value;
        const notes = administrationNotesInput.value;

        if (!patientId || !medicationId || !dose || !schedule) {
            alert('Por favor, preencha todos os campos obrigatórios (Paciente, Medicamento, Dose, Horário).');
            return;
        }

        const newLink = {
            id: patientMedications.length > 0 ? Math.max(...patientMedications.map(pm => pm.id)) + 1 : 1,
            patientId,
            medicationId,
            dose,
            schedule,
            administeredBy: '', // Inicialmente vazio
            status: 'Pendente',
            notes,
        };

        patientMedications.push(newLink);
        alert('Vínculo de medicamento adicionado com sucesso!');
        patientSelect.value = '';
        medicationSelect.value = '';
        doseQuantityInput.value = '';
        medicationScheduleInput.value = '';
        administrationNotesInput.value = '';
        renderPatientMedicationTable(); // Atualiza a tabela
    });


    // Inicializar
    populateSelects();
    renderPatientMedicationTable();
});