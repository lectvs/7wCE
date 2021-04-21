class Login {

    static start() {
        let form = <HTMLFormElement>document.getElementById('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    static login() {
        let errorp = document.getElementById('error');
        errorp.innerText = '';

        let username: string = document.forms["form"]["username"].value;
        let password: string = document.forms["form"]["password"].value;
        if (!username || !password) {
            errorp.innerText = 'Username and password must be provided';
            return;
        }


        let password_hash = hash(password);
        API.login(username, password_hash, (error: string) => {
            if (error) {
                errorp.innerText = error;
                return;
            }
            document.cookie = `username=${username}; max-age=31536000`;
            document.cookie = `password_hash=${password_hash}; max-age=31536000`;
            window.location.href = './';
        });
    }

    static logout() {
        document.cookie = 'username=; max-age=-99999999';
        document.cookie = 'password_hash=; max-age=-99999999';
        window.location.href = './login.html';
    }
}