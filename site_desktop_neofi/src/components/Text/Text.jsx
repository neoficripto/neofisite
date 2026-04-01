import { createElement } from 'react';
import styles from './Text.module.css';
export default function Text({ as: component = 'p', children, className = '' }) {
  const mergedClassName = [styles.text, className].filter(Boolean).join(' ');
  return createElement(component, { className: mergedClassName }, children);
}
