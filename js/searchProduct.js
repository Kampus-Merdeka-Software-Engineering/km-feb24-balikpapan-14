function handleSearch(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    const inputSearch = document.getElementById("search-bar"); // Corrected method name
    const query = inputSearch.value.trim(); // Trim any leading or trailing spaces

    if (query) {
        const searchUrl = `search.html?search=${encodeURIComponent(query)}`;
        window.location.href = searchUrl; // Redirect to search.html with the query parameter
    } else {
        alert("Please enter a search term."); // Optionally alert the user to enter a search term
    }
}
