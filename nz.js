/* =========================================
   ECOKABADI - JAVASCRIPT
========================================= */


/* =========================================
   1. WASTE PRICES
========================================= */

const prices = {
    "Paper": 12,
    "Metal": 35,
    "Plastic": 18,
    "E-Waste": 60
};


/* =========================================
   2. GET HTML ELEMENTS
========================================= */

const wasteType = document.getElementById("wasteType");
const quantity = document.getElementById("quantity");
const estimatedPrice = document.getElementById("estimatedPrice");

const pickupForm = document.getElementById("pickupForm");

const dashboardWaste =
    document.getElementById("dashboardWaste");

const dashboardMoney =
    document.getElementById("dashboardMoney");

const dashboardPickups =
    document.getElementById("dashboardPickups");

const ecoPoints =
    document.getElementById("ecoPoints");

const pickupDate =
    document.getElementById("pickupDate");


/* =========================================
   3. SET MINIMUM PICKUP DATE
   Prevent selecting a date in the past
========================================= */

const today = new Date();

const year = today.getFullYear();

const month = String(
    today.getMonth() + 1
).padStart(2, "0");

const day = String(
    today.getDate()
).padStart(2, "0");

const todayDate =
    `${year}-${month}-${day}`;

if (pickupDate) {
    pickupDate.min = todayDate;
}


/* =========================================
   4. CALCULATE WASTE VALUE
========================================= */

function calculatePrice() {

    const selectedWaste =
        wasteType.value;

    const kg =
        parseFloat(quantity.value) || 0;

    if (
        selectedWaste &&
        prices[selectedWaste]
    ) {

        const price =
            prices[selectedWaste];

        const total =
            price * kg;

        estimatedPrice.textContent =
            `₹${total.toFixed(0)}`;

    } else {

        estimatedPrice.textContent =
            "₹0";
    }
}


/* =========================================
   5. LIVE PRICE CALCULATION
========================================= */

if (wasteType) {

    wasteType.addEventListener(
        "change",
        calculatePrice
    );
}


if (quantity) {

    quantity.addEventListener(
        "input",
        calculatePrice
    );
}


/* =========================================
   6. BOOKING FORM
========================================= */

if (pickupForm) {

    pickupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /* Get user data */

            const name =
                document.getElementById("name").value;

            const selectedWaste =
                wasteType.value;

            const kg =
                parseFloat(quantity.value);

            const address =
                document.getElementById("address").value;

            const date =
                pickupDate.value;


            /* Calculate money */

            const pricePerKg =
                prices[selectedWaste];

            const total =
                pricePerKg * kg;


            /* =================================
               UPDATE DASHBOARD
            ================================= */

            dashboardWaste.textContent =
                `${kg} KG`;

            dashboardMoney.textContent =
                `₹${total}`;

            dashboardPickups.textContent =
                "1";


            /* Eco points */

            const points =
                Math.round(kg * 10);

            ecoPoints.textContent =
                points;


            /* =================================
               SUCCESS MESSAGE
            ================================= */

            alert(
                `🎉 Pickup Booked Successfully!\n\n` +

                `Name: ${name}\n` +

                `Waste: ${selectedWaste}\n` +

                `Quantity: ${kg} KG\n` +

                `Estimated Value: ₹${total}\n` +

                `Pickup Date: ${date}\n\n` +

                `Our kabadiwala partner will contact you soon.`
            );


            /* =================================
               RESET FORM
            ================================= */

            pickupForm.reset();

            estimatedPrice.textContent =
                "₹0";


            /* Scroll to dashboard */

            document
                .querySelector(".dashboard")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );
}


/* =========================================
   7. ANIMATED COUNTERS
========================================= */

const counters =
    document.querySelectorAll(".counter");


function animateCounter(counter) {

    const target =
        Number(counter.dataset.target);

    let current = 0;

    const duration = 2000;

    const increment =
        target / (duration / 16);


    function updateCounter() {

        current += increment;

        if (current < target) {

            counter.textContent =
                Math.floor(current).toLocaleString();

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target.toLocaleString();
        }
    }


    updateCounter();
}


/* =========================================
   8. START COUNTERS WHEN HERO IS VISIBLE
========================================= */

let countersStarted = false;


const hero =
    document.querySelector(".hero");


const counterObserver =
    new IntersectionObserver(
        function(entries) {

            if (
                entries[0].isIntersecting &&
                !countersStarted
            ) {

                countersStarted = true;

                counters.forEach(
                    animateCounter
                );
            }

        },
        {
            threshold: 0.3
        }
    );


if (hero) {
    counterObserver.observe(hero);
}


/* =========================================
   9. SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(
        ".service-card, .step, .dashboard-card, .booking-form, .booking-info"
    );


revealElements.forEach(
    element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(40px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";
    }
);


const revealObserver =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );
                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================
   10. MOUSE MOVEMENT EFFECT
========================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (heroVisual) {

    heroVisual.addEventListener(
        "mousemove",
        function(event) {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const moveX =
                (x - rect.width / 2) / 30;

            const moveY =
                (y - rect.height / 2) / 30;


            const wasteItems =
                document.querySelectorAll(
                    ".waste"
                );


            wasteItems.forEach(
                (item, index) => {

                    const multiplier =
                        (index + 1) * 0.5;

                    item.style.transform =
                        `translate(
                            ${moveX * multiplier}px,
                            ${moveY * multiplier}px
                        )`;
                }
            );

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        function() {

            const wasteItems =
                document.querySelectorAll(
                    ".waste"
                );


            wasteItems.forEach(
                item => {

                    item.style.transform =
                        "";
                }
            );

        }
    );
}


/* =========================================
   11. NAVBAR SCROLL EFFECT
========================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    function() {

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 8px 30px rgba(20,80,40,0.08)";

        } else {

            navbar.style.boxShadow =
                "none";
        }

    }
);


/* =========================================
   12. CONSOLE MESSAGE
========================================= */

console.log(
    "♻ EcoKabadi website loaded successfully!"
);

console.log(
    "Created by Pritam Kumar Pattanaik and Team EcoKabadi"
);
