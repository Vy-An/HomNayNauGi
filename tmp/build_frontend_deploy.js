const fs = require('fs');
const path = require('path');

const root = process.cwd();
const source = path.join(root, 'frontend');
const stage = path.join(root, 'tmp', 'frontend-utf8-deploy');
const version = '20261014d';
const apiUrl = 'https://otakuminihub.io.vn/api';

function read(file) {
    return fs.readFileSync(file, 'utf8');
}

function write(file, content) {
    fs.writeFileSync(file, content, 'utf8');
}

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const fullPath = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(fullPath) : [fullPath];
    });
}

function replaceInFile(file, replacer) {
    write(file, replacer(read(file)));
}

if (!stage.startsWith(path.join(root, 'tmp'))) {
    throw new Error('Refusing to write outside tmp');
}

fs.rmSync(stage, { recursive: true, force: true });
fs.cpSync(source, stage, { recursive: true });

for (const file of walk(stage)) {
    if (!/\.(js|html|css)$/.test(file)) continue;

    replaceInFile(file, (content) => content
        .replace(/http:\/\/localhost:5000\/api/g, apiUrl)
        .replace(/http:\/\/localhost:5000\/images\//g, `${apiUrl}/images/`)
        .replace(/https:\/\/otakuminihub\.io\.vn\/images\//g, `${apiUrl}/images/`)
        .replace(/\/images\/users\/default\.png/g, '/api/images/users/admin.jpg'));
}

replaceInFile(path.join(stage, 'index.html'), (content) => content
    .replace(/css\/style\.css(?:\?v=[^"']*)?/g, `css/style.css?v=${version}`)
    .replace(/js\/app\.js(?:\?v=[^"']*)?/g, `js/app.js?v=${version}`));

for (const file of walk(path.join(stage, 'js'))) {
    if (!file.endsWith('.js')) continue;
    replaceInFile(file, (content) => content.replace(
        /from '([^']+\.js)(?:\?v=[^']*)?'/g,
        `from '$1?v=${version}'`
    ));
}

const apiFile = path.join(stage, 'js', 'api.js');
replaceInFile(apiFile, (content) => content
    .replace(/^const API_URL = '[^']+';/, `export const API_URL = '${apiUrl}';
export const DEFAULT_AVATAR_URL = \`${apiUrl}/images/users/admin.jpg\`;

export function normalizeAssetUrl(value, fallback = '') {
    const rawValue = value == null || value === '' ? fallback : value;
    if (!rawValue) return rawValue;

    const originalValue = String(rawValue);
    const trimmedValue = originalValue.trim();
    if (!trimmedValue) return fallback || '';
    if (/^(data|blob):/i.test(trimmedValue)) return trimmedValue;
    if (/\\/images\\/users\\/default\\.png(?:$|\\?)/i.test(trimmedValue)) {
        return fallback || DEFAULT_AVATAR_URL;
    }

    if (/^https?:\\/\\/localhost:\\d+\\/images\\//i.test(trimmedValue)) {
        return trimmedValue.replace(/^https?:\\/\\/localhost:\\d+\\/images\\//i, \`${apiUrl}/images/\`);
    }

    if (/^https?:\\/\\/otakuminihub\\.io\\.vn\\/images\\//i.test(trimmedValue)) {
        return trimmedValue.replace(/^https?:\\/\\/otakuminihub\\.io\\.vn\\/images\\//i, \`${apiUrl}/images/\`);
    }

    if (/^\\/images\\//i.test(trimmedValue)) {
        return \`${apiUrl}\${trimmedValue}\`;
    }

    if (/^images\\//i.test(trimmedValue)) {
        return \`${apiUrl}/\${trimmedValue}\`;
    }

    return originalValue;
}

function normalizeApiPayload(value) {
    if (Array.isArray(value)) return value.map(normalizeApiPayload);
    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, normalizeApiPayload(item)])
        );
    }
    if (typeof value === 'string') return normalizeAssetUrl(value);
    return value;
}`)
    .replace('return data;', 'return normalizeApiPayload(data);'));

const navbarFile = path.join(stage, 'js', 'components', 'Navbar.js');
replaceInFile(navbarFile, (content) => content
    .replace(
        `import { fetchAPI } from '../api.js?v=${version}';`,
        `import { DEFAULT_AVATAR_URL, fetchAPI, normalizeAssetUrl } from '../api.js?v=${version}';`
    )
    .replace(
        "authUser = JSON.parse(localStorage.getItem('auth_user') || 'null');",
        `authUser = JSON.parse(localStorage.getItem('auth_user') || 'null');
        if (authUser?.avatar) {
            authUser.avatar = normalizeAssetUrl(authUser.avatar, DEFAULT_AVATAR_URL);
            localStorage.setItem('auth_user', JSON.stringify(authUser));
        }`
    )
    .replace(
        /const authAvatar = escapeHTML\([^;]+;\s*/,
        'const authAvatar = escapeHTML(normalizeAssetUrl(authUser?.avatar, DEFAULT_AVATAR_URL));\n'
    ));

const adminFile = path.join(stage, 'js', 'views', 'admin', 'Admin.js');
replaceInFile(adminFile, (content) => content
    .replace(
        `import { fetchAPI } from '../../api.js?v=${version}';`,
        `import { DEFAULT_AVATAR_URL, fetchAPI, normalizeAssetUrl } from '../../api.js?v=${version}';`
    )
    .replace(
        "return JSON.parse(localStorage.getItem('auth_user') || 'null');",
        `const user = JSON.parse(localStorage.getItem('auth_user') || 'null');
        if (user?.avatar) {
            user.avatar = getAvatarUrl(user.avatar);
            localStorage.setItem('auth_user', JSON.stringify(user));
        }
        return user;`
    )
    .replace(
        'function escapeHTML(value) {',
        `function getAvatarUrl(value) {
    return normalizeAssetUrl(value, DEFAULT_AVATAR_URL);
}

function escapeHTML(value) {`
    )
    .replace(/const adminAvatar = currentUser\?\.avatar \|\| '[^']+';/g, 'const adminAvatar = getAvatarUrl(currentUser?.avatar);')
    .replace(/user\.avatar \|\| '[^']+'/g, 'getAvatarUrl(user.avatar)')
    .replace(/p\.author\?\.avatar \|\| '[^']+'/g, 'getAvatarUrl(p.author?.avatar)')
    .replace(/post\.author\?\.avatar \|\| '[^']+'/g, 'getAvatarUrl(post.author?.avatar)')
    .replace(/author\.avatar \|\| '[^']+'/g, 'getAvatarUrl(author.avatar)')
    .replace(/report\.reporter\?\.avatar \|\| '[^']+'/g, 'getAvatarUrl(report.reporter?.avatar)'));

const communityFile = path.join(stage, 'js', 'views', 'khach', 'Community.js');
replaceInFile(communityFile, (content) => content
    .replace(
        `import { fetchAPI } from '../../api.js?v=${version}';`,
        `import { DEFAULT_AVATAR_URL, fetchAPI, normalizeAssetUrl } from '../../api.js?v=${version}';`
    )
    .replace(
        "return JSON.parse(localStorage.getItem('auth_user') || 'null');",
        `const user = JSON.parse(localStorage.getItem('auth_user') || 'null');
                if (user?.avatar) {
                    user.avatar = normalizeAssetUrl(user.avatar, DEFAULT_AVATAR_URL);
                    localStorage.setItem('auth_user', JSON.stringify(user));
                }
                return user;`
    )
    .replace(
        '        if (currentUser) {',
        `        const currentUserAvatar = normalizeAssetUrl(currentUser?.avatar, DEFAULT_AVATAR_URL);

        if (currentUser) {`
    )
    .replace(
        'if (composerUserAvatar && currentUser.avatar) composerUserAvatar.src = currentUser.avatar;',
        'if (composerUserAvatar) composerUserAvatar.src = currentUserAvatar;'
    )
    .replace(
        /const authorAvatar = post\.author\?\.avatar \|\| '[^']+';/,
        'const authorAvatar = normalizeAssetUrl(post.author?.avatar, DEFAULT_AVATAR_URL);'
    )
    .replace(/\$\{currentUser\?\.avatar \|\| '[^']+'\}/g, '${currentUserAvatar}')
    .replace(/\$\{cAuthor\.avatar \|\| '[^']+'\}/g, '${normalizeAssetUrl(cAuthor.avatar, DEFAULT_AVATAR_URL)}')
    .replace(/\$\{cAuthor\.avatar \|\| currentUser\?\.avatar \|\| '[^']+'\}/g, '${normalizeAssetUrl(cAuthor.avatar || currentUser?.avatar, DEFAULT_AVATAR_URL)}'));

const homeFile = path.join(stage, 'js', 'views', 'khach', 'Home.js');
replaceInFile(homeFile, (content) => {
    const categoryMap = new Map([
        ['M\u00f3n m\u1eb7n', 'mon-man'],
        ['M\u00f3n canh', 'mon-canh'],
        ['M\u00f3n x\u00e0o', 'mon-xao'],
        ['M\u00f3n n\u01b0\u1edbng', 'mon-nuong'],
        ['M\u00f3n kho', 'mon-kho']
    ]);

    let next = content;
    for (const [name, slug] of categoryMap) {
        next = next.replaceAll(`name="categories" value="${name}"`, `name="categories" value="${slug}"`);
    }

    next = next.replace(
        'name="categories" value="${cat.name}"',
        'name="categories" value="${cat.slug || cat.name}"'
    );

    next = next.replace(
        /        const fetchRandomFoods = async \(quantity\) => \{[\s\S]*?        \};\r?\n\r?\n        const getRandomPoolFood = \(\) => \{/,
        `        const getFoodKey = (food) => String(food?.id || food?.slug || food?.name || '').trim();

        const addUniqueFoods = (target, source, maxCount) => {
            const seen = new Set(target.map(getFoodKey).filter(Boolean));

            (source || []).forEach((item) => {
                if (target.length >= maxCount) return;

                const food = normalizeFood(item);
                const key = getFoodKey(food);
                if (key && seen.has(key)) return;

                if (key) seen.add(key);
                target.push(food);
            });

            return target;
        };

        const fillMissingRandomFoods = async (foods, quantity) => {
            const requested = Math.max(1, Number.parseInt(quantity, 10) || 1);
            const filled = addUniqueFoods([], foods || [], requested);

            if (filled.length >= requested) return filled;

            addUniqueFoods(filled, randomFoodsPool, requested);
            if (filled.length >= requested) return filled;

            try {
                const foodsRes = await fetchAPI('/foods?limit=100');
                if (foodsRes && foodsRes.success && Array.isArray(foodsRes.data)) {
                    addUniqueFoods(filled, foodsRes.data, requested);
                }
            } catch (e) {
                console.warn('Cannot load extra random foods:', e);
            }

            if (filled.length < requested) {
                addUniqueFoods(filled, dummyFoods, requested);
            }

            return filled.slice(0, requested);
        };

        const fetchRandomFoods = async (quantity) => {
            try {
                const response = await fetchAPI(buildRandomEndpoint(quantity));
                const apiFoods = response && response.success && Array.isArray(response.data)
                    ? response.data.map(normalizeFood)
                    : [];
                const foods = await fillMissingRandomFoods(apiFoods, quantity);

                if (foods.length > 0) {
                    randomFoodsPool = [...foods, ...randomFoodsPool].slice(0, 50);
                    return { success: true, foods, message: response?.message };
                }

                return {
                    success: false,
                    foods: [],
                    message: response?.message || 'Khong tim thay mon an phu hop.'
                };
            } catch (e) {
                const foods = await fillMissingRandomFoods([], quantity);
                if (foods.length > 0) {
                    return { success: true, foods, message: 'Da bo sung mon ngau nhien tu danh sach mon an.' };
                }

                return {
                    success: false,
                    foods: [],
                    message: 'Khong the ket noi den may chu. Vui long thu lai sau.'
                };
            }
        };

        const getRandomPoolFood = () => {`
    );

    return next;
});

console.log(stage);
