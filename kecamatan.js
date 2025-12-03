const searchInput = document.getElementById("searchInput");
const kecamatanItems = document.querySelectorAll(".kecamatan-item");

// buat elemen pesan "tidak ditemukan"
const notFoundMessage = document.createElement("div");
notFoundMessage.innerText = "NOT FOUND";
notFoundMessage.style.display = "none";
notFoundMessage.style.color = "red";
searchInput.parentNode.appendChild(notFoundMessage);

// fungsi untuk highlight teks
function highlightText(element, keyword) {
    const text = element.innerText;
    const regex = new RegExp(`(${keyword})`, "gi");
    const newText = text.replace(regex, `<span class="highlight">$1</span>`);
    element.innerHTML = newText;
}

searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    let found = false;

    kecamatanItems.forEach(item => {
        const titleEl = item.querySelector(".kecamatan-title");
        const desaList = item.querySelector(".desa-list");
        const desaItems = item.querySelectorAll(".desa-list li");

        // reset highlight dulu
        titleEl.innerHTML = titleEl.innerText;
        desaItems.forEach(desa => {
            desa.innerHTML = desa.innerText;
        });

        let match = titleEl.innerText.toLowerCase().includes(keyword);
        let desaMatch = false;

        desaItems.forEach(desa => {
            if (desa.innerText.toLowerCase().includes(keyword)) {
                desaMatch = true;
            }
        });

        if (keyword === "") {
            item.style.display = "block";
            desaList.classList.remove("open");
            found = true;
        } else if (match || desaMatch) {
            item.style.display = "block";
            desaList.classList.add("open");
            found = true;

            // highlight kata yang cocok
            if (match) highlightText(titleEl, keyword);
            desaItems.forEach(desa => {
                if (desa.innerText.toLowerCase().includes(keyword)) {
                    highlightText(desa, keyword);
                }
            });
        } else {
            item.style.display = "none";
        }
    });

    // tampilkan pesan jika tidak ada hasil
    if (!found && keyword !== "") {
        notFoundMessage.style.display = "block";
    } else {
        notFoundMessage.style.display = "none";
    }
});
// ===== ANIMASI GAMBAR DALAM CARD JUGA (scroll-trigger) =====

const wisataImages = document.querySelectorAll(".card img");

// kondisi awal gambar
wisataImages.forEach((img, i) => {
    img.style.opacity = "0";
    img.style.transition = "all 0.8s ease";
    img.style.transform = (i % 2 === 0)
        ? "translateX(-40px)"
        : "translateX(40px)";
});

// observer gambar
const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";

            imgObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// apply observer ke gambar
wisataImages.forEach(img => imgObserver.observe(img));

/* navbar muncul turun */
window.addEventListener("load", () => {
    document.querySelector(".nav").classList.add("show");
});

/* navbar berubah saat scroll */
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav");
    if (window.scrollY > 20) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
});

/* dropdown 1x klik */
document.querySelectorAll(".dropdown").forEach(drop => {
    const trigger = drop.querySelector("a");
    const menu = drop.querySelector(".dropdown-menu");

    trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const open = menu.classList.contains("show");

        document.querySelectorAll(".dropdown-menu").forEach(m => m.classList.remove("show"));

        if (!open) menu.classList.add("show");
    });
});

document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu").forEach(m => m.classList.remove("show"));
});

/* ===================== COUNTER GACHA ANIMATION ===================== */

function startCounter() {
    const counters = document.querySelectorAll(".counter");

    const speed = 35; // makin kecil makin cepat

    counters.forEach(counter => {
        const update = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;

            const inc = Math.ceil(target / 55); // angka naiknya

            if (count < target) {
                counter.innerText = count + inc;
                setTimeout(update, speed);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
}

/* === LANGSUNG JALAN SAAT MASUK WEBSITE === */

window.addEventListener("load", () => {
    setTimeout(() => {
        startCounter();
    }, 400); // delay biar pas animasi page muncul
});
