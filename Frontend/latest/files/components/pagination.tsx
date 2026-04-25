import React, { useMemo, useState } from 'react';
import { Pagination } from 'antd';
import { RAGInfo } from './raginformation';
import { EmbeddingsInfo } from './embedding';
import { IAInfo } from './iainformation';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageContent = useMemo(() => {
    if (currentPage === 1) {
      return <IAInfo />;
    }
    if (currentPage === 2) {
      return <EmbeddingsInfo />;
    }
    return <RAGInfo />;
  }, [currentPage]);

  return (
    <div style={{ padding: 24 }}>
      <Pagination
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        total={3}
        pageSize={1}
        style={{ marginBottom: 24 }}
      />

      {pageContent}
    </div>
  );
};

export default App;
