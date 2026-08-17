(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const root = document.documentElement;

    const themeToggle = document.getElementById("theme-toggle");

    const themeIcon = document.getElementById("theme-icon");

    const mobileToggle =
      document.querySelector(".mobile-nav-toggle");

    const sidebar =
      document.querySelector(".sidebar");


    /* =====================================================
       THEME
    ===================================================== */

    function getTheme() {
      return root.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    }


    function setTheme(theme) {

      if (theme === "dark") {

        root.setAttribute("data-theme", "dark");

        if (themeIcon) {
          themeIcon.textContent = "☀";
        }

        if (themeToggle) {

          themeToggle.setAttribute(
            "aria-label",
            "Disable dark mode"
          );

          themeToggle.setAttribute(
            "title",
            "Disable dark mode"
          );

          themeToggle.setAttribute(
            "aria-pressed",
            "true"
          );
        }

      } else {

        root.removeAttribute("data-theme");

        if (themeIcon) {
          themeIcon.textContent = "☾";
        }

        if (themeToggle) {

          themeToggle.setAttribute(
            "aria-label",
            "Enable dark mode"
          );

          themeToggle.setAttribute(
            "title",
            "Enable dark mode"
          );

          themeToggle.setAttribute(
            "aria-pressed",
            "false"
          );
        }
      }


      try {
        localStorage.setItem("theme", theme);
      } catch (error) {
        console.log("Unable to save theme.");
      }
    }


    /* =====================================================
       INITIAL THEME
    ===================================================== */

    let savedTheme = null;

    try {
      savedTheme = localStorage.getItem("theme");
    } catch (error) {
      savedTheme = null;
    }


    if (savedTheme === "dark") {

      setTheme("dark");

    } else if (savedTheme === "light") {

      setTheme("light");

    } else {

      /*
       * No saved preference.
       * Use the browser's system preference.
       */

      const prefersDark =
        window.matchMedia &&
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      setTheme(
        prefersDark ? "dark" : "light"
      );
    }


    /* =====================================================
       DARK MODE BUTTON
    ===================================================== */

    if (themeToggle) {

      themeToggle.addEventListener(
        "click",
        function () {

          const currentTheme = getTheme();

          if (currentTheme === "dark") {

            setTheme("light");

          } else {

            setTheme("dark");

          }
        }
      );

    } else {

      console.error(
        "Dark mode button #theme-toggle was not found."
      );
    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (mobileToggle && sidebar) {

      mobileToggle.addEventListener(
        "click",
        function () {

          const isOpen =
            sidebar.classList.toggle("is-open");

          mobileToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
          );

        }
      );


      const navLinks =
        sidebar.querySelectorAll("a");


      navLinks.forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            sidebar.classList.remove(
              "is-open"
            );

            mobileToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const sections =
      document.querySelectorAll(
        ".content-section"
      );


    if ("IntersectionObserver" in window) {

      const observer =
        new IntersectionObserver(
          function (entries, observerInstance) {

            entries.forEach(
              function (entry) {

                if (entry.isIntersecting) {

                  entry.target.classList.add(
                    "is-visible"
                  );

                  observerInstance.unobserve(
                    entry.target
                  );
                }

              }
            );

          },
          {
            threshold: 0.1
          }
        );


      sections.forEach(
        function (section) {

          observer.observe(section);

        }
      );

    } else {

      sections.forEach(
        function (section) {

          section.classList.add(
            "is-visible"
          );

        }
      );
    }

  });

})();