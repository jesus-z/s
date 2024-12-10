const signUp = document.getElementById('sign-up'),
    signIn = document.getElementById('sign-in'),
    loginIn = document.getElementById('login-in'),
    loginUp = document.getElementById('login-up')


signUp.addEventListener('click', ()=>{
    // Remove classes first if they exist
    loginIn.classList.remove('block')
    loginUp.classList.remove('none')

    // Add classes
    loginIn.classList.toggle('none')
    loginUp.classList.toggle('block')
})

signIn.addEventListener('click', ()=>{
    // Remove classes first if they exist
    loginIn.classList.remove('none')
    loginUp.classList.remove('block')

    // Add classes
    loginIn.classList.toggle('block')
    loginUp.classList.toggle('none')
})
document.addEventListener("DOMContentLoaded", () => {
    const iniciarBtn = document.querySelector(".login__button");
    const usernameInput = document.querySelector("input[placeholder='Username']");
    const passwordInput = document.querySelector("input[placeholder='Password']");
    const loading = document.getElementById("loading");

    // Credenciales válidas (solo como ejemplo)
    const validUsername = "admin";
    const validPassword = "1234";

    iniciarBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Evita la acción por defecto

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Validar credenciales
        if (username === validUsername && password === validPassword) {
            // Si las credenciales son correctas, muestra la pantalla de carga y redirige
            loading.classList.remove("hidden");

            setTimeout(() => {
                window.location.href = "index.html"; // Cambia por tu URL de destino
            }, 2000); // Tiempo de carga simulado
        } else {
            // Si son incorrectas, muestra un mensaje de error
            alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
        }
    });
});
