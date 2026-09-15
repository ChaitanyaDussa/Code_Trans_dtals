import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import HistoryList from '../components/HistoryList.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import { getHistory, deleteHistoryItem, clearHistory } from '../services/historyService.js';
import '../styles/history.css';

function HistoryPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getHistory(currentPage, ITEMS_PER_PAGE);
      setEntries(data.entries);
      setTotalPages(data.totalPages);
      setTotalEntries(data.totalEntries);
    } catch {
      toast.error('Failed to load history');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      toast.success('Deleted');
      if (selectedEntry?._id === id) setSelectedEntry(null);
      fetchHistory();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Delete all history?')) return;
    try {
      const r = await clearHistory();
      toast.success(`Cleared ${r.deletedCount} entries`);
      setEntries([]);
      setTotalEntries(0);
      setTotalPages(0);
      setSelectedEntry(null);
      setCurrentPage(1);
    } catch {
      toast.error('Failed to clear');
    }
  };

  return (
    <div className="history-page">
      <div className="history-sidebar">
        <div className="history-sidebar-header">
          <span className="history-title">
            History
            {totalEntries > 0 && <span className="history-count">({totalEntries})</span>}
          </span>
          {entries.length > 0 && (
            <button className="clear-all-btn" onClick={handleClearAll}>
              Clear all
            </button>
          )}
        </div>

        <div className="history-list-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading...</p>
            </div>
          ) : (
            <HistoryList entries={entries} onView={setSelectedEntry} onDelete={handleDelete} />
          )}
        </div>

        {totalPages > 1 && (
          <div className="history-pagination">
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`page-btn ${currentPage === p ? 'active' : ''}`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className="history-detail">
        {!selectedEntry ? (
          <div className="history-detail-empty">
            <p>Select an entry to view details</p>
          </div>
        ) : (
          <>
            <div className="history-detail-header">
              <div className="detail-header-left">
                <span className="detail-type">{selectedEntry.type}</span>
                <span className="detail-date">
                  {new Date(selectedEntry.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <button className="detail-close-btn" onClick={() => setSelectedEntry(null)}>
                Close
              </button>
            </div>

            <div className="history-detail-content">
              <div className="detail-section">
                <div className="detail-section-label">
                  Input Code {selectedEntry.sourceLanguage && `(${selectedEntry.sourceLanguage})`}
                </div>
                <div className="detail-editor-container">
                  <CodeEditor
                    code={selectedEntry.inputCode || ''}
                    onChange={() => {}}
                    language={selectedEntry.sourceLanguage}
                    readOnly
                  />
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-section-label">Output</div>

                {/* Output section in detail panel */}
                <div className="detail-output-box">
                  {selectedEntry.type === 'translate' && (
                    <div>
                      <span className="detail-lang-badge-block">
                        <span className="detail-lang-badge">
                          Target: {selectedEntry.targetLanguage}
                        </span>
                      </span>
                      <pre className="detail-code-block">
                        {selectedEntry.output?.translatedCode}
                      </pre>
                    </div>
                  )}

                  {selectedEntry.type === 'analyze' && (
                    <div>
                      <div className="detail-complexity-row">
                        <div className="detail-complexity-card">
                          <div className="detail-complexity-label">Time</div>
                          <div className="detail-complexity-value">
                            {selectedEntry.output?.timeComplexity}
                          </div>
                        </div>
                        <div className="detail-complexity-card">
                          <div className="detail-complexity-label">Space</div>
                          <div className="detail-complexity-value">
                            {selectedEntry.output?.spaceComplexity}
                          </div>
                        </div>
                      </div>
                      {selectedEntry.output?.explanation && (
                        <p className="detail-text">{selectedEntry.output.explanation}</p>
                      )}
                    </div>
                  )}

                  {selectedEntry.type === 'optimize' && (
                    <div>
                      <pre className="detail-code-block">
                        {selectedEntry.output?.optimizedCode}
                      </pre>
                      {selectedEntry.output?.suggestions && (
                        <p className="detail-text detail-text-top">{selectedEntry.output.suggestions}</p>
                      )}
                    </div>
                  )}

                  {selectedEntry.type === 'explain' && (
                    <p className="detail-text">{selectedEntry.output?.explanation}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
