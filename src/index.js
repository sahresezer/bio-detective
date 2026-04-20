import React from 'react';
import { createRoot } from 'react-dom/client';
import ArticleDetective from '../includes/modules/ArticleDetective/ArticleDetectiveModule.jsx';

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('bio-detective-root')
                   || document.getElementById('article-detective-react-root');
    if (container) {
        createRoot(container).render(<ArticleDetective />);
    }
});
