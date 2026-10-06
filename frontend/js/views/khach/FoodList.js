import FoodCard from "../components/FoodCard.js";

const FoodList = {
  render: async () => {
    const dummyFoods = [
      {
        id: 1,
        name: "Thịt Kho Trứng",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        time: "45 phút",
        likes: "2.5k",
        author: { name: "Mẹ Bông" },
      },
      {
        id: 2,
        name: "Gà Xào Sả Ụt",
        image:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500",
        time: "30 phút",
        likes: "1.1k",
        author: { name: "Lan Anh" },
      },
      {
        id: 3,
        name: "Rau Muống Xào",
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
        time: "10 phút",
        likes: "3.4k",
        author: { name: "Chef Tùng" },
      },
      {
        id: 4,
        name: "Sườn Chua Ngọot",
        image:
          "https://images.unsplash.com/photo-1544025162-8314e3fc4585?w=500",
        time: "40 phút",
        likes: "4.2k",
        author: { name: "Bếp Của Hoa" },
      },
      {
        id: 5,
        name: "Canh Chua Cá Lóc",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        time: "25 phút",
        likes: "1.5k",
        author: { name: "Gia Đình" },
      },
      {
        id: 6,
        name: "Đậu Hũ Dồn Thịt",
        image:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500",
        time: "35 phút",
        likes: "890",
        author: { name: "Lan Anh" },
      },
    ];

    const foodCardsHTML = dummyFoods.map((food) => FoodCard(food)).join("");

    const sortOptionsHTML = sortOptions
      .map(
        (o) => `
            <li data-value="${o.value}"
                class="sort-option flex items-center gap-3 px-4 py-2.5 cursor-pointer rounded-lg hover:bg-primary/8 hover:text-primary transition-all duration-150 text-sm text-text-muted">
                <span class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid ${o.icon} text-xs text-gray-500"></i>
                </span>
                ${o.label}
            </li>
        `,
      )
      .join("");

    return `
            <style>
                /* ===== Custom Dropdown (Equal width trigger & menu) ===== */
                .sort-dropdown {
                    position: relative;
                    min-width: 210px;
                    width: 210px;
                }
                #sort-trigger {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 5px 12px 5px 6px;
                    border-radius: 9999px;
                    background: #e8efe6;
                    border: 1px solid rgba(58,107,53,.18);
                    cursor: pointer;
                    transition: all .2s ease;
                    font-size: .875rem;
                    font-weight: 500;
                    color: #2d5a29;
                }
                #sort-trigger:hover, #sort-trigger.open {
                    background: #dde7da;
                    border-color: rgba(58,107,53,.35);
                    box-shadow: 0 2px 8px rgba(58,107,53,.12);
                }
                #sort-trigger .trigger-icon-box {
                    width: 24px; height: 24px;
                    background: #2d5a29;
                    color: #fff;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    font-size: .7rem;
                }
                #sort-trigger .trigger-label {
                    flex: 1;
                    text-align: left;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                #sort-trigger .trigger-chevron {
                    margin-left: auto;
                }
                #sort-trigger.open .trigger-chevron {
                    transform: rotate(180deg);
                }
                .sort-dropdown-menu {
                    display: none;
                    position: absolute;
                    top: calc(100% + 6px);
                    left: 0;
                    right: 0;
                    width: 100%;
                    background: #fff;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 14px;
                    box-shadow: 0 10px 32px rgba(0,0,0,.15);
                    z-index: 9999;
                    overflow-y: auto;
                    max-height: 230px;
                    padding: 6px;
                    scrollbar-width: thin;
                    scrollbar-color: #d1d5db transparent;
                    animation: dropIn .18s ease;
                }
                .sort-dropdown-menu::-webkit-scrollbar { width: 5px; }
                .sort-dropdown-menu::-webkit-scrollbar-track { background: transparent; }
                .sort-dropdown-menu::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
                .sort-dropdown-menu.drop-up {
                    top: auto;
                    bottom: calc(100% + 6px);
                    animation: dropUp .18s ease;
                }
                @keyframes dropIn {
                    from { opacity:0; transform: translateY(-6px); }
                    to   { opacity:1; transform: translateY(0); }
                }
                @keyframes dropUp {
                    from { opacity:0; transform: translateY(6px); }
                    to   { opacity:1; transform: translateY(0); }
                }
                .sort-dropdown-menu.open { display: block; }
                .sort-option.active-sort {
                    background: var(--color-primary, #3a6b35)/8% !important;
                    color: var(--color-primary, #3a6b35) !important;
                    font-weight: 600;
                }
                .sort-option.active-sort .sort-icon-box {
                    background: var(--color-primary, #3a6b35)/15% !important;
                }
                .sort-option.active-sort i { color: var(--color-primary, #3a6b35) !important; }

                /* ===== Category Tags - Vertical Scroll List ===== */
                .category-tag {
                    user-select: none;
                    width: 100%;
                    text-align: left;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 9px 12px;
                    border-radius: 12px;
                    border: 1.5px solid transparent;
                    background: transparent;
                    cursor: pointer;
                    font-size: .875rem;
                    color: #6b7280;
                    transition: all .18s ease;
                }
                .category-tag:hover {
                    background: rgba(58,107,53,.07);
                    color: var(--color-primary, #3a6b35);
                    border-color: rgba(58,107,53,.2);
                }
                .category-tag .cat-icon-box {
                    width: 30px; height: 30px;
                    border-radius: 9px;
                    background: #f3f4f6;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    transition: background .18s;
                }
                .category-tag:hover .cat-icon-box { background: rgba(58,107,53,.12); }
                .category-tag:hover .cat-icon-box i { color: var(--color-primary, #3a6b35); }
                .category-tag.active-tag {
                    background: rgba(58,107,53,.10);
                    border-color: rgba(58,107,53,.3);
                    color: var(--color-primary, #3a6b35);
                    font-weight: 600;
                }
                .category-tag.active-tag .cat-icon-box {
                    background: rgba(58,107,53,.18);
                }
                .category-tag.active-tag .cat-icon-box i { color: var(--color-primary, #3a6b35); }
                .category-tag.active-tag i.cat-check { opacity: 1; }
                .category-tag i.cat-check { opacity: 0; transition: opacity .15s; margin-left: auto; font-size: .6rem; }

                /* Scrollable container */
                #category-tags {
                    max-height: calc(3 * 50px);
                    overflow-y: auto;
                    scrollbar-width: thin;
                    scrollbar-color: #d1d5db transparent;
                    padding-right: 2px;
                }
                #category-tags::-webkit-scrollbar { width: 4px; }
                #category-tags::-webkit-scrollbar-track { background: transparent; }
                #category-tags::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
                #category-tags::-webkit-scrollbar-thumb:hover { background: #9ca3af; }

                /* Fade hint at bottom when scrollable */
                .category-scroll-wrap {
                    position: relative;
                }
                .category-scroll-wrap::after {
                    content: '';
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    height: 28px;
                    background: linear-gradient(to bottom, transparent, rgba(255,255,255,.9));
                    pointer-events: none;
                    border-radius: 0 0 8px 8px;
                    transition: opacity .3s;
                }
                .category-scroll-wrap.no-fade::after { opacity: 0; }

                /* ===== Sort Trigger Button ===== */
                #sort-trigger {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 14px;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 14px;
                    background: #fff;
                    cursor: pointer;
                    transition: border-color .2s, box-shadow .2s;
                    font-size: .875rem;
                    color: #374151;
                    text-align: left;
                }
                #sort-trigger:hover, #sort-trigger.open {
                    border-color: var(--color-primary, #3a6b35);
                    box-shadow: 0 0 0 3px rgba(58,107,53,.12);
                }
                #sort-trigger .trigger-icon-box {
                    width: 28px; height: 28px;
                    background: #f3f4f6;
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    transition: background .2s;
                }
                #sort-trigger.open .trigger-icon-box {
                    background: rgba(58,107,53,.15);
                }
                #sort-trigger.open .trigger-icon-box i,
                #sort-trigger.open .trigger-label { color: var(--color-primary, #3a6b35); }
                #sort-trigger .trigger-chevron {
                    margin-left: auto;
                    transition: transform .25s;
                    color: #9ca3af;
                    font-size: .7rem;
                }
                #sort-trigger.open .trigger-chevron { transform: rotate(180deg); }

                /* ===== Active sort item highlight ===== */
                .sort-option.active-sort {
                    background: rgba(58,107,53,.10);
                    color: #2d5a29;
                    font-weight: 600;
                }
                .sort-option.active-sort .sort-icon-box { background: rgba(58,107,53,.18); }
                .sort-option.active-sort .sort-icon-box i { color: #2d5a29; }
            </style>

            <div class="bg-primary-light/5 py-8">
                <div class="container mx-auto px-4 lg:px-8">

                    <!-- Breadcrumb & Title -->
                    <div class="mb-8">
                        <div class="text-sm text-text-muted mb-2">
                            <a href="#/" class="hover:text-primary">Trang chủ</a>
                            <span class="mx-2">/</span>
                            <span class="text-text-main font-semibold">Danh sách món ăn</span>
                        </div>
                        <h1 class="text-3xl font-bold text-text-main">Khám phá Từ Điển Ẩm Thực</h1>
                    </div>

                    <div class="flex flex-col lg:flex-row gap-8">

                        <!-- ===== Cột Trái: Bộ Lọc ===== -->
                        <div class="w-full lg:w-1/4">
                            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">

                                <h3 class="font-bold text-lg mb-5 flex items-center gap-2">
                                    <i class="fa-solid fa-sliders text-primary"></i>
                                    Tìm kiếm &amp; Lọc
                                </h3>

                                <div class="space-y-6">

                                    <!-- 1. Lọc theo tên -->
                                    <div>
                                        <h4 class="font-semibold text-text-main mb-2 flex items-center gap-2 text-sm">
                                            <span class="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                                                <i class="fa-solid fa-magnifying-glass text-primary" style="font-size:.65rem"></i>
                                            </span>
                                            Lọc theo tên
                                        </h4>
                                        <div class="relative">
                                            <input id="filter-name" type="text"
                                                placeholder="Tên món ăn, nguyên liệu..."
                                                class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm bg-gray-50 focus:bg-white">
                                            <i class="fa-solid fa-fork-knife absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style="font-size:.7rem"></i>
                                        </div>
                                    </div>

                                    <!-- 2. Loại món -->
                                    <div>
                                        <h4 class="font-semibold text-text-main mb-3 flex items-center gap-2 text-sm">
                                            <span class="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                                                <i class="fa-solid fa-tags text-primary" style="font-size:.65rem"></i>
                                            </span>
                                            Loại món
                                        </h4>
                                        <div class="category-scroll-wrap">
                                            <div id="category-tags">
                                                <button data-category="Tất cả" class="category-tag active-tag">
                                                    <span class="cat-icon-box"><i class="fa-solid fa-border-all text-gray-500" style="font-size:.7rem"></i></span>
                                                    Tất cả
                                                    <i class="fa-solid fa-check cat-check text-primary"></i>
                                                </button>
                                                <button data-category="Món Mặn" class="category-tag">
                                                    <span class="cat-icon-box"><i class="fa-solid fa-drumstick-bite text-gray-500" style="font-size:.7rem"></i></span>
                                                    Món Mặn
                                                    <i class="fa-solid fa-check cat-check text-primary"></i>
                                                </button>
                                                <button data-category="Món Canh" class="category-tag">
                                                    <span class="cat-icon-box"><i class="fa-solid fa-bowl-food text-gray-500" style="font-size:.7rem"></i></span>
                                                    Món Canh
                                                    <i class="fa-solid fa-check cat-check text-primary"></i>
                                                </button>
                                                <button data-category="Món Xào" class="category-tag">
                                                    <span class="cat-icon-box"><i class="fa-solid fa-fire-flame-curved text-gray-500" style="font-size:.7rem"></i></span>
                                                    Món Xào
                                                    <i class="fa-solid fa-check cat-check text-primary"></i>
                                                </button>
                                                <button data-category="Món Chay" class="category-tag">
                                                    <span class="cat-icon-box"><i class="fa-solid fa-leaf text-gray-500" style="font-size:.7rem"></i></span>
                                                    Món Chay
                                                    <i class="fa-solid fa-check cat-check text-primary"></i>
                                                </button>
                                                <button data-category="Tráng Miệng" class="category-tag">
                                                    <span class="cat-icon-box"><i class="fa-solid fa-ice-cream text-gray-500" style="font-size:.7rem"></i></span>
                                                    Tráng Miệng
                                                    <i class="fa-solid fa-check cat-check text-primary"></i>
                                                </button>
                                                <button data-category="Món Nướng" class="category-tag">
                                                    <span class="cat-icon-box"><i class="fa-solid fa-bacon text-gray-500" style="font-size:.7rem"></i></span>
                                                    Món Nướng
                                                    <i class="fa-solid fa-check cat-check text-primary"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    

                                    <!-- Apply button -->
                                    <button id="apply-filter-btn"
                                        class="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95">
                                        <i class="fa-solid fa-filter"></i> Áp dụng bộ lọc
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- ===== Cột Phải: Danh sách ===== -->
                        <div class="w-full lg:w-3/4">
                            <div class="flex justify-between items-center mb-6 flex-wrap gap-3">
                                <span class="text-text-muted text-sm">
                                    Hiển thị <span class="font-bold text-text-main">120</span> kết quả
                                </span>
                                <div class="sort-dropdown" id="sort-dropdown">
                                    <button id="sort-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
                                        <span class="trigger-icon-box">
                                            <i id="sort-trigger-icon" class="fa-solid fa-clock"></i>
                                        </span>
                                        <span id="sort-trigger-label" class="trigger-label">Mới nhất</span>
                                        <i class="fa-solid fa-chevron-down trigger-chevron text-xs text-emerald-700/70"></i>
                                    </button>
                                    <ul class="sort-dropdown-menu" id="sort-menu" role="listbox">
                                        ${sortOptionsHTML}
                                    </ul>
                                    <input type="hidden" id="filter-sort" value="newest">
                                </div>
                            </div>

                            <!-- Grid món ăn -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                ${foodCardsHTML}
                            </div>

                            <!-- Phân trang -->
                            <div class="flex justify-center gap-2 mt-12">
                                <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 transition">
                                    <i class="fa-solid fa-chevron-left text-xs"></i>
                                </button>
                                <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold shadow-md">1</button>
                                <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-text-main hover:bg-gray-50 transition">2</button>
                                <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-text-main hover:bg-gray-50 transition">3</button>
                                <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 transition">
                                    <i class="fa-solid fa-chevron-right text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  },

  afterRender: () => {
    // ---- 1. Category tag toggle ----
    const tags = document.querySelectorAll(".category-tag");
    tags.forEach((tag) => {
      tag.addEventListener("click", () => {
        tags.forEach((t) => t.classList.remove("active-tag"));
        tag.classList.add("active-tag");
      });
    });

    // Fade hint: ẩn khi đã scroll tới cuối
    const catContainer = document.getElementById("category-tags");
    const catWrap = catContainer?.parentElement;
    function checkCatScroll() {
      if (!catContainer || !catWrap) return;
      const atBottom =
        catContainer.scrollTop + catContainer.clientHeight >=
        catContainer.scrollHeight - 4;
      catWrap.classList.toggle("no-fade", atBottom);
    }
    catContainer?.addEventListener("scroll", checkCatScroll);
    checkCatScroll();

    // ---- 2. Custom Sort Dropdown ----
    const trigger = document.getElementById("sort-trigger");
    const menu = document.getElementById("sort-menu");
    const triggerIcon = document.getElementById("sort-trigger-icon");
    const triggerLabel = document.getElementById("sort-trigger-label");
    const sortInput = document.getElementById("filter-sort");
    const sortLabel = document.getElementById("current-sort-label");
    const activeSortIcon = document.getElementById("active-sort-icon");

    const sortMap = {
      newest: { icon: "fa-clock", label: "Mới nhất" },
      popular: { icon: "fa-heart", label: "Yêu thích nhiều nhất" },
      easy: { icon: "fa-star", label: "Dễ làm nhất" },
      name_asc: { icon: "fa-arrow-down-a-z", label: "Tên A → Z" },
      name_desc: { icon: "fa-arrow-up-z-a", label: "Tên Z → A" },
      time_asc: { icon: "fa-hourglass-start", label: "Thời gian tăng dần" },
      time_desc: { icon: "fa-hourglass-end", label: "Thời gian giảm dần" },
    };

    function setSort(value) {
      const opt = sortMap[value];
      if (!opt) return;
      // Update trigger button pill
      if (triggerIcon) triggerIcon.className = `fa-solid ${opt.icon}`;
      if (triggerLabel) triggerLabel.textContent = opt.label;
      if (sortInput) sortInput.value = value;
      // Highlight active item in list
      document.querySelectorAll(".sort-option").forEach((li) => {
        const isActive = li.dataset.value === value;
        li.classList.toggle("active-sort", isActive);
        const iconBox = li.querySelector("span");
        const ico = li.querySelector("i");
        if (iconBox)
          iconBox.className = isActive
            ? "sort-icon-box w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/15"
            : "sort-icon-box w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100";
        if (ico)
          ico.style.color = isActive ? "var(--color-primary,#3a6b35)" : "";
      });
    }

    // Calculate menu orientation & max height based on viewport space
    function positionMenu() {
      const rect = trigger.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const defaultMenuHeight = 230;

      if (spaceBelow < defaultMenuHeight && spaceAbove > spaceBelow) {
        menu.classList.add("drop-up");
        const maxH = Math.max(
          120,
          Math.min(spaceAbove - 16, defaultMenuHeight),
        );
        menu.style.maxHeight = maxH + "px";
      } else {
        menu.classList.remove("drop-up");
        const maxH = Math.max(
          120,
          Math.min(spaceBelow - 16, defaultMenuHeight),
        );
        menu.style.maxHeight = maxH + "px";
      }
    }

    function closeMenu() {
      menu.classList.remove("open");
      trigger.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
      window.removeEventListener("scroll", positionMenu);
      window.removeEventListener("resize", positionMenu);
    }

    // Open/close
    trigger.addEventListener("click", () => {
      const willOpen = !menu.classList.contains("open");
      if (willOpen) {
        positionMenu();
        window.addEventListener("scroll", positionMenu, { passive: true });
        window.addEventListener("resize", positionMenu, { passive: true });
      } else {
        window.removeEventListener("scroll", positionMenu);
        window.removeEventListener("resize", positionMenu);
      }
      const open = menu.classList.toggle("open");
      trigger.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", open);
    });

    // Select item
    document.querySelectorAll(".sort-option").forEach((li) => {
      li.addEventListener("click", () => {
        setSort(li.dataset.value);
        closeMenu();
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      const dropdown = document.getElementById("sort-dropdown");
      if (dropdown && !dropdown.contains(e.target)) {
        closeMenu();
      }
    });

    // Highlight default
    setSort("newest");

    // ---- 3. Apply filter ----
    const applyBtn = document.getElementById("apply-filter-btn");
    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        const name = document.getElementById("filter-name")?.value || "";
        const activeTag = document.querySelector(".category-tag.active-tag");
        const category = activeTag?.dataset.category || "Tất cả";
        const sort = sortInput?.value || "newest";
        console.log("Filter applied:", { name, category, sort });
      });
    }
  },
};

export default FoodList;
