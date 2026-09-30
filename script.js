/* =========================================
   PRELOADER
========================================= */

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 700);

});



/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.getElementById("menuToggle");

const navbar =
    document.getElementById("nav");


menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");
    menuBtn.classList.toggle("active");

    const isOpen =
        navbar.classList.contains("active");

    menuBtn.setAttribute(
        "aria-expanded",
        isOpen
    );

});


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

        });

    });



/* =========================================
   THEME SWITCH
========================================= */

const themeBtn =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("jacq-theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.textContent = "☀";

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");


    if (document.body.classList.contains("light")) {

        themeBtn.textContent = "☀";

        localStorage.setItem(
            "jacq-theme",
            "light"
        );

    } else {

        themeBtn.textContent = "☾";

        localStorage.setItem(
            "jacq-theme",
            "dark"
        );

    }

});



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("visible");

                    revealObserver
                        .unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================
   PORTFOLIO FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");


const projects =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {


        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const filter =
            button.dataset.filter;


        projects.forEach(project => {


            const categories =
                project.dataset.category;


            if (
                filter === "all" ||
                categories.includes(filter)
            ) {

                project.classList.remove("hide");

            } else {

                project.classList.add("hide");

            }

        });

    });

});



/* =========================================
   PROJECT LIGHTBOX
========================================= */

const lightbox =
    document.getElementById("lightbox");


const lightboxImage =
    document.getElementById("lightboxImage");


const lightboxTitle =
    document.getElementById("lightboxTitle");


const lightboxType =
    document.getElementById("lightboxType");


const lightboxDescription =
    document.getElementById(
        "lightboxDescription"
    );


const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


projects.forEach(project => {


    project.addEventListener("click", () => {


        const image =
            project.dataset.image;


        const title =
            project.dataset.title;


        const type =
            project.dataset.type;


        const description =
            project.dataset.description;


        lightboxImage.src = image;

        lightboxImage.alt = title;

        lightboxTitle.textContent = title;

        lightboxType.textContent = type;

        lightboxDescription.textContent =
            description;


        lightbox.classList.add("active");

        document.body.classList.add(
            "no-scroll"
        );

    });

});



function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove(
        "no-scroll"
    );

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeLightbox();

        }

    }
);



/* =========================================
   PROJECT ENQUIRY → WHATSAPP
========================================= */

const whatsappForm =
    document.getElementById(
        "whatsappForm"
    );


whatsappForm.addEventListener(
    "click",
    () => {


        const name =
            document.getElementById(
                "clientName"
            ).value.trim();


        const type =
            document.getElementById(
                "projectType"
            ).value;


        const message =
            document.getElementById(
                "projectMessage"
            ).value.trim();


        if (!name) {

            alert(
                "Please enter your name."
            );

            return;

        }


        if (!type) {

            alert(
                "Please select a service."
            );

            return;

        }


        if (!message) {

            alert(
                "Please describe your project."
            );

            return;

        }


        const whatsappMessage =

            `Hello JACQ THE CREATOR 👋

My name is ${name}.

I would like help with:
${type}

Project details:
${message}

I found your portfolio website and would like to discuss the project.`;


        const encodedMessage =
            encodeURIComponent(
                whatsappMessage
            );


        const url =
            `https://wa.me/254116962853?text=${encodedMessage}`;


        window.open(
            url,
            "_blank"
        );

    }
);



/* =========================================
   TESTIMONIAL SLIDER
========================================= */

const testimonials = [

    {
        text:
            "Great design is not just decoration. It is communication with purpose.",

        name:
            "Your next project",

        role:
            "Could be featured here."
    },


    {
        text:
            "Every idea deserves a visual identity that makes people stop, look and remember.",

        name:
            "JACQ THE CREATOR",

        role:
            "Visuals That Vibe."
    },


    {
        text:
            "From concept to final artwork, the goal is simple: make the message impossible to ignore.",

        name:
            "Creative Philosophy",

        role:
            "Design with purpose."
    }

];


let testimonialIndex = 0;


const testimonialText =
    document.getElementById(
        "testimonialText"
    );


const authorName =
    document.querySelector(
        ".testimonial-author strong"
    );


const authorRole =
    document.querySelector(
        ".testimonial-author span"
    );


/**
 * @param {number} index
 */
function showTestimonial(index) {

    const item =
        testimonials[index];


    testimonialText.style.opacity = "0";


    setTimeout(() => {

        testimonialText.textContent =
            item.text;

        authorName.textContent =
            item.name;

        authorRole.textContent =
            item.role;

        testimonialText.style.opacity =
            "1";

    }, 200);

}


document
    .getElementById("nextTestimonial")
    .addEventListener(
        "click",
        () => {

            testimonialIndex++;

            if (
                testimonialIndex >=
                testimonials.length
            ) {

                testimonialIndex = 0;

            }

            showTestimonial(
                testimonialIndex
            );

        }
    );


document
    .getElementById("prevTestimonial")
    .addEventListener(
        "click",
        () => {

            testimonialIndex--;

            if (
                testimonialIndex < 0
            ) {

                testimonialIndex =
                    testimonials.length - 1;

            }

            showTestimonial(
                testimonialIndex
            );

        }
    );



/* =========================================
   BACK TO TOP
========================================= */

const topBtn =
    document.getElementById(
        "topBtn"
    );


window.addEventListener(
    "scroll",
    () => {


        if (
            window.scrollY > 600
        ) {

            topBtn.classList.add(
                "show"
            );

        } else {

            topBtn.classList.remove(
                "show"
            );

        }

    }
);


topBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();