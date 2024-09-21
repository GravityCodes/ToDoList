import { setTheme, getTheme } from "./storageHandler";


const themeToggle = document.querySelector("#dark-theme-btn");
setTheme();

function lightTheme (){
    document.documentElement.style.setProperty('--c-page-bg:', '#ffffff');
    document.documentElement.style.setProperty('--c-card-bg', '#ececec');
    document.documentElement.style.setProperty('--c-neutral-1', '#242424');
}
function darkTheme () {
    document.documentElement.style.setProperty('--c-page-bg:', '#1f1f1f');
    document.documentElement.style.setProperty('--c-card-bg', '#282828');
    document.documentElement.style.setProperty('--c-neutral-1', 'white');
}

function toggleTheme (){
    let theme = getTheme();

    if(theme === "light"){
        darkTheme();
        setTheme("dark");
    }
    else if (them === "dark"){
        lightTheme();
        setTheme("light");
    }
}
themeToggle.addEventListener('click', toggleTheme );
