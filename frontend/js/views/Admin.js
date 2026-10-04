export default async function Admin() {
    return `
        <section class="admin-panel">
            <h2>🛠️ Quản lý Món Ăn</h2>
            <button id="add-food-btn">Thêm Món Mới</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Món</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3" style="text-align: center;">Chưa có dữ liệu</td>
                    </tr>
                </tbody>
            </table>
        </section>
    `;
}
