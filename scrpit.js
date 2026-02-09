        // Main application JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize AOS (Animate On Scroll)
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });

            // Preloader
            window.addEventListener('load', function() {
                const preloader = document.getElementById('preloader');
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 1500);
            });

            // NEW: Navigation Active State Management
            function updateActiveNavLink() {
                const sections = document.querySelectorAll('.page-section');
                const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.clientHeight;
                    const scrollPosition = window.scrollY;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            // Initialize active navigation
            updateActiveNavLink();
            window.addEventListener('scroll', updateActiveNavLink);

            // Create matrix background effect
            function createMatrixBackground() {
                const canvas = document.createElement('canvas');
                canvas.className = 'matrix-bg';
                canvas.id = 'matrixBg';
                document.body.prepend(canvas);
                
                const ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                
                const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const charArray = characters.split('');
                const fontSize = 14;
                const columns = canvas.width / fontSize;
                const drops = [];
                
                for (let i = 0; i < columns; i++) {
                    drops[i] = 1;
                }
                
                function draw() {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    ctx.fillStyle = '#0F0';
                    ctx.font = fontSize + 'px monospace';
                    
                    for (let i = 0; i < drops.length; i++) {
                        const text = charArray[Math.floor(Math.random() * charArray.length)];
                        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                        
                        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }
                        
                        drops[i]++;
                    }
                }
                
                setInterval(draw, 33);
                
                window.addEventListener('resize', function() {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                });
            }
            
            createMatrixBackground();

            // Theme management
            const themeToggle = document.getElementById('themeToggle');
            const currentTheme = localStorage.getItem('theme') || 'dark';
            
            document.documentElement.setAttribute('data-theme', currentTheme);
            updateThemeIcon(currentTheme);
            
            themeToggle.addEventListener('click', function() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);
            });
            
            function updateThemeIcon(theme) {
                const icon = themeToggle.querySelector('i');
                if (theme === 'dark') {
                    icon.className = 'bi bi-sun-fill';
                } else {
                    icon.className = 'bi bi-moon-fill';
                }
            }
            
            // Navbar scroll effect
            window.addEventListener('scroll', function() {
                const navbar = document.getElementById('mainNav');
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
            
            // Create particles
            function createParticles() {
                const particlesContainer = document.getElementById('particles-js');
                const particleCount = 30;
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    // Random size between 2px and 6px
                    const size = Math.random() * 4 + 2;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    // Random position
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.top = `${Math.random() * 100}%`;
                    
                    // Random animation delay
                    particle.style.animationDelay = `${Math.random() * 15}s`;
                    
                    particlesContainer.appendChild(particle);
                }
            }
            
            createParticles();
            
            // Counter animation
            function animateCounters() {
                const counters = document.querySelectorAll('.counter');
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const suffix = counter.textContent.replace(/[0-9]/g, '');
                    let current = 0;
                    
                    const increment = target / 100;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current) + suffix;
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.textContent = target + suffix;
                        }
                    };
                    
                    updateCounter();
                });
            }
            
            // Animate cards on scroll
            function animateCards() {
                const cards = document.querySelectorAll('.card, .feature-card, .stats-card');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                
                cards.forEach(card => {
                    observer.observe(card);
                });
            }
            
            // Animate team members
            function animateTeamMembers() {
                const teamMembers = document.querySelectorAll('.team-member');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.classList.add('animate-in');
                            }, index * 200);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                
                teamMembers.forEach(member => {
                    observer.observe(member);
                });
            }
            
            // Initialize animations
            animateCards();
            animateTeamMembers();
            
            // Start counter animation when dashboard section is in view
            const dashboardSection = document.getElementById('dashboard');
            const dashboardObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateCounters();
                    dashboardObserver.unobserve(dashboardSection);
                }
            });
            
            dashboardObserver.observe(dashboardSection);
            
            // Form submissions
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    showToast('Login successful!', 'success');
                    setTimeout(() => {
                        document.getElementById('loginModal').querySelector('.btn-close').click();
                    }, 1500);
                });
            }
            
            const signupForm = document.getElementById('signupForm');
            if (signupForm) {
                signupForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    showToast('Account created successfully! Welcome to CyberNest.', 'success');
                    setTimeout(() => {
                        document.getElementById('signupModal').querySelector('.btn-close').click();
                    }, 1500);
                });
            }
            
            // Toast notification function
            function showToast(message, type = 'info') {
                const toastContainer = document.querySelector('.toast-container');
                const toastId = 'toast-' + Date.now();
                
                const toast = document.createElement('div');
                toast.className = `toast align-items-center text-bg-${type} border-0`;
                toast.setAttribute('id', toastId);
                toast.setAttribute('role', 'alert');
                toast.setAttribute('aria-live', 'assertive');
                toast.setAttribute('aria-atomic', 'true');
                
                toast.innerHTML = `
                    <div class="d-flex">
                        <div class="toast-body">
                            ${message}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                `;
                
                toastContainer.appendChild(toast);
                
                const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
                bsToast.show();
                
                // Remove toast from DOM after it's hidden
                toast.addEventListener('hidden.bs.toast', function() {
                    toast.remove();
                });
            }
            
            // Typewriter effect for hero section
            function initTypewriter() {
                const typewriterText = document.getElementById('typewriter-text');
                const text = "Run Any OS, Anywhere — Instantly in Your Browser";
                let index = 0;
                
                function type() {
                    if (index < text.length) {
                        typewriterText.innerHTML += text.charAt(index);
                        index++;
                        setTimeout(type, 100);
                    }
                }
                
                // Start typing after a short delay
                setTimeout(type, 500);
            }
            
            initTypewriter();
            
            // OS Launch with configuration and boot sequence
            const osLaunchButtons = document.querySelectorAll('.launch-os');
            let currentOS = '';
            let currentOSName = '';
            
            osLaunchButtons.forEach(button => {
                button.addEventListener('click', function() {
                    currentOS = this.getAttribute('data-os');
                    currentOSName = this.getAttribute('data-os-name');
                    
                    // Show configuration modal for all OS
                    const configModal = new bootstrap.Modal(document.getElementById('osConfigModal'));
                    document.getElementById('osConfigTitle').textContent = `Configure ${currentOSName}`;
                    document.getElementById('vmName').value = `${currentOSName} VM`;
                    
                    // Update the next step button text
                    const nextStepBtn = document.getElementById('nextStep');
                    if (currentOS === 'aurora') {
                        nextStepBtn.textContent = 'Launch Virtual Machine';
                    } else {
                        nextStepBtn.textContent = 'Next';
                    }
                    
                    configModal.show();
                });
            });
            
            // OS Configuration modal handling
            const nextStepBtn = document.getElementById('nextStep');
            const cancelConfigBtn = document.getElementById('cancelConfig');
            const step1 = document.getElementById('step1');
            const step2 = document.getElementById('step2');
            
            nextStepBtn.addEventListener('click', function() {
                if (step1.classList.contains('active')) {
                    // For Aurora OS
                    if (currentOS === 'aurora') {
                        // Close configuration modal
                        bootstrap.Modal.getInstance(document.getElementById('osConfigModal')).hide();
                        
                        
                        window.location.href = 'https://mental-os.github.io/Aurora-OS.js/';
                        showToast('Aurora OS launched successfully!');
                        
                        // Reset modal state
                        resetConfigModal();
                    } else {
                        // For other OS, proceed to step 2 (launch progress)
                        step1.classList.remove('active');
                        step2.classList.add('active');
                        nextStepBtn.disabled = true;
                        cancelConfigBtn.disabled = true;
                        
                        // Start launch sequence
                        startOSLaunch();
                    }
                }
            });
            
            cancelConfigBtn.addEventListener('click', function() {
                resetConfigModal();
            });
            
            // Reset configuration modal
            function resetConfigModal() {
                step1.classList.add('active');
                step2.classList.remove('active');
                nextStepBtn.disabled = false;
                cancelConfigBtn.disabled = false;
                nextStepBtn.textContent = 'Next';
                
                // Reset progress bar
                document.getElementById('launchProgressBar').style.width = '0%';
            }
            
            // Reset modal when hidden
            document.getElementById('osConfigModal').addEventListener('hidden.bs.modal', function() {
                resetConfigModal();
            });
            
            function startOSLaunch() {
                const progressBar = document.getElementById('launchProgressBar');
                const launchStatus = document.getElementById('launchStatus');
                let progress = 0;
                
                const steps = [
                    "Initializing Virtual Machine...",
                    "Loading System Files...",
                    "Booting OS...",
                    "Starting Interface...",
                    "Finalizing Setup..."
                ];
                
                let currentStep = 0;
                
                const progressInterval = setInterval(() => {
                    progress += 2;
                    progressBar.style.width = `${progress}%`;
                    
                    if (progress >= 20 && currentStep === 0) {
                        launchStatus.textContent = steps[0];
                        currentStep++;
                    } else if (progress >= 40 && currentStep === 1) {
                        launchStatus.textContent = steps[1];
                        currentStep++;
                    } else if (progress >= 60 && currentStep === 2) {
                        launchStatus.textContent = steps[2];
                        currentStep++;
                    } else if (progress >= 80 && currentStep === 3) {
                        launchStatus.textContent = steps[3];
                        currentStep++;
                    } else if (progress >= 95 && currentStep === 4) {
                        launchStatus.textContent = steps[4];
                        currentStep++;
                    }
                    
                    if (progress >= 100) {
                        clearInterval(progressInterval);
                        
                        // Close configuration modal
                        setTimeout(() => {
                            bootstrap.Modal.getInstance(document.getElementById('osConfigModal')).hide();
                            
                            // Show boot animation for other OS
                            showBootAnimation(currentOS, currentOSName);
                        }, 1000);
                    }
                }, 100);
            }
            
            function showBootAnimation(os, osName) {
                const bootAnimation = document.getElementById('bootAnimation');
                const bootLogo = document.getElementById('bootLogo');
                const bootMessage = document.getElementById('bootMessage');
                
                // Set OS-specific logo and message
                let logoHTML = '';
                
                switch(os) {
                    case 'windows11':
                        logoHTML = '<i class="bi bi-windows display-1 text-primary"></i>';
                        break;
                    case 'ubuntu':
                        logoHTML = '<i class="bi bi-ubuntu display-1 text-warning"></i>';
                        break;
                    case 'macos':
                        logoHTML = '<i class="bi bi-apple display-1 text-secondary"></i>';
                        break;
                    default:
                        logoHTML = '<i class="bi bi-laptop display-1 text-primary"></i>';
                }
                
                bootLogo.innerHTML = logoHTML;
                bootMessage.textContent = `Booting ${osName}...`;
                
                // Show boot animation
                bootAnimation.style.display = 'flex';
                
                // Hide boot animation after 5 seconds and show fullscreen OS
                setTimeout(() => {
                    bootAnimation.style.display = 'none';
                    showFullscreenOS(os, osName);
                    
                    // Update terminal animation
                    updateTerminalAnimation(osName);
                }, 5000);
            }
            
            function showFullscreenOS(os, osName) {
                const fullscreenOS = document.getElementById('osFullscreen');
                const fullscreenTitle = document.getElementById('fullscreenOSTitle');
                
                fullscreenTitle.textContent = osName;
                
                // Hide all OS home pages
                document.querySelectorAll('.os-home-page').forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show the appropriate OS home page
                switch(os) {
                    case 'windows11':
                        document.getElementById('windowsHome').classList.add('active');
                        break;
                    case 'ubuntu':
                        document.getElementById('ubuntuHome').classList.add('active');
                        break;
                    case 'macos':
                        document.getElementById('macosHome').classList.add('active');
                        break;
                    default:
                        // For custom OS, show the custom OS home page
                        document.getElementById('customOSHome').classList.add('active');
                        document.getElementById('customOSHomeTitle').textContent = osName;
                }
                
                fullscreenOS.style.display = 'block';
            }
            
            // Exit fullscreen OS view
            document.getElementById('exitFullscreen').addEventListener('click', function() {
                document.getElementById('osFullscreen').style.display = 'none';
            });
            
            // Linux Terminal Animation
            function createTerminalAnimation() {
                const terminalLines = document.getElementById('terminalLines');
                const lines = [
                    { text: 'root@cybernest:~# systemctl start virtualization', type: 'user' },
                    { text: 'Starting virtualization service...', type: 'process' },
                    { text: '✓ Virtualization service started successfully', type: 'success' },
                    { text: 'root@cybernest:~# vm-manager --list', type: 'user' },
                    { text: 'Available Virtual Machines:', type: 'output' },
                    { text: '  • Windows 11 Pro (Running)', type: 'directory' },
                    { text: '  • Ubuntu 22.04 LTS (Running)', type: 'directory' },
                    { text: '  • macOS Monterey (Stopped)', type: 'directory' },
                    { text: '  • Aurora OS (Ready)', type: 'info' },
                    { text: 'root@cybernest:~# vm-stats --all', type: 'user' },
                    { text: 'System Resources:', type: 'output' },
                    { text: '  CPU Usage: 18%', type: 'output' },
                    { text: '  Memory: 4.2GB / 16GB', type: 'output' },
                    { text: '  Storage: 56GB / 128GB', type: 'output' },
                    { text: '  Network: 124MB transferred', type: 'output' },
                    { text: 'root@cybernest:~# security-check --full', type: 'user' },
                    { text: 'Running security audit...', type: 'process' },
                    { text: '✓ All systems secure', type: 'success' },
                    { text: '✓ Firewall active', type: 'success' },
                    { text: '✓ Encryption enabled', type: 'success' },
                    { text: 'root@cybernest:~# update-system', type: 'user' },
                    { text: 'Checking for updates...', type: 'process' },
                    { text: 'System is up to date', type: 'success' },
                    { text: 'root@cybernest:~# network-test --global', type: 'user' },
                    { text: 'Testing global connectivity...', type: 'process' },
                    { text: '✓ US-East: 24ms', type: 'success' },
                    { text: '✓ EU-West: 42ms', type: 'success' },
                    { text: '✓ Asia-Pacific: 86ms', type: 'success' },
                    { text: 'root@cybernest:~# vm-create --name "Aurora-OS" --type custom', type: 'user' },
                    { text: 'Creating Aurora OS virtual machine...', type: 'process' },
                    { text: '✓ Aurora OS ready for launch', type: 'success' },
                    { text: 'root@cybernest:~# ', type: 'user' },
                ];
                
                // Create terminal lines
                lines.forEach(line => {
                    const lineElement = document.createElement('div');
                    lineElement.className = `terminal-line ${line.type}`;
                    lineElement.innerHTML = line.text;
                    
                    // Add cursor to the last line
                    if (line === lines[lines.length - 1]) {
                        const cursor = document.createElement('span');
                        cursor.className = 'terminal-cursor';
                        lineElement.appendChild(cursor);
                    }
                    
                    terminalLines.appendChild(lineElement);
                });
            }
            
            function updateTerminalAnimation(osName) {
                const terminalLines = document.getElementById('terminalLines');
                const newLines = [
                    { text: `root@cybernest:~# vm-launch --os "${osName}"`, type: 'user' },
                    { text: `Launching ${osName} virtual machine...`, type: 'process' },
                    { text: 'Allocating resources...', type: 'process' },
                    { text: 'Loading system image...', type: 'process' },
                    { text: 'Initializing virtual hardware...', type: 'process' },
                    { text: 'Starting virtual machine...', type: 'process' },
                    { text: `✓ ${osName} launched successfully`, type: 'success' },
                    { text: 'Virtual Machine is now ready for use', type: 'output' },
                    { text: 'Access: https://cybernest.app/vm/' + osName.toLowerCase().replace(/\s+/g, '-'), type: 'info' },
                    { text: 'root@cybernest:~# ', type: 'user' },
                ];
                
                // Clear existing lines
                terminalLines.innerHTML = '';
                
                // Add new lines
                newLines.forEach(line => {
                    const lineElement = document.createElement('div');
                    lineElement.className = `terminal-line ${line.type}`;
                    lineElement.innerHTML = line.text;
                    
                    // Add cursor to the last line
                    if (line === newLines[newLines.length - 1]) {
                        const cursor = document.createElement('span');
                        cursor.className = 'terminal-cursor';
                        lineElement.appendChild(cursor);
                    }
                    
                    terminalLines.appendChild(lineElement);
                });
            }
            
            // Initialize terminal animation
            createTerminalAnimation();
            
            // NEW: Import OS Functionality
            const importOSModal = new bootstrap.Modal(document.getElementById('importOSModal'));
            const fileUploadArea = document.getElementById('fileUploadArea');
            const osFileInput = document.getElementById('osFileInput');
            const browseFilesBtn = document.getElementById('browseFilesBtn');
            const fileInfo = document.getElementById('fileInfo');
            const fileName = document.getElementById('fileName');
            const fileSize = document.getElementById('fileSize');
            const removeFileBtn = document.getElementById('removeFileBtn');
            const osNameInput = document.getElementById('osName');
            const nextImportStep = document.getElementById('nextImportStep');
            const cancelImportBtn = document.getElementById('cancelImportBtn');
            const importProgressBar = document.getElementById('importProgressBar');
            const importStatus = document.getElementById('importStatus');
            const finalOSName = document.getElementById('finalOSName');
            const finalFileSize = document.getElementById('finalFileSize');
            const compressedSize = document.getElementById('compressedSize');
            
            let selectedFile = null;
            
            // File upload area click handler
            fileUploadArea.addEventListener('click', function() {
                osFileInput.click();
            });
            
            // Browse files button
            browseFilesBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                osFileInput.click();
            });
            
            // File input change handler
            osFileInput.addEventListener('change', function(e) {
                if (this.files.length > 0) {
                    handleFileSelection(this.files[0]);
                }
            });
            
            // Drag and drop functionality
            fileUploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('dragover');
            });
            
            fileUploadArea.addEventListener('dragleave', function() {
                this.classList.remove('dragover');
            });
            
            fileUploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('dragover');
                
                if (e.dataTransfer.files.length > 0) {
                    handleFileSelection(e.dataTransfer.files[0]);
                }
            });
            
            // Remove file button
            removeFileBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                resetFileSelection();
            });
            
            // OS name input validation
            osNameInput.addEventListener('input', function() {
                validateImportForm();
            });
            
            // Next step button in import modal
            nextImportStep.addEventListener('click', function() {
                const currentStep = getCurrentImportStep();
                
                if (currentStep === 1) {
                    // Move to step 2 (processing)
                    showImportStep(2);
                    processOSImage();
                } else if (currentStep === 2) {
                    // Move to step 3 (ready to boot)
                    showImportStep(3);
                    nextImportStep.textContent = 'Boot OS';
                } else if (currentStep === 3) {
                    // Boot the imported OS
                    bootImportedOS();
                }
            });
            
            // Cancel import button
            cancelImportBtn.addEventListener('click', function() {
                resetImportModal();
            });
            
            // Import modal hidden event
            document.getElementById('importOSModal').addEventListener('hidden.bs.modal', function() {
                resetImportModal();
            });
            
            function handleFileSelection(file) {
                // Validate file type
                const validExtensions = ['.iso', '.img', '.vmdk', '.qcow2'];
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                
                if (!validExtensions.includes(fileExtension)) {
                    showToast('Please select a valid OS image file (ISO, IMG, VMDK, QCOW2)', 'error');
                    return;
                }
                
                selectedFile = file;
                
                // Update file info display
                fileName.textContent = file.name;
                fileSize.textContent = formatFileSize(file.size);
                fileInfo.style.display = 'block';
                
                // Auto-fill OS name if empty
                if (!osNameInput.value) {
                    osNameInput.value = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
                }
                
                validateImportForm();
            }
            
            function resetFileSelection() {
                selectedFile = null;
                osFileInput.value = '';
                fileInfo.style.display = 'none';
                validateImportForm();
            }
            
            function validateImportForm() {
                if (selectedFile && osNameInput.value.trim() !== '') {
                    nextImportStep.disabled = false;
                } else {
                    nextImportStep.disabled = true;
                }
            }
            
            function getCurrentImportStep() {
                if (document.getElementById('import-step1').classList.contains('active')) return 1;
                if (document.getElementById('import-step2').classList.contains('active')) return 2;
                if (document.getElementById('import-step3').classList.contains('active')) return 3;
                return 1;
            }
            
            function showImportStep(step) {
                // Hide all steps
                document.querySelectorAll('.import-step').forEach(stepEl => {
                    stepEl.classList.remove('active');
                });
                
                // Show the specified step
                document.getElementById(`import-step${step}`).classList.add('active');
                
                // Update button text
                if (step === 1) {
                    nextImportStep.textContent = 'Next';
                    nextImportStep.disabled = true;
                } else if (step === 2) {
                    nextImportStep.textContent = 'Processing...';
                    nextImportStep.disabled = true;
                } else if (step === 3) {
                    nextImportStep.textContent = 'Boot OS';
                    nextImportStep.disabled = false;
                }
            }
            
            function processOSImage() {
                let progress = 0;
                
                const progressInterval = setInterval(() => {
                    progress += 2;
                    importProgressBar.style.width = `${progress}%`;
                    
                    if (progress <= 30) {
                        importStatus.textContent = 'Validating file format...';
                    } else if (progress <= 60) {
                        importStatus.textContent = 'Compressing OS image...';
                    } else if (progress <= 90) {
                        importStatus.textContent = 'Optimizing for virtualization...';
                    } else {
                        importStatus.textContent = 'Finalizing setup...';
                    }
                    
                    if (progress >= 100) {
                        clearInterval(progressInterval);
                        
                        // Calculate compressed size (simulate 40-60% compression)
                        const originalSize = selectedFile.size;
                        const compressionRatio = 0.4 + Math.random() * 0.2; // 40-60% compression
                        const compressedFileSize = Math.round(originalSize * compressionRatio);
                        
                        // Update final display
                        finalOSName.textContent = osNameInput.value;
                        finalFileSize.textContent = formatFileSize(originalSize);
                        compressedSize.textContent = formatFileSize(compressedFileSize);
                        
                        // Enable next button
                        setTimeout(() => {
                            nextImportStep.disabled = false;
                            nextImportStep.textContent = 'Next';
                        }, 500);
                    }
                }, 50);
            }
            
            function bootImportedOS() {
                // Close import modal
                importOSModal.hide();
                
                // Set current OS to custom
                currentOS = 'custom';
                currentOSName = osNameInput.value;
                
                // Show boot animation
                showBootAnimation('custom', currentOSName);
                
                // Show success message
                showToast(`${currentOSName} has been successfully imported and is now booting!`, 'success');
            }
            
            function resetImportModal() {
                // Reset to step 1
                showImportStep(1);
                
                // Clear file selection
                resetFileSelection();
                
                // Clear form inputs
                osNameInput.value = '';
                
                // Reset progress bar
                importProgressBar.style.width = '0%';
            }
            
            function formatFileSize(bytes) {
                if (bytes === 0) return '0 Bytes';
                
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            }
            
            // 3D card effects on mouse move
            const cards3d = document.querySelectorAll('.card-3d');
            cards3d.forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const angleY = (x - centerX) / 25;
                    const angleX = (centerY - y) / 25;
                    
                    this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                });
            });
        });
    
