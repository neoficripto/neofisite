import { Component } from 'react';

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onReload = this.onReload.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  onReload() {
    window.location.reload();
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            maxWidth: '980px',
            margin: '0 auto',
            padding: '3.5rem 1.5rem',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          <div style={{ color: 'rgba(60,82,237,0.95)', letterSpacing: '0.14em', fontWeight: 600, fontSize: '0.8rem' }}>
            ERRO
          </div>
          <h2 style={{ margin: '0.75rem 0 0', fontSize: 'clamp(1.65rem, 3vw, 2.25rem)', lineHeight: 1.12 }}>
            Algo falhou ao carregar esta página
          </h2>
          <div style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            {String(this.state.error?.message || this.state.error)}
          </div>
          <button
            type="button"
            onClick={this.onReload}
            style={{
              marginTop: '1.5rem',
              height: '44px',
              padding: '0 1.65rem',
              borderRadius: '999px',
              background: 'var(--color-accent)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#fff',
              fontSize: '0.98rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Recarregar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

