/* INCLUDE HTML */

async function includeHTML() {
  const includeElements = document.querySelectorAll("[data-include-html]");
  const fetchPromises = Array.from(includeElements).map(async (element) => {
    try {
      const filePath = element.getAttribute("data-include-html");
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${filePath}: ${response.status} ${response.statusText}`
        );
      }
      const html = await response.text();
      const newContentElement = document.createElement("div");
      newContentElement.innerHTML = html;
      const newContent = newContentElement.innerHTML;
      element.insertAdjacentHTML("afterend", newContent);
      element.style.display = "none";
      element.remove();
    } catch (error) {
      console.error(error);
      element.innerHTML = "Error loading the file.";
    }
  });

  await Promise.all(fetchPromises);
}
document.addEventListener("DOMContentLoaded", includeHTML);

/* DROPDOWN */

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const dropdownMenu = dropdown.querySelector(".dropdown-menu");

  if (dropdownMenu) {
    dropdown.addEventListener("click", function (event) {
      const isClickedInsideContent = dropdownMenu.contains(event.target);
      const isActive = dropdown.classList.contains("active");

      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active");
        }
      });

      if (!isClickedInsideContent && !isActive) {
        dropdown.classList.add("active");
      } else {
        dropdown.classList.remove("active");
      }

      event.stopPropagation();
    });

    dropdownMenu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }
});

document.addEventListener("click", function (event) {
  const isClickedInsideModal =
    event.target.classList.contains("modal") || event.target.closest(".modal");

  if (!isClickedInsideModal) {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});

/* WORKAROUNDS */

document.querySelectorAll("a:not(a[href])").forEach((element) => {
  element.setAttribute("tabindex", "0");
});
