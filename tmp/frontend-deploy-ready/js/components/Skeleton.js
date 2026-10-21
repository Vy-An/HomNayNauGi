/**
 * Skeleton Loading Components (Facebook-style Shimmer)
 * Cung cấp các khung chờ skeleton mượt mà cho toàn bộ ứng dụng
 */

/**
 * Tạo 1 hoặc nhiều thẻ món ăn dạng Skeleton (giống FoodCard)
 * @param {number} count Số lượng card muốn tạo
 * @returns {string} HTML string
 */
export function renderFoodCardSkeleton(count = 6) {
    const cardHTML = `
        <div class="bg-white rounded-[20px] shadow-sm border border-beige-border/80 flex flex-col h-full relative overflow-hidden pointer-events-none select-none">
            <!-- Image Skeleton -->
            <div class="relative aspect-[16/10] overflow-hidden skeleton-shimmer">
                <!-- Cooking time badge placeholder -->
                <div class="absolute bottom-2.5 left-2.5 w-20 h-5 rounded-full bg-white/60"></div>
                <!-- Fav button placeholder -->
                <div class="absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-white/60"></div>
            </div>

            <!-- Body Skeleton -->
            <div class="p-4 sm:p-4.5 flex flex-col flex-grow">
                <div class="flex items-start justify-between gap-2 mb-2">
                    <div class="h-4.5 w-3/4 rounded-md skeleton-shimmer"></div>
                    <div class="h-4 w-10 rounded-md skeleton-shimmer"></div>
                </div>
                
                <div class="space-y-1.5 mb-4 flex-grow">
                    <div class="h-3 w-full rounded-md skeleton-shimmer"></div>
                    <div class="h-3 w-4/5 rounded-md skeleton-shimmer"></div>
                </div>
                
                <div class="mt-auto pt-3 border-t border-[#F0EBE0]">
                    <div class="w-full h-8 rounded-xl skeleton-shimmer"></div>
                </div>
            </div>
        </div>
    `;

    return Array.from({ length: count }, () => cardHTML).join('');
}

/**
 * Tạo khung chờ dạng lưới cho trang Danh sách món ăn
 * @param {number} count
 * @returns {string}
 */
export function renderFoodListSkeleton(count = 6) {
    return `
        <div class="recipe-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
            ${renderFoodCardSkeleton(count)}
        </div>
    `;
}

/**
 * Tạo khung chờ cho bài viết Cộng đồng (Chuẩn Facebook)
 * @param {number} count Số bài viết khung chờ
 * @returns {string}
 */
export function renderCommunityPostSkeleton(count = 3) {
    const postHTML = `
        <div class="bg-white rounded-[22px] border border-beige-border/80 p-4.5 sm:p-5 shadow-sm space-y-3.5 select-none pointer-events-none animate-fade-in">
            <!-- Author Header -->
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full skeleton-shimmer shrink-0"></div>
                <div class="space-y-1.5 flex-1 min-w-0">
                    <div class="w-36 h-3.5 rounded-md skeleton-shimmer"></div>
                    <div class="w-24 h-2.5 rounded-md skeleton-shimmer"></div>
                </div>
                <div class="w-6 h-6 rounded-full skeleton-shimmer ml-auto"></div>
            </div>

            <!-- Post Text Content -->
            <div class="space-y-2 pt-1">
                <div class="w-full h-3.5 rounded-md skeleton-shimmer"></div>
                <div class="w-11/12 h-3.5 rounded-md skeleton-shimmer"></div>
                <div class="w-3/5 h-3.5 rounded-md skeleton-shimmer"></div>
            </div>

            <!-- Post Image Placeholder -->
            <div class="w-full aspect-[16/10] rounded-2xl skeleton-shimmer"></div>

            <!-- Reaction Buttons -->
            <div class="flex justify-between items-center pt-3 border-t border-[#F0EBE0]">
                <div class="flex items-center gap-2">
                    <div class="w-20 h-7 rounded-full skeleton-shimmer"></div>
                    <div class="w-24 h-7 rounded-full skeleton-shimmer"></div>
                </div>
                <div class="w-16 h-7 rounded-full skeleton-shimmer"></div>
            </div>
        </div>
    `;

    return Array.from({ length: count }, () => postHTML).join('');
}

/**
 * Tạo khung chờ cho trang Chi tiết món ăn (FoodDetail)
 * @returns {string}
 */
export function renderFoodDetailSkeleton() {
    return `
        <div class="cozy-kitchen-bg min-h-screen py-6 sm:py-10 animate-fade-in select-none pointer-events-none">
            <div class="max-w-6xl mx-auto px-4 sm:px-6">
                <!-- Breadcrumbs placeholder -->
                <div class="flex items-center gap-2 mb-6">
                    <div class="w-16 h-3.5 rounded-md skeleton-shimmer"></div>
                    <span class="text-gray-300">/</span>
                    <div class="w-28 h-3.5 rounded-md skeleton-shimmer"></div>
                    <span class="text-gray-300">/</span>
                    <div class="w-36 h-3.5 rounded-md skeleton-shimmer"></div>
                </div>

                <!-- Main Card -->
                <div class="bg-white rounded-3xl border border-beige-border shadow-md overflow-hidden p-6 sm:p-8 space-y-8">
                    <!-- Top Section: Image & Header -->
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <!-- Left: Big Image -->
                        <div class="lg:col-span-5 aspect-[4/3] rounded-2xl skeleton-shimmer overflow-hidden"></div>

                        <!-- Right: Info -->
                        <div class="lg:col-span-7 space-y-4">
                            <div class="flex gap-2">
                                <div class="w-24 h-6 rounded-full skeleton-shimmer"></div>
                                <div class="w-20 h-6 rounded-full skeleton-shimmer"></div>
                            </div>
                            <div class="w-4/5 h-8 rounded-xl skeleton-shimmer"></div>
                            <div class="space-y-2 pt-2">
                                <div class="w-full h-3.5 rounded-md skeleton-shimmer"></div>
                                <div class="w-5/6 h-3.5 rounded-md skeleton-shimmer"></div>
                                <div class="w-2/3 h-3.5 rounded-md skeleton-shimmer"></div>
                            </div>

                            <!-- Cooking Time / Stats Pills -->
                            <div class="grid grid-cols-3 gap-3 pt-3">
                                <div class="h-16 rounded-2xl skeleton-shimmer"></div>
                                <div class="h-16 rounded-2xl skeleton-shimmer"></div>
                                <div class="h-16 rounded-2xl skeleton-shimmer"></div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex gap-3 pt-4">
                                <div class="flex-1 h-11 rounded-2xl skeleton-shimmer"></div>
                                <div class="w-12 h-11 rounded-2xl skeleton-shimmer"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Section: Ingredients & Steps -->
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-gray-100">
                        <!-- Ingredients (5 cols) -->
                        <div class="lg:col-span-5 space-y-3">
                            <div class="w-44 h-5 rounded-lg skeleton-shimmer mb-4"></div>
                            <div class="space-y-2">
                                ${Array.from({ length: 5 }, () => `
                                    <div class="h-10 rounded-xl skeleton-shimmer"></div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Steps (7 cols) -->
                        <div class="lg:col-span-7 space-y-3">
                            <div class="w-40 h-5 rounded-lg skeleton-shimmer mb-4"></div>
                            <div class="space-y-3">
                                ${Array.from({ length: 4 }, () => `
                                    <div class="h-16 rounded-xl skeleton-shimmer"></div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Khung chờ trang tổng quát dựa trên Route
 * Dùng thay thế cho '<p>Đang tải...</p>' trong app.js
 * @param {string} path Route hiện tại
 * @returns {string}
 */
export function renderPageSkeleton(path = '/') {
    if (path.startsWith('/mon-an/')) {
        return renderFoodDetailSkeleton();
    }

    if (path.startsWith('/cong-dong')) {
        return `
            <div class="cozy-kitchen-bg min-h-screen py-8 animate-fade-in">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div class="hidden lg:block lg:col-span-3 space-y-4">
                            <div class="h-64 rounded-2xl bg-white border border-beige-border p-4 skeleton-shimmer"></div>
                        </div>
                        <div class="lg:col-span-6 space-y-5">
                            <div class="h-28 rounded-2xl bg-white border border-beige-border p-4 skeleton-shimmer"></div>
                            ${renderCommunityPostSkeleton(3)}
                        </div>
                        <div class="hidden lg:block lg:col-span-3 space-y-4">
                            <div class="h-64 rounded-2xl bg-white border border-beige-border p-4 skeleton-shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Default: Food List or Home Skeleton
    return `
        <div class="cozy-kitchen-bg min-h-screen py-8 animate-fade-in">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header Skeleton -->
                <div class="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div class="space-y-2">
                        <div class="h-8 w-56 rounded-xl skeleton-shimmer"></div>
                        <div class="h-4 w-80 rounded-md skeleton-shimmer"></div>
                    </div>
                    <div class="h-10 w-44 rounded-xl skeleton-shimmer"></div>
                </div>

                <!-- Grid Skeleton -->
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    ${renderFoodCardSkeleton(6)}
                </div>
            </div>
        </div>
    `;
}
