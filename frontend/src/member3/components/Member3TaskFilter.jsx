import { Funnel, Search, XCircle } from 'react-bootstrap-icons';

export default function Member3TaskFilter({ filters, categories, onChange }) {
  const update = (field, value) => onChange({ ...filters, [field]: value });
  const reset = () => onChange({ keyword: '', categoryId: '', status: '' });

  return (
    <div className="member3-filter-card">
      <div className="member3-section-heading">
        <div>
          <h3><Funnel /> Tìm kiếm và lọc công việc</h3>
          <p>Lọc nhanh danh sách theo từ khóa, danh mục và trạng thái.</p>
        </div>
      </div>
      <div className="member3-filter-grid">
        <label className="member3-search-field">
          <Search />
          <input
            type="search"
            placeholder="Nhập tên hoặc mô tả công việc..."
            value={filters.keyword}
            onChange={(event) => update('keyword', event.target.value)}
          />
        </label>
        <select value={filters.categoryId} onChange={(event) => update('categoryId', event.target.value)}>
          <option value="">Tất cả danh mục</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <select value={filters.status} onChange={(event) => update('status', event.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="TODO">Chưa làm</option>
          <option value="DOING">Đang làm</option>
          <option value="DONE">Hoàn thành</option>
        </select>
        <button type="button" className="member3-reset-button" onClick={reset}><XCircle /> Đặt lại</button>
      </div>
    </div>
  );
}
