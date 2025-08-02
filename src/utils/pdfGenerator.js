// Dynamic imports for client-side only libraries
let jsPDF, html2canvas;

// Load libraries only on client side
const loadLibraries = async () => {
  if (typeof window === 'undefined') return;
  
  if (!jsPDF) {
    jsPDF = (await import('jspdf')).default;
  }
  if (!html2canvas) {
    html2canvas = (await import('html2canvas')).default;
  }
};

export const generatePDF = async (elementRef, filename = 'resume.pdf') => {
  try {
    // Load libraries on client side
    await loadLibraries();
    
    // Check if we're on client side
    if (typeof window === 'undefined') {
      throw new Error('PDF generation is only available on client side');
    }
    
    // Get the resume element
    const element = elementRef.current;
    if (!element) {
      throw new Error('Resume element not found');
    }

    // Find the actual resume content within the container
    let resumeContent = element.querySelector('.bg-white');
    
    // If not found, try other selectors
    if (!resumeContent) {
      resumeContent = element.querySelector('[style*="transform"]');
    }
    
    // If still not found, try to find any div with resume content
    if (!resumeContent) {
      resumeContent = element.querySelector('div[class*="bg-white"]') || element;
    }
    
    // If still not found, use the entire element
    if (!resumeContent) {
      resumeContent = element;
    }
    
    // Debug: log what we found
    console.log('Resume content found:', resumeContent);
    console.log('Resume content HTML:', resumeContent?.outerHTML);
    console.log('Element children:', element.children);
    
    // Try to find the resume content more specifically
    const allDivs = element.querySelectorAll('div');
    console.log('All divs found:', allDivs.length);
    allDivs.forEach((div, index) => {
      console.log(`Div ${index}:`, div.className, div.textContent?.substring(0, 50));
    });
    
    // Wait for content to be fully rendered
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Try to capture the original element directly
    console.log('Attempting to capture resume content...');
    console.log('Resume content dimensions:', resumeContent.scrollWidth, 'x', resumeContent.scrollHeight);
    
        // Configure html2canvas options for better quality
    const canvas = await html2canvas(resumeContent, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: resumeContent.scrollWidth || 800,
      height: resumeContent.scrollHeight || 1200,
      scrollX: 0,
      scrollY: 0,
      logging: true, // Enable logging to debug
      removeContainer: false,
      foreignObjectRendering: true,
      imageTimeout: 0,
    });
    
    console.log('Canvas created successfully:', canvas);
    console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);

    // Create PDF with A4 dimensions
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgWidth = 595; // A4 width
    const pageHeight = 842; // A4 height
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};

export const generatePDFFromResumeData = async (resumeData, template = 'modern', filename = 'resume.pdf') => {
  try {
    // Load libraries on client side
    await loadLibraries();
    
    // Check if we're on client side
    if (typeof window === 'undefined') {
      throw new Error('PDF generation is only available on client side');
    }
    
    // Create a temporary container for the resume
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px'; // Wider container for better layout
    container.style.backgroundColor = '#ffffff';
    container.style.padding = '40px';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.fontSize = '12px';
    container.style.lineHeight = '1.4';
    container.style.minHeight = '1000px'; // Ensure minimum height
    
    // Generate resume HTML based on template
    const resumeHTML = generateResumeHTML(resumeData, template);
    container.innerHTML = resumeHTML;
    
    document.body.appendChild(container);
    
    // Wait a bit for rendering
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Generate PDF with better settings
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: container.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      logging: false,
      removeContainer: false,
    });
    
    // Create PDF
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgWidth = 595; // A4 width
    const pageHeight = 842; // A4 height
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page
    pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Clean up
    document.body.removeChild(container);
    
    // Save PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};

const generateResumeHTML = (resumeData, template) => {
  const { personalInfo, experience, education, skills, summary, projects } = resumeData;
  
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; background: white; min-height: 1000px;">
  `;
  
  if (template === 'modern') {
    html += `
      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 24px; margin-bottom: 24px;">
        <h1 style="margin: 0 0 8px 0; font-size: 36px; font-weight: bold; color: #111827;">
          ${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}
        </h1>
        <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 14px; color: #6b7280;">
          ${personalInfo?.email ? `<span>${personalInfo.email}</span>` : ''}
          ${personalInfo?.phone ? `<span>${personalInfo.phone}</span>` : ''}
          ${personalInfo?.city && personalInfo?.state ? `<span>${personalInfo.city}, ${personalInfo.state}</span>` : ''}
          ${personalInfo?.linkedin ? `<span>${personalInfo.linkedin}</span>` : ''}
        </div>
      </div>
    `;
  } else if (template === 'classic') {
    html += `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0 0 8px 0; font-size: 36px; font-weight: bold; color: #111827;">
          ${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}
        </h1>
        <p style="margin: 0 0 16px 0; font-size: 18px; color: #6b7280;">
          ${personalInfo?.title || ''}
        </p>
        <div style="font-size: 14px; color: #6b7280;">
          ${personalInfo?.email ? `${personalInfo.email} • ` : ''}
          ${personalInfo?.phone ? `${personalInfo.phone} • ` : ''}
          ${personalInfo?.city && personalInfo?.state ? `${personalInfo.city}, ${personalInfo.state}` : ''}
        </div>
      </div>
    `;
  } else {
    // Creative template
    html += `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; margin: -40px -40px 30px -40px; border-radius: 8px;">
        <h1 style="margin: 0 0 8px 0; font-size: 36px; font-weight: bold;">
          ${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}
        </h1>
        <p style="margin: 0 0 16px 0; font-size: 18px; opacity: 0.9;">
          ${personalInfo?.title || ''}
        </p>
        <div style="font-size: 14px; opacity: 0.8;">
          ${personalInfo?.email ? `<div>📧 ${personalInfo.email}</div>` : ''}
          ${personalInfo?.phone ? `<div>📞 ${personalInfo.phone}</div>` : ''}
          ${personalInfo?.city && personalInfo?.state ? `<div>📍 ${personalInfo.city}, ${personalInfo.state}</div>` : ''}
        </div>
      </div>
    `;
  }
  
  if (summary) {
    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 600; color: #2563eb;">
          Professional Summary
        </h2>
        <p style="margin: 0; line-height: 1.6; color: #374151;">
          ${summary}
        </p>
      </div>
    `;
  }
  
  if (experience && experience.length > 0) {
    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 600; color: #2563eb;">
          Professional Experience
        </h2>
    `;
    
    experience.forEach(exp => {
      html += `
        <div style="margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">
              ${exp.position || ''}
            </h3>
            <span style="font-size: 14px; color: #6b7280;">
              ${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''} - 
              ${exp.isCurrentJob ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '')}
            </span>
          </div>
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #2563eb;">
            ${exp.company || ''}
          </p>
          ${exp.location ? `<p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${exp.location}</p>` : ''}
          ${exp.description ? `<div style="font-size: 12px; line-height: 1.5; color: #374151;">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
        </div>
      `;
    });
    
    html += `</div>`;
  }
  
  if (education && education.length > 0) {
    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 600; color: #2563eb;">
          Education
        </h2>
    `;
    
    education.forEach(edu => {
      html += `
        <div style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">
              ${edu.institution || ''}
            </h3>
            <span style="font-size: 14px; color: #6b7280;">
              ${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''} - 
              ${edu.isCurrentlyStudying ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '')}
            </span>
          </div>
          <p style="margin: 0; font-size: 14px; color: #2563eb;">
            ${edu.degree || ''} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
          </p>
          ${edu.gpa ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">GPA: ${edu.gpa}</p>` : ''}
        </div>
      `;
    });
    
    html += `</div>`;
  }
  
  if (skills && skills.length > 0) {
    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 600; color: #2563eb;">
          Skills
        </h2>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    `;
    
    skills.forEach(skill => {
      html += `
        <span style="background: #f3f4f6; padding: 4px 8px; border-radius: 12px; font-size: 12px; color: #374151;">
          ${typeof skill === 'string' ? skill : skill.name || ''}
        </span>
      `;
    });
    
    html += `</div></div>`;
  }
  
  if (projects && projects.length > 0) {
    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 600; color: #2563eb;">
          Projects
        </h2>
    `;
    
    projects.forEach(project => {
      html += `
        <div style="margin-bottom: 16px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #111827;">
            ${project.name || ''}
          </h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; line-height: 1.5; color: #374151;">
            ${project.description || ''}
          </p>
          ${project.technologies && project.technologies.length > 0 ? `
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px;">
              ${project.technologies.map(tech => `
                <span style="background: #e5e7eb; padding: 2px 6px; border-radius: 8px; font-size: 10px; color: #6b7280;">
                  ${tech}
                </span>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    });
    
    html += `</div>`;
  }
  
  html += `</div>`;
  
  return html;
}; 