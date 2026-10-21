import JSZip from 'jszip';
import { PYTHON_PROJECT_FILES } from '../data/pythonCode';
import { ACADEMIC_REPORT_SECTIONS } from '../data/academicDocumentation';
import { ELEVATOR_PITCH, PRESENTATION_SLIDES, VIVA_QUESTIONS } from '../data/vivaAndPresentation';

export async function downloadProjectZip(): Promise<void> {
  const zip = new JSZip();

  // 1. Add all core Python files and requirements
  PYTHON_PROJECT_FILES.forEach(file => {
    zip.file(file.filename, file.code);
  });

  // 2. Add Windows helper batch script for one-click setup
  const windowsBat = `@echo off
echo ===============================================================
echo EcoVision: Garbage Classification and Detection Setup (Windows)
echo ===============================================================
echo 1. Checking Python installation...
python --version
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH! Please install Python 3.10+ from python.org
    pause
    exit /b
)

echo.
echo 2. Creating virtual environment 'env'...
if not exist "env" (
    python -m venv env
)

echo.
echo 3. Activating virtual environment and installing dependencies...
call env\\Scripts\\activate
pip install --upgrade pip
pip install -r requirements.txt

echo.
echo ===============================================================
echo Setup Complete!
echo To run the Streamlit Web App:
echo      streamlit run app.py
echo To train the deep learning model:
echo      python train_model.py --epochs 25
echo ===============================================================
cmd /k
`;
  zip.file('setup_windows.bat', windowsBat);

  // 3. Add Linux / macOS bash script
  const linuxSh = `#!/usr/bin/env bash
echo "==============================================================="
echo "EcoVision: Garbage Classification and Detection Setup (Linux/Mac)"
echo "==============================================================="
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed!"
    exit 1
fi

echo "1. Creating virtual environment 'env'..."
if [ ! -d "env" ]; then
    python3 -m venv env
fi

echo "2. Activating virtual environment and installing packages..."
source env/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo ""
echo "Setup Complete!"
echo "Run Streamlit application with:"
echo "    streamlit run app.py"
`;
  zip.file('setup_linux_mac.sh', linuxSh);

  // 4. Create directory structure markers (.gitkeep)
  const folders = [
    'dataset/train/cardboard',
    'dataset/train/glass',
    'dataset/train/metal',
    'dataset/train/organic',
    'dataset/train/other',
    'dataset/train/paper',
    'dataset/train/plastic',
    'dataset/val/cardboard',
    'dataset/val/glass',
    'dataset/val/metal',
    'dataset/val/organic',
    'dataset/val/other',
    'dataset/val/paper',
    'dataset/val/plastic',
    'dataset/test/plastic',
    'models',
    'outputs'
  ];
  folders.forEach(dir => {
    zip.file(`${dir}/.gitkeep`, '# Placeholder directory for garbage images\n');
  });

  // 5. Add Complete Academic Report Markdown
  let reportMarkdown = '# ACADEMIC PROJECT REPORT\n\n';
  ACADEMIC_REPORT_SECTIONS.forEach(sec => {
    reportMarkdown += `\n## Section ${sec.number}: ${sec.title}\n`;
    reportMarkdown += `${sec.content}\n\n---\n`;
  });
  zip.file('docs/ACADEMIC_PROJECT_REPORT.md', reportMarkdown);

  // 6. Add Viva Voce and Presentation Guide Markdown
  let vivaMarkdown = '# VIVA VOCE & PRESENTATION GUIDE\n\n';
  vivaMarkdown += '## 2-Minute Elevator Pitch Script\n\n' + ELEVATOR_PITCH + '\n\n---\n';
  vivaMarkdown += '## PowerPoint Slide Deck Outline\n\n';
  PRESENTATION_SLIDES.forEach(s => {
    vivaMarkdown += `### Slide ${s.slideNumber}: ${s.title}\n`;
    s.keyPoints.forEach(kp => { vivaMarkdown += `- ${kp}\n`; });
    vivaMarkdown += `\n*Visual:* ${s.visualSuggestion}\n`;
    vivaMarkdown += `*Speaker Notes:* ${s.speakerNotes}\n\n`;
  });
  vivaMarkdown += '\n---\n## 25 Viva Voce Questions & Answers\n\n';
  VIVA_QUESTIONS.forEach(q => {
    vivaMarkdown += `**Q${q.id} (${q.category} - ${q.difficulty}):** ${q.question}\n`;
    vivaMarkdown += `**Answer:** ${q.answer}\n\n`;
  });
  zip.file('docs/VIVA_AND_PRESENTATION_GUIDE.md', vivaMarkdown);

  // Generate blob and trigger download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'EcoVision_Garbage_Classification_Project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
