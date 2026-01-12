const BASE_URL = 'https://dvn64ilb97rag.cloudfront.net';

const courses = {
    'csc311': {
        name: 'Data Structures',
        code: 'CSC 311',
        files: ['data-structure-1.pdf', 'data-structure-2.pdf', 'data-structure-3.pdf', 'data-structure-4.pdf']
    },
    'csc351': {
        name: 'System Analysis',
        code: 'CSC 351',
        files: ['system-analysis-1.pdf', 'system-analysis-2.docx']
    },
    'csc381': {
        name: 'Human Computer Interaction',
        code: 'CSC 381',
        files: ['hci-1.pdf', 'hci-2.pdf', 'hci-3.pdf', 'hci-4.pdf']
    },
    'csc321': {
        name: 'Database Systems',
        code: 'CSC 321',
        files: ['database-1.pdf', 'database-2.pdf', 'database-3.pdf']
    }
};

function searchCourses() {
    const term = document.getElementById('searchInput').value;
    if (term) alert(`Search would find "${term}" in course materials`);
}

function viewCourse(courseId) {
    const course = courses[courseId];
    if (!course) {
        alert(`Course ${courseId} not found.`);
        return;
    }
    
    let html = `
        <div style="text-align: center; padding: 20px;">
            <div style="color: #764ba2; font-size: 28px; margin: 10px 0;">📚</div>
            <h3 style="margin: 5px 0; color: #333;">${course.code}</h3>
            <p style="color: #666; margin-bottom: 15px;">${course.name}</p>
            <p style="color: #888; margin-bottom: 20px; font-size: 14px;">Click to download course materials</p>
            
            <div style="text-align: left; max-height: 300px; overflow-y: auto; padding: 10px; background: #f9f9f9; border-radius: 8px; border: 1px solid #e1e1e1;">
    `;
    
    course.files.forEach((file) => {
        const fileUrl = `${BASE_URL}/course/${courseId}/${file}`;
        html += `
            <div style="padding: 12px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; background: white; margin-bottom: 5px; border-radius: 5px;">
                <div style="display: flex; align-items: center;">
                    <div style="color: #764ba2; margin-right: 10px;">📄</div>
                    <span style="color: #333; font-size: 14px;">${file}</span>
                </div>
                <a href="${fileUrl}" target="_blank" style="
                    background: #28a745;
                    color: white;
                    padding: 6px 15px;
                    border-radius: 4px;
                    text-decoration: none;
                    font-size: 13px;
                    font-weight: bold;
                ">
                    Download
                </a>
            </div>
        `;
    });
    
    html += `
        </div>
    `;
    
    showModal(html);
}

function showModal(content) {
    const oldModal = document.getElementById('courseModal');
    if (oldModal) oldModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'courseModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 12px;
            width: 95%;
            max-width: 500px;
            max-height: 85vh;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
            animation: modalFade 0.3s ease-out;
        ">
            ${content}
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.getElementById('courseModal');
    if (modal) modal.remove();
}

document.addEventListener('click', (e) => {
    if (e.target.id === 'courseModal') closeModal();
});

const style = document.createElement('style');
style.textContent = `
    @keyframes modalFade {
        from { opacity: 0; transform: translateY(-30px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
`;
document.head.appendChild(style);

console.log('✅ Course Hub Ready');
console.log('📚 Courses:', Object.keys(courses).length);