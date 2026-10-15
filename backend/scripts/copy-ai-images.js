const fs = require('fs');
const path = require('path');

const brainDir = path.resolve('C:/Users/Admin/.gemini/antigravity-ide/brain/3898582d-1ec6-4f12-b8bd-a7ba9d23bc35');
const destDir = path.resolve(__dirname, '../public/images/foods');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(brainDir);
console.log(`Scanning ${brainDir}... found ${files.length} files.`);

// Mapping table between image name prefixes and food slugs
const mapping = {
    'canh_rau_ngot': 'canh-rau-ngot-thit-bam.jpg',
    'canh_muop_tom': 'canh-muop-tom.jpg',
    'canh_kho_qua': 'canh-kho-qua-nhoi-thit.jpg',
    'canh_bi_xanh': 'canh-bi-xanh-tom.jpg',
    'canh_rong_bien': 'canh-rong-bien-dau-hu.jpg',
    'canh_khoai_mo': 'canh-khoai-mo-thit-bam.jpg',
    'canh_cai_chua': 'canh-cai-chua-suon.jpg',
    'ca_loc_kho': 'ca-loc-kho-tieu.jpg',
    'thit_kho_mam': 'thit-kho-mam-ruoc.jpg',
    'tom_rim_ba_chi': 'tom-rim-thit-ba-chi.jpg',
    'suon_kho_thom': 'suon-kho-thom.jpg',
    'bo_kho_ca_rot': 'bo-kho-ca-rot.jpg',
    'ca_basa_nghe': 'ca-basa-kho-nghe.jpg',
    'ga_kho_sa_ot': 'ga-kho-sa-ot.jpg',
    'muc_xao_can': 'muc-xao-can-tay.jpg',
    'tom_xao_bong_cai': 'tom-xao-bong-cai.jpg',
    'ga_xao_muop': 'ga-xao-muop.jpg',
    'bo_xao_bong_cai': 'bo-xao-bong-cai.jpg',
    'nui_xao_bo': 'nui-xao-bo.jpg',
    'cai_chua_trung': 'cai-chua-xao-trung.jpg',
    'muop_xao_toi': 'muop-xao-toi.jpg',
    'dau_hu_sa': 'dau-hu-chien-sa.jpg',
    'cha_ca_thi_la': 'cha-ca-chien-thi-la.jpg',
    'tom_chien_bot': 'tom-chien-bot.jpg',
    'canh_ga_gion': 'canh-ga-chien-gion.jpg',
    'trung_thit_bam': 'trung-chien-thit-bam.jpg',
    'ca_ro_phi_gion': 'ca-ro-phi-chien-gion.jpg',
    'bau_luoc_trung': 'bau-luoc-cham-trung.jpg',
    'rau_lang_luoc': 'rau-lang-luoc.jpg',
    'ga_luoc_chanh': 'ga-luoc-la-chanh.jpg',
    'thit_cuon_rau': 'thit-heo-luoc-cuon-rau.jpg',
    'bap_cai_luoc': 'bap-cai-luoc.jpg'
};

let copied = 0;
for (const [prefix, targetName] of Object.entries(mapping)) {
    const matched = files
        .filter(f => f.startsWith(prefix) && (f.endsWith('.jpg') || f.endsWith('.png')))
        .sort((a, b) => fs.statSync(path.join(brainDir, b)).mtimeMs - fs.statSync(path.join(brainDir, a)).mtimeMs);

    if (matched.length > 0) {
        const sourcePath = path.join(brainDir, matched[0]);
        const destPath = path.join(destDir, targetName);
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied: ${matched[0]} -> ${targetName}`);
        copied++;
    }
}

console.log(`Done! Synced ${copied}/${Object.keys(mapping).length} AI food images.`);
