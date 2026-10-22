document.addEventListener("DOMContentLoaded", () => {


    /* ==============================
       SCROLL REVEAL
    ============================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });



    /* ==============================
       BUTTON RIPPLE EFFECT
    ============================== */

    document
        .querySelectorAll(".ripple-target")
        .forEach((button) => {

            button.addEventListener(
                "click",
                function (event) {

                    const rect =
                        this.getBoundingClientRect();

                    const ripple =
                        document.createElement(
                            "span"
                        );

                    ripple.className =
                        "ripple";

                    ripple.style.left =
                        `${event.clientX - rect.left}px`;

                    ripple.style.top =
                        `${event.clientY - rect.top}px`;

                    this.appendChild(ripple);


                    setTimeout(() => {

                        ripple.remove();

                    }, 700);

                }
            );

        });



    /* ==============================
       PREDICTION LOADING ANIMATION
    ============================== */

    const form =
        document.getElementById(
            "predictionForm"
        );


    const predictButton =
        document.getElementById(
            "predictButton"
        );


    if (form && predictButton) {

        form.addEventListener(
            "submit",
            () => {

                if (!form.checkValidity()) {
                    return;
                }


                predictButton.classList.add(
                    "loading"
                );


                predictButton.disabled =
                    true;


                predictButton
                    .querySelector(
                        ".button-text"
                    )
                    .textContent =
                    "Analyzing traffic...";

            }
        );

    }



    /* ==============================
       BACK TO TOP
    ============================== */

    const scrollTop =
        document.getElementById(
            "scrollTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                scrollTop.classList.add(
                    "visible"
                );

            } else {

                scrollTop.classList.remove(
                    "visible"
                );

            }

        },
        {
            passive: true
        }
    );


    scrollTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );



    /* ==============================
       ACTIVE NAVIGATION
    ============================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".navbar nav a"
        );


    const sectionObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            navLinks.forEach(
                                (link) => {

                                    link.classList
                                        .remove(
                                            "active"
                                        );


                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${entry.target.id}`
                                    ) {

                                        link.classList
                                            .add(
                                                "active"
                                            );

                                    }

                                }
                            );

                        }

                    }
                );

            },

            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }

        );


    sections.forEach(
        (section) => {

            sectionObserver.observe(
                section
            );

        }
    );



    /* ==============================
       TRAFFIC CARD TILT EFFECT
    ============================== */

    const trafficCard =
        document.querySelector(
            ".traffic-card"
        );


    if (
        trafficCard &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        trafficCard.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    trafficCard
                        .getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                        rect.width -
                    0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                        rect.height -
                    0.5;


                trafficCard.style.animation =
                    "none";


                trafficCard.style.transform =
                    `
                    perspective(1000px)
                    rotateY(${x * 12 - 3}deg)
                    rotateX(${-y * 8 + 2}deg)
                    translateY(-5px)
                    `;

            }
        );


        trafficCard.addEventListener(
            "mouseleave",
            () => {

                trafficCard.style.animation =
                    "";

                trafficCard.style.transform =
                    "";

            }
        );

    }



    /* ==============================
       SHOW RESULT AFTER PREDICTION
    ============================== */

    const resultPanel =
        document.querySelector(
            ".result-panel.has-result"
        );


    if (resultPanel) {

        setTimeout(() => {

            resultPanel.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }, 350);

    }

});