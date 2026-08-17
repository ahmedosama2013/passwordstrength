const passwordInput = document.getElementById('password-input');
const togglePassword = document.getElementById('toggle-password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

const criteria = {
    length: val => val.length >= 8,
    uppercase: val => /[A-Z]/.test(val),
    lowercase: val => /[a-z]/.test(val),
    number: val => /[0-9]/.test(val),
    symbol: val => /[^A-Za-z0-9]/.test(val)
};

togglePassword.addEventListener('click', () => {
    const isPass = passwordInput.type === 'password';
    passwordInput.type = isPass ? 'text' : 'password';
    togglePassword.textContent = isPass ? 'Hide' : 'Show';
});

passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    Object.keys(criteria).forEach(key => {
        const met = criteria[key](val);
        const element = document.getElementById(key);
        if (met) {
            element.classList.add('met');
            score++;
        } else {
            element.classList.remove('met');
        }
    });

    updateMeter(val.length, score);
});

function updateMeter(len, score) {
    if (len === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Empty';
        return;
    }
    
    const colors = ['#ef4444', '#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981'];
    strengthBar.style.width = (score / 5) * 100 + '%';
    strengthBar.style.backgroundColor = colors[score];
    
    const labels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
    strengthText.textContent = labels[score];
}