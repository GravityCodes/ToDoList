export function AddToStorage (name, item) {
    localStorage.setItem(name, JSON.stringify(item));
}

