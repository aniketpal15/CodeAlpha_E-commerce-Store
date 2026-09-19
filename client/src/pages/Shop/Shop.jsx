import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProducts } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Shop.css';

const CATEGORIES = ['Electronics','Fashion','Home','Sports','Beauty','Books','Gaming','Accessories'];
const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'price_asc',  label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'popular',    label: 'Most Popular' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [total, setTotal]         = useState(0);
  const [pages, setPages]         = useState(1);
  const [page, setPage]           = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const category = searchParams.get('category') || '';
  const search   = searchParams.get('search')   || '';
  const sort     = searchParams.get('sort')     || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await fetchProducts({ category, search, sort, minPrice, maxPrice, page, limit: 20 });
      setProducts(data.products);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, search, sort, minPrice, maxPrice, page]);

  useEffect(() => {
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [load]);

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    p.delete('page');
    setPage(1);
    setSearchParams(p);
  };

  const applyPrice = () => {
    const p = new URLSearchParams(searchParams);
    if (localMin) p.set('minPrice', localMin); else p.delete('minPrice');
    if (localMax) p.set('maxPrice', localMax); else p.delete('maxPrice');
    p.delete('page');
    setPage(1);
    setSearchParams(p);
  };

  const clearFilters = () => {
    setSearchParams({});
    setLocalMin('');
    setLocalMax('');
    setPage(1);
  };

  const hasFilters = category || search || minPrice || maxPrice || sort !== 'newest';

  return (
    <div className="shop-page" style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container shop-layout">
        {/* ── Sidebar ── */}
        <AnimatePresence>
          {(sidebarOpen || true) && (
            <aside className={`shop-sidebar${sidebarOpen ? ' open' : ''}`}>
              <div className="sidebar-header">
                <h3>Filters</h3>
                {hasFilters && <button className="btn btn-ghost btn-sm" onClick={clearFilters}>Clear All</button>}
              </div>

              {/* Search */}
              <div className="filter-group">
                <h4 className="filter-label">Search</h4>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search products..."
                  defaultValue={search}
                  onKeyDown={e => e.key === 'Enter' && setParam('search', e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="filter-group">
                <h4 className="filter-label">Category</h4>
                <div className="filter-options">
                  <button className={`filter-option${!category ? ' active' : ''}`} onClick={() => setParam('category', '')}>All</button>
                  {CATEGORIES.map(c => (
                    <button key={c} className={`filter-option${category === c ? ' active' : ''}`} onClick={() => setParam('category', c)}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <h4 className="filter-label">Price Range</h4>
                <div className="price-range-inputs">
                  <input type="number" className="form-input" placeholder="Min" value={localMin} onChange={e => setLocalMin(e.target.value)} />
                  <span>—</span>
                  <input type="number" className="form-input" placeholder="Max" value={localMax} onChange={e => setLocalMax(e.target.value)} />
                </div>
                <button className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: '8px' }} onClick={applyPrice}>
                  Apply Price
                </button>
              </div>

              {/* Sort */}
              <div className="filter-group">
                <h4 className="filter-label">Sort By</h4>
                <div className="filter-options">
                  {SORT_OPTIONS.map(o => (
                    <button key={o.value} className={`filter-option${sort === o.value ? ' active' : ''}`} onClick={() => setParam('sort', o.value)}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </AnimatePresence>

        {/* ── Main Content ── */}
        <div className="shop-main">
          {/* Top Bar */}
          <div className="shop-topbar">
            <div className="shop-info">
              {search && <span className="search-tag">Results for: "<strong>{search}</strong>"</span>}
              {category && <span className="search-tag">Category: <strong>{category}</strong></span>}
              <span className="result-count">{total} products</span>
            </div>
            <div className="shop-topbar-actions">
              <button className="btn btn-outline btn-sm mobile-filter-btn" onClick={() => setSidebarOpen(v => !v)}>
                🔧 Filters
              </button>
              <select
                className="form-input sort-select"
                value={sort}
                onChange={e => setParam('sort', e.target.value)}
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <div className="product-grid">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="product-skeleton">
                  <div className="skeleton" style={{ aspectRatio: '1', borderRadius: '12px 12px 0 0' }} />
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="skeleton" style={{ height: '12px', width: '50%' }} />
                    <div className="skeleton" style={{ height: '16px' }} />
                    <div className="skeleton" style={{ height: '12px', width: '70%' }} />
                    <div className="skeleton" style={{ height: '32px', marginTop: '8px' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try different filters or search terms</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <motion.div className="product-grid" layout>
              <AnimatePresence>
                {products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="pagination">
              <button className="btn btn-outline btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                ← Prev
              </button>
              {[...Array(pages)].map((_, i) => (
                <button key={i+1} className={`btn btn-sm${page === i+1 ? ' btn-primary' : ' btn-outline'}`} onClick={() => setPage(i+1)}>
                  {i+1}
                </button>
              ))}
              <button className="btn btn-outline btn-sm" disabled={page === pages} onClick={() => setPage(p => p + 1)}>
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
