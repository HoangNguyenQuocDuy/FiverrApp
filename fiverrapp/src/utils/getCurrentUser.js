export default function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    return user
}