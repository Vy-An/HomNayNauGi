const e="QUẢN TRỊ LAPTOP",i=()=>[{id:1,ten:"MSI Modern i3 15G4",gia:9e6},{id:2,ten:"Asus Vivobook i3 1G4",gia:85e5},{id:3,ten:"Lenovo Ideapad R5 50H",gia:1549e4},{id:4,ten:"Lenovo 1ITL6 i3 5G4",gia:87e5},{id:5,ten:"Dell Inspiron i5 15U",gia:17e5}].map(n=>`<p><b>${n.ten}</b> <span>${n.gia.toLocaleString("vi-VN")} VNĐ</span></p>`).join(""),a=()=>`<form>
        <p><label for="ten">Tên</label><input id="ten" name="ten"></p>
        <p><label for="gia">Giá</label><input id="gia" type="number" name="gia" min="0"></p>
        <p><button type="button" name="btn">Thêm</button></p>
    </form>`;export{i as d,a as f,e as t};
