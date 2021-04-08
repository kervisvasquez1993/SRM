document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if(document.getElementById('toast')) {
            document.getElementById('toast').style.display = 'none';
        }
    }, 2000);
});
