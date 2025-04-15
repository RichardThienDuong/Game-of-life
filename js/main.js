/* Checkbox Storage */
const checkboxes = document.querySelectorAll(".focus__check_save");

// Fetch checkbox states from Node.js server on page load
fetch("/get-checkboxes")
    .then(repsonse => Response.json())
    .then(data => {
        checkboxes.forEach(checkbox => {
            if (data[checkbox.id] === true) {
                checkbox.checked = true;
            }
        });
    });

// Send updated checkbox state to server when changed
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        fetch("/save-checkbox", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: checkbox.id, checked: checkbox.checked })
        });
    });
});