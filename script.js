// DOM elements
const animationBox = document.getElementById('animationBox');
const bounceBtn = document.getElementById('bounceBtn');
const pulseBtn = document.getElementById('pulseBtn');
const rotateBtn = document.getElementById('rotateBtn');
const shakeBtn = document.getElementById('shakeBtn');
const themeSelect = document.getElementById('themeSelect');
const animationColor = document.getElementById('animationColor');
const animationDuration = document.getElementById('animationDuration');
const durationValue = document.getElementById('durationValue');
const savePreferencesBtn = document.getElementById('savePreferences');

// Update duration display as slider moves
animationDuration.addEventListener('input', function() {
    durationValue.textContent = this.value + 's';
});

/**
 * Apply animation to the box based on button clicked
 * @param {string} animationType - The type of animation to apply
 */
function applyAnimation(animationType) {
    // Clear any existing animation
    animationBox.style.animation = 'none';
    
    // Force reflow to ensure animation restarts
    void animationBox.offsetWidth;
    
    // Get saved duration or use default
    const duration = localStorage.getItem('animationDuration') || 1;
    
    // Apply the selected animation
    animationBox.style.animation = `${animationType} ${duration}s ease`;
}

// Animation button event listeners
bounceBtn.addEventListener('click', () => applyAnimation('bounce'));
pulseBtn.addEventListener('click', () => applyAnimation('pulse'));
rotateBtn.addEventListener('click', () => applyAnimation('rotate'));
shakeBtn.addEventListener('click', () => applyAnimation('shake'));

/**
 * Save user preferences to localStorage
 */
function savePreferences() {
    // Get current values
    const theme = themeSelect.value;
    const color = animationColor.value;
    const duration = animationDuration.value;
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('animationColor', color);
    localStorage.setItem('animationDuration', duration);
    
    // Apply saved preferences immediately
    applyPreferences();
    
    // Show confirmation with CSS animation
    const saveBtn = document.getElementById('savePreferences');
    saveBtn.textContent = 'Preferences Saved!';
    saveBtn.style.backgroundColor = '#4cd964'; // Success green color
    
    // Reset button after 2 seconds
    setTimeout(() => {
        saveBtn.textContent = 'Save Preferences';
        saveBtn.style.backgroundColor = '#0071e3';
    }, 2000);
}

/**
 * Apply preferences from localStorage
 */
function applyPreferences() {
    // Get saved values (or use defaults)
    const theme = localStorage.getItem('theme') || 'light';
    const color = localStorage.getItem('animationColor') || '#007aff';
    const duration = localStorage.getItem('animationDuration') || 1;
    
    // Apply theme
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    
    // Apply animation color
    animationBox.style.backgroundColor = color;
    
    // Update form values to match saved preferences
    themeSelect.value = theme;
    animationColor.value = color;
    animationDuration.value = duration;
    durationValue.textContent = duration + 's';
}

// Save preferences button event listener
savePreferencesBtn.addEventListener('click', savePreferences);

// Initialize page with saved preferences
document.addEventListener('DOMContentLoaded', applyPreferences);